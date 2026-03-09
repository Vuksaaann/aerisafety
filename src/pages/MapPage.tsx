import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { sensorLocations, getAqiLevel } from "@/data/mockData";
import AqiEmoji from "@/components/AqiEmoji";
import "leaflet/dist/leaflet.css";

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
  return (
    <div className="relative" style={{ height: "calc(100vh - 64px)" }}>
      <MapContainer
        center={[44.2, 20.9]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {sensorLocations.map((loc) => {
          const info = getAqiLevel(loc.aqi);
          return (
            <CircleMarker
              key={loc.id}
              center={[loc.lat, loc.lng]}
              radius={22}
              pathOptions={{ fillColor: info.color, fillOpacity: 0.85, color: info.color, weight: 2 }}
            >
              <Popup>
                <div className="font-rajdhani text-sm" style={{ minWidth: 180 }}>
                  <p className="font-bold text-base mb-1">{loc.name}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <AqiEmoji level={info.level} size={32} />
                    <span className="font-bold text-lg" style={{ color: info.color }}>AQI {loc.aqi}</span>
                    <span className="text-xs">{info.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <span>PM2.5: <b>{loc.pm25}</b> μg/m³</span>
                    <span>PM10: <b>{loc.pm10}</b> μg/m³</span>
                    <span>Temp: <b>{loc.temp}</b> °C</span>
                    <span>Vlažnost: <b>{loc.humidity}</b>%</span>
                  </div>
                  <p className="text-xs mt-2 opacity-70">Poslednje ažuriranje: {loc.lastUpdate}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
      <AqiLegend />
    </div>
  );
};

export default MapPage;
