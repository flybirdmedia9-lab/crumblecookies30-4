import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <main>
      <section className="bg-gradient-warm">
        <div className="container py-20 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Get in touch</p>
          <h1 className="mt-3 font-display text-5xl font-semibold text-primary md:text-6xl">
            We'd love to hear from you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Custom orders, bulk gifting, feedback or a simple hello — we read every message.
          </p>
        </div>
      </section>

      <section className="container grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:py-24">
        <div className="space-y-4">
          {[
            { icon: Phone, title: "Call us", value: "+91 91008 22844", href: "tel:+919100822844" },
            { icon: Phone, title: "Alternate", value: "+91 94931 15421", href: "tel:+919493115421" },
            { icon: Mail, title: "Email", value: "crumblefoods@gmail.com", href: "mailto:crumblefoods@gmail.com" },
            { icon: MessageCircle, title: "WhatsApp", value: "Chat with us", href: "https://wa.me/919100822844" },
            { icon: MapPin, title: "Visit", value: "Kondapur Village, Motakondur Mandal,\nYadadri Dist, Telangana" },
          ].map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-soft transition-smooth hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</p>
                <p className="mt-1 whitespace-pre-line font-medium text-primary">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-card p-6 shadow-soft md:p-8">
          <h2 className="font-display text-3xl font-semibold text-primary">Send a message</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="cname">Name</Label>
              <Input id="cname" required disabled={sent} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="cphone">Phone</Label>
              <Input id="cphone" type="tel" required disabled={sent} className="mt-2" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="cemail">Email</Label>
              <Input id="cemail" type="email" required disabled={sent} className="mt-2" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="cmsg">Message</Label>
              <Textarea id="cmsg" required disabled={sent} className="mt-2" rows={5} />
            </div>
          </div>
          <Button type="submit" size="lg" disabled={sent} className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">
            {sent ? "Message sent ✓" : "Send message"}
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
