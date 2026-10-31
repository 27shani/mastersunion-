// Content and images from shop.mastersunion.org
const CDN = "https://shop.mastersunion.org/cdn/shop/files";

export const brand = {
  name: "Master's Union",
  logoLight: `${CDN}/output-onlinegiftools.gif?v=1776169505&width=320`, // animated logo, used over the hero
  logoDark: `${CDN}/logoanimationblack_1.webp?v=1775549391&width=320`, // black logo, used on light backgrounds
  email: "helpdesk@mastersunion.org",
  tagline: "Scroll into the UNION",
  promise:
    "We don’t do just “good enough.” Every item is made with premium materials, tested for durability, and finished with attention to detail. If it doesn’t meet the standard, it doesn’t make the cut.",
};

export const announcements = [
  "Scroll into the UNION",
  "Free shipping on orders above ₹1299",
  "Easy exchanges · Pan-India shipping",
  "Premium merch for everyday ambition",
];

export const heroImage = `${CDN}/preview_images/075346bc967a462b805e00a4ca84350b.thumbnail.0000000000_1920x.jpg?v=1776758099`;

export const megaTiles = [
  { name: "Drinkware", href: "/collections/drinkware-1", img: `${CDN}/Woman_sipping_coffee_202604051736.jpg?v=1775645173&width=1024` },
  { name: "Apparel", href: "/collections/apparel-1", img: `${CDN}/Change_guy_s_outfit_202604051749.jpg?v=1775644736&width=1024` },
  { name: "Bestsellers", href: "/collections/bestsellers", img: `${CDN}/Products_arranged_in_202604051647.jpg?v=1775645443&width=1024` },
  { name: "Bags", href: "/collections/accessories", img: `${CDN}/Models_carrying_tote_202604051744_1.jpg?v=1775645098&width=1024` },
  { name: "Union Originals", href: "/collections/union-originals", img: `${CDN}/make_it_clear_202604081759.jpg?v=1775651475&width=1792` },
];

// Shop-by-look reels. Drop videos in /public/reels/. `slug` must match a product slug.
export const looks = [
  { slug: "union-originals-leather-jacket", video: "/reels/look-1.mp4" },
  { slug: "black-varsity-jacket", video: "/reels/look-2.mp4" },
  { slug: "build-grow-hoodie", video: "/reels/look-3.mp4" },
  { slug: "okami-voyager-pack", video: "/reels/look-4.mp4" },
  { slug: "classic-campus-cap", video: "/reels/look-5.mp4" },
];

export const droppingSoon = [
  { name: "Fridge Magnets", img: `${CDN}/FridgeMagnetSquare.jpg_1.jpg?v=1775472233&width=800` },
  { name: "Notebooks", img: `${CDN}/diary.jpg?v=1775464090&width=800` },
  { name: "Bottles", img: `${CDN}/bottle_bf226c41-264d-414f-b57c-4739b0b457b3.jpg?v=1775464121&width=800` },
  { name: "Tote Bags", img: `${CDN}/tote3D.jpg?v=1775464221&width=800` },
  { name: "Mugs", img: `${CDN}/mugs.jpg?v=1775464182&width=800` },
  { name: "Tees", img: `${CDN}/White_t-shirt_with_202604061856.jpg?v=1775482041&width=800` },
];

export const everyMove = {
  title: "Merch for Your Every Move",
  intro: "Premium merch that is functional, versatile and designed for everyday ambition.",
  items: [
    { n: "01", title: "Built for Work and Wins", text: "Everyday journals for ideas, bottles and the coffee sipper to keep you going.", img: `${CDN}/Woman_writing_in_202604081238.jpg?v=1775632139&width=1200` },
    { n: "02", title: "Made for Everyday outings", text: "T-shirts, tote bags and sippers that move effortlessly from cafés to casual hangouts.", img: `${CDN}/Woman_walking_with_202604071254_1.jpg?v=1775546702&width=1200` },
    { n: "03", title: "Designed to travel with you", text: "Sneakers, apparel and backpacks built for airports, road trips and everything in between.", img: `${CDN}/Models_carrying_tote_202604051744_1.jpg?v=1775645098&width=1200` },
  ],
};

export const services = [
  { title: "Easy Exchanges", text: "Size issue? Product concern? We’ll help you sort it (subject to availability)." },
  { title: "Pan-India Shipping", text: "Fast, reliable delivery across India. Shipping charges are visible at checkout." },
  { title: "Need Help?", text: `For anything order-related, write to us at ${brand.email}.` },
];

// TODO: confirm exact address, hours and Google Maps link.
export const campus = {
  title: "Visit the store at campus",
  address: ["Master's Union Campus", "Cyberpark, Sector 67", "Gurugram, Haryana"],
  hours: "Mon–Sat, 10 am – 6 pm",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Masters%27+Union+Gurugram",
  img: `${CDN}/Cyberpark.png?v=1775475748&width=1360`,
};
