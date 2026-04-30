import { useState } from "react";
import { products as initialProducts } from "@/data/products";
import type { Product } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminInventory = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [adjusting, setAdjusting] = useState<string | null>(null);
  const [delta, setDelta] = useState("");

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStock = products.filter((p) => p.stock === 0);

  const applyAdjust = (id: string) => {
    const d = parseInt(delta);
    if (isNaN(d)) { toast.error("Invalid amount"); return; }
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, stock: Math.max(0, p.stock + d) } : p));
    toast.success("Stock updated");
    setAdjusting(null);
    setDelta("");
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-primary">Inventory</h1>

      {/* Alerts */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <p className="font-semibold text-orange-700">Low Stock ({lowStock.length})</p>
          </div>
          {lowStock.length === 0 ? <p className="text-sm text-orange-600">All good!</p> : lowStock.map((p) => (
            <p key={p.id} className="text-sm text-orange-600">{p.name} — <strong>{p.stock} left</strong></p>
          ))}
        </div>
        <div className="rounded-2xl bg-destructive/5 border border-destructive/10 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-destructive" />
            <p className="font-semibold text-destructive">Out of Stock ({outOfStock.length})</p>
          </div>
          {outOfStock.length === 0 ? <p className="text-sm text-destructive/70">None!</p> : outOfStock.map((p) => (
            <p key={p.id} className="text-sm text-destructive/70">{p.name}</p>
          ))}
        </div>
      </div>

      {/* Full table */}
      <div className="rounded-2xl bg-card shadow-soft border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                {["Product", "SKU", "Category", "Stock", "Status", "Adjust"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-secondary/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image as string} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-medium text-primary">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">
                    <span className={cn("font-price text-lg font-bold", p.stock === 0 ? "text-destructive" : p.stock <= 5 ? "text-orange-500" : "text-green-600")}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium",
                      p.stock === 0 ? "bg-destructive/10 text-destructive" :
                      p.stock <= 5 ? "bg-orange-50 text-orange-500" :
                      "bg-green-50 text-green-600"
                    )}>
                      {p.stock === 0 ? "Out of Stock" : p.stock <= 5 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {adjusting === p.id ? (
                      <div className="flex items-center gap-2">
                        <Input placeholder="+5 or -3" value={delta} onChange={(e) => setDelta(e.target.value)} className="rounded-xl h-8 w-24 text-sm" />
                        <Button onClick={() => applyAdjust(p.id)} size="sm" className="rounded-full h-8 bg-primary text-primary-foreground text-xs hover:bg-brown-deep">Apply</Button>
                        <button onClick={() => setAdjusting(null)} className="text-xs text-muted-foreground hover:text-foreground">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => { setAdjusting(p.id); setDelta(""); }} className="text-xs text-accent hover:underline">Adjust stock</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
