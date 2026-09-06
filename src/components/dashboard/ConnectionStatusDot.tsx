import React from 'react';
import { motion } from 'framer-motion';

interface ConnectionStatusDotProps {
  connected: boolean;
  size?: number; // default 7px (6-8px range)
  className?: string;
}

export const ConnectionStatusDot: React.FC<ConnectionStatusDotProps> = ({
  connected,
  size = 7,
  className = ''
}) => {
  if (!connected) {
    return (
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        title="Offline / Syncing"
      >
        <span 
          style={{ width: size, height: size }}
          className="rounded-full bg-zinc-500 shadow-sm"
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      title="Connected • Live mesh"
    >
      {/* Framer Motion subtle pulse animation outer ring */}
      <motion.span
        animate={{ scale: [1, 1.8, 1], opacity: [0.75, 0, 0.75] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: size, height: size }}
        className="absolute rounded-full bg-emerald-400"
      />
      {/* Core glowing green dot */}
      <span
        style={{ width: size, height: size }}
        className="rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
      />
    </div>
  );
};
