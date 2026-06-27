import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export default function CollectionModal({
  isOpen,
  onClose,
  label,
  products,
  onAddToCart,
  onBuyNow,
}: CollectionModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-start justify-center modal-overlay bg-onyx-900/70"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-6xl max-h-[92vh] mt-10 mx-4 overflow-hidden flex flex-col shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-cream-200 bg-white flex-shrink-0">
          <div>
            <p className="font-body text-xs tracking-ultra uppercase text-gold-600 mb-1">Colección</p>
            <h2 className="font-serif text-3xl text-onyx-800">{label}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-cream-300 text-onyx-500 hover:border-onyx-800 hover:text-onyx-800 transition-colors"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Products */}
        <div className="overflow-y-auto flex-1 p-8">
          {products.length === 0 ? (
            <p className="font-body text-center text-onyx-400 py-16">No hay productos disponibles.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p, q) => { onAddToCart(p, q); onClose(); }}
                  onBuyNow={(p, q) => { onBuyNow(p, q); onClose(); }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
