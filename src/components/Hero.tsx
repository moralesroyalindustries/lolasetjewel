import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToCollection = () => {
    document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/banlola.png"
          alt="Lola's Jewelry Collection"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx-900/50 via-onyx-900/20 to-onyx-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/Lolas_Logo.png"
            alt="Lola's Jewelry"
            className="h-36 md:h-48 w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <div className="gold-divider w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
        <p className="font-serif text-cream-200 text-xl md:text-2xl italic tracking-wide mb-2">
          Detalles que hablan de ti
        </p>
        <p className="font-body text-cream-300 text-xs md:text-sm tracking-ultra uppercase mb-8">
          Tienda Online &bull; San Lorenzo, Puerto Rico
        </p>
        <div className="gold-divider w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-10" />

        {/* Price highlight */}
        <div className="inline-flex flex-col items-center gap-1 border border-gold-400/40 bg-onyx-900/30 backdrop-blur-sm px-8 py-4 mb-8">
          <p className="font-body text-xs tracking-ultra uppercase text-gold-400">Todos los productos desde</p>
          <p className="font-serif text-4xl text-white">$10.00</p>
          <p className="font-body text-xs tracking-widest uppercase text-cream-300">Cada pieza</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={scrollToCollection}
            className="btn-gold inline-block shadow-xl"
          >
            Ver Colección
          </button>
          <button
            onClick={scrollToCollection}
            className="btn-outline-gold inline-block shadow-xl"
          >
            Comprar Ahora
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToCollection}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream-300 animate-bounce hover:text-gold-400 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}
