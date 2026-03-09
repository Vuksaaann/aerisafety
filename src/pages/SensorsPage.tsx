import { useState } from "react";
import { Wifi, Smartphone, Wrench, BatteryFull, HeadphonesIcon, Activity, Minus, Plus, X, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  qty: number;
}

const features = [
  { icon: Activity, label: "Merenje u realnom vremenu" },
  { icon: Wifi, label: "WiFi povezivost" },
  { icon: Smartphone, label: "Mobilna aplikacija" },
  { icon: Wrench, label: "Jednostavna instalacija" },
  { icon: BatteryFull, label: "Dugi vek baterije" },
  { icon: HeadphonesIcon, label: "Srpska podrška" },
];

const SensorsPage = () => {
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const price = 4999;

  const addToCart = () => {
    setCart({ qty });
    setDrawerOpen(true);
    toast({ title: "Dodato u korpu!", description: `${qty}x Aerisafety Senzor` });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Product */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div className="bg-card border border-border rounded-lg flex items-center justify-center p-12">
          <Activity size={120} className="text-muted-foreground" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFF" }}>Aerisafety Senzor</h1>
          <p className="text-2xl font-bold text-primary mb-4">{price.toLocaleString("sr-RS")} RSD</p>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Profesionalni senzor za merenje PM2.5, PM10, temperature i vlažnosti vazduha u realnom vremenu.
          </p>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-foreground hover:bg-muted/80">
              <Minus size={16} />
            </button>
            <span className="text-lg font-bold text-foreground w-8 text-center">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-foreground hover:bg-muted/80">
              <Plus size={16} />
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={addToCart} className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Dodaj u korpu
            </button>
            <button onClick={() => { addToCart(); }} className="flex-1 py-3 border border-nav text-nav font-semibold rounded-lg hover:text-nav-hover hover:border-nav-hover transition-colors">
              Kupi odmah
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#FFF" }}>Karakteristike</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {features.map((f) => (
          <div key={f.label} className="bg-card border border-border rounded-lg p-5 text-center">
            <f.icon size={28} className="mx-auto mb-2 text-primary" />
            <p className="text-sm font-semibold text-foreground">{f.label}</p>
          </div>
        ))}
      </div>

      {/* Cart Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/50" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-full max-w-sm bg-card border-l border-border h-full p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShoppingCart size={20} /> Korpa
              </h3>
              <button onClick={() => setDrawerOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            {cart && (
              <>
                <div className="flex-1">
                  <div className="flex justify-between items-center py-4 border-b border-border">
                    <div>
                      <p className="font-semibold text-foreground">Aerisafety Senzor</p>
                      <p className="text-sm text-muted-foreground">Količina: {cart.qty}</p>
                    </div>
                    <p className="font-bold text-foreground">{(price * cart.qty).toLocaleString("sr-RS")} RSD</p>
                  </div>
                  <div className="flex justify-between items-center py-4 font-bold text-lg text-foreground">
                    <span>Ukupno</span>
                    <span>{(price * cart.qty).toLocaleString("sr-RS")} RSD</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  Nastavi na plaćanje
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorsPage;
