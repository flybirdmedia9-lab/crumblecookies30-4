import { useState } from "react";
import { getItem, setItem, KEYS } from "@/lib/storage";
import { mockReviews } from "@/data/mockData";
import type { Review } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, CheckCircle, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(() => getItem<Review[]>(KEYS.REVIEWS, mockReviews));
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sync = (next: Review[]) => { setReviews(next); setItem(KEYS.REVIEWS, next); };

  const approve = (id: string) => {
    sync(reviews.map((r) => r.id === id ? { ...r, isApproved: true } : r));
    toast.success("Review approved");
  };

  const remove = (id: string) => {
    sync(reviews.filter((r) => r.id !== id));
    setDeleteId(null);
    toast.success("Review deleted");
  };

  const filtered = reviews.filter((r) => filter === "all" || (filter === "approved" ? r.isApproved : !r.isApproved));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-primary">Reviews</h1>

      <div className="flex gap-2">
        {(["all", "approved", "pending"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("rounded-full px-4 py-2 text-sm font-medium capitalize transition-smooth", filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/70")}>
            {f}
          </button>
        ))}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="rounded-2xl bg-card p-6 shadow-elegant max-w-sm w-full">
            <h3 className="font-display text-xl font-semibold text-primary">Delete review?</h3>
            <div className="mt-5 flex gap-3">
              <Button onClick={() => remove(deleteId)} className="rounded-full bg-destructive text-destructive-foreground">Delete</Button>
              <Button onClick={() => setDeleteId(null)} variant="outline" className="rounded-full">Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filtered.length === 0 && <div className="py-12 text-center text-sm text-muted-foreground">No reviews</div>}
        {filtered.map((r) => (
          <div key={r.id} className="rounded-2xl bg-card border border-border/40 shadow-soft p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-semibold text-primary">{r.userName}</p>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => <Star key={i} className={cn("h-3.5 w-3.5", i <= r.rating ? "text-accent" : "text-muted-foreground/30")} fill="currentColor" />)}
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", r.isApproved ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-500")}>
                    {r.isApproved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Product ID: {r.productId} · {new Date(r.createdAt).toLocaleDateString("en-IN")}</p>
                <p className="mt-3 text-sm text-foreground/80 italic">"{r.text}"</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {!r.isApproved && (
                  <button onClick={() => approve(r.id)} className="text-green-600 hover:text-green-700" title="Approve">
                    <CheckCircle className="h-5 w-5" />
                  </button>
                )}
                <button onClick={() => setDeleteId(r.id)} className="text-muted-foreground hover:text-destructive" title="Delete">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
