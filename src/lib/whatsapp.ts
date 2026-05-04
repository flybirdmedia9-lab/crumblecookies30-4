import type { Product } from "@/types";
import type { CartItem } from "@/context/CartContext";

export const WHATSAPP_PHONE = "919493115421";


export function getProductWhatsAppUrl(product: Product, quantity = 1) {
  const quantityText = quantity > 1 ? `${quantity} packs of ` : "";
  const message = `Hi Crumbel! I'd like to order ${quantityText}${product.name} (${product.weight}) for Rs. ${product.price}.`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getCartWhatsAppUrl(items: CartItem[], total: number) {
  const itemsText = items.map(item => `- ${item.quantity} x ${item.product.name} (${item.product.weight})`).join('\n');
  const message = `Hi Crumbel! I'd like to place an order for:\n\n${itemsText}\n\nTotal: Rs. ${total}\n\nPlease guide me with the next steps.`;
  
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl() {
  const message = "Hi Crumbel! I'd like to place an order.";

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

