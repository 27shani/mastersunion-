# Master's Union Merchandise Store

Frontend-only prototype of the official Master's Union merch store, designed to match the layout quality and interaction patterns of bluorng.com while using Master's Union branding and product catalog.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- localStorage for cart / wishlist / recently viewed

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts
- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — lint

## Structure
- `src/app` — routes (home, collections, products, cart, wishlist, secondary pages)
- `src/components` — Header, Footer, ProductCard, Icons
- `src/context` — StoreContext (cart, wishlist, recently viewed)
- `src/data` — product catalog + helpers
- `src/lib` — utilities

## Notes
- This is a frontend prototype. No Shopify, database, or live payment processing.
- Product images are placeholders from Unsplash — replace with official Master's Union photography.
- Logo is text-based; replace with official SVG assets when available.
- Cart & wishlist persist via localStorage.

## Deploy
Ready for Vercel. Connect the repo and deploy as a standard Next.js project.
