import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

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

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-2xl font-bold text-primary-foreground tracking-wide" style={{ color: "#FFFFFF" }}>
          Aerisafety
        </Link>

        {/* Desktop links */}
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
          <Link
            to="/prijava"
            className="px-4 py-1.5 text-sm font-semibold border border-nav rounded-lg text-nav hover:text-nav-hover hover:border-nav-hover transition-colors"
          >
            Prijava
          </Link>
          <Link
            to="/registracija"
            className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Registracija
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-nav" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
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
            <Link to="/prijava" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 text-sm font-semibold border border-nav rounded-lg text-nav">
              Prijava
            </Link>
            <Link to="/registracija" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground">
              Registracija
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
