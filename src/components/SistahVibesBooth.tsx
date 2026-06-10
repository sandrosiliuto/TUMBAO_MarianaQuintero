import { useState } from 'react';
import { motion } from 'motion/react';
import { Disc, Music, Instagram, Sparkles, Volume2, Flame, Play, Pause } from 'lucide-react';
import { SHOW_DETAILS } from '../types';

interface SoundPad {
  id: string;
  name: string;
  emoji: string;
  frequency: number;
  type: 'sine' | 'square' | 'sawtooth' | 'triangle';
  color: string;
  shadow: string;
}

const SOUNDS: SoundPad[] = [
  { id: 'kiss', name: 'Kiss Synth 💋', emoji: '💋', frequency: 587.33, type: 'sine', color: 'bg-rose-600', shadow: 'shadow-rose-500/50' },
  { id: 'heels', name: 'Heels Stomp 👠', emoji: '👠', frequency: 110.00, type: 'triangle', color: 'bg-[#ff2d78]', shadow: 'shadow-[#ff2d78]/50' },
  { id: 'dance', name: 'Caribbean Bass', emoji: '🌴', frequency: 82.41, type: 'sawtooth', color: 'bg-emerald-500', shadow: 'shadow-emerald-500/50' },
  { id: 'dub', name: 'Parrot Dub 🦜', emoji: '🦜', frequency: 880.00, type: 'sine', color: 'bg-[#ffb838]', shadow: 'shadow-amber-500/50' },
  { id: 'sassy', name: 'Sassy Siren 🚨', emoji: '🫦', frequency: 440.00, type: 'square', color: 'bg-purple-600', shadow: 'shadow-purple-500/50' },
  { id: 'stocking', name: 'Ritmo Red 🧦', emoji: '❤️‍🔥', frequency: 220.00, type: 'triangle', color: 'bg-fuchsia-600', shadow: 'shadow-fuchsia-500/50' },
];

