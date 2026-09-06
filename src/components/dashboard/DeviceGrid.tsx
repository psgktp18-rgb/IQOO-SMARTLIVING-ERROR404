import React from 'react';
import { Sliders, ChevronRight } from 'lucide-react';
import { DeviceCard } from './DeviceCard';
import { useAuraStore } from '../../store/useAuraStore';

export const DeviceGrid: React.FC = () => {
  const deviceStates = useAuraStore((state) => state.deviceStates);
  const setConnectedDevicesOpen = useAuraStore((state) => state.setConnectedDevicesOpen);

  const connectedCount = Object.values(deviceStates).filter((d) => d.connected).length;

  return (
    <div className="flex flex-col">
      <div className="px-5 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-300 text-[12px] font-semibold">
          <Sliders className="w-3.5 h-3.5 text-[#FFC000]" />
          <span>Device Controls</span>
        </div>
        <button 
          onClick={() => setConnectedDevicesOpen(true)}
          className="flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer group bg-[#14151E]/60 hover:bg-[#1C1E2B] px-2 py-0.5 rounded-full border border-zinc-800/80 hover:border-zinc-700"
          title="View Connected Devices"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-400" />
          <span>{connectedCount} devices synced</span>
          <ChevronRight className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        </button>
      </div>
      <DeviceCard />
    </div>
  );
};
