import chocoChip from "@/assets/product-choco-chip.jpg";
import brownie from "@/assets/product-brownie.jpg";
import oatmeal from "@/assets/product-oatmeal.jpg";
import doubleChoco from "@/assets/product-double-choco.jpg";
import combo from "@/assets/product-combo.jpg";
import walnutBrownie from "@/assets/product-walnut-brownie.jpg";

export type Product = {
  id: string;
  name: string;
  category: "Cookies" | "Brownies" | "Combo Packs";
  price: number;
  weight: string;
  image: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  badge?: string;
};

export const products: Product[] = [
  {
    id: "choco-chip-classic",
    name: "Classic Choco Chip Cookies",
    category: "Cookies",
    price: 249,
    weight: "200g · 6 pcs",
    image: chocoChip,
    shortDescription: "Soft, buttery cookies loaded with rich chocolate chips.",
    description:
      "Our signature recipe — soft in the centre, lightly crisp at the edges, and packed with melty chocolate chips in every bite. Baked fresh in small batches with real butter.",
    ingredients: ["Wheat flour", "Butter", "Brown sugar", "Belgian chocolate chips", "Eggs", "Vanilla", "Sea salt"],
    badge: "Bestseller",
  },
  {
    id: "double-chocolate",
    name: "Double Chocolate Cookies",
    category: "Cookies",
    price: 279,
    weight: "200g · 6 pcs",
    image: doubleChoco,
    shortDescription: "Decadent cocoa cookies with melted chocolate chunks.",
    description:
      "A chocolate lover's dream. Rich cocoa dough folded with dark chocolate chunks for an indulgent, fudgy bite.",
    ingredients: ["Wheat flour", "Butter", "Cocoa powder", "Dark chocolate chunks", "Brown sugar", "Eggs", "Vanilla"],
  },
  {
    id: "oatmeal-cookies",
    name: "Oatmeal Wholesome Cookies",
    category: "Cookies",
    price: 229,
    weight: "200g · 6 pcs",
    image: oatmeal,
    shortDescription: "Hearty oats and warm spices, baked golden.",
    description:
      "Wholesome rolled oats, a hint of cinnamon, and brown butter come together in a chewy cookie that feels like a hug.",
    ingredients: ["Wheat flour", "Rolled oats", "Butter", "Brown sugar", "Raisins", "Cinnamon", "Eggs"],
  },
  {
    id: "fudgy-brownie",
    name: "Fudgy Belgian Brownies",
    category: "Brownies",
    price: 319,
    weight: "250g · 4 pcs",
    image: brownie,
    shortDescription: "Dense, fudgy squares with a crackly top.",
    description:
      "Made with Belgian dark chocolate and slow-baked for that signature crackly top and gooey, fudgy centre.",
    ingredients: ["Belgian dark chocolate", "Butter", "Eggs", "Sugar", "Wheat flour", "Cocoa powder"],
    badge: "Premium",
  },
  {
    id: "walnut-brownie",
    name: "Walnut Fudge Brownies",
    category: "Brownies",
    price: 349,
    weight: "250g · 4 pcs",
    image: walnutBrownie,
    shortDescription: "Rich brownies topped with crunchy walnuts.",
    description:
      "Our fudgy brownie base, generously topped with toasted California walnuts for a perfect contrast in every bite.",
    ingredients: ["Belgian dark chocolate", "Butter", "Eggs", "Sugar", "Walnuts", "Wheat flour"],
  },
  {
    id: "combo-box",
    name: "The Crumbel Gift Box",
    category: "Combo Packs",
    price: 699,
    weight: "500g · Mixed",
    image: combo,
    shortDescription: "Assorted cookies + brownies in a beautiful box.",
    description:
      "Our most-loved assortment — a mix of classic choco chip cookies, oatmeal cookies, and fudgy brownies, packed in a kraft gift box with a cream ribbon. The perfect gift.",
    ingredients: ["Assorted cookies", "Assorted brownies", "Premium kraft gift packaging"],
    badge: "Gift Ready",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
