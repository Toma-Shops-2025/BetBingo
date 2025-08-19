import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
}

interface AnimatedConfettiProps {
  isActive: boolean;
  onComplete?: () => void;
}

const AnimatedConfetti: React.FC<AnimatedConfettiProps> = ({ isActive, onComplete }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
    '#FF6B9D', '#C44569', '#F8B500', '#00D2D3', '#FF9F43'
  ];

  const shapes = ['circle', 'square', 'triangle'] as const;

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 100; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -50 - Math.random() * 100,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          shape: shapes[Math.floor(Math.random() * shapes.length)]
        });
      }
      setPieces(newPieces);

      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setPieces([]);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          initial={{
            x: piece.x,
            y: piece.y,
            rotate: piece.rotation,
            opacity: 1,
            scale: 0
          }}
          animate={{
            y: window.innerHeight + 100,
            rotate: piece.rotation + 360 * 3,
            opacity: [1, 1, 0],
            scale: [0, 1, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
          style={{
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'triangle' ? '0%' : '10%',
            clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined
          }}
        />
      ))}

      {/* Additional sparkle effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -20, -40]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedConfetti; 