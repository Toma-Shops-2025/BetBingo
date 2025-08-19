import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  type: 'sparkle' | 'coin' | 'star';
}

interface Building {
  x: number;
  width: number;
  height: number;
  windows: Array<{ x: number; y: number; lit: boolean }>;
  color: string;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const buildingsRef = useRef<Building[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create cityscape buildings
    const createBuildings = () => {
      buildingsRef.current = [];
      const buildingColors = [
        '#1e1b4b', '#312e81', '#1e3a8a', '#1f2937', '#374151',
        '#4c1d95', '#581c87', '#6b21a8', '#7c2d12', '#991b1b'
      ];

      let x = 0;
      while (x < canvas.width + 100) {
        const width = Math.random() * 80 + 60;
        const height = Math.random() * 300 + 200;
        const building: Building = {
          x,
          width,
          height,
          windows: [],
          color: buildingColors[Math.floor(Math.random() * buildingColors.length)]
        };

        // Create windows
        for (let wx = 10; wx < width - 10; wx += 20) {
          for (let wy = 20; wy < height - 20; wy += 25) {
            building.windows.push({
              x: wx,
              y: wy,
              lit: Math.random() > 0.6
            });
          }
        }

        buildingsRef.current.push(building);
        x += width + Math.random() * 20 + 5;
      }
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createBuildings();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced particle colors
    const particleColors = [
      '#fbbf24', '#f59e0b', '#d97706', // Gold coins
      '#a855f7', '#9333ea', '#7c3aed', // Purple sparkles
      '#06b6d4', '#0891b2', '#0e7490', // Cyan
      '#10b981', '#059669', '#047857', // Emerald
      '#f43f5e', '#e11d48', '#be123c', // Rose
      '#ffffff', '#f8fafc', '#e2e8f0'  // White sparkles
    ];

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 80; i++) {
        const types: Array<'sparkle' | 'coin' | 'star'> = ['sparkle', 'coin', 'star'];
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 4 + 1,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          opacity: Math.random() * 0.7 + 0.3,
          type: types[Math.floor(Math.random() * types.length)]
        });
      }
    };

    createParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create dynamic gradient background
      const time = Date.now() * 0.001;
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      // Deep space-like gradient with vibrant edges
      gradient.addColorStop(0, `hsl(${240 + Math.sin(time * 0.1) * 20}, 50%, ${8 + Math.sin(time * 0.2) * 3}%)`);
      gradient.addColorStop(0.3, `hsl(${260 + Math.cos(time * 0.15) * 15}, 45%, ${12 + Math.sin(time * 0.1) * 2}%)`);
      gradient.addColorStop(0.7, `hsl(${280 + Math.sin(time * 0.08) * 25}, 40%, ${15 + Math.cos(time * 0.12) * 3}%)`);
      gradient.addColorStop(1, `hsl(${240 + Math.cos(time * 0.2) * 30}, 35%, ${10 + Math.sin(time * 0.15) * 2}%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cityscape silhouette
      buildingsRef.current.forEach((building) => {
        const buildingY = canvas.height - building.height;
        
        // Building shadow/silhouette
        ctx.fillStyle = building.color;
        ctx.fillRect(building.x, buildingY, building.width, building.height);
        
        // Building glow effect
        const glowGradient = ctx.createLinearGradient(
          building.x, buildingY,
          building.x, buildingY + building.height
        );
        glowGradient.addColorStop(0, `${building.color}88`);
        glowGradient.addColorStop(1, `${building.color}22`);
        ctx.fillStyle = glowGradient;
        ctx.fillRect(building.x - 2, buildingY - 2, building.width + 4, building.height + 4);
        
        // Animated windows
        building.windows.forEach((window) => {
          if (window.lit) {
            const intensity = 0.8 + Math.sin(time + building.x * 0.01 + window.y * 0.02) * 0.2;
            const windowColors = [
              `rgba(255, 235, 59, ${intensity})`, // Yellow
              `rgba(0, 188, 212, ${intensity})`,  // Cyan
              `rgba(156, 39, 176, ${intensity})`, // Purple
              `rgba(255, 152, 0, ${intensity})`   // Orange
            ];
            const color = windowColors[Math.floor((building.x + window.x + window.y) / 50) % windowColors.length];
            
            ctx.fillStyle = color;
            ctx.fillRect(
              building.x + window.x, 
              buildingY + window.y, 
              12, 8
            );
            
            // Window glow
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.fillRect(
              building.x + window.x, 
              buildingY + window.y, 
              12, 8
            );
            ctx.shadowBlur = 0;
          }
        });
      });

      // Update and draw enhanced particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Gentle floating effect
        particle.y += Math.sin(time + index) * 0.1;
        particle.x += Math.cos(time * 0.8 + index) * 0.05;

        // Wrap around edges
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'coin') {
          // Coin-like particle
          const coinSize = particle.size * 1.5;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, coinSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          
          // Coin inner circle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, coinSize * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff40';
          ctx.fill();
          
        } else if (particle.type === 'star') {
          // Star-shaped particle
          ctx.fillStyle = particle.color;
          ctx.translate(particle.x, particle.y);
          ctx.rotate(time + index);
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const x1 = Math.cos(angle) * particle.size;
            const y1 = Math.sin(angle) * particle.size;
            const x2 = Math.cos(angle + Math.PI / 5) * particle.size * 0.5;
            const y2 = Math.sin(angle + Math.PI / 5) * particle.size * 0.5;
            
            if (i === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.closePath();
          ctx.fill();
          
        } else {
          // Regular sparkle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          
          // Add glow effect
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = particle.size * 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        ctx.restore();

        // Draw connections between nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              const opacity = (1 - distance / 120) * 0.2;
              ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      // Add floating money symbols and game elements
      const symbols = ['💰', '🎯', '⭐', '💎', '🎲', '🏆'];
      for (let i = 0; i < 15; i++) {
        const x = (time * 20 + i * 100) % (canvas.width + 100);
        const y = 50 + Math.sin(time + i) * 30 + i * 40;
        const scale = 0.8 + Math.sin(time * 2 + i) * 0.3;
        const opacity = 0.3 + Math.sin(time + i * 0.5) * 0.2;
        
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.font = `${20 * scale}px Arial`;
        ctx.fillText(symbols[i % symbols.length], x, y);
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedBackground; 