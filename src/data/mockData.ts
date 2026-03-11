export interface SensorLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  pm25: number;
  pm10: number;
  temp: number;
  humidity: number;
  lastUpdate: string;
}

export const baseSensorLocations: SensorLocation[] = [
  { id: 1, name: "Beograd - Centar", lat: 44.8176, lng: 20.4633, aqi: 156, pm25: 78, pm10: 112, temp: 18, humidity: 62, lastUpdate: "5 min" },
  { id: 2, name: "Novi Sad", lat: 45.2671, lng: 19.8335, aqi: 72, pm25: 28, pm10: 45, temp: 16, humidity: 58, lastUpdate: "3 min" },
  { id: 3, name: "Niš", lat: 43.3209, lng: 21.8958, aqi: 210, pm25: 120, pm10: 180, temp: 20, humidity: 55, lastUpdate: "8 min" },
  { id: 4, name: "Kragujevac", lat: 44.0128, lng: 20.9114, aqi: 45, pm25: 12, pm10: 22, temp: 17, humidity: 65, lastUpdate: "2 min" },
  { id: 5, name: "Subotica", lat: 46.1, lng: 19.6658, aqi: 88, pm25: 35, pm10: 58, temp: 14, humidity: 70, lastUpdate: "6 min" },
  { id: 6, name: "Čačak", lat: 43.8914, lng: 20.3497, aqi: 310, pm25: 200, pm10: 280, temp: 15, humidity: 75, lastUpdate: "4 min" },
  { id: 7, name: "Pančevo", lat: 44.8708, lng: 20.6403, aqi: 130, pm25: 55, pm10: 85, temp: 19, humidity: 60, lastUpdate: "7 min" },
  { id: 8, name: "Zrenjanin", lat: 45.3816, lng: 20.3894, aqi: 35, pm25: 8, pm10: 18, temp: 15, humidity: 68, lastUpdate: "1 min" },
  // Belgrade locations
  { id: 9, name: "Knez Mihailova 30 (Stari Grad)", lat: 44.8184, lng: 20.4560, aqi: 142, pm25: 68, pm10: 98, temp: 19, humidity: 58, lastUpdate: "2 min" },
  { id: 10, name: "Trg Republike 5 (Stari Grad)", lat: 44.8161, lng: 20.4600, aqi: 138, pm25: 64, pm10: 95, temp: 19, humidity: 57, lastUpdate: "3 min" },
  { id: 11, name: "Bulevar Kralja Aleksandra 73 (Palilula)", lat: 44.8030, lng: 20.4780, aqi: 165, pm25: 85, pm10: 125, temp: 20, humidity: 55, lastUpdate: "4 min" },
  { id: 12, name: "Vojvode Stepe 152 (Voždovac)", lat: 44.7780, lng: 20.4750, aqi: 118, pm25: 52, pm10: 78, temp: 18, humidity: 60, lastUpdate: "5 min" },
  { id: 13, name: "Ustanička 125 (Zvezdara)", lat: 44.7920, lng: 20.4950, aqi: 127, pm25: 58, pm10: 88, temp: 19, humidity: 59, lastUpdate: "3 min" },
  { id: 14, name: "Požeška 83 (Čukarica)", lat: 44.7830, lng: 20.4150, aqi: 95, pm25: 38, pm10: 62, temp: 17, humidity: 64, lastUpdate: "6 min" },
  { id: 15, name: "Jurija Gagarina 14 (Novi Beograd)", lat: 44.8100, lng: 20.4050, aqi: 108, pm25: 46, pm10: 72, temp: 18, humidity: 61, lastUpdate: "2 min" },
  { id: 16, name: "Zemunski kej 43 (Zemun)", lat: 44.8450, lng: 20.4100, aqi: 78, pm25: 30, pm10: 50, temp: 16, humidity: 66, lastUpdate: "4 min" },
  { id: 17, name: "Bulevar Oslobođenja 167 (Savski Venac)", lat: 44.7950, lng: 20.4500, aqi: 152, pm25: 74, pm10: 108, temp: 19, humidity: 56, lastUpdate: "1 min" },
  { id: 18, name: "Ugrinovačka 5 (Surčin)", lat: 44.7960, lng: 20.2850, aqi: 62, pm25: 22, pm10: 38, temp: 15, humidity: 72, lastUpdate: "7 min" },
  { id: 19, name: "Vojvođanska 91 (Zemun)", lat: 44.8400, lng: 20.4000, aqi: 82, pm25: 32, pm10: 54, temp: 16, humidity: 65, lastUpdate: "5 min" },
  { id: 20, name: "Cara Dušana 207 (Palilula)", lat: 44.8250, lng: 20.4700, aqi: 148, pm25: 70, pm10: 102, temp: 20, humidity: 54, lastUpdate: "3 min" },
  { id: 21, name: "Rakovička cesta 58 (Rakovica)", lat: 44.7600, lng: 20.4350, aqi: 105, pm25: 44, pm10: 70, temp: 17, humidity: 63, lastUpdate: "4 min" },
  { id: 22, name: "Batajnički drum 23 (Novi Beograd)", lat: 44.8550, lng: 20.3500, aqi: 72, pm25: 26, pm10: 44, temp: 15, humidity: 68, lastUpdate: "6 min" },
  { id: 23, name: "Pančevački put 38 (Palilula)", lat: 44.8200, lng: 20.5000, aqi: 175, pm25: 92, pm10: 138, temp: 20, humidity: 53, lastUpdate: "2 min" },
];

