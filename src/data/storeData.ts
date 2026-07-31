import { StoreProduct } from '../types';

export const STORE_PRODUCTS: StoreProduct[] = [
  // Handcrafted Artisanal Collection
  {
    id: 'prod-ring-01',
    name: 'Handcrafted Acoustic Guitar String Ring',
    category: 'Handmade Collection',
    price: 1890,
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
    description: 'Upcycled phosphor bronze acoustic guitar string wrapped carefully into a comfortable, hypoallergenic sterling silver band.',
    isHandcrafted: true,
    inStock: true,
    features: ['Real Recycled Guitar Strings', 'Polished Silver Core', 'Hypoallergenic Finish', 'Custom Ring Sizing'],
    specs: { 'Material': 'Bronze & Sterling Silver', 'Handmade In': 'Jaipur, India', 'Warranty': '1 Year' }
  },
  {
    id: 'prod-necklace-01',
    name: 'Artisan Wood & Pick Pendant Necklace',
    category: 'Handmade Collection',
    price: 1250,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    description: 'Carved rosewood pick pendant wrapped with vintage copper wire and suspended on a genuine leather cord.',
    isHandcrafted: true,
    inStock: true,
    features: ['Indian Rosewood', 'Pure Copper Filigree', 'Adjustable Leather Cord', 'Sustainably Sourced'],
    specs: { 'Wood': 'Indian Rosewood', 'Cord Length': '18-24 inches adjustable' }
  },
  {
    id: 'prod-mini-sitar',
    name: 'Miniature Decorative Teakwood Sitar',
    category: 'Handmade Collection',
    price: 3490,
    currency: 'INR',
    rating: 5.0,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    description: 'Exquisite 10-inch handcrafted miniature sitar with genuine brass strings, intricate inlay, and velvet presentation box.',
    isHandcrafted: true,
    inStock: true,
    features: ['Intricate Bone-Style Inlay', 'Brass Hardware', 'Hand-Polished Teak', 'Collector Display Stand Included'],
    specs: { 'Height': '10.5 inches', 'Craftsmanship': 'Master Craftsmen Varanasi' }
  },
  {
    id: 'prod-lamp-01',
    name: 'Vintage Valve Tube Studio Desk Lamp',
    category: 'Handmade Collection',
    price: 4990,
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
    description: 'Warm ambient desk lamp built from authentic vintage vacuum audio tubes mounted on solid walnut wood block with warm Edison glow.',
    isHandcrafted: true,
    inStock: true,
    features: ['Authentic Vintage Audio Tubes', 'Stepless Brass Dimmer', 'Solid Walnut Base', 'Braided Fabric Cable'],
    specs: { 'Power': '12V Low Voltage', 'Base': 'Solid Walnut' }
  },

  // Instruments & Studio Gear
  {
    id: 'prod-guitar-01',
    name: 'Heritage Custom Dreadnought Acoustic Guitar',
    category: 'Guitars',
    price: 32900,
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800',
    description: 'Solid Sitka spruce top with Indian Rosewood back and sides, delivering resonant bass and crystalline highs.',
    inStock: true,
    features: ['Solid Spruce Top', 'Ebony Fretboard', 'Bone Nut and Saddle', 'Hardshell Case Included'],
    specs: { 'Body Shape': 'Dreadnought', 'Top Wood': 'Solid Sitka Spruce', 'Scale': '25.5"' }
  },
  {
    id: 'prod-monitor-01',
    name: 'ProSonic Studio Reference Monitors (Pair)',
    category: 'Studio Monitors',
    price: 24500,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
    description: 'Precision bi-amplified studio monitors with Kevlar woofers and room acoustics tuning switches.',
    inStock: true,
    features: ['6.5" Kevlar Driver', 'Silk Dome Tweeter', 'HF/LF Acoustic Trim Controls', 'Balanced XLR & TRS Inputs'],
    specs: { 'Frequency Response': '38Hz - 22kHz', 'Amplification': '100W Class D' }
  },
  {
    id: 'prod-interface-01',
    name: 'StudioFlow 2x4 USB-C Audio Interface',
    category: 'Audio Interfaces',
    price: 14200,
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-low latency 24-bit/192kHz USB audio interface with discrete class-A preamps and direct zero-latency monitoring.',
    inStock: true,
    features: ['24-bit/192kHz Resolution', '+48V Phantom Power', 'Direct Monitor Switch', 'MIDI I/O'],
    specs: { 'Dynamic Range': '118dB', 'Inputs': '2 XLR/TRS Combo' }
  },
  {
    id: 'prod-mic-01',
    name: 'VocalMaster Large Diaphragm Condenser Mic',
    category: 'Microphones',
    price: 18900,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
    description: 'Warm vintage-style gold-sputtered 1-inch capsule condenser microphone ideal for vocals, acoustic instruments, and podcasts.',
    inStock: true,
    features: ['1" Gold-Sputtered Capsule', 'Cardioid Pickup Pattern', 'Low Noise JFET Circuit', 'Heavy Shockmount Included'],
    specs: { 'Self-Noise': '7dB-A', 'SPL Max': '138dB' }
  }
];
