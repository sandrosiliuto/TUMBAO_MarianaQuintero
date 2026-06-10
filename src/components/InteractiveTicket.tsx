import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Send, Check, Sparkles, AlertCircle } from 'lucide-react';
import { SHOW_DETAILS } from '../types';
import bgImage from '../assets/images/tumbao_poster_bg_1781027248329.png';

export default function InteractiveTicket() {
  const [userName, setUserName] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('Por favor, introduce tu nombre para personalizar el pase.');
      return;
    }
    setError('');
    setIsGenerated(true);

    // Spawn massive sparkles locally!
    const clickEvent = new MouseEvent('click', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2,
      bubbles: true
    });
    document.dispatchEvent(clickEvent);
  };

  const handleSendWhatsApp = () => {
    setIsSent(true);
    const customMsg = `¡Hola! 💋 He generado mi invitación digital para el monólogo 'Mi mundo por dentro' de Mariana Quintero. Mi nombre es: *${userName}*. ¡Contad conmigo para el 19 de Junio! 👠🎙️`;
    const whatsappUrl = `https://wa.me/e/${SHOW_DETAILS.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(customMsg)}`;
    
    // Open in new window safely
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setUserName('');
    setIsGenerated(false);
    setIsSent(false);
  };

  return (
    <div 
      id="interactive-ticket-wrapper" 
      className="w-full max-w-lg mx-auto mt-6 mb-12 px-4 select-none"
    >
      <AnimatePresence mode="wait">
        {!isGenerated ? (
          <motion.div
            key="ticket-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-black/80 border-2 border-dashed border-[#ff2d78]/50 backdrop-blur-xl p-6 rounded-3xl"
            id="ticket-generation-container"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/30">
                <Ticket className="w-6 h-6 text-[#ffb838] animate-pulse" id="ticket-action-icon" />
              </div>
              <div>
                <h3 className="text-lg font-black text-rose-50 uppercase tracking-widest">
                  🎟️ PASE DIGITAL GRATUITO
                </h3>
                <p className="text-xs text-rose-200/50">
                  La entrada es libre, ¡pero puedes asegurar tu sitio generando tu pase exclusivo!
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4" id="ticket-form-el">
              <div className="relative">
                <label className="block text-[11px] font-black text-[#ff2d78] uppercase tracking-wider mb-1.5 pl-1">
                  Tu Nombre Completo / Apodo Sassy 💋
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (e.target.value.trim()) setError('');
                  }}
                  placeholder="Ej. Mariana del Médano, Marta 'La Tumba'a'..."
                  className="w-full bg-rose-950/20 text-rose-50 placeholder-rose-700 font-bold border-2 border-rose-900/40 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78]/30 transition-all text-center"
                  id="ticket-name-input"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-warning text-xs text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20" id="ticket-input-error">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff2d78] to-[#e81c8f] hover:from-[#e81c8f] hover:to-[#ff2d78] text-white font-extrabold text-sm uppercase tracking-widest rounded-2xl py-3.5 shadow-lg shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="generate-ticket-btn"
              >
                <Sparkles className="w-4 h-4 text-[#ffb838] animate-spin" /> Personalizar Mi Pase Vip 👠
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="ticket-card"
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15 }}
            className="flex flex-col items-center"
            id="ticket-result-container"
          >
            {/* VIP TICKET DRAWING */}
            <div 
              className="relative w-full max-w-sm aspect-[5/3.2] rounded-[28px] overflow-hidden shadow-2xl border-2 border-[#ffb838]/40 flex flex-col justify-between p-5 text-white select-none"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
              }}
              id="vip-ticket-graphic"
            >
              {/* Overlay shading to balance text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-purple-950/50 z-0" />
              <div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 30%, rgba(13,0,4,0.4) 100%) z-0" />

              {/* Top Row: Digital Ribbon */}
              <div className="flex justify-between items-start z-10" id="ticket-header-row">
                <span className="bg-yellow-400 text-rose-950 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-white/20">
                  VIP PASS
                </span>
                <span className="text-white/40 font-mono text-[9px] tracking-widest">
                  INV-2026-1906
                </span>
              </div>

              {/* Middle Row: Show & User Name */}
              <div className="text-center z-10" id="ticket-body-content">
                <h4 className="font-serif font-black text-lg text-rose-100 uppercase tracking-wider text-shadow-md leading-none">
                  {SHOW_DETAILS.title}
                </h4>
                <p className="font-serif italic text-xs text-[#ffb838] tracking-wide mt-0.5" id="ticket-show-subtitle">
                   Mariana Quintero
                </p>

                {/* Personalized name banner */}
                <div 
                  className="bg-black/70 border border-[#ff2d78]/40 rounded-xl px-3 py-2 mt-3.5 inline-block w-full max-w-[280px] backdrop-blur-md shadow-inner"
                  id="ticket-name-banner"
                >
                  <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest leading-none">
                    Invitado(a) de Honor
                  </p>
                  <p className="text-sm md:text-base font-black text-shadow-sm text-yellow-300 tracking-wide truncate max-w-full px-1">
                    ✨ {userName} ✨
                  </p>
                </div>
              </div>

              {/* Bottom Row: Metadata & Free Badge */}
              <div className="flex justify-between items-end z-10 border-t border-white/10 pt-2" id="ticket-footer-row">
                <div className="text-left">
                  <p className="text-[7px] text-zinc-400 font-bold uppercase tracking-wider">Fecha & Hora</p>
                  <p className="text-[10px] text-white font-extrabold">{SHOW_DETAILS.date} · {SHOW_DETAILS.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-[7px] text-rose-400 font-bold uppercase tracking-wider">Acceso</p>
                  <p className="text-[10px] text-green-400 font-extrabold tracking-wide uppercase">{SHOW_DETAILS.entrance}</p>
                </div>
              </div>

              {/* Circular side design ticket punch clips */}
              <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950 border border-[#ffb838]/20 z-10" />
              <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-950 border border-[#ffb838]/20 z-10" />
            </div>

            {/* Instruction Under Ticket */}
            <p className="text-[11px] text-[#ffb838] font-semibold mt-3 italic text-center max-w-xs leading-normal">
              📸 ¡Hazle una captura de pantalla a tu pase antes de venir para lucirlo en la entrada!
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-sm mt-5 justify-center" id="ticket-actions-row">
              <button
                onClick={handleSendWhatsApp}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl py-3 shadow-lg shadow-emerald-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="ticket-whatsapp-send-btn"
              >
                {isSent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4 animate-pulse" />}
                {isSent ? '¡Pase Enviado!' : 'Avisar por WhatsApp 💬'}
              </button>

              <button
                onClick={handleReset}
                className="bg-zinc-900 hover:bg-zinc-800 text-rose-100 font-black text-xs uppercase tracking-widest rounded-xl py-3 px-4 border border-rose-900/30 active:scale-95 transition-all transition duration-200 cursor-pointer text-center"
                id="ticket-reset-btn"
              >
                Crear Otro Pase 🔄
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
