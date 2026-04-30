import type { Product } from "@/data/products";

export const WHATSAPP_PHONE = "919100822844";

export function getProductWhatsAppUrl(product: Product, quantity = 1) {
  const quantityText = quantity > 1 ? `${quantity} packs of ` : "";
  const message = `Hi Crumbel! I'd like to order ${quantityText}${product.name} (${product.weight}) for Rs. ${product.price}.`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl() {
  const message = "Hi Crumbel! I'd like to place an order.";

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
