import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Sparkles, Footprints, Flame, GlassWater, Eye } from 'lucide-react';
import { LIPSTICK_SHADES, LipstickShade, SASSY_QUOTES, SassyQuote } from '../types';

export default function InteractiveShowcase() {
  const [selectedShade, setSelectedShade] = useState<LipstickShade | null>(null);
  const [activeItem, setActiveItem] = useState<'lipstick' | 'heels' | 'wine' | 'mirror' | null>(null);
  const [randomQuote, setRandomQuote] = useState<SassyQuote | null>(null);

  const handleLipstickClick = (shade: LipstickShade) => {
    setSelectedShade(shade);
    setActiveItem('lipstick');
    
    // Find a matching sassy quote
    const matches = SASSY_QUOTES.filter(q => q.category === 'makeup' || q.category === 'tumbao');
    const random = matches[Math.floor(Math.random() * matches.length)];
    setRandomQuote(random);
  };

  const handleItemSelect = (item: 'heels' | 'wine' | 'mirror') => {
    setActiveItem(item);
    setSelectedShade(null);

    let category: 'tacones' | 'amor' | 'tumbao' = 'tumbao';
    if (item === 'heels') category = 'tacones';
    if (item === 'wine') category = 'amor';

    const matches = SASSY_QUOTES.filter(q => q.category === category);
    const random = matches[Math.floor(Math.random() * matches.length)];
    setRandomQuote(random);
  };

  return (
    <div 
      id="interactive-showcase-wrapper" 
      className="w-full max-w-xl mx-auto mt-12 mb-10 px-4 select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative bg-black/75 border border-[#ff2d78]/40 backdrop-blur-2xl px-6 py-6 rounded-3xl overflow-hidden shadow-2xl shadow-rose-950/20"
        id="makeup-suitcase-box"
      >
        {/* Subtle decorative lights like a makeup table */}
        <div className="absolute top-2 inset-x-0 flex justify-around opacity-45 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          ))}
        </div>

        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-[#ff2d78]/20 text-[#ff2d78] border border-[#ff2d78]/30">
            <Sparkles className="w-3 h-3 text-[#ffb838]" id="title-sparkle" /> Interactivo
          </span>
          <h3 className="text-xl md:text-2xl font-black text-rose-50 text-shadow-sm mt-1">
            💄 LA MALETA SECRETA
          </h3>
          <p className="text-xs text-rose-200/60 mt-1 max-w-sm mx-auto">
            Explora el tocador y la maleta de Mariana. Toca un objeto erótico del poster para revelar secretos picantes del show.
          </p>
        </div>

        {/* Suitcase Slots Representation */}
        <div className="grid grid-cols-4 gap-3 mb-6" id="suitcase-slots">
          
          {/* Heels Slot */}
          <button
            onClick={() => handleItemSelect('heels')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
              activeItem === 'heels'
                ? 'bg-[#ff2d78]/35 border-[#ff2d78] shadow-lg shadow-[#ff2d78]/25 scale-105'
                : 'bg-rose-950/20 border-rose-900/40 hover:bg-rose-900/20 hover:border-rose-700/50'
            }`}
            id="slot-heels"
          >
            <Footprints className="w-7 h-7 text-[#ff2d78] drop-shadow-[0_0_8px_rgba(255,45,120,0.6)] animate-bounce" />
            <span className="text-[10px] text-rose-100 font-semibold mt-1.5">Tacones</span>
          </button>

          {/* Lipsticks / Shades Slot */}
          <button
            onClick={() => {
              // Select default lipstick shade if clicked Slot directly
              handleLipstickClick(LIPSTICK_SHADES[0]);
            }}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
              activeItem === 'lipstick'
                ? 'bg-[#e81c8f]/35 border-[#e81c8f] shadow-lg shadow-[#e81c8f]/25 scale-105'
                : 'bg-rose-950/20 border-rose-900/40 hover:bg-rose-900/20 hover:border-rose-700/50'
            }`}
            id="slot-lipstick"
          >
            <Palette className="w-7 h-7 text-[#e81c8f] drop-shadow-[0_0_8px_rgba(232,28,143,0.6)] rotate-12" />
            <span className="text-[10px] text-rose-100 font-semibold mt-1.5">Labial</span>
          </button>

          {/* Wine Slot */}
          <button
            onClick={() => handleItemSelect('wine')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
              activeItem === 'wine'
                ? 'bg-amber-500/20 border-amber-500/50 shadow-lg shadow-amber-500/10 scale-105'
                : 'bg-rose-950/20 border-rose-900/40 hover:bg-rose-900/20 hover:border-rose-700/50'
            }`}
            id="slot-wine"
          >
            <GlassWater className="w-7 h-7 text-[#ffb838] drop-shadow-[0_0_8px_rgba(255,184,56,0.6)]" />
            <span className="text-[10px] text-rose-100 font-semibold mt-1.5">Vino</span>
          </button>

          {/* Mirror / Show Intro Slot */}
          <button
            onClick={() => handleItemSelect('mirror')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
              activeItem === 'mirror'
                ? 'bg-rose-500/20 border-rose-400/50 shadow-lg shadow-rose-400/10 scale-105'
                : 'bg-rose-950/20 border-rose-900/40 hover:bg-rose-900/20 hover:border-rose-700/50'
            }`}
            id="slot-mirror"
          >
            <Eye className="w-7 h-7 text-rose-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
            <span className="text-[10px] text-rose-100 font-semibold mt-1.5">Mirada</span>
          </button>
        </div>

        {/* Lipstick shade palette toggling - only if activeItem is lipstick */}
        {activeItem === 'lipstick' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-col items-center gap-2 bg-rose-950/20 p-3 rounded-2xl border border-rose-900/30 mb-5"
            id="shade-selector"
          >
            <span className="text-[10px] font-bold text-rose-300 text-shadow uppercase tracking-wider">Prueba un Tono de Labial 💋</span>
            <div className="flex gap-4">
              {LIPSTICK_SHADES.map((shade) => (
                <button
                  key={shade.id}
                  onClick={() => handleLipstickClick(shade)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform duration-200 cursor-pointer ${
                    selectedShade?.id === shade.id 
                    ? 'border-yellow-400 scale-125 ring-2 ring-rose-400/30' 
                    : 'border-white/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: shade.hex }}
                  title={shade.name}
                  id={`shade-btn-${shade.id}`}
                />
              ))}
            </div>
            {selectedShade && (
              <span className="text-[11px] font-extrabold text-[#ffb838] mt-1 italic">
                {selectedShade.name}
              </span>
            )}
          </motion.div>
        )}

        {/* Display screen of the Secret Suitcase */}
        <div className="relative min-h-[140px] flex items-center justify-center p-4 bg-gradient-to-br from-rose-950/50 to-purple-950/45 rounded-2xl border border-[#ff2d78]/20 overflow-hidden" id="showcase-screen">
          
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem + (selectedShade?.id || '')}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center w-full flex flex-col items-center justify-center"
                id="active-showcase-panel"
              >
                {/* Specific details */}
                {activeItem === 'lipstick' && selectedShade && (
                  <div className="mb-2" id="shade-flavor-text">
                    <p className="text-[11px] text-rose-200/90 leading-relaxed font-semibold max-w-sm px-2">
                       &quot;{selectedShade.flavorText}&quot;
                    </p>
                  </div>
                )}

                {/* Sassy Quote Box */}
                {randomQuote && (
                  <div className="relative p-3 rounded-xl border border-[#ff2d78]/20 bg-rose-950/20 max-w-md w-full" id="quote-display-box">
                    <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[8px] font-black uppercase text-rose-50 bg-[#ff2d78]/80 max-w-[150px] truncate" id="quote-tag">
                      {randomQuote.tag}
                    </span>
                    <p className="text-sm md:text-base font-bold text-rose-50 leading-relaxed italic mt-2 text-shadow-sm">
                      &ldquo;{randomQuote.text}&rdquo;
                    </p>
                  </div>
                )}
                
                {/* Micro CTA to click WhatsApp */}
                <span className="text-[9px] text-pink-400/50 mt-4 tracking-tight flex items-center gap-1">
                  <Flame className="w-2.5 h-2.5 text-[#ff2d78]" /> Comenta esta frase con Mariana de risas el 19 de Junio!
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6 px-4"
                id="showcase-placeholder"
              >
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-[#ff2d78] blur-xl opacity-30 animate-pulse rounded-full" />
                  <span className="text-4xl animate-bounce inline-block" role="img" aria-label="Lips">💋</span>
                </div>
                <h4 className="text-sm font-black text-rose-200 uppercase tracking-widest">
                  La maleta está cerrada
                </h4>
                <p className="text-xs text-rose-300/50 max-w-xs mt-1 leading-normal">
                  Toca cualquiera de los 4 espacios de arriba para desempacar la diversión y los secretos eróticos de Mariana.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
