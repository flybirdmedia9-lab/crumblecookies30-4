import { useState } from "react";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, ChevronDown } from "lucide-react";
import type { Order } from "@/types";

const ALL_STATUSES: Order["orderStatus"][] = [
  "Pending", "Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Refunded"
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "text-green-600 bg-green-50",
  Shipped: "text-blue-600 bg-blue-50",
  "Out for Delivery": "text-blue-600 bg-blue-50",
  Pending: "text-orange-500 bg-orange-50",
  Cancelled: "text-destructive bg-destructive/10",
  Confirmed: "text-primary bg-secondary",
  Processing: "text-primary bg-secondary",
  Packed: "text-primary bg-secondary",
  Refunded: "text-destructive bg-destructive/10",
};

const AdminOrders = () => {
  const { orders, updateOrderStatus, updatePaymentStatus, updateTracking } = useOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["orderStatus"] | "All">("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [trackId, setTrackId] = useState("");
  const [partner, setPartner] = useState("");

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchQ = !q || o.id.toLowerCase().includes(q) || o.address.name.toLowerCase().includes(q);
    const matchS = statusFilter === "All" || o.orderStatus === statusFilter;
    return matchQ && matchS;
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-primary">Orders</h1>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ID or name…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-full h-10" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Order["orderStatus"] | "All")} className="rounded-full border border-border bg-background px-4 py-2 text-sm h-10 focus:outline-none">
          <option value="All">All Statuses</option>
          {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="rounded-2xl bg-card shadow-soft border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                {["Order ID", "Customer", "Date", "Items", "Total", "Payment", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((o) => (
                <>
                  <tr key={o.id} className="hover:bg-secondary/20">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">{o.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-primary">{o.address.name}</p>
                      <p className="text-xs text-muted-foreground">{o.address.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.items.length}</td>
                    <td className="px-4 py-3 font-price font-semibold text-primary">₹{o.total}</td>
                    <td className="px-4 py-3">
                      <p className="text-primary">{o.paymentMethod}</p>
                      <p className={cn("text-xs font-medium", o.paymentStatus === "Paid" ? "text-green-600" : o.paymentStatus === "Failed" ? "text-destructive" : "text-orange-500")}>{o.paymentStatus}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_COLORS[o.orderStatus] ?? "bg-secondary text-primary")}>{o.orderStatus}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setExpanded(expanded === o.id ? null : o.id)} className="flex items-center gap-1 text-xs text-accent hover:underline">
                        Manage <ChevronDown className={cn("h-3.5 w-3.5 transition-smooth", expanded === o.id && "rotate-180")} />
                      </button>
                    </td>
                  </tr>
                  {expanded === o.id && (
                    <tr key={`${o.id}-exp`}>
                      <td colSpan={8} className="bg-secondary/20 px-6 py-5">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Update Order Status</p>
                            <div className="flex flex-wrap gap-2">
                              {ALL_STATUSES.map((s) => (
                                <button
                                  key={s}
                                  onClick={() => updateOrderStatus(o.id, s)}
                                  className={cn("rounded-full px-3 py-1 text-xs font-medium border transition-smooth", o.orderStatus === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary")}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4">Update Payment Status</p>
                            <div className="flex gap-2">
                              {(["Pending", "Paid", "Failed", "Refunded"] as Order["paymentStatus"][]).map((s) => (
                                <button
                                  key={s}
                                  onClick={() => updatePaymentStatus(o.id, s)}
                                  className={cn("rounded-full px-3 py-1 text-xs font-medium border transition-smooth", o.paymentStatus === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary")}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tracking</p>
                            <Input placeholder="Tracking ID" value={trackId} onChange={(e) => setTrackId(e.target.value)} className="rounded-xl h-9 text-sm" defaultValue={o.trackingId} />
                            <Input placeholder="Shipping Partner (e.g. DTDC)" value={partner} onChange={(e) => setPartner(e.target.value)} className="rounded-xl h-9 text-sm" defaultValue={o.shippingPartner} />
                            <Button onClick={() => { updateTracking(o.id, trackId, partner); }} size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">
                              Save Tracking
                            </Button>

                            <div className="mt-2 text-xs text-muted-foreground space-y-1">
                              <p><strong className="text-primary">Address:</strong> {o.address.line1}, {o.address.city}, {o.address.state} — {o.address.pin}</p>
                              {o.couponCode && <p><strong className="text-primary">Coupon:</strong> {o.couponCode} (−₹{o.discount})</p>}
                              {o.upiTransactionId && <p><strong className="text-primary">UPI Txn:</strong> {o.upiTransactionId}</p>}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm">No orders found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
