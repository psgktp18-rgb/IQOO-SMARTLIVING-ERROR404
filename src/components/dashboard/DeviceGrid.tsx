import React from 'react';
import { Sliders } from 'lucide-react';
import { DeviceCard } from './DeviceCard';
import { useAuraStore } from '../../store/useAuraStore';
import { MODE_THEMES } from '../../lib/modeEngine';

export const DeviceGrid: React.FC = () => {
  const currentMode = useAuraStore((state) => state.currentMode);
  const theme = MODE_THEMES[currentMode];

  return (
    <div className="flex flex-col">
      <div className="px-5 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-300 text-[12px] font-semibold">
          <Sliders className="w-3.5 h-3.5 text-[#FFC000]" />
          <span>Device Controls</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accentHex }} />
          <span>4 devices synced</span>
        </div>
      </div>
      <DeviceCard />
    </div>
  );
};
