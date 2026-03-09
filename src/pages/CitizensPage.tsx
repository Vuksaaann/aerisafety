import { useState } from "react";
import { Upload, MapPin, Calendar } from "lucide-react";
import { mockReports } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const CitizensPage = () => {
  const isLoggedIn = false; // placeholder
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Prijava poslata!", description: "Hvala vam na doprinosu." });
    setTitle(""); setLocation(""); setDescription("");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFF" }}>Građani Reporteri</h1>
      <p className="text-muted-foreground mb-10">Pomozite nam da pratimo zagađenje u vašem gradu</p>

      {/* Upload form */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 mb-12 max-w-2xl">
          <div className="space-y-4">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Naslov prijave" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Grad / Lokacija" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Opis situacije" rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring resize-none" />
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground cursor-pointer hover:border-nav-hover transition-colors">
              <Upload className="mx-auto mb-2" size={24} />
              <p className="text-sm">Prevucite fotografiju ili kliknite za upload</p>
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Pošalji prijavu
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 mb-12 text-center max-w-2xl">
          <p className="text-muted-foreground text-lg">Prijavite se da biste postali građanin reporter</p>
        </div>
      )}

      {/* Feed */}
      <h2 className="text-xl font-bold mb-6" style={{ color: "#FFF" }}>Poslednje prijave</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockReports.map((r) => (
          <div key={r.id} className="bg-card border border-border rounded-lg overflow-hidden">
            {r.imageUrl && (
              <img src={r.imageUrl} alt={r.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-foreground">{r.title}</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><MapPin size={12} />{r.location}</span>
                <span className="flex items-center gap-1"><Calendar size={12} />{r.date}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{r.description}</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                  {r.reporterInitials}
                </div>
                <span className="text-sm text-muted-foreground">{r.reporterName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitizensPage;
