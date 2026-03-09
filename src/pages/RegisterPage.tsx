import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const RegisterPage = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({ title: "Greška", description: "Lozinke se ne poklapaju.", variant: "destructive" });
      return;
    }
    toast({ title: "Registracija", description: "Funkcionalnost registracije zahteva povezivanje sa backend-om." });
  };

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-card border border-border rounded-lg p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "#FFF" }}>Registracija</h1>
        <div className="grid grid-cols-2 gap-3">
          <input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Ime" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
          <input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Prezime" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <input value={form.email} onChange={e => update("email", e.target.value)} type="email" placeholder="Email" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        <input value={form.password} onChange={e => update("password", e.target.value)} type="password" placeholder="Lozinka" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        <input value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} type="password" placeholder="Potvrda lozinke" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
          Registrujte se
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Već imate nalog? <Link to="/prijava" className="text-primary hover:underline">Prijavite se</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
