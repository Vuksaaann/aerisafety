import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import AqiEmoji from "@/components/AqiEmoji";
import { getAqiLevel, sensorLocations, randomizeSensorData } from "@/data/mockData";

const Index = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof sensorLocations[0] | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      randomizeSensorData();
      setTick(t => t + 1);
      // Update result if one is selected
      if (result) {
        const updated = sensorLocations.find(s => s.id === result.id);
        if (updated) setResult({ ...updated });
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [result]);

  const handleSearch = () => {
    const match = sensorLocations.find((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );
    setResult(match || sensorLocations[0]);
  };

  const aqiInfo = result ? getAqiLevel(result.aqi) : null;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-32 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "#FFFFFF" }}>
          Vazduh koji dišete, u realnom vremenu
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Pratite kvalitet vazduha u vašem gradu
        </p>
        <div className="max-w-xl mx-auto flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Unesite grad ili adresu..."
            className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Search size={18} />
            <span className="hidden sm:inline">Pretraži</span>
          </button>
        </div>
      </section>

      {/* Results */}
      {result && aqiInfo && (
        <section className="container mx-auto px-4 pb-20">
          <div className="flex flex-col items-center mb-8">
            <AqiEmoji level={aqiInfo.level} size={120} />
            <h2 className="text-2xl font-bold mt-4" style={{ color: aqiInfo.color }}>
              {aqiInfo.label}
            </h2>
            <p className="text-muted-foreground mt-1">{result.name} — AQI {result.aqi}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "PM2.5", value: result.pm25, unit: "μg/m³", aqi: result.pm25 > 55 ? "unhealthy" : result.pm25 > 35 ? "sensitive" : "good" },
              { label: "PM10", value: result.pm10, unit: "μg/m³", aqi: result.pm10 > 150 ? "unhealthy" : result.pm10 > 50 ? "sensitive" : "good" },
              { label: "Temperatura", value: result.temp, unit: "°C", aqi: "good" },
              { label: "Vlažnost", value: result.humidity, unit: "%", aqi: "good" },
            ].map((m) => (
              <div key={m.label} className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-3xl font-bold text-foreground">{m.value}</p>
                <p className="text-sm text-muted-foreground">{m.unit}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
