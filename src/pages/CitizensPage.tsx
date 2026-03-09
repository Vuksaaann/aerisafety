import { useState, useEffect, useRef } from "react";
import { Upload, MapPin, Calendar, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const CitizensPage = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["citizen-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("citizen_reports")
        .select("*, profiles!citizen_reports_user_id_fkey(first_name, last_name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const submitReport = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      let imageUrl: string | null = null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("report-images")
          .upload(path, imageFile);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage
          .from("report-images")
          .getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from("citizen_reports").insert({
        user_id: user.id,
        title,
        location,
        description,
        image_url: imageUrl,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Prijava poslata!", description: "Hvala vam na doprinosu." });
      setTitle(""); setLocation(""); setDescription(""); setImageFile(null);
      queryClient.invalidateQueries({ queryKey: ["citizen-reports"] });
    },
    onError: (err: any) => {
      toast({ title: "Greška", description: err.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !description.trim()) {
      toast({ title: "Greška", description: "Sva polja su obavezna.", variant: "destructive" });
      return;
    }
    submitReport.mutate();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#FFF" }}>Građani Reporteri</h1>
      <p className="text-muted-foreground mb-10">Pomozite nam da pratimo zagađenje u vašem gradu</p>

      {user ? (
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 mb-12 max-w-2xl">
          <div className="space-y-4">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Naslov prijave" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Grad / Lokacija" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring" />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Opis situacije" rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring resize-none" />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground cursor-pointer hover:border-nav-hover transition-colors"
            >
              <Upload className="mx-auto mb-2" size={24} />
              <p className="text-sm">{imageFile ? imageFile.name : "Prevucite fotografiju ili kliknite za upload"}</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>
            <button
              type="submit"
              disabled={submitReport.isPending}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitReport.isPending ? "Slanje..." : "Pošalji prijavu"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 mb-12 text-center max-w-2xl">
          <p className="text-muted-foreground text-lg mb-4">Prijavite se da biste postali građanin reporter</p>
          <Link to="/prijava" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Prijavite se
          </Link>
        </div>
      )}

      <h2 className="text-xl font-bold mb-6" style={{ color: "#FFF" }}>Poslednje prijave</h2>
      {isLoading ? (
        <p className="text-muted-foreground">Učitavanje...</p>
      ) : reports.length === 0 ? (
        <p className="text-muted-foreground">Nema prijava za sada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((r: any) => {
            const prof = r.profiles;
            const initials = prof
              ? `${(prof.first_name?.[0] || "").toUpperCase()}${(prof.last_name?.[0] || "").toUpperCase()}`
              : "??";
            const name = prof ? `${prof.first_name || ""} ${prof.last_name || ""}`.trim() : "Korisnik";
            return (
              <div key={r.id} className="bg-card border border-border rounded-lg overflow-hidden">
                {r.image_url && (
                  <img src={r.image_url} alt={r.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-foreground">{r.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><MapPin size={12} />{r.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{format(new Date(r.created_at), "dd.MM.yyyy")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{r.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                      {initials}
                    </div>
                    <span className="text-sm text-muted-foreground">{name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CitizensPage;
