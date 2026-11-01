export type ProductVariant = {
  id: string;
  size?: string;
  color?: string;
  available: boolean;
  stock?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  collections: string[];
  price: number;
  compareAtPrice?: number;
  images: { src: string; alt: string }[];
  tags: string[];
  variants: ProductVariant[];
  optionLabel?: string; // label for the `size` option, e.g. "Size", "Design", "Shoe size"
  available: boolean;
  featured?: boolean;
  newArrival?: boolean;
  rating?: number; // dummy rating until real reviews are connected
  reviewCount?: number;
  details?: string[];
  washcare?: string[];
  shipping?: string[];
};

// Content and images from shop.mastersunion.org
const B = "https://shop.mastersunion.org/cdn/shop/files/";
const im = (path: string, alt: string) => ({ src: B + path, alt });
const SHIP = ["Packed within 24 hours.", "Free delivery on orders above ₹1299.", "Pan-India shipping. Easy exchanges (subject to availability)."];
const sizes = (slug: string, list: string[], stock = 6): ProductVariant[] =>
  list.map((s, i) => ({ id: `${slug}-${i + 1}`, size: s, available: true, stock }));
const single = (slug: string, stock?: number): ProductVariant[] => [{ id: `${slug}-1`, available: true, stock }];
const APPAREL = ["XS", "S", "M", "L", "XL", "2XL"];

