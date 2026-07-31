import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STORE_PRODUCTS } from '../../data/storeData';
import { StoreProduct } from '../../types';
import { 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  Mail, 
  Check, 
  Star, 
  ShieldCheck, 
  Filter, 
  X,
  ShoppingCart
} from 'lucide-react';

export const StoreView: React.FC = () => {
  const { storeEnabled, setStoreEnabled, addToCart, cart } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // If STORE_ENABLED is FALSE, display the "Coming Soon" landing page
  if (!storeEnabled) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center space-y-8">
        
        {/* Minimal Illustration / Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#E3CAA5]/30 border border-[#E8DCCB] text-[#AD8B73] text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>India’s Upcoming Premium Music Marketplace</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#2F2A26] leading-tight">
          India's Premium Music Marketplace is Coming Soon
        </h1>

        {/* Description */}
        <p className="text-base text-[#6D655D] max-w-xl mx-auto leading-relaxed">
          We're carefully building a marketplace that will bring musicians the finest instruments, studio equipment, accessories, and artisan handcrafted products—all in one trusted destination.
        </p>

        {/* Email Subscription Box */}
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 sm:p-8 max-w-md mx-auto shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-base text-[#2F2A26]">Get Early Access & Launch Invite</h3>
          {subscribed ? (
            <div className="p-4 rounded-xl bg-[#5F8B4C]/10 border border-[#5F8B4C]/30 text-[#5F8B4C] font-semibold text-xs flex items-center justify-center space-x-2">
              <Check className="w-4 h-4" />
              <span>You're on the priority notification list!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] text-xs text-[#2F2A26] focus:border-[#AD8B73] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#AD8B73] text-[#FFFBE9] font-heading font-bold text-xs rounded-xl hover:bg-[#96745D] transition-colors shadow-xs"
              >
                NOTIFY ME ON LAUNCH
              </button>
            </form>
          )}
        </div>

        <p className="text-xs text-[#6D655D]">Target Launch: Q4 • Handcrafted Artisanal Guitars, String Rings & Reference Studio Gear</p>
      </div>
    );
  }

  // If STORE_ENABLED is TRUE, render full marketplace!
  const categories = ['All', 'Handmade Collection', 'Guitars', 'Studio Monitors', 'Audio Interfaces', 'Microphones'];

  const filteredProducts = selectedCategory === 'All' 
    ? STORE_PRODUCTS 
    : STORE_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DCCB] pb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Store Marketplace</h1>
          <p className="text-sm text-[#6D655D] mt-1">Instruments, studio gear, and artisanal handcrafted gifts made for music lovers.</p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              selectedCategory === cat
                ? 'bg-[#AD8B73] text-[#FFFBE9] border-[#AD8B73]'
                : 'bg-[#FFFDF8] border-[#E8DCCB] text-[#6D655D] hover:border-[#AD8B73]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl overflow-hidden shadow-xs hover:border-[#AD8B73] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-[#FFFBE9]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isHandcrafted && (
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#AD8B73] text-[#FFFBE9] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    Handmade
                  </span>
                )}
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-semibold text-[#AD8B73] uppercase tracking-wider">{product.category}</span>
                <h3 className="font-heading font-bold text-sm text-[#2F2A26] line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center space-x-1 text-xs text-[#C9A227]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-[#2F2A26]">{product.rating}</span>
                  <span className="text-[#6D655D]">({product.reviewsCount})</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-[#E8DCCB]/50 flex items-center justify-between">
              <span className="font-heading font-bold text-base text-[#2F2A26]">
                ₹{product.price.toLocaleString()}
              </span>

              <button
                onClick={() => addToCart(product)}
                className="px-3 py-1.5 bg-[#AD8B73] text-[#FFFBE9] font-semibold text-xs rounded-xl hover:bg-[#96745D] transition-colors flex items-center space-x-1"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
