import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Greška", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email poslat!", description: "Proverite inbox za link za resetovanje lozinke." });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-card border border-border rounded-lg p-8 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "#FFF" }}>Zaboravljena lozinka</h1>
        <p className="text-sm text-muted-foreground text-center mb-4">Unesite email adresu i poslaćemo vam link za resetovanje lozinke.</p>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email adresa" required className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
        <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? "Slanje..." : "Pošalji link"}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          <Link to="/prijava" className="text-primary hover:underline">Nazad na prijavu</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
