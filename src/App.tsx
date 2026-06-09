import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Instagram, 
  MessageCircle, 
  Sparkles, 
  Map, 
  ChevronDown, 
  PartyPopper,
  Volume2,
  VolumeX,
  Footprints,
  Flame
} from 'lucide-react';

import bgImage from './assets/images/tumbao_poster_bg_1781027248329.png';
import { SHOW_DETAILS, INSTAGRAM_PERFORMER } from './types';
import FloatingWorld from './components/FloatingWorld';
import SparkleTrail from './components/SparkleTrail';
import InteractiveShowcase from './components/InteractiveShowcase';
import InteractiveTicket from './components/InteractiveTicket';

// Target timestamp (Spain Summer Time CEST: June 19, 2026 at 20:00 CEST -> UTC+2)
const TARGET_DATE = new Date('2026-06-19T20:00:00+02:00').getTime();

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: false });
  const [copiedText, setCopiedText] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setTimeLeft((prev) => ({ ...prev, finished: true }));
        clearInterval(timer);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, finished: false });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SHOW_DETAILS.address);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);

    // Blast some kiss sparkles locally on screen!
    const triggerSparkle = new MouseEvent('click', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight * 0.8,
      bubbles: true
    });
    document.dispatchEvent(triggerSparkle);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Simple synthesized playful notification beep using browser audio synthesis (totally transparent, cute!)
    try {
      if (isMuted) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Seductive playful note slides (c-g pentatonic)
        const playNote = (freq: number, start: number, duration: number) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);
          gainNode.gain.setValueAtTime(0.08, start);
          gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration);
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + duration);
        };

        const now = ctx.currentTime;
        playNote(329.63, now, 0.25); // E4
        playNote(392.00, now + 0.12, 0.20); // G4
        playNote(523.25, now + 0.24, 0.40); // C5 (kiss note)
      }
    } catch (e) {
      // Ignored if blocking permissions
    }
  };

  const handleWAClick = () => {
    const customMsg = encodeURIComponent(SHOW_DETAILS.whatsappMessage);
    const waUrl = `https://wa.me/${SHOW_DETAILS.whatsappNumber.replace('+', '')}?text=${customMsg}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="app-root-container" 
      className="relative min-h-screen bg-[#030002] text-rose-50 antialiased font-sans select-none overflow-x-hidden"
    >
      {/* 1. MOUSE / TOUCH SPARKLES TRAIL */}
      <SparkleTrail />

      {/* 2. FLOATING FUN EMBELLISHMENTS */}
      <FloatingWorld />

      {/* 3. PARALLAX FULLSCREEN POSTER BACKGROUND */}
      <div 
        id="poster-fixed-bg"
        className="fixed inset-0 z-0 origin-center bg-cover bg-center bg-no-repeat transition-transform duration-[4000ms] pointer-events-none scale-105"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
      {/* Dark vignette tint filters overlay */}
      <div className="fixed inset-0 bg-radial-gradient(ellipse at center, transparent 20%, rgba(3,0,2,0.65) 60%, rgba(3,0,2,0.92) 100%) z-0 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-[#030002]/45 via-transparent to-[#030002]/95 z-0 pointer-events-none" />

      {/* Interactive Micro sound synthesized alert */}
      <div className="fixed top-4 right-4 z-40" id="sound-control-wrapper">
        <button
          onClick={handleMuteToggle}
          className="p-3 rounded-full bg-black/70 border border-rose-500/30 backdrop-blur-md hover:bg-rose-950/40 text-rose-300 hover:text-[#ff2d78] hover:border-[#ff2d78] active:scale-90 transition-all cursor-pointer shadow-lg shadow-rose-950/20 flex items-center justify-center"
          title={isMuted ? "Activar besos sonoros de Mariana 💋" : "Silenciar"}
          id="sound-control-btn"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-rose-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-[#ff2d78] animate-bounce" />
          )}
        </button>
      </div>

      {/* 4. MAIN CONTAINER FRAME */}
      <main className="relative z-20 flex flex-col items-center justify-center px-4 py-12 md:py-20 max-w-7xl mx-auto" id="main-content-scroll">
        
        {/* HERO TITLE ACCENT / CARS */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 max-w-2xl px-2"
          id="header-intro-box"
        >
          {/* Sparkles / Lips launcher label */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ff2d78]/15 text-[#ff5e9c] border border-[#ff2d78]/25 mb-4 shadow-lg shadow-rose-950/20">
            <Sparkles className="w-3.5 h-3.5 text-[#ffb838] animate-spin" /> Mariana Quintero en Chamberí
          </div>

          <h1 className="font-serif font-black tracking-tight leading-none text-shadow-xl text-4xl sm:text-5xl md:text-6xl text-rose-50 select-none uppercase" id="show-main-title">
            MI MUNDO <br className="xs:hidden" />
            <span className="tumbao-neon-text italic" id="neon-text-part">POR DENTRO</span>
          </h1>

          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#ffb838] font-bold text-shadow-md mt-2" id="show-subtitle">
            {SHOW_DETAILS.subtitle}
          </p>
        </motion.div>

        {/* 5. HERO EVENT CORE CARD */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full max-w-xl bg-[#13000a]/75 backdrop-blur-2xl border-2 border-rose-500/35 rounded-[36px] px-6 py-8 md:px-10 md:py-10 text-center shadow-2xl relative overflow-hidden"
          id="hero-event-section"
        >
          {/* Background internal neon splashes */}
          <div className="absolute top-0 left-12 w-32 h-32 rounded-full bg-rose-500 blur-[80px] opacity-25 pointer-events-none" />
          <div className="absolute bottom-4 right-12 w-28 h-28 rounded-full bg-amber-500 blur-[80px] opacity-20 pointer-events-none" />

          {/* Seductive visual lip borders around card */}
          <span className="absolute -top-4 -left-3 text-3xl select-none opacity-80 hover:scale-125 transition-transform cursor-pointer" id="corner-lips-tl">💋</span>
          <span className="absolute -top-3 -right-4 text-3xl select-none opacity-80 hover:scale-125 transition-transform cursor-pointer animate-pulse" id="corner-lips-tr">👄</span>
          <span className="absolute -bottom-4 -left-3 text-3xl select-none opacity-80 hover:scale-125 transition-transform cursor-pointer animate-bounce" id="corner-lips-bl">🫦</span>
          <span className="absolute -bottom-4 -right-3 text-3xl select-none opacity-80 hover:scale-125 transition-transform cursor-pointer" id="corner-lips-br">💋</span>

          {/* Sassy monologue host name */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-rose-100" id="performer-banner">
            Con la inigualable monologuista <span className="text-[#ff2d78] drop-shadow-[0_0_12px_rgba(255,45,120,0.5)] font-serif italic text-2xl md:text-3xl block mt-1 hover:scale-105 duration-300 transition-transform"><a href={SHOW_DETAILS.instagram} target="_blank" rel="noopener noreferrer">Mariana Quintero</a></span>
          </h2>

          {/* DATE BADGE IN CABARET CODES */}
          <div className="my-6 inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 bg-gradient-to-r from-rose-900/40 via-[#ff2d78]/25 to-rose-900/40 border border-[#ff2d78]/40 rounded-3xl py-4 px-6 md:px-8 shadow-inner shadow-rose-950/40 select-none w-full" id="cabaret-date-badge">
            <div className="flex items-center gap-2 text-rose-100 font-black text-sm md:text-base tracking-widest uppercase">
              <Calendar className="w-5 h-5 text-[#ff2d78] animate-bounce" />
              <span>{SHOW_DETAILS.date}</span>
            </div>
            <div className="hidden sm:block text-rose-500/40 font-bold">|</div>
            <div className="flex items-center gap-2 text-rose-100 font-black text-sm md:text-base tracking-widest uppercase">
              <Clock className="w-5 h-5 text-[#ffb838] rotate-12" />
              <span>A LAS {SHOW_DETAILS.time}</span>
            </div>
          </div>

          {/* COUNTDOWN TIMER TO CREATING EXTRA FLOW */}
          <div id="countdown-timer-box" className="mb-6">
            {!timeLeft.finished ? (
              <div className="flex justify-center items-center gap-3 md:gap-4 select-none" id="timers-grid">
                {[
                  { value: timeLeft.days, label: 'DÍAS' },
                  { value: timeLeft.hours, label: 'HORAS' },
                  { value: timeLeft.minutes, label: 'MINS' },
                  { value: timeLeft.seconds, label: 'SEGS' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center bg-black/60 border border-rose-900/35 rounded-2xl w-14 h-14 sm:w-16 sm:h-16 justify-center shadow-lg shadow-rose-950/25" id={`timer-slot-${index}`}>
                    <span className="font-mono text-lg sm:text-xl font-black text-[#ffb838] leading-none">{String(item.value).padStart(2, '0')}</span>
                    <span className="text-[8px] sm:text-[9px] font-bold text-rose-400 mt-1 uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-r from-amber-500/10 to-[#ff2d78]/10 border border-[#ff2d78]/30 py-3 rounded-2xl animate-pulse" id="countdown-finished-label">
                <p className="text-[#ffb838] font-black tracking-widest uppercase text-sm flex items-center justify-center gap-1.5">
                  <PartyPopper className="w-4 h-4 text-[#ff2d78]" /> ¡EL SHOW HA EMPEZADO / YA CASI ES HORA! 🎭
                </p>
              </div>
            )}
          </div>

          {/* FREE ADMISSION TICKER CARD */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-block relative bg-[#ffb838] text-rose-950 font-black tracking-widest text-base sm:text-lg uppercase px-6 sm:px-10 py-2.5 rounded-full shadow-lg shadow-amber-500/30 border-2 border-dashed border-white cursor-pointer rotate-[-1deg] transition-all hover:shadow-amber-500/50 mb-6"
            onClick={() => {
              const el = document.getElementById('interactive-ticket-wrapper');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            id="free-admission-badge"
          >
            <div className="absolute inset-0 bg-white/20 blur-sm rounded-full opacity-0 hover:opacity-100 transition-opacity" />
            <span className="flex items-center gap-2">
              ✨ {SHOW_DETAILS.entrance} ✨
            </span>
          </motion.div>

          {/* MAP VENUE LINK */}
          <div className="flex flex-col items-center mb-6 pl-1" id="location-teaser">
            <a 
              href={SHOW_DETAILS.mapsLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-rose-200 hover:text-yellow-400 font-semibold text-xs md:text-sm bg-rose-950/30 hover:bg-rose-950/65 border border-rose-900/40 hover:border-yellow-400/40 px-4 py-2.5 rounded-full transition-all duration-300"
              id="maps-teaser-link"
            >
              <MapPin className="w-4 h-4 text-[#ff2d78] animate-pulse" id="pin-indicator-icon" />
              <span className="truncate max-w-[260px] sm:max-w-md">C. del Gral. Álvarez de Castro, 10, Chamberí</span>
            </a>
          </div>

          {/* CORE CALL-TO-ACTIONS BLOCK */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6 w-full" id="hero-actions-grid">
            
            {/* WHATSAPP CTA */}
            <button
              onClick={handleWAClick}
              className="w-full sm:flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl py-4 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all active:scale-95 duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              id="wa-cta-btn"
            >
              <MessageCircle className="w-5 h-5 animate-pulse" /> Contactar por WhatsApp 💬
            </button>

            {/* INSTAGRAM LINK */}
            <a
              href={SHOW_DETAILS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 via-[#ff2d78] to-[#ffb838] text-white font-black text-xs md:text-sm uppercase tracking-widest rounded-2xl py-4 shadow-xl shadow-[#ff2d78]/25 hover:shadow-[#ff2d78]/40 transition-all active:scale-95 duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              id="ig-cta-btn"
            >
              <Instagram className="w-5 h-5" /> Seguir a Mariana 📸
            </a>

          </div>

          {/* WHATSAPP VISIBLE NUMBER */}
          <p className="text-[10px] text-rose-300/45 text-center mt-4 tracking-wider" id="wa-visual-phone">
            📞 WhatsApp del local: <strong onClick={handleCopyAddress} className="text-[#25D366] hover:underline cursor-pointer font-mono font-black">{SHOW_DETAILS.whatsappNumber}</strong> (Presiona para copiar dirección)
          </p>

        </motion.section>

        {/* CHEVRON INDICATION OF SCROLL */}
        <div className="flex flex-col items-center text-rose-400/30 mt-8 mb-6 cursor-pointer" id="scroll-prompt">
          <span className="text-[10px] font-bold tracking-widest uppercase">Diseño Interactivo Tumba'o</span>
          <ChevronDown className="w-5 h-5 animate-bounce mt-1" />
        </div>

        {/* 6. INTERACTIVE TICKET PASS GENERATION SECTION */}
        <InteractiveTicket />

        {/* 7. INTERACTIVE SECRET SUITCASE SHOWCASE */}
        <InteractiveShowcase />

        {/* 8. DETAILED VENUE LOCATION CARD */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl bg-black/80 border border-yellow-500/30 backdrop-blur-2xl rounded-[32px] px-6 py-8 text-center shadow-lg mb-12 select-none"
          id="detailed-venue-card"
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-amber-500/10 rounded-full border border-amber-500/30 inline-flex">
              <Map className="w-6 h-6 text-[#ffb838] animate-pulse" id="venue-map-icon" />
            </div>
          </div>

          <h3 className="text-xl font-serif font-black tracking-wide text-rose-50" id="venue-title">
            ¿DÓNDE ES EL EVENTO? 📍
          </h3>
          <p className="text-xs text-[#ffb838] font-bold uppercase tracking-widest mt-1">
            Espacio &quot;Tumba'o&quot; Madrid
          </p>
          
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-4 my-5" id="venue-address-box">
            <p className="text-sm font-semibold tracking-wide text-rose-100 leading-normal mb-1">
              {SHOW_DETAILS.address}
            </p>
            <p className="text-[11px] text-rose-400/60 leading-normal max-w-sm mx-auto">
              Corazón de Chamberí. Fácil acceso desde el metro Canal, Iglesia, o Quevedo. ¡El local tiene el mejor ambiente tropical madrileño!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center" id="location-actions">
            
            {/* GOOGLE MAPS DIRECT NAVIGATION */}
            <a
              href={SHOW_DETAILS.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-yellow-500 text-rose-950 font-black text-xs uppercase tracking-widest rounded-xl py-3 shadow-md active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
              id="maps-navigation-btn"
            >
              🗺️ Ver Ruta en Google Maps
            </a>

            {/* COPY ADDRESS SHORTCUT */}
            <button
              onClick={handleCopyAddress}
              className="bg-zinc-900 hover:bg-zinc-800 text-rose-100 border border-rose-900/40 hover:border-rose-900 font-extrabold text-xs uppercase tracking-widest rounded-xl py-3 px-5 transition-all active:scale-95 cursor-pointer"
              id="copy-address-btn"
            >
              {copiedText ? '¡Dirección Copiada! 🎉' : 'Copiar Dirección 📋'}
            </button>
            
          </div>
        </motion.section>

        {/* 9. PREMIUM FOOTER */}
        <footer className="w-full text-center border-t border-rose-900/25 pt-8 pb-4 text-xs text-rose-400/30 max-w-sm" id="landing-footer">
          <p className="flex justify-center items-center gap-1.5 font-semibold text-[10px] tracking-widest uppercase">
            <Footprints className="w-3.5 h-3.5 text-[#ff2d78]" /> MI MUNDO POR DENTRO <Flame className="w-3 h-3 text-[#ff2d78]" />
          </p>
          <p className="mt-1 leading-normal font-sans text-[10px]">
            © {new Date().getFullYear()} Monólogo de Mariana Quintero. <br />
            Entrada Libre hasta completar aforo. Se recomienda puntualidad.
          </p>
        </footer>

      </main>
    </div>
  );
}
