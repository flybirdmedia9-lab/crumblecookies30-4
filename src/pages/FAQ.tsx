import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <main className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-muted-foreground">Find answers to common questions about our bakery and ordering process.</p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-primary">Do you deliver across India?</h3>
          <p className="mt-2 text-muted-foreground">Yes, we deliver our freshly baked cookies and brownies to most cities across India.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">How long do the cookies stay fresh?</h3>
          <p className="mt-2 text-muted-foreground">Our treats are best consumed within 5-7 days of delivery. Keep them in an airtight container for maximum freshness.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Are your products eggless?</h3>
          <p className="mt-2 text-muted-foreground">Please check individual product descriptions for ingredient details. Most of our bestsellers are available in eggless options.</p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Button asChild rounded-full>
          <Link to="/products">Back to Shop</Link>
        </Button>
      </div>
    </main>
  );
};

export default FAQ;
