const Refund = () => (
  <main className="container py-16 md:py-20">
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Policy</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-primary md:text-5xl">Refund Policy</h1>
      <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
        <p>Since our products are freshly baked and perishable, we do not accept returns. However, we take quality very seriously.</p>
        <p><strong className="text-primary">Damaged or incorrect orders:</strong> If your order arrives damaged or incorrect, please contact us within 24 hours of delivery with a photo at crumblefoods@gmail.com or +91 94931 15421. We will replace the product or issue a full refund.</p>
        <p><strong className="text-primary">Cancellations:</strong> Orders can be cancelled within 2 hours of placement. Once we begin baking, cancellations are not possible.</p>
        <p><strong className="text-primary">Refund processing:</strong> Approved refunds are processed within 5–7 business days to the original payment method.</p>
      </div>
    </div>
  </main>
);

export default Refund;
