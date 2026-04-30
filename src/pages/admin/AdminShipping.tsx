import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Truck } from "lucide-react";

const AdminShipping = () => {
  const [config, setConfig] = useState({ flatCharge: 60, freeThreshold: 599, estimatedDays: "3–5" });
  const [partners, setPartners] = useState(["DTDC", "Delhivery", "Bluedart", "India Post"]);
  const [newPartner, setNewPartner] = useState("");

  const save = () => toast.success("Shipping settings saved");

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="font-display text-3xl font-semibold text-primary">Shipping & Logistics</h1>

      {/* Charges */}
      <div className="rounded-2xl bg-card border border-border/40 shadow-soft p-6 space-y-5">
        <h2 className="font-display text-xl font-semibold text-primary">Delivery Charges</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Flat Shipping Charge (₹)</Label>
            <Input type="number" value={config.flatCharge} onChange={(e) => setConfig((c) => ({ ...c, flatCharge: Number(e.target.value) }))} className="rounded-xl h-11" />
          </div>
          <div className="space-y-2">
            <Label>Free Shipping Threshold (₹)</Label>
            <Input type="number" value={config.freeThreshold} onChange={(e) => setConfig((c) => ({ ...c, freeThreshold: Number(e.target.value) }))} className="rounded-xl h-11" />
          </div>
          <div className="space-y-2">
            <Label>Estimated Delivery (days)</Label>
            <Input value={config.estimatedDays} onChange={(e) => setConfig((c) => ({ ...c, estimatedDays: e.target.value }))} className="rounded-xl h-11" />
          </div>
        </div>
        <Button onClick={save} className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">Save Changes</Button>
      </div>

      {/* Partners */}
      <div className="rounded-2xl bg-card border border-border/40 shadow-soft p-6 space-y-4">
        <h2 className="font-display text-xl font-semibold text-primary">Shipping Partners</h2>
        <div className="flex flex-wrap gap-2">
          {partners.map((p) => (
            <div key={p} className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
              <Truck className="h-3.5 w-3.5 text-accent" />
              <span className="text-sm font-medium text-primary">{p}</span>
              <button onClick={() => setPartners((prev) => prev.filter((x) => x !== p))} className="text-muted-foreground hover:text-destructive text-xs ml-1">×</button>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Input placeholder="New partner name" value={newPartner} onChange={(e) => setNewPartner(e.target.value)} className="rounded-full h-10 max-w-xs" />
          <Button onClick={() => { if (newPartner.trim()) { setPartners((p) => [...p, newPartner.trim()]); setNewPartner(""); } }} variant="outline" className="rounded-full h-10">Add</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminShipping;
