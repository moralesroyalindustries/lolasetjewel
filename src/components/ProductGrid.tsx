import { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import CollectionModal from './CollectionModal';
import { Loader2, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

const COLLECTIONS = [
  { key: 'cadenas', label: 'Cadenas', desc: 'Elegantes y duraderas' },
  { key: 'pulseras', label: 'Pulseras', desc: 'Delicadas y modernas' },
  { key: 'anillos', label: 'Sortijas', desc: 'Finas y sofisticadas' },
];

export default function ProductGrid({ products, loading, onAddToCart, onBuyNow }: ProductGridProps) {
  const [openCollection, setOpenCollection] = useState<string | null>(null);

  const byCategory = products.reduce<Record<string, Product[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const coverImage = (key: string): string => {
    const list = byCategory[key] || [];
    const preferred = list.find(p => p.image_url.includes('supabase'));
    return (preferred || list[0])?.image_url || '';
  };

  const previewProduct = (key: string): Product | null => {
    const list = byCategory[key] || [];
    return list.find(p => p.image_url.includes('supabase')) || list[0] || null;
  };

  const activeCollection = COLLECTIONS.find(c => c.key === openCollection);

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

  const visibleCollections = COLLECTIONS.filter(col => (byCategory[col.key]?.length ?? 0) > 0);

  return (
    <section id="coleccion">
      {/* ── Collection Overview ── */}
      <div className="bg-white pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-ultra uppercase text-gold-600 mb-3">Explora</p>
            <h2 className="section-title mb-4">Nuestras Colecciones</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          </div>

          {visibleCollections.length === 0 ? (
            <p className="font-body text-center text-onyx-400 py-16">Próximamente nuevas colecciones.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {visibleCollections.map(col => {
                const img = coverImage(col.key);
                const count = byCategory[col.key]?.length ?? 0;
                const preview = previewProduct(col.key);

                return (
                  <div key={col.key} className="flex flex-col">
                    {/* Collection Card */}
                    <button
                      onClick={() => setOpenCollection(col.key)}
                      className="group relative overflow-hidden aspect-[3/4] text-left focus:outline-none"
                    >
                      {img && (
                        <img
                          src={img}
                          alt={col.label}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-onyx-900/85 via-onyx-900/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="font-body text-xs tracking-ultra uppercase text-gold-400 mb-1">{col.desc}</p>
                        <h3 className="font-serif text-3xl text-white mb-1">{col.label}</h3>
                        <p className="font-body text-xs text-cream-300 mb-4">{count} {count === 1 ? 'pieza' : 'piezas'}</p>
                        <span className="inline-flex items-center gap-2 font-body text-xs tracking-wide uppercase text-white border border-white/40 px-4 py-2 group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                          Ver Colección <ChevronRight size={12} />
                        </span>
                      </div>
                    </button>

                    {/* Single Preview Product */}
                    {preview && (
                      <div className="mt-6">
                        <p className="font-body text-xs tracking-ultra uppercase text-onyx-400 mb-3 text-center">Destacado</p>
                        <ProductCard
                          product={preview}
                          onAddToCart={onAddToCart}
                          onBuyNow={onBuyNow}
                        />
                        {count > 1 && (
                          <button
                            onClick={() => setOpenCollection(col.key)}
                            className="mt-3 w-full font-body text-xs tracking-wide uppercase text-gold-600 hover:text-gold-800 transition-colors py-2 border border-cream-200 hover:border-gold-400"
                          >
                            Ver los {count} productos
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Collection Modal */}
      {activeCollection && (
        <CollectionModal
          isOpen={openCollection !== null}
          onClose={() => setOpenCollection(null)}
          label={activeCollection.label}
          products={byCategory[activeCollection.key] || []}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      )}
    </section>
  );
}