// Mutable copy for live updates
export let sensorLocations: SensorLocation[] = baseSensorLocations.map(s => ({ ...s }));

export const randomizeSensorData = () => {
  sensorLocations = baseSensorLocations.map(s => {
    const aqiDelta = Math.round((Math.random() - 0.5) * 20);
    const newAqi = Math.max(0, s.aqi + aqiDelta);
    const pm25Delta = Math.round((Math.random() - 0.5) * 10);
    const pm10Delta = Math.round((Math.random() - 0.5) * 15);
    const tempDelta = Math.round((Math.random() - 0.5) * 2);
    const humDelta = Math.round((Math.random() - 0.5) * 6);
    return {
      ...s,
      aqi: newAqi,
      pm25: Math.max(0, s.pm25 + pm25Delta),
      pm10: Math.max(0, s.pm10 + pm10Delta),
      temp: s.temp + tempDelta,
      humidity: Math.max(0, Math.min(100, s.humidity + humDelta)),
      lastUpdate: `${Math.floor(Math.random() * 9) + 1} min`,
    };
  });
  return sensorLocations;
};

export const getAqiLevel = (aqi: number) => {
  if (aqi <= 50) return { level: 1, label: "Dobar", labelEn: "Good", color: "#00E400" };
  if (aqi <= 100) return { level: 2, label: "Umeren", labelEn: "Moderate", color: "#FFFF00" };
  if (aqi <= 150) return { level: 3, label: "Nezdrav za osetljive", labelEn: "Unhealthy for Sensitive", color: "#FF7E00" };
  if (aqi <= 200) return { level: 4, label: "Nezdrav", labelEn: "Unhealthy", color: "#FF0000" };
  if (aqi <= 300) return { level: 5, label: "Veoma nezdrav", labelEn: "Very Unhealthy", color: "#8F3F97" };
  return { level: 6, label: "Opasan", labelEn: "Hazardous", color: "#7E0023" };
};

export interface CitizenReport {
  id: number;
  title: string;
  location: string;
  description: string;
  date: string;
  reporterName: string;
  reporterInitials: string;
  imageUrl?: string;
}

export const mockReports: CitizenReport[] = [
  {
    id: 1, title: "Dim iz fabrike u Pančevu", location: "Pančevo", date: "08.03.2026",
    description: "Primetio sam gust dim iz hemijske fabrike koji se širi prema centru grada. Miris je veoma jak i osećam iritaciju u grlu.",
    reporterName: "Marko", reporterInitials: "MM",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop"
  },
  {
    id: 2, title: "Spaljivanje otpada na otvorenom", location: "Niš - Medijana", date: "07.03.2026",
    description: "Komšije spaljuju plastiku i gume na otvorenom prostoru. Vazduh je nepodnošljiv u celom kraju, deca ne mogu napolje.",
    reporterName: "Ana", reporterInitials: "AS",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop"
  },
  {
    id: 3, title: "Zagađenje od saobraćaja", location: "Beograd - Autokomanda", date: "06.03.2026",
    description: "Svakodnevno prevelika gužva i izduvni gasovi u zoni Autokomande. Potrebna hitna reakcija.",
    reporterName: "Petar", reporterInitials: "PJ",
  },
  {
    id: 4, title: "Prašina sa gradilišta", location: "Novi Sad - Grbavica", date: "05.03.2026",
    description: "Gradilište ne koristi mere zaštite od prašine. Ceo kraj je pokriven belom prašinom od betona.",
    reporterName: "Jelena", reporterInitials: "JM",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop"
  },
  {
    id: 5, title: "Smrad iz kanalizacije", location: "Kragujevac", date: "04.03.2026",
    description: "Neizdrživ smrad iz otvorene kanalizacije u centru grada. Problem traje već mesecima bez rešenja.",
    reporterName: "Dragan", reporterInitials: "DN",
  },
];
