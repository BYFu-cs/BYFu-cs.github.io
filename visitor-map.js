(function () {
  function formatCount(value) {
    var count = Number(value) || 0;
    if (count >= 1000000) {
      var millions = Math.floor(count / 100000) / 10;
      return (millions % 1 === 0 ? String(millions.toFixed(0)) : millions.toFixed(1)) + "M+";
    }
    if (count >= 1000) {
      return Math.floor(count / 1000) + "K+";
    }
    return String(count);
  }

  function normalizeEndpoint(endpoint) {
    return (endpoint || "").replace(/\/+$/, "");
  }

  function endpointCandidates(root) {
    var seen = {};
    return [
      root.getAttribute("data-endpoint"),
      root.getAttribute("data-fallback-endpoint")
    ]
      .map(normalizeEndpoint)
      .filter(function (endpoint) {
        if (!endpoint || seen[endpoint]) return false;
        seen[endpoint] = true;
        return true;
      });
  }

  function fetchWithTimeout(url, options, timeoutMs) {
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, timeoutMs || 6000);
    var settings = Object.assign({}, options, { signal: controller.signal });

    return fetch(url, settings).finally(function () {
      clearTimeout(timer);
    });
  }

  function markerRadius(visits) {
    var count = Math.max(1, Number(visits) || 1);
    // Log scaling keeps low-count cities from swelling on a world-scale map.
    return Math.max(3.2, Math.min(10, 3.1 + Math.log10(count + 1) * 1.15));
  }

  function svgElement(name, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.keys(attrs || {}).forEach(function (key) {
      el.setAttribute(key, attrs[key]);
    });
    return el;
  }

  function projectPoint(lat, lon) {
    return {
      x: ((Number(lon) + 180) / 360) * 720,
      y: ((90 - Number(lat)) / 180) * 300
    };
  }

  function renderStaticMap(canvas, locations) {
    var landPaths = [
      "M70 75C96 42 162 36 214 58C246 72 265 103 242 130C218 158 190 151 171 184C153 217 117 190 104 151C94 122 45 108 70 75Z",
      "M205 178C231 195 238 229 224 261C211 292 182 285 171 250C160 218 176 190 205 178Z",
      "M315 71C350 52 408 55 441 78C473 100 477 135 446 150C414 166 389 146 354 161C322 174 292 151 290 118C288 95 298 80 315 71Z",
      "M360 150C390 140 430 153 451 181C474 212 458 257 423 264C390 270 368 235 356 204C346 177 342 158 360 150Z",
      "M452 89C497 58 585 63 641 94C682 117 678 152 630 158C592 163 565 143 526 154C486 164 443 139 452 89Z",
      "M498 171C540 156 596 171 620 204C641 233 617 260 576 251C532 241 503 213 498 171Z",
      "M612 228C633 218 663 226 674 245C684 263 667 277 641 271C617 266 600 243 612 228Z",
      "M0 286C91 278 165 286 246 279C342 270 417 284 516 276C599 270 664 280 720 274V300H0Z"
    ];
    var svg = svgElement("svg", {
      class: "visitor-static-map",
      viewBox: "0 0 720 300",
      role: "img",
      "aria-label": "World map of aggregated visitor cities",
      preserveAspectRatio: "xMidYMid meet"
    });

    svg.appendChild(svgElement("rect", {
      x: 0,
      y: 0,
      width: 720,
      height: 300,
      fill: "#dceff5"
    }));

    for (var lon = -120; lon <= 120; lon += 60) {
      var x = projectPoint(0, lon).x;
      svg.appendChild(svgElement("line", {
        x1: x,
        y1: 0,
        x2: x,
        y2: 300,
        class: "visitor-map-grid"
      }));
    }

    for (var lat = -60; lat <= 60; lat += 30) {
      var y = projectPoint(lat, 0).y;
      svg.appendChild(svgElement("line", {
        x1: 0,
        y1: y,
        x2: 720,
        y2: y,
        class: lat === 0 ? "visitor-map-equator" : "visitor-map-grid"
      }));
    }

    landPaths.forEach(function (path) {
      svg.appendChild(svgElement("path", {
        d: path,
        class: "visitor-map-land"
      }));
    });

    locations.forEach(function (item) {
      var lat = Number(item.latitude);
      var lon = Number(item.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

      var point = projectPoint(lat, lon);
      var marker = svgElement("circle", {
        cx: point.x,
        cy: point.y,
        r: markerRadius(item.visits),
        class: "visitor-map-marker"
      });
      var title = svgElement("title");
      var place = [item.city, item.region, item.country].filter(Boolean).join(", ");
      title.textContent = place + " - " + formatCount(item.visits) + " visits";
      marker.appendChild(title);
      svg.appendChild(marker);
    });

    canvas.innerHTML = "";
    canvas.appendChild(svg);
  }

  function renderMap(locations) {
    var canvas = document.getElementById("visitor-map-canvas");
    if (!canvas) return;
    renderStaticMap(canvas, locations);
  }

  function updateWidget(summary, baseline) {
    var totalEl = document.getElementById("visitor-map-total");
    var locations = Array.isArray(summary.locations) ? summary.locations : [];
    var total = Number(summary.totalVisits);

    if (!Number.isFinite(total)) {
      total = baseline + (Number(summary.recordedVisits) || 0);
    }

    if (totalEl) totalEl.textContent = formatCount(total);
    renderMap(locations);
  }

  function collectAndLoadSummary(endpoint, path) {
    fetchWithTimeout(endpoint + "/collect?path=" + path, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      keepalive: true
    }, 5000)
      .catch(function () {
        return null;
      });

    return fetchWithTimeout(endpoint + "/summary", {
      method: "GET",
      mode: "cors",
      credentials: "omit"
    }, 6000)
      .then(function (response) {
        if (!response || !response.ok) throw new Error("Visitor summary unavailable");
        return response.json();
      });
  }

  function loadFromEndpoints(endpoints, path, index) {
    if (index >= endpoints.length) {
      return Promise.reject(new Error("All visitor endpoints unavailable"));
    }

    return collectAndLoadSummary(endpoints[index], path).catch(function () {
      return loadFromEndpoints(endpoints, path, index + 1);
    });
  }

  function initVisitorMap() {
    var root = document.getElementById("visitor-map");
    if (!root) return;

    var endpoints = endpointCandidates(root);
    var baseline = Number(root.getAttribute("data-baseline")) || 1000000;
    var totalEl = document.getElementById("visitor-map-total");
    if (totalEl) totalEl.textContent = formatCount(baseline);
    renderMap([]);

    if (!endpoints.length) {
      return;
    }

    var path = encodeURIComponent(window.location.pathname || "/");
    loadFromEndpoints(endpoints, path, 0)
      .then(function (summary) {
        updateWidget(summary, baseline);
      })
      .catch(function () {
        updateWidget({ totalVisits: baseline, locations: [], unavailable: true }, baseline);
      });
  }

  document.addEventListener("DOMContentLoaded", initVisitorMap);
})();
