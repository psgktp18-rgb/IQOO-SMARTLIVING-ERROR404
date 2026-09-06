import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeSplashScreenProps {
  onEnter: () => void;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({ onEnter }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnter();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-50 bg-[#0C0D12] flex flex-col justify-between p-6 overflow-hidden select-none"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FFC000]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Progress Countdown Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A1C29]">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'linear' }}
          className="h-full bg-[#FFC000]"
        />
      </div>

      {/* Top Header */}
      <div className="pt-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161822] border border-[#272A3B] text-[11px] font-semibold text-zinc-300"
        >
          <span className="w-2 h-2 rounded-full bg-[#FFC000] animate-pulse" />
          iQOO SMART LIVING HACKATHON 2026
        </motion.div>
      </div>

      {/* Center Hero Content */}
      <div className="my-auto flex flex-col items-center text-center">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 rounded-3xl bg-[#14151E] border border-[#2A2E40] flex items-center justify-center shadow-2xl shadow-[#FFC000]/10">
            <Zap className="w-12 h-12 text-[#FFC000]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-[#1D202D] border border-[#33384F] flex items-center justify-center text-cyan-400 shadow-md">
            <Cpu className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-white tracking-tight"
        >
          iQOO <span className="text-[#FFC000]">Aura</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-xs font-semibold uppercase tracking-widest text-[#FFC000] mt-1"
        >
          Smart Living Context Engine
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-zinc-400 max-w-[280px] mt-3 leading-relaxed"
        >
          An edge-AI prototype built with <span className="text-white font-medium">simple, lightweight algorithms</span> for instant mode detection & home automation.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-6 flex flex-col gap-2 w-full max-w-[290px]"
        >
          <div className="p-2.5 rounded-xl bg-[#141620] border border-[#232636] flex items-center gap-3 text-left">
            <div className="w-7 h-7 rounded-lg bg-[#1D202E] flex items-center justify-center shrink-0">
              <Cpu className="w-3.5 h-3.5 text-[#FFC000]" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">Simple Deterministic Algorithm</p>
              <p className="text-[10px] text-zinc-400">Weighted Scoring without heavy cloud AI</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#141620] border border-[#232636] flex items-center gap-3 text-left">
            <div className="w-7 h-7 rounded-lg bg-[#1D202E] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">Instant Home Sync</p>
              <p className="text-[10px] text-zinc-400">Controls lighting, climate, locks & audio</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Launch Button & Auto-timer hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pb-4 pt-2"
      >
        <button
          onClick={onEnter}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#FFC000] hover:bg-[#E6AD00] active:scale-[0.98] text-black font-bold text-sm transition-all shadow-lg shadow-[#FFC000]/25 flex items-center justify-center gap-2 group"
        >
          <span>ENTER PROTOTYPE</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
        <p className="text-[10px] text-center text-zinc-400 mt-2.5">
          Entering prototype... <span className="text-zinc-500">(or click to skip)</span>
        </p>
      </motion.div>
    </motion.div>
  );
};
