import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STORE_PRODUCTS } from '../../data/storeData';
import { ARTICLES_DATA } from '../../data/articlesData';
import { ShieldAlert, ToggleLeft, ToggleRight, ShoppingBag, FileText, Database, Settings, Sparkles, Check } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { storeEnabled, setStoreEnabled } = useApp();
  const [activeAdminTab, setActiveAdminTab] = useState<'toggles' | 'inventory' | 'blog' | 'seo'>('toggles');
  const [toolsActive, setToolsActive] = useState({
    metronome: true,
    tuner: true,
    tapBpm: true,
    spectrum: true,
    recorder: true,
    instruments: true
  });

  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8DCCB] pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-[#AD8B73]" />
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2F2A26]">Admin System Control</h1>
          </div>
          <p className="text-sm text-[#6D655D] mt-1">Configure global feature toggles, marketplace visibility, inventory management, and SEO metadata.</p>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-[#5F8B4C]/10 border border-[#5F8B4C]/30 text-[#5F8B4C] text-xs font-semibold rounded-xl flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex space-x-2 border-b border-[#E8DCCB] pb-2">
        {[
          { id: 'toggles', label: 'Feature Toggles', icon: Settings },
          { id: 'inventory', label: 'Marketplace Inventory', icon: ShoppingBag },
          { id: 'blog', label: 'Content & Articles', icon: FileText },
          { id: 'seo', label: 'SEO & Schema.org', icon: Sparkles }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveAdminTab(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                activeAdminTab === t.id ? 'bg-[#AD8B73] text-[#FFFBE9]' : 'bg-[#FFFDF8] text-[#6D655D] hover:text-[#2F2A26]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feature Toggles Tab */}
      {activeAdminTab === 'toggles' && (
        <div className="space-y-6">
          
          {/* STORE_ENABLED Master Feature Toggle */}
          <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-[#2F2A26]">Store Marketplace Toggle (STORE_ENABLED)</h3>
                <p className="text-xs text-[#6D655D] mt-0.5">
                  When <strong>FALSE</strong>, users see the "Coming Soon" landing page with early access subscription. When <strong>TRUE</strong>, the full e-commerce marketplace becomes publicly visible instantly!
                </p>
              </div>

              <button
                onClick={() => {
                  const next = !storeEnabled;
                  setStoreEnabled(next);
                  triggerNotify(`STORE_ENABLED updated to ${next ? 'TRUE (Public Marketplace Active)' : 'FALSE (Coming Soon Page Active)'}`);
                }}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  storeEnabled ? 'bg-[#5F8B4C] text-[#FFFBE9]' : 'bg-[#B65A4A] text-[#FFFBE9]'
                }`}
              >
                {storeEnabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                <span>STORE_ENABLED = {storeEnabled ? 'TRUE' : 'FALSE'}</span>
              </button>
            </div>
          </div>

          {/* Individual Tool Toggles */}
          <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-heading font-bold text-base text-[#2F2A26]">Tool Module Feature Toggles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(toolsActive).map(([toolKey, isAct]) => (
                <div key={toolKey} className="p-3 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] flex justify-between items-center text-xs">
                  <span className="font-semibold capitalize text-[#2F2A26]">{toolKey} Module</span>
                  <button
                    onClick={() => {
                      setToolsActive(prev => ({ ...prev, [toolKey]: !isAct }));
                      triggerNotify(`${toolKey} toggle updated`);
                    }}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                      isAct ? 'bg-[#5F8B4C]/20 text-[#5F8B4C]' : 'bg-[#B65A4A]/20 text-[#B65A4A]'
                    }`}
                  >
                    {isAct ? 'ACTIVE' : 'DISABLED'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Inventory Management Tab */}
      {activeAdminTab === 'inventory' && (
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-base text-[#2F2A26]">Store Inventory Catalog ({STORE_PRODUCTS.length} Items)</h3>
          <div className="space-y-2">
            {STORE_PRODUCTS.map(p => (
              <div key={p.id} className="p-3 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#2F2A26] block">{p.name}</span>
                  <span className="text-[#6D655D]">{p.category} • ₹{p.price.toLocaleString()}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-[#5F8B4C]/15 text-[#5F8B4C] rounded-md">IN STOCK</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog & Articles Content Manager Tab */}
      {activeAdminTab === 'blog' && (
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-base text-[#2F2A26]">Published Educational Articles ({ARTICLES_DATA.length})</h3>
          <div className="space-y-2">
            {ARTICLES_DATA.map(a => (
              <div key={a.id} className="p-3 rounded-xl bg-[#FFFBE9] border border-[#E8DCCB] flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#2F2A26] block">{a.title}</span>
                  <span className="text-[#6D655D]">{a.author} • {a.category}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-[#AD8B73]/15 text-[#AD8B73] rounded-md">PUBLISHED</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Schema Tab */}
      {activeAdminTab === 'seo' && (
        <div className="bg-[#FFFDF8] border border-[#E8DCCB] rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-base text-[#2F2A26]">Schema.org & OpenGraph Metadata Inspector</h3>
          <pre className="p-4 bg-[#FFFBE9] border border-[#E8DCCB] rounded-xl text-xs font-mono text-[#2F2A26] overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TuneIndiaGlobal",
  "url": "https://tuneindiaglobal.com",
  "applicationCategory": "MultimediaApplication",
  "description": "Everything Music. One Destination. Complete music ecosystem with tools, theory, audio analysis, & marketplace.",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "0"
  }
}`}
          </pre>
        </div>
      )}

    </div>
  );
};
