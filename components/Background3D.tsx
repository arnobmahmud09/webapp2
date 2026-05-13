
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkle: number;
  colorType: number;
}

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const stars = useRef<Star[]>([]);
  
  // Parallax Logic - High Sensitivity Configuration
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 100 }; // More fluid movement
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const starCount = window.innerWidth < 768 ? 250 : 700;

    const initStars = () => {
      stars.current = [];
      for (let i = 0; i < starCount; i++) {
        stars.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * width, 
          size: Math.random() * 1.5 + 0.2, // Smaller stars
          opacity: Math.random() * 0.3 + 0.1, // Lower visibility (0.1 - 0.4)
          twinkle: Math.random() * 0.03,
          colorType: Math.random()
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Map mouse to -1 to 1
      const targetX = (e.clientX / width) * 2 - 1;
      const targetY = (e.clientY / height) * 2 - 1;
      mouseX.set(targetX);
      mouseY.set(targetY);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      const isDark = document.documentElement.classList.contains('dark');
      
      // Dynamic parallax multipliers - EXTREME SENSITIVITY (180 multiplier)
      const pX = smoothX.get() * 180;
      const pY = smoothY.get() * 180;

      stars.current.forEach((star, i) => {
        // Star movement based on depth
        const zFactor = 1 - (star.z / width);
        const x = star.x + pX * zFactor;
        const y = star.y + pY * zFactor;
        
        // Wrap around logic
        let drawX = x % width;
        let drawY = y % height;
        if (drawX < 0) drawX += width;
        if (drawY < 0) drawY += height;

        const s = star.size;
        const currentOpacity = star.opacity + Math.sin(time * 0.002 + i) * star.twinkle;

        let color = isDark ? '255, 255, 255' : '37, 99, 235';
        if (star.colorType > 0.8 && isDark) color = '147, 197, 253';
        if (star.colorType > 0.95 && isDark) color = '192, 132, 252';

        ctx.beginPath();
        ctx.arc(drawX, drawY, s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentOpacity})`;
        ctx.fill();

        // Connected lines near mouse (More subtle)
        const dx = mousePos.current.x - drawX;
        const dy = mousePos.current.y - drawY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(drawX, drawY);
          ctx.lineTo(mousePos.current.x, mousePos.current.y);
          ctx.strokeStyle = `rgba(${isDark ? '148, 163, 184' : '37, 99, 235'}, ${(1 - dist / 150) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // Very slow floating drift
      stars.current.forEach(star => {
        star.y -= 0.05;
        if (star.y < 0) star.y = height;
      });

      requestAnimationFrame((t) => draw(t));
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    draw(0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, smoothX, smoothY]);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none bg-slate-50 dark:bg-[#020617] transition-colors duration-700">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-100"
      />
      
      {/* Subdued Cinematic Nebula Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
      
      {/* Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/20 dark:to-slate-950/40" />
    </div>
  );
};

export default Background3D;
