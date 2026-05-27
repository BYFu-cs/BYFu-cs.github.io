const ALLOWED_ORIGINS = new Set([
  "https://boyifu-ai.github.io",
  "http://127.0.0.1:4000",
  "http://localhost:4000"
]);

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : "https://boyifu-ai.github.io";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store"
  };
}

function json(data, request, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(request)
    }
  });
}

function normalizePart(value, fallback) {
  return String(value || fallback || "Unknown").trim().slice(0, 80);
}

function cityKey(cf) {
  return [
    normalizePart(cf.country, "XX"),
    normalizePart(cf.regionCode || cf.region, ""),
    normalizePart(cf.city, "Unknown")
  ].join("|").toLowerCase();
}

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function collect(request, env) {
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const cf = request.cf || {};
  const key = cityKey(cf);
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const userAgent = request.headers.get("User-Agent") || "";
  const salt = env.UNIQUE_SALT || "replace-this-salt-in-worker-settings";
  const visitorHash = await sha256Hex([day, salt, ip, userAgent].join("|"));

  const city = normalizePart(cf.city, "Unknown");
  const region = normalizePart(cf.region, "");
  const country = normalizePart(cf.country, "Unknown");
  const latitude = Number(cf.latitude || 0);
  const longitude = Number(cf.longitude || 0);
  const nowIso = now.toISOString();

  await env.DB.prepare(
    `INSERT INTO city_visits
      (city_key, city, region, country, latitude, longitude, visits, unique_days, first_seen, last_seen)
     VALUES (?, ?, ?, ?, ?, ?, 1, 0, ?, ?)
     ON CONFLICT(city_key) DO UPDATE SET
      visits = visits + 1,
      city = excluded.city,
      region = excluded.region,
      country = excluded.country,
      latitude = excluded.latitude,
      longitude = excluded.longitude,
      last_seen = excluded.last_seen`
  ).bind(key, city, region, country, latitude, longitude, nowIso, nowIso).run();

  const uniqueInsert = await env.DB.prepare(
    `INSERT OR IGNORE INTO daily_unique_visitors (visit_day, visitor_hash, city_key)
     VALUES (?, ?, ?)`
  ).bind(day, visitorHash, key).run();

  if (uniqueInsert.meta && uniqueInsert.meta.changes > 0) {
    await env.DB.prepare(
      `UPDATE city_visits SET unique_days = unique_days + 1 WHERE city_key = ?`
    ).bind(key).run();
  }

  await env.DB.prepare(
    `INSERT INTO daily_totals (visit_day, visits)
     VALUES (?, 1)
     ON CONFLICT(visit_day) DO UPDATE SET visits = visits + 1`
  ).bind(day).run();

  return json({ ok: true }, request);
}

async function summary(request, env) {
  const totalRow = await env.DB.prepare(
    `SELECT COALESCE(SUM(visits), 0) AS visits FROM city_visits`
  ).first();

  const rows = await env.DB.prepare(
    `SELECT city, region, country, latitude, longitude, visits, unique_days AS uniqueVisitors
     FROM city_visits
     WHERE latitude IS NOT NULL AND longitude IS NOT NULL
     ORDER BY visits DESC
     LIMIT 120`
  ).all();

  return json({
    recordedVisits: Number(totalRow && totalRow.visits) || 0,
    locations: rows.results || []
  }, request);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    const url = new URL(request.url);
    if (url.pathname === "/collect") return collect(request, env);
    if (url.pathname === "/summary") return summary(request, env);

    return json({ error: "Not found" }, request, 404);
  }
};
