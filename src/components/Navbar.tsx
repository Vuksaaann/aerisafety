import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/AerisafetyLogo.png";

const navLinks = [
  { to: "/", label: "Početna" },
  { to: "/mapa", label: "Mapa" },
  { to: "/gradjani-reporteri", label: "Građani Reporteri" },
  { to: "/senzori", label: "Senzori" },
  { to: "/kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = profile
    ? `${(profile.first_name?.[0] || "").toUpperCase()}${(profile.last_name?.[0] || "").toUpperCase()}`
    : user?.email?.[0]?.toUpperCase() || "?";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide" style={{ color: "#FFFFFF" }}>
          <img src={logo} alt="Aerisafety logo" className="h-9 w-9 rounded-full" />
          Aerisafety
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-semibold transition-colors pb-1 ${
                pathname === l.to
                  ? "text-nav-hover border-b-2 border-nav-hover"
                  : "text-nav hover:text-nav-hover"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {initials}
              </div>
              <button onClick={handleSignOut} className="text-nav hover:text-nav-hover transition-colors" title="Odjava">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/prijava" className="px-4 py-1.5 text-sm font-semibold border border-nav rounded-lg text-nav hover:text-nav-hover hover:border-nav-hover transition-colors">
                Prijava
              </Link>
              <Link to="/registracija" className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Registracija
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-nav" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-border px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-semibold border-b border-border ${
                pathname === l.to ? "text-nav-hover" : "text-nav"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            {user ? (
              <button onClick={handleSignOut} className="flex-1 text-center px-4 py-2 text-sm font-semibold border border-nav rounded-lg text-nav">
                Odjava
              </button>
            ) : (
              <>
                <Link to="/prijava" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 text-sm font-semibold border border-nav rounded-lg text-nav">
                  Prijava
                </Link>
                <Link to="/registracija" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground">
                  Registracija
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
