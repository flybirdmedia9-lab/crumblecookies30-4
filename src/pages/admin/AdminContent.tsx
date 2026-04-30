import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PAGES = [
  { key: "about", label: "About Page" },
  { key: "faq", label: "FAQ" },
  { key: "shipping", label: "Shipping Policy" },
  { key: "refund", label: "Refund Policy" },
  { key: "privacy", label: "Privacy Policy" },
  { key: "terms", label: "Terms & Conditions" },
];

const AdminContent = () => {
  const [active, setActive] = useState("about");
  const [contents, setContents] = useState<Record<string, string>>(
    Object.fromEntries(PAGES.map((p) => [p.key, ""]))
  );
  const [bannerText, setBannerText] = useState("Use code FIRST50 — Save ₹50 on your first order!");

  const save = () => toast.success("Content saved");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-primary">Content Management</h1>

      {/* Banner */}
      <div className="rounded-2xl bg-card border border-border/40 shadow-soft p-6 space-y-3">
        <h2 className="font-display text-xl font-semibold text-primary">Announcement Banner</h2>
        <div className="space-y-2">
          <Label>Banner Text</Label>
          <Input value={bannerText} onChange={(e) => setBannerText(e.target.value)} className="rounded-xl h-11" />
        </div>
        <Button onClick={save} className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">Save</Button>
      </div>

      {/* Page content */}
      <div className="rounded-2xl bg-card border border-border/40 shadow-soft overflow-hidden">
        <div className="flex overflow-x-auto border-b border-border/60">
          {PAGES.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className={`shrink-0 px-5 py-3 text-sm font-medium transition-smooth border-b-2 ${active === p.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="p-6 space-y-4">
          <Label>{PAGES.find((p) => p.key === active)?.label} Content</Label>
          <textarea
            value={contents[active]}
            onChange={(e) => setContents((c) => ({ ...c, [active]: e.target.value }))}
            placeholder={`Enter ${PAGES.find((p) => p.key === active)?.label} content here…`}
            className="w-full min-h-[300px] rounded-xl border border-border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button onClick={save} className="rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">Save Content</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
