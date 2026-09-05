import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu } from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';
import { MODE_THEMES } from '../../lib/modeEngine';

export const PredictivePill: React.FC = () => {
  const predictedNext = useAuraStore((state) => state.predictedNext);
  const nextTheme = MODE_THEMES[predictedNext.mode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mx-5 mb-3 p-2.5 rounded-xl bg-[#13141C] border border-[#232635] flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <div className="w-6 h-6 rounded-lg bg-[#1B1D27] border border-[#2D3042] flex items-center justify-center shrink-0">
          <Cpu className="w-3.5 h-3.5 text-[#FFC000]" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-300">
            <span className="text-zinc-400">Predicted next:</span>
            <span className="font-semibold" style={{ color: nextTheme.accentHex }}>
              {nextTheme.name}
            </span>
            <span className="text-zinc-500 text-[10px]">in ~{predictedNext.inMinutes}m</span>
          </div>
          <p className="text-[10px] text-zinc-500 truncate">
            {predictedNext.rationale}
          </p>
        </div>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
    </motion.div>
  );
};
