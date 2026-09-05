import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Zap } from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';

export const AnalyzingOverlay: React.FC = () => {
  const isAnalyzing = useAuraStore((state) => state.isAnalyzing);
  const analyzingStage = useAuraStore((state) => state.analyzingStage);
  const analyzingProgress = useAuraStore((state) => state.analyzingProgress);

  if (!isAnalyzing) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-[#08080B]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center select-none"
    >
      {/* Radar Scanner Container with iQOO Yellow Energy */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        {/* Expanding concentric ripples */}
        <motion.div
          animate={{ scale: [0.8, 1.3], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border border-[#FFC000]/40"
        />
        <motion.div
          animate={{ scale: [0.6, 1.1], opacity: [0.8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.35, ease: 'easeOut' }}
          className="absolute inset-4 rounded-full border border-[#FFC000]/30"
        />

        {/* Rotating radar sweep beam */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
          className="absolute inset-2 rounded-full pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent 65%, rgba(255, 192, 0, 0.45) 100%)'
          }}
        />

        {/* Radar crosshairs */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[1px] bg-[#FFC000]/20" />
        <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-[1px] bg-[#FFC000]/20" />

        {/* Central Core */}
        <div className="relative z-10 w-16 h-16 rounded-xl bg-[#14151D] border border-[#FFC000]/60 shadow-[0_0_30px_rgba(255,192,0,0.4)] flex flex-col items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <Zap className="w-6 h-6 text-[#FFC000] fill-[#FFC000]" />
          </motion.div>
          <span className="text-[8px] font-mono font-black text-[#FFC000] mt-0.5 tracking-wider uppercase">
            MONSTER OS
          </span>
        </div>
      </div>

      {/* Main Title */}
      <h3 className="text-base font-black text-white tracking-tight flex items-center gap-1.5 uppercase font-mono">
        <span className="text-[#FFC000]">iQOO</span>
        <span>EDGE INFERENCE</span>
      </h3>

      {/* Dynamic Stage Message */}
      <motion.p
        key={analyzingStage}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-zinc-300 font-medium mt-1.5 h-6 max-w-[260px]"
      >
        {analyzingStage}
      </motion.p>

      {/* High-Performance Progress Bar */}
      <div className="w-56 mt-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-[#FFC000] animate-pulse" />
            <span>NEURAL PIPELINE</span>
          </span>
          <span className="text-[#FFC000] font-bold">{analyzingProgress}%</span>
        </div>
        <div className="w-full bg-[#181924] h-1.5 rounded-full overflow-hidden p-0.5 border border-[#27293A]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FFC000] to-[#FF5E00] rounded-full"
            style={{ width: `${analyzingProgress}%` }}
            transition={{ ease: 'linear', duration: 0.2 }}
          />
        </div>
      </div>

      {/* Simulated Sensor Signals pill */}
      <div className="flex items-center gap-2 mt-4 text-[9px] text-zinc-400 font-mono">
        <span className="px-2 py-0.5 rounded bg-[#15161F] border border-[#262838]">Acoustic dB</span>
        <span className="px-2 py-0.5 rounded bg-[#15161F] border border-[#262838]">PIR Sensors</span>
        <span className="px-2 py-0.5 rounded bg-[#15161F] border border-[#262838]">Cal-Sync</span>
      </div>
    </motion.div>
  );
};
