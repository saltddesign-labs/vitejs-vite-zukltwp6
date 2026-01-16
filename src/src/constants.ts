import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ceramic Memory Mug',
    description: 'Premium ceramic mug with ergonomic handle. Perfect for morning coffee and reliving memories.',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1000&auto=format&fit=crop', // Mug in nature/outdoors
    category: 'Home',
    isCustomizable: true,
    freeShipping: true,
  },
  {
    id: '2',
    name: 'Canvas Tote Bag',
    description: 'Durable, eco-friendly canvas tote. Spacious enough for all your daily essentials.',
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop', // Tote bag model
    category: 'Accessories',
    isCustomizable: true,
    freeShipping: false,
  },
  {
    id: '3',
    name: 'Panoramic Postcard',
    description: 'High-gloss finish panoramic postcard. Send a piece of your journey to loved ones.',
    price: 5.90,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1000&auto=format&fit=crop', // Hand holding postcard
    category: 'Stationery',
    isCustomizable: true,
    freeShipping: true,
  },
  {
    id: '4',
    name: 'Acrylic Photo Block',
    description: 'Modern, frameless acrylic block that gives your photos a 3D depth effect.',
    price: 34.90,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop', // Photo frame/block context
    category: 'Decor',
    isCustomizable: true,
    freeShipping: true,
  },
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'jp', name: '日本語', flag: '🇯🇵' },
];