export default function SistahVibesBooth() {
  const [activePad, setActivePad] = useState<string | null>(null);
  const [isPlayingMix, setIsPlayingMix] = useState(false);
  const [autoBeatTimer, setAutoBeatTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  // Play a dynamic sound node using Web Audio API on click
  const triggerSassySound = (pad: SoundPad) => {
    setActivePad(pad.id);
    setTimeout(() => setActivePad(null), 300);

    // Click trigger for global sparkles too!
    const triggerSparkle = new MouseEvent('click', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight * 0.7,
      bubbles: true
    });
    document.dispatchEvent(triggerSparkle);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = pad.type;
      
      const now = ctx.currentTime;
      
      // Pitch slides / modular sweeps to keep it extremely fun and game-like
      if (pad.id === 'kiss') {
        // Kiss upward slide
        osc.frequency.setValueAtTime(pad.frequency, now);
        osc.frequency.exponentialRampToValueAtTime(pad.frequency * 2.2, now + 0.35);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      } else if (pad.id === 'heels') {
        // Deep kick stomp drop
        osc.frequency.setValueAtTime(pad.frequency * 1.5, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
        gainNode.gain.setValueAtTime(0.18, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      } else if (pad.id === 'dub') {
        // High playful dub siren slide
        osc.frequency.setValueAtTime(pad.frequency, now);
        osc.frequency.linearRampToValueAtTime(300, now + 0.5);
        gainNode.gain.setValueAtTime(0.06, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      } else {
        // Regular synthesizer slide
        osc.frequency.setValueAtTime(pad.frequency, now);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      }

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {
      console.warn('Audio Context blocked or not supported yet due to gesture rules.');
    }
  };

  // Toggle automatic party loop beat simulator
  const togglePlayAutoMix = () => {
    if (isPlayingMix) {
      if (autoBeatTimer) clearInterval(autoBeatTimer);
      setAutoBeatTimer(null);
      setIsPlayingMix(false);
    } else {
      setIsPlayingMix(true);
      let step = 0;
      const interval = setInterval(() => {
        const beatSounds = SOUNDS;
        // Cycle active note
        const selectedPad = beatSounds[step % beatSounds.length];
        triggerSassySound(selectedPad);
        step += 1;
      }, 350);
      setAutoBeatTimer(interval);
    }
  };

  return (
    <div 
      id="sistah-vibes-booth-wrapper" 
      className="w-full max-w-xl mx-auto mt-10 mb-12 px-4 select-none text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-b from-[#0f000c] to-[#050004] border-2 border-amber-500/40 rounded-[34px] px-6 py-7 shadow-2xl relative overflow-hidden"
        id="dj-booth-card"
      >
        {/* Neon tropical light rays */}
        <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-amber-500 blur-[90px] opacity-25 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#ff2d78] blur-[90px] opacity-20 pointer-events-none" />

        {/* Vintage Neon Sign header */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-[#ffb838]/20 text-[#ffb838] border border-[#ffb838]/30">
            <Volume2 className="w-3 h-3 text-[#ff2d78] animate-bounce" /> Afterparty asegurado
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-rose-50 tracking-wide mt-2">
            🎧 DJ <span className="text-[#ffb838] underline decoration-[#ff2d78] decoration-2">SISTAH VIBES</span>
          </h3>
          <p className="text-xs text-rose-200/60 mt-1 max-w-sm mx-auto leading-relaxed">
            La diversión no acaba con las risas. A partir de las <strong className="text-yellow-300">22:00 h</strong>, la noche se llena de puro ritmo Afro, Dancehall y Reggae.
          </p>
        </div>

        {/* Dynamic Dual Vinyl Turntables & Equalizer */}
        <div className="flex justify-around items-center gap-4 bg-black/60 border border-amber-500/20 p-4 rounded-3xl mb-6 relative" id="mixer-deck-frame">
          
          {/* Deck 1 (Spinning Vinyl) */}
          <div className="relative flex flex-col items-center">
            <motion.div 
              animate={{ rotate: isPlayingMix ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center relative shadow-lg shadow-black/80"
              id="left-vinyl"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-2 rounded-full border border-zinc-700/55" />
              <div className="absolute inset-4 rounded-full border border-zinc-700/40" />
              <div className="w-6 h-6 rounded-full bg-[#ff2d78] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>
            </motion.div>
            <span className="text-[9px] font-bold tracking-widest text-[#ff2d78] mt-2 font-mono">DECK A</span>
          </div>

          {/* Equalizer Pulsating Spectrum */}
          <div className="flex items-end gap-1.5 h-12 px-3 justify-center text-center" id="equalizer-bars">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: activePad || isPlayingMix 
                    ? [12, 12 + Math.random() * 32, 8, 12] 
                    : [12, 14, 12]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.25 + (i * 0.05),
                  ease: 'easeInOut'
                }}
                className={`w-1.5 rounded-t-sm ${
                  i % 3 === 0 ? 'bg-[#ff2d78]' : i % 3 === 1 ? 'bg-[#ffb838]' : 'bg-emerald-500'
                }`}
              />
            ))}
          </div>

          {/* Deck 2 (Spinning Vinyl) */}
          <div className="relative flex flex-col items-center">
            <motion.div 
              animate={{ rotate: isPlayingMix ? -360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center relative shadow-lg shadow-black/80"
              id="right-vinyl"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-2 rounded-full border border-zinc-700/55" />
              <div className="absolute inset-4 rounded-full border border-zinc-700/40" />
              <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>
            </motion.div>
            <span className="text-[9px] font-bold tracking-widest text-amber-500 mt-2 font-mono">DECK B</span>
          </div>

        </div>

        {/* Master Play Stop Autobeat */}
        <div className="mb-6 flex justify-center" id="autobeat-control">
          <button
            onClick={togglePlayAutoMix}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
              isPlayingMix 
                ? 'bg-[#ff2d78] text-white shadow-lg shadow-[#ff2d78]/30 border border-[#ff2d78]/40 scale-105'
                : 'bg-[#ffb838] text-rose-950 hover:bg-yellow-400 shadow-md border border-white/20'
            }`}
            id="autobeat-btn animate-pulse"
          >
            {isPlayingMix ? (
              <>
                <Pause className="w-4 h-4 fill-white" /> Pausar Beat 🛑
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-rose-950" /> Lanzar Auto Beat 🌴
              </>
            )}
          </button>
        </div>

        {/* The Sound Pads grid */}
        <div className="grid grid-cols-3 gap-3 mb-6" id="dj-pads-grid">
          {SOUNDS.map((pad) => {
            const isActive = activePad === pad.id;
            return (
              <button
                key={pad.id}
                onClick={() => triggerSassySound(pad)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-150 transform cursor-pointer border active:scale-90 ${pad.color} ${pad.shadow} ${
                  isActive 
                    ? 'scale-110 ring-2 ring-white border-white' 
                    : 'bg-opacity-20 border-white/10 hover:bg-opacity-40 hover:border-white/25'
                }`}
                id={`pad-${pad.id}`}
              >
                <span className="text-2xl animate-pulse select-none">{pad.emoji}</span>
                <span className="text-[9px] font-extrabold text-white mt-1.5 truncate max-w-full tracking-wider">
                  {pad.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* DJ Call to Action Instagram link */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-3 border-t border-white/10" id="dj-action-row">
          <a
            href={SHOW_DETAILS.djInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 bg-gradient-to-r from-purple-700 to-[#ff2d78] text-white font-black text-xs uppercase tracking-widest rounded-xl py-3.5 shadow-md flex items-center justify-center gap-2 hover:scale-[1.03] duration-200"
            id="dj-follow-btn"
          >
            <Instagram className="w-4 h-4" /> Seguir a Sistah Vibes 📸
          </a>
          
          <button
            onClick={() => {
              // Custom WhatsApp message
              const customWajoint = `¡Hola! 💋 Contad conmigo tanto para Poesía y experiencias eróticamente divertidas 'Mi mundo por dentro' de Mariana Quintero como para la sesión de DJ de Sistah Vibes del 19 de Junio en El Médano, Tenerife. ✨👠🍹`;
              const waUrl = `https://wa.me/${SHOW_DETAILS.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(customWajoint)}`;
              window.open(waUrl, '_blank', 'noopener,noreferrer');
            }}
            className="w-full sm:flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl py-3.5 shadow-md flex items-center justify-center gap-2 hover:scale-[1.03] duration-200 cursor-pointer"
            id="dj-reserve-btn"
          >
            Reservar Espacio Gratis 💬
          </button>
        </div>

      </motion.div>
    </div>
  );
}
