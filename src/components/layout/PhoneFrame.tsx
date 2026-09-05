import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, BatteryMedium } from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';
import { MODE_THEMES } from '../../lib/modeEngine';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const currentMode = useAuraStore((state) => state.currentMode);
  const theme = MODE_THEMES[currentMode];

  const [timeStr, setTimeStr] = React.useState('09:41');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-6 md:p-8 bg-black overflow-hidden">
      {/* Deep tech grid background */}
      <div 
        className="absolute inset-0 z-0 opacity-15" 
        style={{ 
          backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }} 
      />
      
      {/* iQOO dynamic ambient glow */}
      <motion.div
        animate={{
          background: [
            `radial-gradient(circle at 30% 20%, ${theme.accentHex}20 0%, transparent 50%)`,
            `radial-gradient(circle at 70% 60%, ${theme.accentHex}20 0%, transparent 50%)`,
            `radial-gradient(circle at 30% 20%, ${theme.accentHex}20 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
      />
      <motion.div
        animate={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.8) 100%)`,
        }}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Desktop hackathon badge */}
      <header className="hidden lg:flex items-center gap-3 mb-4 z-10 text-sm text-zinc-400">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#14151C] border border-[#272A38]">
          <span className="font-semibold text-white">i<span className="text-[#FFC000]">QOO</span></span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 font-medium text-xs">Smart Living Hackathon 2026</span>
        </div>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400 text-xs">Edge AI Prototype</span>
        <span className="text-zinc-600">•</span>
        <span className="text-emerald-400 text-xs">100% Offline</span>
      </header>

      {/* Phone frame */}
      <div className="relative z-10 w-full sm:max-w-[400px] h-[100dvh] sm:h-[844px] bg-[#0C0D12] sm:rounded-[44px] shadow-2xl sm:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] border-0 sm:border-[8px] sm:border-[#1E202B] flex flex-col overflow-hidden">
        <div className="hidden sm:block absolute inset-0 rounded-[36px] pointer-events-none border border-white/[0.07] z-30" />

        {/* Punch hole camera */}
        <div className="hidden sm:flex absolute top-3.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-40 items-center justify-center border border-zinc-800">
          <div className="w-1.5 h-1.5 rounded-full bg-[#182030] border border-blue-500/40" />
        </div>

        {/* Status bar */}
        <div className="relative z-30 pt-3.5 px-6 pb-2 flex items-center justify-between text-xs text-zinc-300 select-none">
          <span className="text-[13px] font-semibold text-white">{timeStr}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 font-medium">5G</span>
            <Wifi className="w-3.5 h-3.5 text-zinc-300" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#FFC000] font-semibold">98%</span>
              <BatteryMedium className="w-4 h-4 text-[#FFC000]" />
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="relative flex-1 flex flex-col overflow-hidden bg-[#0C0D12]">
          {children}
        </div>
      </div>
    </div>
  );
};
