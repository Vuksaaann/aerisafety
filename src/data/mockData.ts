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

export const sensorLocations: SensorLocation[] = [
  { id: 1, name: "Beograd - Centar", lat: 44.8176, lng: 20.4633, aqi: 156, pm25: 78, pm10: 112, temp: 18, humidity: 62, lastUpdate: "5 min" },
  { id: 2, name: "Novi Sad", lat: 45.2671, lng: 19.8335, aqi: 72, pm25: 28, pm10: 45, temp: 16, humidity: 58, lastUpdate: "3 min" },
  { id: 3, name: "Niš", lat: 43.3209, lng: 21.8958, aqi: 210, pm25: 120, pm10: 180, temp: 20, humidity: 55, lastUpdate: "8 min" },
  { id: 4, name: "Kragujevac", lat: 44.0128, lng: 20.9114, aqi: 45, pm25: 12, pm10: 22, temp: 17, humidity: 65, lastUpdate: "2 min" },
  { id: 5, name: "Subotica", lat: 46.1, lng: 19.6658, aqi: 88, pm25: 35, pm10: 58, temp: 14, humidity: 70, lastUpdate: "6 min" },
  { id: 6, name: "Čačak", lat: 43.8914, lng: 20.3497, aqi: 310, pm25: 200, pm10: 280, temp: 15, humidity: 75, lastUpdate: "4 min" },
  { id: 7, name: "Pančevo", lat: 44.8708, lng: 20.6403, aqi: 130, pm25: 55, pm10: 85, temp: 19, humidity: 60, lastUpdate: "7 min" },
  { id: 8, name: "Zrenjanin", lat: 45.3816, lng: 20.3894, aqi: 35, pm25: 8, pm10: 18, temp: 15, humidity: 68, lastUpdate: "1 min" },
];

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
