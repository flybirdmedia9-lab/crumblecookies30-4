import { useState } from "react";
import { getItem, setItem, KEYS } from "@/lib/storage";
import { mockCoupons } from "@/data/mockData";
import type { Coupon } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const blank: Omit<Coupon, "id" | "usedCount"> = {
  code: "", type: "percentage", value: 10, minOrderValue: 0,
  expiryDate: "", usageLimit: 100, isActive: true,
};

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => getItem<Coupon[]>(KEYS.COUPONS, mockCoupons));
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState<Omit<Coupon, "id" | "usedCount">>(blank);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sync = (next: Coupon[]) => { setCoupons(next); setItem(KEYS.COUPONS, next); };

  const openAdd = () => { setEditing(null); setForm(blank); setShowForm(true); };
  const openEdit = (c: Coupon) => { setEditing(c); setForm({ ...c }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: k === "value" || k === "minOrderValue" || k === "usageLimit" ? Number(e.target.value) : k === "isActive" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const handleSave = () => {
    if (!form.code || !form.expiryDate) { toast.error("Code and expiry date required"); return; }
    if (editing) {
      sync(coupons.map((c) => c.id === editing.id ? { ...form, id: editing.id, usedCount: editing.usedCount } : c));
      toast.success("Coupon updated");
    } else {
      sync([{ ...form, id: `cpn-${Date.now()}`, usedCount: 0 }, ...coupons]);
      toast.success("Coupon created");
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    sync(coupons.filter((c) => c.id !== id));
    setDeleteId(null);
    toast.success("Coupon deleted");
  };

  const toggleActive = (id: string) => {
    sync(coupons.map((c) => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="font-display text-3xl font-semibold text-primary">Coupons</h1>
        <Button onClick={openAdd} className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep gap-2">
          <Plus className="h-4 w-4" /> Add Coupon
        </Button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-card shadow-elegant p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-primary">{editing ? "Edit Coupon" : "New Coupon"}</h2>
              <button onClick={closeForm}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Coupon Code</Label><Input value={form.code} onChange={set("code")} className="rounded-xl h-11 uppercase" placeholder="e.g. SWEET10" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Type</Label><select value={form.type} onChange={set("type")} className="w-full rounded-xl border border-border bg-background px-3 py-2 h-11 text-sm focus:outline-none"><option value="percentage">Percentage (%)</option><option value="fixed">Fixed (₹)</option></select></div>
                <div className="space-y-2"><Label>Value</Label><Input type="number" value={form.value} onChange={set("value")} className="rounded-xl h-11" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Min Order (₹)</Label><Input type="number" value={form.minOrderValue} onChange={set("minOrderValue")} className="rounded-xl h-11" /></div>
                <div className="space-y-2"><Label>Usage Limit</Label><Input type="number" value={form.usageLimit} onChange={set("usageLimit")} className="rounded-xl h-11" /></div>
              </div>
              <div className="space-y-2"><Label>Expiry Date</Label><Input type="date" value={form.expiryDate} onChange={set("expiryDate")} className="rounded-xl h-11" /></div>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))} className="rounded" />
                Active
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={handleSave} className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">Save</Button>
              <Button onClick={closeForm} variant="outline" className="rounded-full">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="rounded-2xl bg-card p-6 shadow-elegant max-w-sm w-full">
            <h3 className="font-display text-xl font-semibold text-primary">Delete coupon?</h3>
            <div className="mt-5 flex gap-3">
              <Button onClick={() => handleDelete(deleteId)} className="rounded-full bg-destructive text-destructive-foreground">Delete</Button>
              <Button onClick={() => setDeleteId(null)} variant="outline" className="rounded-full">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-card shadow-soft border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                {["Code", "Type", "Value", "Min Order", "Usage", "Expiry", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-secondary/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-accent" />
                      <span className="font-mono font-semibold text-primary">{c.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground capitalize">{c.type}</td>
                  <td className="px-4 py-3 font-price font-semibold text-primary">{c.type === "percentage" ? `${c.value}%` : `₹${c.value}`}</td>
                  <td className="px-4 py-3 text-muted-foreground">₹{c.minOrderValue}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.usedCount}/{c.usageLimit}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{c.expiryDate}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(c.id)} className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", c.isActive ? "bg-green-50 text-green-600" : "bg-secondary text-muted-foreground")}>
                      {c.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="text-muted-foreground hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteId(c.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {coupons.length === 0 && <div className="py-12 text-center text-sm text-muted-foreground">No coupons yet</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;
