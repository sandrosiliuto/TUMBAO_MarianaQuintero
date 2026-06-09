import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SparkleParticle {
  id: string;
  emoji: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
}

const TRAIL_EMOJIS = ['✨', '💋', '💖', '👄', '💄', '🫦', '🌟'];

export default function SparkleTrail() {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const spawnParticle = (x: number, y: number, isBig = false) => {
      const id = `particle-${Date.now()}-${Math.random()}`;
      const emoji = TRAIL_EMOJIS[Math.floor(Math.random() * TRAIL_EMOJIS.length)];
      
      // Random dispersion angle & direction
      const angle = Math.random() * Math.PI * 2;
      const speed = isBig ? 4 + Math.random() * 6 : 2 + Math.random() * 3;
      const dx = Math.cos(angle) * speed * 20;
      const dy = Math.sin(angle) * speed * 20 - (isBig ? 40 : 15); // float upwards slightly

      const particle: SparkleParticle = {
        id,
        emoji,
        x,
        y,
        dx,
        dy,
        size: isBig ? 24 + Math.random() * 16 : 14 + Math.random() * 10,
      };

      setParticles((prev) => [...prev, particle]);

      // Reap particle
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 700);
    };

    // Spawn on mouse move (debounced to save performance)
    const handleMouseMove = (e: MouseEvent) => {
      if (debounceTimer) return;
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
      }, 55);

      spawnParticle(e.clientX, e.clientY, false);
    };

    // Spawn on mobile touch-move
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        spawnParticle(touch.clientX, touch.clientY, false);
      }
    };

    // Spawn an exciting burst of particles on click
    const handleClick = (e: MouseEvent) => {
      const bursts = window.innerWidth < 768 ? 6 : 12;
      for (let i = 0; i < bursts; i++) {
        spawnParticle(e.clientX, e.clientY, true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div 
      id="sparkle-trail-canvas" 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            id={p.id}
            key={p.id}
            initial={{ opacity: 1, scale: 0.8, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{ 
              opacity: 0, 
              scale: 0.2, 
              x: p.x + p.dx - p.size / 2, 
              y: p.y + p.dy - p.size / 2,
              rotate: Math.random() > 0.5 ? 180 : -180
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              fontSize: `${p.size}px`,
              pointerEvents: 'none',
              lineHeight: 1,
              userSelect: 'none',
              filter: 'drop-shadow(0 2px 8px rgba(244, 63, 94, 0.45))',
            }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
