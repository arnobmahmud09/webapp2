
import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorTracker: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Use MotionValues for high-frequency updates without React re-renders
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast but smooth spring config for the outer ring
  const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    const target = e.target as HTMLElement;
    // Check if hovering over interactive elements
    const isClickable = 
      window.getComputedStyle(target).cursor === 'pointer' || 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button');
      
    setIsPointer(!!isClickable);
  }, [cursorX, cursorY]);

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [moveCursor]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Main Cursor Dot - Glued to mouse (No Spring for instant feel) */}
      <motion.div
        className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Outer Ring - Snappy trailing effect */}
      <motion.div
        className="absolute w-10 h-10 border border-blue-500/60 rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPointer ? 1.6 : 1,
          backgroundColor: isPointer ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
          borderWidth: isPointer ? '1px' : '2px',
        }}
      />
      
      {/* Trail Glow / Flare - Soft following glow */}
      <motion.div
        className="absolute w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};

export default CursorTracker;
