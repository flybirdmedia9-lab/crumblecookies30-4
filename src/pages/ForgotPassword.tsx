import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Enter your email"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent!");
  };

  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-card p-8 shadow-elegant border border-border/40 md:p-10">
          {sent ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-14 w-14 text-accent" />
              <h2 className="mt-4 font-display text-3xl text-primary">Check your email</h2>
              <p className="mt-3 text-sm text-muted-foreground">We've sent a reset link to <strong>{email}</strong></p>
              <Link to="/login" className="mt-6 inline-block text-sm text-accent hover:underline">Back to Sign In</Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="font-display text-4xl font-semibold text-primary">Forgot password?</h1>
                <p className="mt-2 text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl h-11" required />
                </div>
                <Button type="submit" className="w-full rounded-full bg-primary h-11 text-primary-foreground shadow-warm hover:bg-brown-deep" disabled={loading}>
                  {loading ? "Sending…" : "Send Reset Link"}
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                <Link to="/login" className="text-accent hover:underline">Back to Sign In</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
