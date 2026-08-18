# A1 Sweets static website

A lightweight, production-oriented three-page static site for A1 Sweets.

## Files

- `index.html` — home, trust badges, bestsellers, category grid, story teaser, gifting CTA, reviews and visit section.
- `menu.html` — all 14 categories, search, category filters and WhatsApp ordering buttons.
- `story.html` — brand history/timeline page.
- `assets/styles.css` — shared styling.
- `assets/app.js` — shared navigation, menu rendering, reveal animation and restrained 3D hero interaction.
- `assets/products.js` — the only file you need to edit when adding the real ~80 products and prices.

## Add the real price list

In `assets/products.js`, replace the sample `products` array with your real rows. Example:

```js
{
  id: 'kaju-katli',
  name: 'Kaju Katli',
  category: 'Kaju Specials',
  price: 420,
  unit: 'per 250g',
  image: 'assets/products/kaju-katli.webp',
  bestseller: true,
  note: 'Classic cashew mithai'
}
```

Use one of the 14 category names already defined in `categories` so the menu filters keep working.

## Add product photos

Create `assets/products/` and put optimized `.webp` or `.jpg` images there. Keep most product images around 100–180 KB where practical. The code lazy-loads product images.

## Deploy on Render

Create a Render **Static Site** connected to the GitHub repository. No build command is needed. Publish the repository root. The site works with plain HTML/CSS/JS.
