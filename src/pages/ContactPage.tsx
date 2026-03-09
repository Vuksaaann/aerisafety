import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", type: "Opšta pitanja", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Vaša poruka je poslata!", description: "Odgovorićemo vam u najkraćem roku." });
    setForm({ name: "", email: "", type: "Opšta pitanja", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#FFF" }}>Kontaktirajte nas</h1>
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h3 className="font-bold text-foreground mb-3">Aerisafety d.o.o.</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin size={16} />Bulevar Kralja Aleksandra 73, 11000 Beograd, Srbija</p>
              <p className="flex items-center gap-2"><Mail size={16} />kontakt@aerisafety.rs</p>
              <p className="flex items-center gap-2"><Phone size={16} />+381 11 123 4567</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-nav-hover transition-colors"><Instagram size={22} /></a>
            <a href="#" className="text-muted-foreground hover:text-nav-hover transition-colors"><Linkedin size={22} /></a>
            <a href="#" className="text-muted-foreground hover:text-nav-hover transition-colors"><Facebook size={22} /></a>
          </div>
        </div>

        {/* Right */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ime i Prezime" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email adresa" type="email" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring">
            <option>Opšta pitanja</option>
            <option>Reklamacija</option>
            <option>Partnerstvo</option>
            <option>Tehnička podrška</option>
          </select>
          <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Poruka" rows={5} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring resize-none" />
          <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Pošalji poruku
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