export const products: Product[] = [
  {
    id: "mu-001",
    slug: "okami-voyager-pack",
    name: "Okami Voyager Pack",
    description:
      "Built for moving around, getting things done, and doing it in style. This backpack is durable, roomy, and clean-looking aka exactly what long days demand. Style Tip: Pair with hoodies, polos, or layered fits for a sharp, everyday Masters' Union vibe.",
    category: "bags",
    collections: ["all", "bestsellers", "accessories"],
    price: 2499,
    images: [
      im("Okami_bag_in_202604031824_1.jpg?v=1775467008&width=1024", "Okami Voyager backpack on beige"),
      im("Okami_bag_in_202604031824.jpg?v=1776151689&width=1024", "Okami Voyager backpack on dark background"),
      im("Man_wearing_backpack_202604061124.jpg?v=1776069382&width=1024", "Model carrying the Okami Voyager backpack"),
      im("Okami_bag_in_202604031826.jpg?v=1776069382&width=1024", "Close-up of cushioned back padding and straps"),
      im("preview_images/e9c052f3b6114895a6a484a4298bba99.thumbnail.0000000000_1024x1024.jpg?v=1776069370", "Okami Voyager backpack 360 view"),
    ],
    tags: ["backpack", "travel", "bag"],
    variants: single("okami", 5),
    available: true,
    featured: true,
    rating: 4.8,
    reviewCount: 64,
    details: ["Water-resistant polyester", "20–22 litres", "Reinforced construction"],
    washcare: ["Spot clean with a damp cloth", "Do not machine wash", "Keep dry and store in a cool place", "Do not bleach or tumble dry"],
    shipping: SHIP,
  },
  {
    id: "mu-002",
    slug: "on-the-go-sipper",
    name: "On-The-Go Sipper",
    description:
      "No drama. No leaks. Just solid hydration. This 500 ml vacuum-insulated stainless steel sipper is built for days that don't stop and routines that keep changing. Everyday Tip: take a few sips every time you pause. Small breaks add up.",
    category: "drinkware",
    collections: ["all", "bestsellers", "drinkware-1"],
    price: 699,
    images: [
      im("Black_sipper_on_202604031835__1_.jpeg_202604061726.jpg?v=1775476632&width=1024", "On-The-Go Sipper on beige"),
      im("Black_sipper_on_202604031835__1_.jpeg_202604061724_1.jpg?v=1775476632&width=1024", "On-The-Go Sipper on dark background"),
      im("Sipper_Bottle_3.png_202604081133.jpg?v=1776073074&width=896", "Two sippers, one upright and one on its side"),
      im("preview_images/df79c8e08e7d4a86ac6391cf18257296.thumbnail.0000000000_1024x1024.jpg?v=1776073026", "On-The-Go Sipper 360 view"),
    ],
    tags: ["bottle", "sipper", "steel"],
    variants: [{ id: "sipper-1", size: "500 ml", available: true, stock: 20 }],
    optionLabel: "Capacity",
    available: true,
    featured: true,
    rating: 4.7,
    reviewCount: 112,
    details: ["Stainless steel", "500 ml", "Vacuum insulated"],
    washcare: ["Hand wash recommended", "Use mild detergent and a soft sponge", "Do not microwave or freeze", "Dry lid before storage"],
    shipping: SHIP,
  },
  {
    id: "mu-003",
    slug: "classic-campus-cap",
    name: "Classic Campus Cap",
    description:
      "Low effort. High impact. This cap is for days when your outfit needs something but your brain says “keep it simple.” Clean, comfy, and very MU. Style Tip: throw it on with a tee and sneakers or let it balance out an oversized hoodie moment.",
    category: "caps",
    collections: ["all", "bestsellers", "accessories"],
    price: 799,
    images: [
      im("Black_cap_on_202604031727.jpeg_202604061905.jpg?v=1775482635&width=777", "Classic Campus Cap front"),
      im("Black_cap_on_202604031727.jpeg_202604061914.jpg?v=1775483122&width=1024", "Classic Campus Cap side"),
      im("change_the_cap_202604081549.jpg?v=1775643652&width=1200", "Classic Campus Cap styled"),
      im("CAP_1.1.png?v=1775643652&width=1200", "Classic Campus Cap detail"),
    ],
    tags: ["cap", "hat", "banana crepe"],
    variants: single("cap"),
    available: true,
    featured: true,
    rating: 4.6,
    reviewCount: 87,
    details: ["Solid minimal design", "Adjustable free size", "Banana crepe + corduroy"],
    washcare: ["Spot clean with a soft cloth", "Do not machine wash or tumble dry", "Air dry in shade", "Do not bleach"],
    shipping: SHIP,
  },
  {
    id: "mu-004",
    slug: "shadowline-zip-up",
    name: "All Weather Zip-Up",
    description:
      "When the weather can't decide, this has you covered. Lightweight, clean, and easy to layer, this zip-up works across cool mornings, breezy evenings, and everything in between. Style Tip: zip it over a tee or polo with jeans or trousers for an effortless, all-day polished fit.",
    category: "apparel",
    collections: ["all", "bestsellers", "apparel-1"],
    price: 2299,
    images: [
      im("Jacket_with_zip_202604031849.jpg?v=1775462484&width=1024", "All Weather Zip-Up front"),
      im("Zipper_image_focused_202604031850.jpg?v=1775462484&width=1024", "All Weather Zip-Up zipper detail"),
      im("Create_image_of_202604081518.jpg?v=1776073723&width=1200", "Model wearing the All Weather Zip-Up outdoors"),
      im("Cap_background_in_202604031902.jpg?v=1775641761&width=1024", "All Weather Zip-Up back"),
    ],
    tags: ["jacket", "zip-up", "layering"],
    variants: sizes("zip", ["S", "M", "L", "XL", "XXL"], 2),
    available: true,
    featured: true,
    rating: 4.7,
    reviewCount: 41,
    details: ["42% cotton, 32% recycled polyester, 26% recycled cotton", "Regular fit", "Full zip"],
    washcare: ["Machine wash with similar colours", "Wash inside out", "Do not bleach or tumble dry", "Low iron if needed"],
    shipping: SHIP,
  },
  {
    id: "mu-005",
    slug: "union-originals-leather-jacket",
    name: "Union Originals Leather Jacket",
    description:
      "For those who chose to build something meaningful. A quiet marker of what you're part of. Custom-made for a unique fit — premium quality, crafted with attention to detail, made to order with no overproduction.",
    category: "apparel",
    collections: ["all", "union-originals", "apparel-1"],
    price: 3499,
    images: [
      im("make_the_background_202604081626.jpg?v=1776237967&width=1400", "Union Originals Leather Jacket front"),
      im("use_this_background_202604081627.jpg?v=1776237967&width=1400", "Union Originals Leather Jacket back"),
      im("preview_images/4f6c808f4229404e91d7d7fbe24fa4b1.thumbnail.0000000000_1024x1024.jpg?v=1775654329", "Union Originals Leather Jacket 360 view"),
    ],
    tags: ["leather", "jacket", "originals"],
    variants: sizes("leather", APPAREL, 2),
    available: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 28,
    details: ["Premium quality", "Made to order"],
    washcare: ["Wipe with a soft dry cloth", "Do not machine wash", "Store on a wide hanger"],
    shipping: SHIP,
  },
  {
    id: "mu-006",
    slug: "black-varsity-jacket",
    name: "Black Varsity Jacket",
    description:
      "For those who chose to build something meaningful. A quiet marker of what you are part of. Made from breathable fabric that retains its shape — premium quality, made to order with no overproduction.",
    category: "apparel",
    collections: ["all", "union-originals", "apparel-1"],
    price: 2499,
    images: [
      im("remove_the_model_202604081636.jpg?v=1776237979&width=1400", "Black Varsity Jacket front"),
      im("give_the_back_202604081731.jpg?v=1776237979&width=1400", "Black Varsity Jacket back"),
      im("preview_images/a298702c940444808c9d0629c1720053.thumbnail.0000000000_1024x1024.jpg?v=1775654282", "Black Varsity Jacket 360 view"),
    ],
    tags: ["varsity", "jacket", "originals"],
    variants: sizes("varsity", APPAREL, 1),
    available: true,
    rating: 4.8,
    reviewCount: 35,
    details: ["Premium quality", "Made to order"],
    washcare: ["Machine wash cold, inside out", "Do not bleach or tumble dry", "Low iron if needed"],
    shipping: SHIP,
  },
  {
    id: "mu-007",
    slug: "build-grow-hoodie",
    name: "Build & Grow Hoodie",
    description:
      "For those who chose to build something meaningful. A quiet marker of what you're part of. Premium quality, crafted with attention to detail and made to order with no overproduction.",
    category: "apparel",
    collections: ["all", "union-originals", "apparel-1"],
    price: 2499,
    images: [
      im("use_this_beige_202604081645.png_202604211517.jpg?v=1776764967&width=1024", "Build & Grow Hoodie front"),
      im("use_this_beige_202604081646.jpg?v=1776764967&width=1400", "Build & Grow Hoodie back"),
      im("preview_images/b9f32e2ae3d745c7b5fa03b45ff2105c.thumbnail.0000000000_1024x1024.jpg?v=1775653461", "Build & Grow Hoodie video"),
    ],
    tags: ["hoodie", "originals"],
    variants: sizes("grow", APPAREL, 1),
    available: true,
    rating: 4.8,
    reviewCount: 52,
    details: ["Premium quality", "Made to order"],
    washcare: ["Machine wash with similar colours", "Wash inside out", "Do not bleach or tumble dry"],
    shipping: SHIP,
  },
  {
    id: "mu-008",
    slug: "collector-pins",
    name: "Collector Pins",
    description:
      "Premium enamel pins with gold detailing. Each design tells a story. Unique, giftable, and made to last — start your collection today.",
    category: "accessories",
    collections: ["all", "union-originals", "accessories"],
    price: 199,
    images: [
      im("create_these_on_202604081714.jpg?v=1775649129&width=1400", "Four Collector Pins flat-lay"),
      im("replace_the_pins_202604081721.jpg?v=1775649129&width=1400", "Masters' Union Collector Pins flat-lay"),
      im("create_this_on_202604081713.jpg?v=1775649129&width=1400", "Styled arrangement of Collector Pins"),
      im("pin-build-first-DYCS0dOu.jpg?v=1775649129&width=864", "Build First enamel pin"),
      im("pin-mu-est-Olr6SPvg.jpg?v=1775649129&width=864", "Est. 2020 enamel pin"),
    ],
    tags: ["pins", "enamel", "gift"],
    variants: ["Build First", "Est.2020", "MU", "Build First 2.0", "Masters' Union", "MU 2.0", "MU Approved", "Masters' Union 2.0", "Learn Solve Build"].map((s, i) => ({ id: `pins-${i + 1}`, size: s, available: true, stock: 30 })),
    optionLabel: "Design",
    available: true,
    rating: 4.9,
    reviewCount: 96,
    details: ["Enamel with gold detailing"],
    washcare: ["Wipe clean with a soft cloth", "Keep dry"],
    shipping: SHIP,
  },
  {
    id: "mu-009",
    slug: "union-grind-sneakers",
    name: "Union Grind Sneakers",
    description:
      "Built for days that don't slow down. Comfort, grip, and a bold dual-tone look with the MU graphic — made for everything from long days on campus to everyday runs around the city. Style Tip: pair them with denims, joggers, or relaxed fits.",
    category: "footwear",
    collections: ["all", "new-arrivals"],
    price: 1750,
    images: [
      im("Sneakers_as_primary_202604060034.jpg?v=1775467335&width=1024", "Model wearing Union Grind Sneakers"),
      im("3D_Rendered_image_202604081222.jpg?v=1776071943&width=768", "Union Grind Sneakers close-up"),
      im("Sneakers_as_primary_202604061452.jpg?v=1776073552&width=1024", "Union Grind Sneakers close-up angle"),
      im("preview_images/fe7a1de655e047fca28d9ab4c63d56ec.thumbnail.0000000000_1024x1024.jpg?v=1776073532", "Union Grind Sneakers 360 view"),
    ],
    tags: ["sneakers", "shoes"],
    variants: sizes("sneaker", ["6", "6.5", "7", "8", "9", "10", "11"], 4),
    optionLabel: "Shoe size",
    available: true,
    newArrival: true,
    rating: 4.6,
    reviewCount: 73,
    details: ["Breathable mesh with synthetic overlays", "Cushioned sole"],
    washcare: ["Clean with a soft brush or damp cloth", "Do not machine wash", "Air dry after cleaning", "Store in a cool, dry place"],
    shipping: SHIP,
  },
  {
    id: "mu-010",
    slug: "midnight-ember-hoodie",
    name: "Midnight Ember Hoodie",
    description:
      "Soft, relaxed, and always a good idea. This hoodie is for long days, late nights, and everything in between. Cozy without being bulky, it's basically your comfort zone in hoodie form. Style Tip: wear it with jeans or joggers for peak chill.",
    category: "apparel",
    collections: ["all", "new-arrivals", "apparel-1"],
    price: 1999,
    images: [
      im("Man_wearing_hoodie_202604051725.jpeg_202604061232.jpg?v=1775467462&width=1024", "Model wearing the Midnight Ember Hoodie"),
      im("Black_Hoodie-1.png_202604081101.jpg?v=1775637867&width=835", "Midnight Ember Hoodie front"),
      im("Black_Hoodie-1.png_202604081102.jpg?v=1775626391&width=896", "Midnight Ember Hoodie back"),
      im("preview_images/47e4b7659fc9433e9817c5dadb505a07.thumbnail.0000000000_1024x1024.jpg?v=1773917523", "Midnight Ember Hoodie details"),
    ],
    tags: ["hoodie", "black", "relaxed"],
    variants: sizes("ember", ["S", "M", "L", "XL", "2XL"], 7),
    available: true,
    newArrival: true,
    rating: 4.8,
    reviewCount: 58,
    details: ["80% polyester, 20% viscose", "Relaxed fit", "Kangaroo pocket"],
    washcare: ["Machine wash with similar colours", "Wash inside out", "Do not bleach or tumble dry", "Low iron if needed"],
    shipping: SHIP,
  },
  {
    id: "mu-011",
    slug: "daily-journal",
    name: "Daily Journal",
    description:
      "Clean, minimal, and made for everyday writing. With a soft-touch vegan leather cover and smooth ivory pages, this A5 journal is built for notes, plans, and everything in between. Everyday Tip: keep it on your desk or carry it along.",
    category: "stationery",
    collections: ["all", "new-arrivals", "accessories"],
    price: 499,
    images: [
      im("Woman_writing_in_202604061149.jpg?v=1775464793&width=1024", "Model writing in the Daily Journal"),
      im("Black_Diary__1_.jpeg_202604081214.jpg?v=1776072236&width=758", "Daily Journal on beige"),
      im("Black_Diary__1_.jpeg_202604081216.jpg?v=1776072301&width=776", "Daily Journal lifestyle"),
      im("preview_images/acb6c783a4e8457497f82526aede602d.thumbnail.0000000000_1024x1024.jpg?v=1775630415", "Daily Journal on emerald satin"),
    ],
    tags: ["journal", "notebook", "stationery"],
    variants: single("journal", 25),
    available: true,
    newArrival: true,
    rating: 4.7,
    reviewCount: 119,
    details: ["A5 with ribbon bookmark", "Vegan leather cover", "70–75 GSM ivory paper"],
    washcare: ["Store in a cool, dry place", "Wipe the cover with a slightly damp cloth", "Avoid direct sunlight for long periods"],
    shipping: SHIP,
  },
  {
    id: "mu-012",
    slug: "hydrapro-bottle",
    name: "HydraPro Bottle",
    description:
      "Stay hydrated through every class, commute and workout. The HydraPro Bottle is a clean, durable everyday bottle from the Masters' Union store.",
    category: "drinkware",
    collections: ["all", "new-arrivals", "drinkware-1"],
    price: 799,
    images: [
      im("bottle_bf226c41-264d-414f-b57c-4739b0b457b3.jpg?v=1775464121&width=1200", "HydraPro Bottle"),
      im("Replace_the_bottle_202604081454.jpg?v=1775640339&width=1400", "HydraPro Bottle lifestyle"),
    ],
    tags: ["bottle", "hydration"],
    variants: single("hydra", 20),
    available: true,
    newArrival: true,
    rating: 4.6,
    reviewCount: 44,
    details: [],
    washcare: ["Hand wash recommended", "Do not microwave or freeze"],
    shipping: SHIP,
  },
];

export const collections = [
  { slug: "all", name: "All Products", description: "Everything from the Masters' Union store." },
  { slug: "new-arrivals", name: "New Arrivals", description: "Fresh drops for the season." },
  { slug: "bestsellers", name: "Bestsellers", description: "What the campus is wearing and carrying." },
  { slug: "apparel-1", name: "Apparel", description: "Hoodies, jackets and layers made to move with you." },
  { slug: "drinkware-1", name: "Drinkware", description: "Sippers and bottles for every routine." },
  { slug: "accessories", name: "Bags & Accessories", description: "Backpacks, caps, journals, pins and more." },
  { slug: "union-originals", name: "Union Originals", description: "For those who chose to build something meaningful." },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  if (collectionSlug === "all") return products;
  return products.filter((p) => p.collections.includes(collectionSlug));
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
