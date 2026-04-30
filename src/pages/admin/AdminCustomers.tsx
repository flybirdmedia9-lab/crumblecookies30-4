import { useState } from "react";
import { getItem, setItem, KEYS } from "@/lib/storage";
import { mockUsers } from "@/data/mockData";
import { useOrders } from "@/context/OrderContext";
import type { User } from "@/types";
import { Input } from "@/components/ui/input";
import { Search, ShieldOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AdminCustomers = () => {
  const [users, setUsers] = useState<User[]>(() => getItem<User[]>(KEYS.USERS, mockUsers));
  const [search, setSearch] = useState("");
  const { getUserOrders } = useOrders();

  const filtered = users.filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const toggleBlock = (id: string) => {
    const updated = users.map((u) => u.id === id ? { ...u, isBlocked: !u.isBlocked } : u);
    setUsers(updated);
    setItem(KEYS.USERS, updated);
    const user = updated.find((u) => u.id === id);
    toast.success(user?.isBlocked ? "Customer blocked" : "Customer unblocked");
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-primary">Customers</h1>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search customers…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-full h-10" />
      </div>

      <div className="rounded-2xl bg-card shadow-soft border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                {["Customer", "Phone", "Joined", "Orders", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((u) => {
                const orderCount = getUserOrders(u.id).length;
                return (
                  <tr key={u.id} className="hover:bg-secondary/20">
                    <td className="px-4 py-3">
                      <p className="font-medium text-primary">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.phone || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3 font-semibold text-primary">{orderCount}</td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", u.isBlocked ? "bg-destructive/10 text-destructive" : "bg-green-50 text-green-600")}>
                        {u.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleBlock(u.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-smooth">
                        {u.isBlocked ? <><ShieldCheck className="h-3.5 w-3.5" /> Unblock</> : <><ShieldOff className="h-3.5 w-3.5" /> Block</>}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-sm text-muted-foreground">No customers found</div>}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
