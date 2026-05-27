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

  function renderMap(locations) {
    var canvas = document.getElementById("visitor-map-canvas");
    if (!canvas) return;

    canvas.innerHTML = "";
    if (!locations.length) {
      canvas.innerHTML = '<div class="visitor-map-empty">No city-level records yet.</div>';
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
          zoomControl: true
        }).setView([22, 0], 1);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          minZoom: 1,
          maxZoom: 6,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var bounds = [];
        locations.forEach(function (item) {
          var lat = Number(item.latitude);
          var lon = Number(item.longitude);
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

          var radius = Math.max(5, Math.min(22, 4 + Math.sqrt(Number(item.visits) || 1)));
          var marker = L.circleMarker([lat, lon], {
            radius: radius,
            color: "#27496d",
            weight: 1.5,
            fillColor: "#9b2f3f",
            fillOpacity: 0.68
          }).addTo(map);

          var place = [item.city, item.region, item.country].filter(Boolean).join(", ");
          marker.bindTooltip(place + " - " + formatCount(item.visits) + " visits", {
            direction: "top",
            opacity: 0.92
          });
          bounds.push([lat, lon]);
        });

        if (bounds.length > 1) {
          map.fitBounds(bounds, { padding: [22, 22], maxZoom: 4 });
        }
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
    renderMap(locations);
  }

  function initVisitorMap() {
    var root = document.getElementById("visitor-map");
    if (!root) return;

    var endpoint = normalizeEndpoint(root.getAttribute("data-endpoint"));
    var baseline = Number(root.getAttribute("data-baseline")) || 1000000;
    var totalEl = document.getElementById("visitor-map-total");
    if (totalEl) totalEl.textContent = formatCount(baseline);

    if (!endpoint) {
      return;
    }

    var path = encodeURIComponent(window.location.pathname || "/");
    fetch(endpoint + "/collect?path=" + path, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      keepalive: true
    })
      .catch(function () {
        return null;
      })
      .then(function () {
        return fetch(endpoint + "/summary", {
          method: "GET",
          mode: "cors",
          credentials: "omit"
        });
      })
      .then(function (response) {
        if (!response || !response.ok) throw new Error("Visitor summary unavailable");
        return response.json();
      })
      .then(function (summary) {
        updateWidget(summary, baseline);
      })
      .catch(function () {
        renderMap([]);
      });
  }

  document.addEventListener("DOMContentLoaded", initVisitorMap);
})();
