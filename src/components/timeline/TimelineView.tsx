import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Sparkles, Moon, ShieldCheck, Flame, Calendar, Clock, Zap } from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';
import { MODE_THEMES } from '../../lib/modeEngine';
import { AuraMode } from '../../types/aura';

export const TimelineView: React.FC = () => {
  const timelineHistory = useAuraStore((state) => state.timelineHistory);

  const getModeIcon = (mode: AuraMode) => {
    switch (mode) {
      case 'focus': return Target;
      case 'relaxing': return Sparkles;
      case 'sleeping': return Moon;
      case 'away': return ShieldCheck;
      case 'hosting': return Flame;
      default: return Sparkles;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-5 pt-3 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#202330]">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Mode Timeline
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFC000]/15 text-[#FFC000] font-semibold">
              Today
            </span>
          </h2>
          <p className="text-[12px] text-zinc-400 mt-0.5">Context transitions & reasoning</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#151722] border border-[#26293A] flex items-center justify-center">
          <Calendar className="w-4 h-4 text-[#FFC000]" />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 space-y-4">
        <div className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-gradient-to-b from-[#FFC000]/50 via-[#26293A] to-transparent rounded-full" />

        <AnimatePresence initial={false}>
          {timelineHistory.map((item, index) => {
            const theme = MODE_THEMES[item.mode];
            const Icon = getModeIcon(item.mode);
            const isFirst = index === 0;

            return (
              <motion.div key={item.id}
                initial={{ opacity: 0, x: -14, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                className="relative"
              >
                <div className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center border z-10 ${isFirst ? 'ring-2 ring-white/20 scale-110' : ''}`}
                  style={{ backgroundColor: `${theme.accentHex}20`, borderColor: theme.accentHex, boxShadow: isFirst ? `0 0 12px ${theme.accentHex}66` : undefined }}>
                  <Icon className="w-3 h-3" style={{ color: theme.accentHex }} />
                </div>

                <div className={`p-3 rounded-xl border ${isFirst ? 'bg-[#151722] border-[#31354A] shadow-lg' : 'bg-[#101118] border-[#1C1E2A]'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-semibold" style={{ color: theme.accentHex }}>{theme.name}</span>
                      {item.isNew && (
                        <span className="flex items-center gap-0.5 text-[9px] px-1.5 rounded-full bg-[#FFC000]/20 text-[#FFC000] font-semibold animate-pulse">
                          <Zap className="w-2.5 h-2.5" /> Live
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <p className="text-[12px] text-zinc-300 leading-relaxed">{item.reason}</p>

                  <div className="mt-2 pt-1.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
                      Confidence
                    </span>
                    <span className="font-semibold text-white">{item.confidence}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
