import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ShoppingBag, CreditCard, Smartphone, Banknote, Copy, CheckCircle2 } from "lucide-react";
import type { Address, PaymentMethod, OrderItem } from "@/types";

const STEPS = ["Address", "Payment", "Review"] as const;
type Step = typeof STEPS[number];

const Checkout = () => {
  const { items, subtotal, discount, shippingCharge, total, appliedCoupon, count, clear } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("Address");
  const [payment, setPayment] = useState<PaymentMethod>("COD");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);

  const [addr, setAddr] = useState<Omit<Address, "id" | "userId" | "isDefault">>({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pin: "",
  });

  const setA = (k: keyof typeof addr) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddr((a) => ({ ...a, [k]: e.target.value }));

  if (count === 0) {
    return (
      <main className="container py-24 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-6 font-display text-3xl text-primary">Your bag is empty</h1>
        <Button asChild className="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-brown-deep">
          <Link to="/products">Shop Now</Link>
        </Button>
      </main>
    );
  }

  const validateAddress = () => {
    if (!addr.name || !addr.phone || !addr.line1 || !addr.city || !addr.state || !addr.pin) {
      toast.error("Please fill in all address fields");
      return false;
    }
    if (!/^\d{10}$/.test(addr.phone)) { toast.error("Enter a valid 10-digit phone number"); return false; }
    if (!/^\d{6}$/.test(addr.pin)) { toast.error("Enter a valid 6-digit PIN code"); return false; }
    return true;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const fullAddress: Address = { ...addr, id: `addr-${Date.now()}`, userId: user?.id ?? "guest", isDefault: false };
    const orderItems: OrderItem[] = items.map((i) => ({ product: i.product, quantity: i.quantity, price: i.product.price * i.quantity }));
    const order = placeOrder({
      items: orderItems,
      address: fullAddress,
      paymentMethod: payment,
      subtotal,
      shippingCharge,
      discount,
      total,
      couponCode: appliedCoupon?.code,
      userId: user?.id ?? "guest",
      upiTransactionId: payment === "UPI" ? upiId : undefined,
    });
    clear();
    setLoading(false);
    toast.success("Order placed successfully!");
    navigate("/order-confirmation", { state: { order } });
  };

  const stepIndex = STEPS.indexOf(step);

  return (
    <main className="container py-10 md:py-14">
      <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">Checkout</h1>

      {/* Step indicator */}
      <div className="mt-6 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < stepIndex && setStep(s)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-smooth ${i <= stepIndex ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"} ${i < stepIndex ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
            >
              {i < stepIndex ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </button>
            <span className={`text-sm font-medium ${i === stepIndex ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`h-px w-8 ${i < stepIndex ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          {/* STEP 1: Address */}
          {step === "Address" && (
            <section className="rounded-2xl bg-card p-6 shadow-soft md:p-8">
              <h2 className="font-display text-2xl font-semibold text-primary mb-6">Delivery Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" value={addr.name} onChange={setA("name")} className="rounded-xl h-11" required />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="10-digit mobile" value={addr.phone} onChange={setA("phone")} className="rounded-xl h-11" maxLength={10} required />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label>Address Line 1</Label>
                  <Input placeholder="House/Flat no., Street" value={addr.line1} onChange={setA("line1")} className="rounded-xl h-11" required />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label>Address Line 2 <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input placeholder="Area, Landmark" value={addr.line2 ?? ""} onChange={setA("line2")} className="rounded-xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input placeholder="City" value={addr.city} onChange={setA("city")} className="rounded-xl h-11" required />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input placeholder="State" value={addr.state} onChange={setA("state")} className="rounded-xl h-11" required />
                </div>
                <div className="space-y-2">
                  <Label>PIN Code</Label>
                  <Input placeholder="6-digit PIN" value={addr.pin} onChange={setA("pin")} className="rounded-xl h-11" maxLength={6} required />
                </div>
              </div>
              <Button onClick={() => { if (validateAddress()) setStep("Payment"); }} size="lg" className="mt-6 rounded-full bg-primary text-primary-foreground shadow-warm hover:bg-brown-deep w-full sm:w-auto">
                Continue to Payment →
              </Button>
            </section>
          )}

          {/* STEP 2: Payment */}
          {step === "Payment" && (
            <section className="rounded-2xl bg-card p-6 shadow-soft md:p-8">
              <h2 className="font-display text-2xl font-semibold text-primary mb-6">Payment Method</h2>
              <RadioGroup value={payment} onValueChange={(v) => setPayment(v as PaymentMethod)} className="space-y-3">
                {[
                  { v: "COD" as PaymentMethod, label: "Cash on Delivery", desc: "Pay when you receive your order", icon: Banknote },
                  { v: "UPI" as PaymentMethod, label: "UPI", desc: "GPay, PhonePe, Paytm, any UPI app", icon: Smartphone },
                ].map(({ v, label, desc, icon: Icon }) => (
                  <Label
                    key={v}
                    htmlFor={v}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-smooth ${payment === v ? "border-accent bg-accent/5" : "border-border hover:bg-secondary/50"}`}
                  >
                    <RadioGroupItem id={v} value={v} />
                    <Icon className="h-5 w-5 text-accent shrink-0" />
                    <div>
                      <p className="font-medium text-primary">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>

              {payment === "UPI" && (
                <div className="mt-6 rounded-2xl bg-secondary/40 p-5 space-y-4">
                  <p className="text-sm font-semibold text-primary">UPI Payment Instructions</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Pay to UPI ID:</span>
                    <code className="rounded bg-secondary px-2 py-0.5 text-primary font-mono">crumbel@upi</code>
                    <button onClick={() => { navigator.clipboard.writeText("crumbel@upi"); toast.success("Copied!"); }} className="text-muted-foreground hover:text-accent">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="rounded-xl bg-background p-3 text-center text-xs text-muted-foreground">
                    QR code placeholder — scan with any UPI app
                  </div>
                  <div className="space-y-2">
                    <Label>Your UPI Transaction ID <span className="text-muted-foreground">(optional)</span></Label>
                    <Input placeholder="12-digit transaction ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="rounded-xl h-11" />
                    <p className="text-xs text-muted-foreground">Payment will be verified by our team. Status shown as Pending until confirmed.</p>
                  </div>
                </div>
              )}

              {payment === "COD" && (
                <div className="mt-4 rounded-xl bg-secondary/40 p-4 text-sm text-muted-foreground">
                  💰 Extra ₹20 COD handling fee may apply for orders under ₹500.
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <Button onClick={() => setStep("Address")} variant="outline" className="rounded-full">← Back</Button>
                <Button onClick={() => setStep("Review")} size="lg" className="rounded-full bg-primary text-primary-foreground shadow-warm hover:bg-brown-deep">
                  Review Order →
                </Button>
              </div>
            </section>
          )}

          {/* STEP 3: Review */}
          {step === "Review" && (
            <section className="rounded-2xl bg-card p-6 shadow-soft md:p-8 space-y-6">
              <h2 className="font-display text-2xl font-semibold text-primary">Review & Place Order</h2>

              <div className="rounded-xl bg-secondary/40 p-4 space-y-1 text-sm">
                <p className="font-semibold text-primary mb-2">Delivery Address</p>
                <p>{addr.name} · {addr.phone}</p>
                <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                <p>{addr.city}, {addr.state} — {addr.pin}</p>
              </div>

              <div className="rounded-xl bg-secondary/40 p-4 text-sm">
                <p className="font-semibold text-primary mb-2">Payment</p>
                <p>{payment === "UPI" ? `UPI${upiId ? ` · Txn: ${upiId}` : ""}` : "Cash on Delivery"}</p>
              </div>

              <Button onClick={handlePlaceOrder} disabled={loading} size="lg" className="w-full rounded-full bg-primary text-primary-foreground shadow-warm hover:bg-brown-deep py-6 text-base font-semibold">
                {loading ? "Placing Order…" : "Place Order"}
              </Button>
              <Button onClick={() => setStep("Payment")} variant="ghost" className="w-full rounded-full">← Back to Payment</Button>
            </section>
          )}
        </div>

        {/* Order summary sidebar */}
        <aside className="h-fit rounded-2xl bg-secondary/50 p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-primary mb-5">Order</h2>
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 text-sm">
                <img src={product.image} alt={product.name} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-primary truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {quantity}</p>
                </div>
                <p className="font-price font-semibold text-primary shrink-0">₹{product.price * quantity}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="font-price">₹{subtotal}</span></div>
            {discount > 0 && <div className="flex justify-between text-accent"><span>Discount</span><span className="font-price">−₹{discount}</span></div>}
            <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span className="font-price">{shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}</span></div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-primary">Total</span>
            <span className="font-price text-2xl font-semibold text-primary">₹{total}</span>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
