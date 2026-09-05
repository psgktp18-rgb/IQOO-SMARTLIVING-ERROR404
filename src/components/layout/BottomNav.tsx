import React from 'react';
import { motion } from 'framer-motion';
import { Home, History, SlidersHorizontal } from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';
import { NavigationTab } from '../../types/aura';

export const BottomNav: React.FC = () => {
  const activeTab = useAuraStore((state) => state.activeTab);
  const setActiveTab = useAuraStore((state) => state.setActiveTab);

  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }[] = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'timeline', label: 'Telemetry Log', icon: History },
    { id: 'simulate', label: 'Context Lab', icon: SlidersHorizontal }
  ];

  return (
    <div className="relative z-30 px-5 pb-5 pt-2 bg-gradient-to-t from-[#08080B] via-[#0C0D12]/95 to-transparent backdrop-blur-md">
      <div className="flex items-center justify-around bg-[#13141B] border border-[#242735] rounded-2xl p-1.5 shadow-xl shadow-black/80">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex-1 py-2.5 px-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 outline-none ${
                isActive ? 'text-[#FFC000]' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {/* Active animated background pill */}
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 rounded-xl bg-[#FFC000]/10 border border-[#FFC000]/30 shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              {/* Icon with iQOO Yellow glow on active */}
              <div className="relative z-10 flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#FFC000]' : 'text-zinc-400'
                  }`}
                />
                {item.id === 'simulate' && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC000] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC000]" />
                  </span>
                )}
              </div>

              {/* Universal font label */}
              <span
                className={`relative z-10 text-[11px] tracking-tight ${
                  isActive ? 'font-bold text-[#FFC000]' : 'font-medium text-zinc-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
