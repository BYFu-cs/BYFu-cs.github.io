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

  function loadStylesheet(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (window.L) {
        resolve();
        return;
      }
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        existing.addEventListener("load", resolve);
        existing.addEventListener("error", reject);
        return;
      }
      var script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function markerRadius(visits) {
    var count = Math.max(1, Number(visits) || 1);
    // Log scaling keeps low-count cities from swelling on a world-scale map.
    return Math.max(3.2, Math.min(10, 3.1 + Math.log10(count + 1) * 1.15));
  }

  function renderMap(locations, unavailable) {
    var canvas = document.getElementById("visitor-map-canvas");
    if (!canvas) return;

    var worldView = {
      center: [12, 0],
      zoom: 0.5
    };

    canvas.innerHTML = "";
    if (!locations.length) {
      canvas.innerHTML = '<div class="visitor-map-empty">' +
        (unavailable ? "Visitor data is temporarily unavailable." : "No city-level records yet.") +
        '</div>';
      return;
    }

    loadStylesheet("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js")
      .then(function () {
        var map = L.map(canvas, {
          attributionControl: true,
          scrollWheelZoom: false,
          dragging: window.innerWidth > 640,
          tap: false,
          zoomControl: true,
          zoomSnap: 0.25,
          zoomDelta: 0.5,
          minZoom: 0
        }).setView(worldView.center, worldView.zoom);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          minZoom: 0,
          maxZoom: 6,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        locations.forEach(function (item) {
          var lat = Number(item.latitude);
          var lon = Number(item.longitude);
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

          var radius = markerRadius(item.visits);
          var marker = L.circleMarker([lat, lon], {
            radius: radius,
            color: "#27496d",
            weight: 1.25,
            fillColor: "#9b2f3f",
            fillOpacity: 0.62
          }).addTo(map);

          var place = [item.city, item.region, item.country].filter(Boolean).join(", ");
          marker.bindTooltip(place + " - " + formatCount(item.visits) + " visits", {
            direction: "top",
            opacity: 0.92
          });
        });

        map.setView(worldView.center, worldView.zoom);
      })
      .catch(function () {
        canvas.innerHTML = '<div class="visitor-map-empty">Map library unavailable. City statistics remain listed below.</div>';
      });
  }

  function updateWidget(summary, baseline) {
    var totalEl = document.getElementById("visitor-map-total");
    var locations = Array.isArray(summary.locations) ? summary.locations : [];
    var total = Number(summary.totalVisits);

    if (!Number.isFinite(total)) {
      total = baseline + (Number(summary.recordedVisits) || 0);
    }

    if (totalEl) totalEl.textContent = formatCount(total);
    renderMap(locations, Boolean(summary.unavailable));
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
