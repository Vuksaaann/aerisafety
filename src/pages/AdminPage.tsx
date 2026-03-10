import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { MapPin, Calendar, CheckCircle, XCircle, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">("pending");

  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    },
    enabled: !!user,
  });

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["admin-reports", filter],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("citizen_reports")
        .select("*, profiles(first_name, last_name)")
        .eq("status", filter)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin === true,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("citizen_reports")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
    },
  });

  if (authLoading || roleLoading) {
    return <div className="container mx-auto px-4 py-12 text-muted-foreground">Učitavanje...</div>;
  }

  if (!user || isAdmin === false) {
    return <Navigate to="/" replace />;
  }

  const statusConfig = {
    pending: { icon: Clock, color: "bg-yellow-500/20 text-yellow-400", label: "Na čekanju" },
    approved: { icon: CheckCircle, color: "bg-green-500/20 text-green-400", label: "Odobreno" },
    rejected: { icon: XCircle, color: "bg-red-500/20 text-red-400", label: "Odbijeno" },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <Shield className="text-primary" size={28} />
        <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
      </div>
      <p className="text-muted-foreground mb-8">Moderacija prijava građana</p>

      <div className="flex gap-2 mb-8">
        {(["pending", "approved", "rejected"] as const).map((s) => {
          const cfg = statusConfig[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Učitavanje...</p>
      ) : reports.length === 0 ? (
        <p className="text-muted-foreground">Nema prijava sa statusom "{statusConfig[filter].label}".</p>
      ) : (
        <div className="space-y-4">
          {reports.map((r: any) => {
            const prof = r.profiles;
            const name = prof ? `${prof.first_name || ""} ${prof.last_name || ""}`.trim() : "Korisnik";
            return (
              <div key={r.id} className="bg-card border border-border rounded-lg p-5 flex gap-5">
                {r.image_url && (
                  <img src={r.image_url} alt={r.title} className="w-32 h-24 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-bold text-foreground">{r.title}</h3>
                    <Badge className={statusConfig[filter].color}>{statusConfig[filter].label}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><MapPin size={12} />{r.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{format(new Date(r.created_at), "dd.MM.yyyy HH:mm")}</span>
                    <span>Autor: {name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{r.description}</p>
                  {filter === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus.mutate({ id: r.id, status: "approved" })}
                        disabled={updateStatus.isPending}
                        className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle size={14} /> Odobri
                      </button>
                      <button
                        onClick={() => updateStatus.mutate({ id: r.id, status: "rejected" })}
                        disabled={updateStatus.isPending}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        <XCircle size={14} /> Odbij
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
