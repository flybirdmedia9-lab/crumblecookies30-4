import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("upi");
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal >= 599 ? 0 : 60;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    toast.success("Order placed! We'll be in touch shortly.");
    setTimeout(() => clear(), 2000);
  };

  if (count === 0 && !placed) {
    return (
      <main className="container py-24 text-center">
        <h1 className="font-display text-3xl text-primary">Your cart is empty</h1>
        <Button onClick={() => navigate("/products")} className="mt-6">Shop now</Button>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="container py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
        <h1 className="mt-6 font-display text-4xl text-primary md:text-5xl">Thank you!</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Your order has been placed successfully. We'll send a confirmation on WhatsApp shortly.
        </p>
        <Button onClick={() => navigate("/")} className="mt-8 rounded-full bg-primary px-8 text-primary-foreground hover:bg-brown-deep">
          Back to home
        </Button>
      </main>
    );
  }

  return (
    <main className="container py-12 md:py-16">
      <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="rounded-2xl bg-card p-6 shadow-soft md:p-8">
            <h2 className="font-display text-2xl font-semibold text-primary">Contact</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required className="mt-2" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="mt-2" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-card p-6 shadow-soft md:p-8">
            <h2 className="font-display text-2xl font-semibold text-primary">Delivery address</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" required className="mt-2" rows={2} />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" required className="mt-2" />
              </div>
              <div>
                <Label htmlFor="pin">PIN code</Label>
                <Input id="pin" required className="mt-2" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-card p-6 shadow-soft md:p-8">
            <h2 className="font-display text-2xl font-semibold text-primary">Payment</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="mt-5 space-y-3">
              {[
                { v: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm" },
                { v: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, Rupay" },
                { v: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
              ].map((p) => (
                <Label
                  key={p.v}
                  htmlFor={p.v}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-smooth ${
                    payment === p.v ? "border-accent bg-accent/5" : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <RadioGroupItem id={p.v} value={p.v} />
                  <div>
                    <p className="font-medium text-primary">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-secondary/50 p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-primary">Order</h2>
          <div className="mt-5 space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 text-sm">
                <img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-primary">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {quantity}</p>
                </div>
                <p className="font-medium">₹{product.price * quantity}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
            <span className="font-display text-lg text-primary">Total</span>
            <span className="font-display text-2xl font-semibold text-primary">₹{total}</span>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">
            Place order
          </Button>
        </aside>
      </form>
    </main>
  );
};

export default Checkout;
