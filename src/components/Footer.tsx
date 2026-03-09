import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border mt-16">
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-xl font-bold text-foreground mb-2" style={{ color: "#FFF" }}>Aerisafety</h3>
        <p className="text-muted-foreground text-sm">Čist vazduh za sve</p>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-3 text-sm" style={{ color: "#FFF" }}>Brzi linkovi</h4>
        <div className="flex flex-col gap-2">
          {["Početna", "Mapa", "Građani Reporteri", "Senzori", "Kontakt"].map((label, i) => (
            <Link
              key={label}
              to={["/", "/mapa", "/gradjani-reporteri", "/senzori", "/kontakt"][i]}
              className="text-sm text-muted-foreground hover:text-nav-hover transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-3 text-sm" style={{ color: "#FFF" }}>Pratite nas</h4>
        <div className="flex gap-4">
          <a href="#" className="text-muted-foreground hover:text-nav-hover transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-muted-foreground hover:text-nav-hover transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-muted-foreground hover:text-nav-hover transition-colors"><Facebook size={20} /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
      © 2026 Aerisafety. Sva prava zadržana.. Sva prava zadržana.
    </div>
  </footer>
);

export default Footer;
