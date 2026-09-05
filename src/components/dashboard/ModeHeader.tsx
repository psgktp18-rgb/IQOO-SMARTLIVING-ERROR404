import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Sparkles, 
  Moon, 
  ShieldCheck, 
  Flame, 
  HelpCircle,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';
import { MODE_THEMES } from '../../lib/modeEngine';
import { AuraMode } from '../../types/aura';

export const ModeHeader: React.FC = () => {
  const currentMode = useAuraStore((state) => state.currentMode);
  const confidence = useAuraStore((state) => state.confidence);
  const lastDetectedTime = useAuraStore((state) => state.lastDetectedTime);
  const setWhyPanelOpen = useAuraStore((state) => state.setWhyPanelOpen);

  const theme = MODE_THEMES[currentMode];

  const getModeIcon = (mode: AuraMode) => {
    switch (mode) {
      case 'focus': return Target;
      case 'relaxing': return Sparkles;
      case 'sleeping': return Moon;
      case 'away': return ShieldCheck;
      case 'hosting': return Flame;
      default: return BrainCircuit;
    }
  };

  const IconComponent = getModeIcon(currentMode);

  return (
    <div className="relative pt-3 pb-3 px-5 flex flex-col items-center text-center">
      {/* iQOO Aura label */}
      <div className="flex items-center gap-1.5 mb-3 px-3 py-1 rounded-lg bg-[#161722] border border-[#262838] text-[11px] text-zinc-400">
        <span className="font-semibold text-white">i<span className="text-[#FFC000]">QOO</span></span>
        <span className="text-zinc-600">/</span>
        <span className="text-[#FFC000] font-medium">Aura Living Engine</span>
      </div>

      {/* Pulsing halo */}
      <div className="relative mb-3 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
          className="absolute w-20 h-20 rounded-full"
          style={{ background: `radial-gradient(circle, ${theme.accentHex} 0%, transparent 70%)` }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-16 h-16 rounded-2xl border"
          style={{ borderColor: `${theme.accentHex}55` }}
        />
        <motion.div
          key={currentMode}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl bg-[#14151D] border"
          style={{ borderColor: `${theme.accentHex}66`, boxShadow: `0 0 25px ${theme.accentHex}30` }}
        >
          <IconComponent className="w-8 h-8" style={{ color: theme.accentHex }} />
        </motion.div>
      </div>

      {/* Mode badge */}
      <motion.div
        key={`badge-${currentMode}`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold border mb-1"
        style={{
          backgroundColor: `${theme.accentHex}15`,
          borderColor: `${theme.accentHex}40`,
          color: theme.accentHex
        }}
      >
        <Zap className="w-2.5 h-2.5" />
        {theme.badge}
      </motion.div>

      {/* Mode name */}
      <motion.h1
        key={`title-${currentMode}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[22px] font-bold text-white leading-tight"
      >
        {theme.name}
      </motion.h1>

      {/* Status */}
      <div className="flex items-center gap-2 mt-1 text-[12px] text-zinc-400">
        <span>{lastDetectedTime}</span>
        <span className="text-zinc-600">•</span>
        <span className="text-[#FFC000] font-semibold">{confidence}% confidence</span>
      </div>

      {/* Why button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setWhyPanelOpen(true)}
        className="mt-3 group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#161822] hover:bg-[#1E202E] border border-[#292D3D] transition-all"
      >
        <Zap className="w-3.5 h-3.5 text-[#FFC000]" />
        <span className="text-[12px] font-medium text-zinc-200">Why Aura chose this?</span>
        <HelpCircle className="w-3.5 h-3.5 text-zinc-500" />
      </motion.button>
    </div>
  );
};
