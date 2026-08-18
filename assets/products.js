/*
  A1 Sweets product data
  ---------------------------------------------------------------
  Replace the sample rows below with the real price list you will share.

  Fields:
    id          unique short id
    name        display product name
    category    must exactly match one of the category names below
    price       numeric rupee price; use null until confirmed
    unit        e.g. "per 250g", "per kg", "1 box"
    image       optional local image path, e.g. "assets/products/kaju-katli.webp"
    bestseller  true for products shown on Home
    note        optional short descriptor

  Because this is plain JavaScript, no build step or database is required.
*/

const WHATSAPP_NUMBER = '919881217775';

const categories = [
  { id: 'milk-sweets', name: 'Milk Sweets', icon: '◈', description: 'Soft, classic mithai favourites.' },
  { id: 'dry-fruit', name: 'Dry Fruit Sweets', icon: '✦', description: 'Rich sweets made for gifting.' },
  { id: 'kaju-specials', name: 'Kaju Specials', icon: '◇', description: 'Cashew-based premium favourites.' },
  { id: 'bengali-sweets', name: 'Bengali Sweets', icon: '○', description: 'Chenna and syrup-soaked classics.' },
  { id: 'laddus', name: 'Laddus', icon: '●', description: 'Round, festive and always familiar.' },
  { id: 'pedas', name: 'Pedas', icon: '◉', description: 'Traditional milk-based favourites.' },
  { id: 'halwa', name: 'Halwa', icon: '▰', description: 'Slow-cooked, rich sweet treats.' },
  { id: 'traditional', name: 'Traditional Sweets', icon: '✥', description: 'Old-school Indian mithai classics.' },
  { id: 'namkeen', name: 'Namkeen', icon: '✺', description: 'Crunchy savoury favourites.' },
  { id: 'snacks', name: 'Snacks', icon: '▦', description: 'Tea-time and everyday bites.' },
  { id: 'bakery', name: 'Bakery', icon: '△', description: 'Fresh bakery-style treats.' },
  { id: 'festival', name: 'Festival Specials', icon: '✧', description: 'Seasonal favourites and festive boxes.' },
  { id: 'gifting', name: 'Gift Boxes', icon: '□', description: 'Ready-to-share gifting options.' },
  { id: 'party-orders', name: 'Party Orders', icon: '❖', description: 'Larger packs for gatherings and events.' }
];

const products = [
  // Replace these sample rows with your real ~80-item list.
  { id: 'kajukatli', name: 'Kaju Katli', category: 'Kaju Specials', price: null, unit: 'per 250g', image: '', bestseller: true, note: 'Classic cashew mithai' },
  { id: 'motichoor', name: 'Motichoor Laddu', category: 'Laddus', price: null, unit: 'per 250g', image: '', bestseller: true, note: 'Fine boondi, festive favourite' },
  { id: 'rasmalai', name: 'Rasmalai', category: 'Bengali Sweets', price: null, unit: 'per plate', image: '', bestseller: true, note: 'Soft chenna in saffron milk' },
  { id: 'gulabjamun', name: 'Gulab Jamun', category: 'Traditional Sweets', price: null, unit: 'per 250g', image: '', bestseller: true, note: 'Soft, syrup-soaked classic' },
  { id: 'besanladdu', name: 'Besan Laddu', category: 'Laddus', price: null, unit: 'per 250g', image: '', bestseller: true, note: 'Roasted gram flour and ghee' },
  { id: 'doodh-peda', name: 'Doodh Peda', category: 'Pedas', price: null, unit: 'per 250g', image: '', bestseller: true, note: 'Milk-rich traditional peda' },

  // Starter placeholders so every category is visible on the menu.
  { id: 'milk-01', name: 'Milk Sweet 01', category: 'Milk Sweets', price: null, unit: 'per 250g', image: '', note: 'Replace with your exact product name' },
  { id: 'dryfruit-01', name: 'Dry Fruit Sweet 01', category: 'Dry Fruit Sweets', price: null, unit: 'per 250g', image: '', note: 'Replace with your exact product name' },
  { id: 'kaju-02', name: 'Kaju Special 02', category: 'Kaju Specials', price: null, unit: 'per 250g', image: '', note: 'Replace with your exact product name' },
  { id: 'bengali-02', name: 'Bengali Sweet 02', category: 'Bengali Sweets', price: null, unit: 'per piece', image: '', note: 'Replace with your exact product name' },
  { id: 'laddu-02', name: 'Laddu 02', category: 'Laddus', price: null, unit: 'per 250g', image: '', note: 'Replace with your exact product name' },
  { id: 'peda-02', name: 'Peda 02', category: 'Pedas', price: null, unit: 'per 250g', image: '', note: 'Replace with your exact product name' },
  { id: 'halwa-01', name: 'Halwa 01', category: 'Halwa', price: null, unit: 'per 250g', image: '', note: 'Replace with your exact product name' },
  { id: 'traditional-02', name: 'Traditional Sweet 02', category: 'Traditional Sweets', price: null, unit: 'per 250g', image: '', note: 'Replace with your exact product name' },
  { id: 'namkeen-01', name: 'Namkeen 01', category: 'Namkeen', price: null, unit: 'per 250g', image: '', note: 'Replace with your exact product name' },
  { id: 'snacks-01', name: 'Snack 01', category: 'Snacks', price: null, unit: 'per pack', image: '', note: 'Replace with your exact product name' },
  { id: 'bakery-01', name: 'Bakery Treat 01', category: 'Bakery', price: null, unit: 'per piece', image: '', note: 'Replace with your exact product name' },
  { id: 'festival-01', name: 'Festival Special 01', category: 'Festival Specials', price: null, unit: 'per box', image: '', note: 'Replace with your exact product name' },
  { id: 'gift-01', name: 'Gift Box 01', category: 'Gift Boxes', price: null, unit: '1 box', image: '', note: 'Replace with your exact product name' },
  { id: 'party-01', name: 'Party Pack 01', category: 'Party Orders', price: null, unit: '1 pack', image: '', note: 'Replace with your exact product name' }
];

function formatPrice(price) {
  if (typeof price !== 'number' || Number.isNaN(price)) return 'Price to be added';
  return `₹${price.toLocaleString('en-IN')}`;
}

function whatsappLink(product) {
  const message = `Hello A1 Sweets, I would like to order ${product.name}${product.unit ? ` (${product.unit})` : ''}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
