import { useRef } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Loader2, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

const FEATURED_COLLECTIONS = [
  { key: 'cadenas', label: 'Cadenas', desc: 'Elegantes y duraderas' },
  { key: 'pulseras', label: 'Pulseras', desc: 'Delicadas y modernas' },
  { key: 'anillos', label: 'Sortijas', desc: 'Finas y sofisticadas' },
];

export default function ProductGrid({ products, loading, onAddToCart, onBuyNow }: ProductGridProps) {
  // Group products by category (only categories that have products), excluding hidden ones
  const HIDDEN_CATEGORIES = ['aretes', 'collares'];
  const byCategory = products
    .filter(p => !HIDDEN_CATEGORIES.includes(p.category))
    .reduce<Record<string, Product[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  // Cover image per category: first product that has a real Supabase-hosted image, else first product
  const coverImage = (key: string): string => {
    const list = byCategory[key] || [];
    const preferred = list.find(p => p.image_url.includes('supabase'));
    return (preferred || list[0])?.image_url || '';
  };

  const scrollToSection = (key: string) => {
    document.getElementById(`section-${key}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  // All categories that have at least one product, featured ones first, then others
  const featuredKeys = FEATURED_COLLECTIONS.map(c => c.key);
  const otherKeys = Object.keys(byCategory).filter(k => !featuredKeys.includes(k));
  const allSectionKeys = [...featuredKeys.filter(k => byCategory[k]?.length > 0), ...otherKeys];

  const sectionLabel = (key: string) => {
    const col = FEATURED_COLLECTIONS.find(c => c.key === key);
    if (col) return col.label;
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  if (loading) {
    return (
      <section id="coleccion" className="flex justify-center py-32 bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={36} className="animate-spin text-gold-500" />
          <p className="font-body text-xs tracking-wide uppercase text-onyx-400">Cargando colecciones...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="coleccion">

      {/* ── Collection Showcase Cards ── */}
      <div className="bg-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-xs tracking-ultra uppercase text-gold-600 mb-3">Explora</p>
            <h2 className="section-title mb-4">Nuestras Colecciones</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURED_COLLECTIONS.filter(col => byCategory[col.key]?.length > 0).map(col => {
              const img = coverImage(col.key);
              const count = byCategory[col.key]?.length ?? 0;
              return (
                <button
                  key={col.key}
                  onClick={() => scrollToSection(col.key)}
                  className="group relative overflow-hidden aspect-[3/4] sm:aspect-[2/3] text-left focus:outline-none"
                >
                  {/* Background image */}
                  {img && (
                    <img
                      src={img}
                      alt={col.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-900/85 via-onyx-900/20 to-transparent" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-body text-xs tracking-ultra uppercase text-gold-400 mb-1">{col.desc}</p>
                    <h3 className="font-serif text-3xl text-white mb-1">{col.label}</h3>
                    <p className="font-body text-xs text-cream-300 mb-4">{count} piezas</p>
                    <span className="inline-flex items-center gap-2 font-body text-xs tracking-wide uppercase text-white border border-white/40 px-4 py-2 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                      Ver Colección <ChevronRight size={12} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Product Sections ── */}
      {allSectionKeys.map((key, i) => {
        const sectionProducts = byCategory[key] || [];
        if (sectionProducts.length === 0) return null;
        const label = sectionLabel(key);
        const isEven = i % 2 === 0;

        return (
          <div
            key={key}
            id={`section-${key}`}
            className={`py-16 ${isEven ? 'bg-white' : 'bg-cream-50'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="flex items-center gap-6 mb-10">
                <div className="flex-1 h-px bg-cream-200" />
                <div className="text-center px-4">
                  <h2 className="font-serif text-3xl md:text-4xl text-onyx-800 mb-2">{label}</h2>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
                </div>
                <div className="flex-1 h-px bg-cream-200" />
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sectionProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onBuyNow={onBuyNow}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
