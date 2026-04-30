import { useState } from "react";
import { products as initialProducts } from "@/data/products";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Search, Plus, Edit2, Trash2, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGE_OPTIONS = ["Bestseller", "New Arrival", "Featured", "New Stock", "Limited Stock", "Out of Stock", "Premium", "Gift Ready", ""];

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const blank: Omit<Product, "id"> = {
    name: "", category: "Cookies", price: 0, weight: "", image: "",
    shortDescription: "", description: "", ingredients: [], badge: undefined,
    sku: "", stock: 0, isEnabled: true, rating: 0, reviewCount: 0,
  };
  const [form, setForm] = useState<Omit<Product, "id">>(blank);
  const [ingInput, setIngInput] = useState("");

  const filtered = products.filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.includes(search));

  const openAdd = () => { setEditing(null); setForm(blank); setIngInput(""); setShowForm(true); };
  const openEdit = (p: Product) => { setEditing(p); setForm({ ...p }); setIngInput(p.ingredients.join(", ")); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = () => {
    if (!form.name || !form.price || !form.weight) { toast.error("Name, price and weight are required"); return; }
    const ings = ingInput.split(",").map((s) => s.trim()).filter(Boolean);
    if (editing) {
      setProducts((prev) => prev.map((p) => p.id === editing.id ? { ...form, ingredients: ings, id: editing.id } : p));
      toast.success("Product updated");
    } else {
      const newP: Product = { ...form, ingredients: ings, id: `prod-${Date.now()}` };
      setProducts((prev) => [newP, ...prev]);
      toast.success("Product added");
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    toast.success("Product deleted");
  };

  const toggleEnabled = (id: string) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, isEnabled: !p.isEnabled } : p));
  };

  const set = (k: keyof Omit<Product, "id">) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: k === "price" || k === "stock" || k === "rating" || k === "reviewCount" ? Number(e.target.value) : e.target.value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="font-display text-3xl font-semibold text-primary">Products</h1>
        <Button onClick={openAdd} className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-full h-10" />
      </div>

      {/* Product form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card shadow-elegant p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-primary">{editing ? "Edit Product" : "Add Product"}</h2>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-2"><Label>Product Name</Label><Input value={form.name} onChange={set("name")} className="rounded-xl h-11" placeholder="e.g. Classic Choco Chip" /></div>
              <div className="space-y-2"><Label>Category</Label><select value={form.category} onChange={set("category")} className="w-full rounded-xl border border-border bg-background px-3 py-2 h-11 text-sm focus:outline-none"><option>Cookies</option><option>Brownies</option><option>Combo Packs</option></select></div>
              <div className="space-y-2"><Label>Badge</Label><select value={form.badge ?? ""} onChange={set("badge")} className="w-full rounded-xl border border-border bg-background px-3 py-2 h-11 text-sm focus:outline-none">{BADGE_OPTIONS.map((b) => <option key={b} value={b}>{b || "None"}</option>)}</select></div>
              <div className="space-y-2"><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={set("price")} className="rounded-xl h-11" /></div>
              <div className="space-y-2"><Label>Stock</Label><Input type="number" value={form.stock} onChange={set("stock")} className="rounded-xl h-11" /></div>
              <div className="space-y-2"><Label>Weight</Label><Input value={form.weight} onChange={set("weight")} className="rounded-xl h-11" placeholder="200g · 6 pcs" /></div>
              <div className="space-y-2"><Label>SKU</Label><Input value={form.sku ?? ""} onChange={set("sku")} className="rounded-xl h-11" /></div>
              <div className="sm:col-span-2 space-y-2"><Label>Short Description</Label><Input value={form.shortDescription} onChange={set("shortDescription")} className="rounded-xl h-11" /></div>
              <div className="sm:col-span-2 space-y-2"><Label>Full Description</Label><textarea value={form.description} onChange={set("description")} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-1 focus:ring-primary" /></div>
              <div className="sm:col-span-2 space-y-2"><Label>Ingredients (comma separated)</Label><Input value={ingInput} onChange={(e) => setIngInput(e.target.value)} className="rounded-xl h-11" placeholder="Butter, Flour, Chocolate…" /></div>
              <div className="sm:col-span-2 space-y-2"><Label>Image URL</Label><Input value={form.image as string} onChange={set("image")} className="rounded-xl h-11" placeholder="https://…" /></div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={handleSave} className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">Save Product</Button>
              <Button onClick={closeForm} variant="outline" className="rounded-full">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="rounded-2xl bg-card p-6 shadow-elegant max-w-sm w-full">
            <h3 className="font-display text-xl font-semibold text-primary">Delete product?</h3>
            <p className="mt-2 text-sm text-muted-foreground">This cannot be undone.</p>
            <div className="mt-5 flex gap-3">
              <Button onClick={() => handleDelete(deleteConfirm)} className="rounded-full bg-destructive text-destructive-foreground hover:opacity-90">Delete</Button>
              <Button onClick={() => setDeleteConfirm(null)} variant="outline" className="rounded-full">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-card shadow-soft border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                {["Product", "SKU", "Category", "Price", "Stock", "Badge", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-secondary/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image as string} alt={p.name} className="h-10 w-10 rounded-lg object-cover shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />
                      <span className="font-medium text-primary">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 font-price font-semibold text-primary">₹{p.price}</td>
                  <td className="px-4 py-3">
                    <span className={cn("font-semibold", p.stock <= 5 ? "text-orange-500" : "text-green-600")}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    {p.badge && <span className="rounded-full bg-accent/10 text-accent px-2 py-0.5 text-xs font-medium">{p.badge}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleEnabled(p.id)} className={cn("rounded-full px-3 py-0.5 text-xs font-medium", p.isEnabled ? "bg-green-50 text-green-600" : "bg-secondary text-muted-foreground")}>
                      {p.isEnabled ? "Active" : "Disabled"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="text-muted-foreground hover:text-primary"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-sm text-muted-foreground">No products found</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
