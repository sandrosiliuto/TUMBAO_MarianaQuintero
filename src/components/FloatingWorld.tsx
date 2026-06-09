import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { FloatingAsset } from '../types';

const EMOJIS = [
  { emoji: '💋', type: 'kiss' as const, weight: 8 },
  { emoji: '👄', type: 'mouth' as const, weight: 6 },
  { emoji: '💄', type: 'lipstick' as const, weight: 7 },
  { emoji: '👠', type: 'heels' as const, weight: 8 },
  { emoji: '❤️‍🔥', type: 'heart' as const, weight: 5 },
  { emoji: '✨', type: 'sparkle' as const, weight: 10 },
  { emoji: '🫦', type: 'mouth' as const, weight: 5 },
  { emoji: '🧦', type: 'stocking' as const, weight: 4 }, // representing stockings
  { emoji: '💅', type: 'sparkle' as const, weight: 4 },
  { emoji: '🍷', type: 'heart' as const, weight: 3 },
  { emoji: '🎀', type: 'sparkle' as const, weight: 4 },
];

export default function FloatingWorld() {
  const [elements, setElements] = useState<FloatingAsset[]>([]);

  // Mouse positional springs for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Collect weighted emojis
    const pool: { emoji: string; type: any }[] = [];
    EMOJIS.forEach((item) => {
      for (let i = 0; i < item.weight; i++) {
        pool.push({ emoji: item.emoji, type: item.type });
      }
    });

    const count = window.innerWidth < 768 ? 16 : 30;
    const generated: FloatingAsset[] = [];

    for (let i = 0; i < count; i++) {
      const selected = pool[Math.floor(Math.random() * pool.length)];
      // Ensure items are nicely spread and don't bunch up all at center
      const x = Math.random() * 92 + 4; // 4% to 96%
      const topOffset = Math.random() * 85 + 5; // 5% to 90%

      generated.push({
        id: `float-${i}-${Math.random().toString(36).substr(2, 9)}`,
        emoji: selected.emoji,
        type: selected.type,
        x,
        y: topOffset,
        scale: 0.6 + Math.random() * 0.9,
        duration: 4 + Math.random() * 8, // float duration in seconds
        delay: Math.random() * -5, // pre-delay to avoid sync pop-in
        rotation: (Math.random() - 0.5) * 60, // -30 to +30 deg
      });
    }
    setElements(generated);

    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Normalise mouse to ranges -30 to 30px
      const normX = ((e.clientX / width) - 0.5) * 45;
      const normY = ((e.clientY / height) - 0.5) * 45;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      id="floating-world-container" 
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
    >
      {elements.map((el, i) => {
        // Different layers have different parallax sensitivity
        const factor = 0.2 + (i % 4) * 0.25; 
        
        // Define floating path animations
        const bounceAnimation = {
          y: [
            '0px', 
            `${-20 - Math.random() * 20}px`, 
            `${10 + Math.random() * 10}px`, 
            '0px'
          ],
          x: [
            '0px', 
            `${(Math.random() - 0.5) * 30}px`, 
            `${(Math.random() - 0.5) * -20}px`, 
            '0px'
          ],
          rotate: [
            el.rotation,
            el.rotation + (Math.random() > 0.5 ? 15 : -15),
            el.rotation + (Math.random() > 0.5 ? -10 : 10),
            el.rotation
          ],
        };

        return (
          <motion.div
            id={el.id}
            key={el.id}
            style={{
              position: 'absolute',
              left: `${el.x}%`,
              top: `${el.y}%`,
              scale: el.scale,
              transformOrigin: 'center',
              display: 'inline-block',
              filter: 'drop-shadow(0 6px 12px rgba(225, 29, 72, 0.35))',
              // Apply parallax spring coordinates
              x: parallaxX.get() * factor,
              // Combine active baseline float offset + parallax offset
              y: parallaxY.get() * factor,
            }}
            animate={bounceAnimation}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: el.delay,
            }}
            className="text-3xl md:text-4xl transition-all select-none"
            aria-hidden="true"
          >
            {el.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
