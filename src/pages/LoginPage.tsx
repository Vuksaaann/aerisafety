import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Greška pri prijavi", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Uspešna prijava!" });
      navigate("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-card border border-border rounded-lg p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "#FFF" }}>Prijava</h1>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Lozinka" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? "Prijavljivanje..." : "Prijavite se"}
        </button>
        <div className="text-center">
          <Link to="/zaboravljena-lozinka" className="text-sm text-muted-foreground hover:text-nav-hover">Zaboravili ste lozinku?</Link>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Nemate nalog? <Link to="/registracija" className="text-primary hover:underline">Registrujte se</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
