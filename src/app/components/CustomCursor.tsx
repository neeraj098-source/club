import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<'button' | 'card' | 'text' | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastParticleTime = useRef(0);

  // Mouse position with smooth spring animation
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring config for liquid effect
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Cursor size with dynamic spring
  const cursorSize = useMotionValue(40);
  const cursorSizeSpring = useSpring(cursorSize, { damping: 25, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Create particle trail (throttled to every 50ms for performance)
      const now = Date.now();
      if (now - lastParticleTime.current > 50) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          timestamp: now,
        };
        setParticles((prev) => [...prev, newParticle]);
        lastParticleTime.current = now;
      }

      // Check what element is being hovered
      const target = e.target as HTMLElement;
      const isButton = target.closest('button, a, [role="button"]');
      const isCard = target.closest('[data-cursor="card"]');
      const isText = target.closest('h1, h2, h3, p, span');

      if (isButton) {
        setIsHovering(true);
        setHoverType('button');
        cursorSize.set(80);
      } else if (isCard) {
        setIsHovering(true);
        setHoverType('card');
        cursorSize.set(100);
      } else if (isText) {
        setIsHovering(true);
        setHoverType('text');
        cursorSize.set(60);
      } else {
        setIsHovering(false);
        setHoverType(null);
        cursorSize.set(40);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, cursorSize]);

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setParticles((prev) => prev.filter((p) => now - p.timestamp < 1000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Get cursor colors based on hover state
  const getCursorColor = () => {
    if (hoverType === 'button') return '#9D50BB'; // Electric Amethyst
    if (hoverType === 'card') return '#C39738'; // Champagne Gold
    if (hoverType === 'text') return '#FFFFFF'; // White
    return '#9D50BB'; // Default Electric Amethyst
  };

  const getParticleColor = () => {
    if (hoverType === 'button') return '#C39738';
    if (hoverType === 'card') return '#9D50BB';
    return '#9D50BB';
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        
        /* Performance optimizations for 60fps */
        @media (prefers-reduced-motion: no-preference) {
          .cursor-element {
            will-change: transform, opacity;
            backface-visibility: hidden;
            perspective: 1000px;
          }
        }
        
        /* Disable custom cursor on touch devices */
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* Particle Trail */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        <AnimatePresence>
          {particles.map((particle) => {
            const age = Date.now() - particle.timestamp;
            const progress = age / 1000; // 0 to 1

            return (
              <motion.div
                key={particle.id}
                initial={{ opacity: 0.6, scale: 0 }}
                animate={{ opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute rounded-full cursor-element"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: 8,
                  height: 8,
                  background: `radial-gradient(circle, ${getParticleColor()} 0%, transparent 70%)`,
                  boxShadow: `0 0 20px ${getParticleColor()}, 0 0 40px ${getParticleColor()}`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Main Cursor Blob */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen cursor-element"
        style={{
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute rounded-full cursor-element"
          style={{
            width: cursorSizeSpring,
            height: cursorSizeSpring,
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            rotate: isHovering ? 360 : 0,
            scale: isHovering ? [1, 1.1, 1] : 1,
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {/* Rotating gradient border */}
          <div
            className="absolute inset-0 rounded-full opacity-40 cursor-element"
            style={{
              background: `conic-gradient(from 0deg, ${getCursorColor()}, transparent, ${getCursorColor()})`,
              filter: 'blur(8px)',
            }}
          />
        </motion.div>

        {/* Main Blob */}
        <motion.div
          className="absolute rounded-full cursor-element"
          style={{
            width: cursorSizeSpring,
            height: cursorSizeSpring,
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${getCursorColor()}40 0%, ${getCursorColor()}20 50%, transparent 70%)`,
            boxShadow: `0 0 40px ${getCursorColor()}60, 0 0 80px ${getCursorColor()}30, inset 0 0 20px ${getCursorColor()}40`,
            backdropFilter: 'blur(15px)',
          }}
          animate={{
            borderRadius: isHovering
              ? ['50%', '45%', '52%', '48%', '50%']
              : ['50%', '48%', '52%', '50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Inner Core */}
        <motion.div
          className="absolute rounded-full cursor-element"
          style={{
            width: 12,
            height: 12,
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            background: getCursorColor(),
            boxShadow: `0 0 20px ${getCursorColor()}, 0 0 40px ${getCursorColor()}`,
          }}
          animate={{
            scale: isHovering ? [1, 1.5, 1] : [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Magnetic Attraction Lines (when hovering) */}
        {isHovering && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute cursor-element"
                style={{
                  left: 0,
                  top: 0,
                  width: 2,
                  height: 20,
                  background: `linear-gradient(to bottom, ${getCursorColor()}, transparent)`,
                  transformOrigin: 'top center',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}

        {/* Orbiting Particles (when hovering over cards) */}
        {hoverType === 'card' && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute rounded-full cursor-element"
                style={{
                  width: 6,
                  height: 6,
                  left: 0,
                  top: 0,
                  background: getCursorColor(),
                  boxShadow: `0 0 10px ${getCursorColor()}`,
                }}
                animate={{
                  x: [
                    0,
                    Math.cos((i * Math.PI) / 2) * 40,
                    Math.cos((i * Math.PI) / 2 + Math.PI) * 40,
                    0,
                  ],
                  y: [
                    0,
                    Math.sin((i * Math.PI) / 2) * 40,
                    Math.sin((i * Math.PI) / 2 + Math.PI) * 40,
                    0,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}

        {/* Ripple Effect (when hovering over buttons) */}
        {hoverType === 'button' && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ripple-${i}`}
                className="absolute rounded-full border-2 cursor-element"
                style={{
                  width: cursorSizeSpring,
                  height: cursorSizeSpring,
                  left: 0,
                  top: 0,
                  transform: 'translate(-50%, -50%)',
                  borderColor: getCursorColor(),
                }}
                initial={{ opacity: 0.6, scale: 0.8 }}
                animate={{
                  opacity: 0,
                  scale: 2,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}

        {/* Text Highlight Effect */}
        {hoverType === 'text' && (
          <motion.div
            className="absolute cursor-element"
            style={{
              width: cursorSizeSpring,
              height: cursorSizeSpring,
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
              mixBlendMode: 'overlay',
              backdropFilter: 'invert(0.1) brightness(1.2)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>
    </>
  );
}