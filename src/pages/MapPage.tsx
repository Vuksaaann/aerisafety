import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { sensorLocations, getAqiLevel, randomizeSensorData } from "@/data/mockData";

const AqiLegend = () => (
  <div className="absolute bottom-4 left-4 z-[1000] bg-card border border-border rounded-lg p-3">
    <p className="text-xs font-semibold mb-2" style={{ color: "#FFF" }}>AQI Skala</p>
    {[
      { range: "0-50", label: "Dobar", color: "#00E400" },
      { range: "51-100", label: "Umeren", color: "#FFFF00" },
      { range: "101-150", label: "Nezdrav za osetljive", color: "#FF7E00" },
      { range: "151-200", label: "Nezdrav", color: "#FF0000" },
      { range: "201-300", label: "Veoma nezdrav", color: "#8F3F97" },
      { range: "301+", label: "Opasan", color: "#7E0023" },
    ].map((item) => (
      <div key={item.range} className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
        <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: item.color }} />
        <span>{item.range}</span>
        <span>{item.label}</span>
      </div>
    ))}
  </div>
);

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [44.2, 20.9],
      zoom: 7,
      zoomControl: false,
    });

    L.tileLayer("https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    const addMarkers = () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      sensorLocations.forEach((loc) => {
        const info = getAqiLevel(loc.aqi);
        const marker = L.circleMarker([loc.lat, loc.lng], {
          radius: 22,
          fillColor: info.color,
          fillOpacity: 0.85,
          color: info.color,
          weight: 2,
        }).addTo(map);
        marker.bindTooltip(String(loc.aqi), {
          permanent: true,
          direction: "center",
          className: "aqi-label",
        });
        marker.bindPopup(`
          <div style="font-family: Rajdhani, sans-serif; min-width: 180px; font-size: 14px;">
            <p style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${loc.name}</p>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-weight: bold; font-size: 18px; color: ${info.color};">AQI ${loc.aqi}</span>
              <span style="font-size: 12px;">${info.label}</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 12px;">
              <span>PM2.5: <b>${loc.pm25}</b> μg/m³</span>
              <span>PM10: <b>${loc.pm10}</b> μg/m³</span>
              <span>Temp: <b>${loc.temp}</b> °C</span>
              <span>Vlažnost: <b>${loc.humidity}</b>%</span>
            </div>
            <p style="font-size: 11px; margin-top: 8px; opacity: 0.7;">Poslednje ažuriranje: ${loc.lastUpdate}</p>
          </div>
        `);
        markersRef.current.push(marker);
      });
    };

    addMarkers();

    const interval = setInterval(() => {
      randomizeSensorData();
      addMarkers();
    }, 30000);

    mapInstanceRef.current = map;

    return () => {
      clearInterval(interval);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="relative" style={{ height: "calc(100vh - 64px)" }}>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
      <AqiLegend />
      <style>{`
        .aqi-label {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #fff !important;
          font-family: Rajdhani, sans-serif !important;
          font-weight: 700 !important;
          font-size: 13px !important;
        }
      `}</style>
    </div>
  );
};

export default MapPage;
