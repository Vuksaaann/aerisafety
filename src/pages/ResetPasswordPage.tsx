import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      toast({ title: "Nevažeći link", description: "Ovaj link za resetovanje lozinke nije validan.", variant: "destructive" });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Greška", description: "Lozinke se ne poklapaju.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Greška", description: "Lozinka mora imati najmanje 6 karaktera.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Greška", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Lozinka promenjena!", description: "Možete se prijaviti sa novom lozinkom." });
      navigate("/prijava");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-card border border-border rounded-lg p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "#FFF" }}>Nova lozinka</h1>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Nova lozinka" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" placeholder="Potvrda nove lozinke" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? "Čuvanje..." : "Sačuvaj lozinku"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
