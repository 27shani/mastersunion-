import type { Product } from "./products";

export type Review = {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
  images: string[];
};

// DUMMY reviews until a real review provider is connected. Photos reuse the product's own images.
const POOL = [
  { name: "Aarav S.", city: "Gurugram", rating: 5, date: "12 Oct 2026", title: "Exactly what I hoped for", text: "Quality is a clear step above the usual college merch. The finish is clean and it looks even better in person." },
  { name: "Ishita M.", city: "Mumbai", rating: 5, date: "03 Oct 2026", title: "Premium feel", text: "Packaging was neat, delivery was quick and the product feels properly made. Already getting compliments." },
  { name: "Rohan K.", city: "Delhi", rating: 4, date: "27 Sep 2026", title: "Great, just runs a little big", text: "Love the design and the material. Sizing is generous, so consider going one size down if you like a fitted look." },
  { name: "Neha P.", city: "Bengaluru", rating: 5, date: "19 Sep 2026", title: "Worth every rupee", text: "I use it daily and it still looks brand new. Easily the best thing I have picked up from the campus store." },
  { name: "Kabir T.", city: "Pune", rating: 5, date: "08 Sep 2026", title: "Clean and understated", text: "Minimal branding, solid build. Exactly the kind of merch you actually want to wear or carry outside campus." },
  { name: "Ananya R.", city: "Hyderabad", rating: 4, date: "30 Aug 2026", title: "Lovely quality", text: "Colour and finish match the photos. Exchange process was easy when I needed a different size." },
];

export function getReviews(product: Product): Review[] {
  const pics = product.images.map((i) => i.src);
  return POOL.map((r, i) => ({
    ...r,
    id: `${product.id}-r${i}`,
    verified: true,
    images: i % 3 === 2 ? [] : [pics[(i + 1) % pics.length], ...(i % 2 === 0 ? [pics[(i + 2) % pics.length]] : [])],
  }));
}

export function ratingBreakdown(reviews: Review[]) {
  const counts = [5, 4, 3, 2, 1].map((s) => ({ star: s, count: reviews.filter((r) => r.rating === s).length }));
  return counts;
}
