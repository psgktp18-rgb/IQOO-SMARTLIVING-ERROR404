import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  SunMedium, 
  Sunset, 
  Moon, 
  Calendar, 
  Activity, 
  Volume2, 
  UserX, 
  Zap
} from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';
import { DEMO_PRESETS } from '../../lib/mockData';
import { TimeOfDay, MotionLevel, NoiseLevel } from '../../types/aura';

export const SimulatePanel: React.FC = () => {
  const {
    simulateContext,
    setContextInput,
    runDetection,
    isAnalyzing,
    applyPreset,
    activePresetId
  } = useAuraStore();

  const timeOptions: { value: TimeOfDay; label: string; icon: React.FC<{ className?: string }> }[] = [
    { value: 'morning', label: 'Morning', icon: Sun },
    { value: 'afternoon', label: 'Noon', icon: SunMedium },
    { value: 'evening', label: 'Evening', icon: Sunset },
    { value: 'night', label: 'Night', icon: Moon }
  ];

  const motionOptions: { value: MotionLevel; label: string; desc: string }[] = [
    { value: 'low', label: 'Low', desc: 'Still / Seated' },
    { value: 'medium', label: 'Med', desc: 'Active Desk' },
    { value: 'high', label: 'High', desc: 'Multi-Zone' }
  ];

  const noiseOptions: { value: NoiseLevel; label: string; db: string }[] = [
    { value: 'quiet', label: 'Quiet', db: '<35 dB' },
    { value: 'moderate', label: 'Med', db: '50 dB' },
    { value: 'loud', label: 'Loud', db: '>75 dB' }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-5 pt-3 pb-8 space-y-3.5">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <span>Context Simulator Lab</span>
          </h2>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFC000]/15 text-[#FFC000] font-mono font-bold">
            MONSTER STUDIO
          </span>
        </div>
        <p className="text-xs text-zinc-400 mt-0.5">
          Simulate contextual environment signals to trigger autonomous mode shifts.
        </p>
      </div>

      {/* 1-Click iQOO Pitch Presets */}
      <div>
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 mb-1.5 font-mono">
          <Zap className="w-3 h-3 text-[#FFC000] fill-[#FFC000]" />
          <span>Quick Pitch Presets</span>
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {DEMO_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`shrink-0 px-3 py-2 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-[#FFC000]/15 border-[#FFC000] text-white shadow-md shadow-[#FFC000]/10'
                    : 'bg-[#14151D] border-[#252838] text-zinc-300 hover:bg-[#1A1C26]'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs whitespace-nowrap">
                  <span>{preset.emoji}</span>
                  <span className={isSelected ? 'text-[#FFC000]' : 'text-white'}>{preset.name}</span>
                </div>
                <div className="text-[9px] text-zinc-400 mt-0.5 whitespace-nowrap font-mono font-medium">
                  {preset.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Context Signal Controls Container */}
      <div className="space-y-3 bg-[#13141C] border border-[#232635] rounded-xl p-3">
        {/* Time of Day Segmented Tabs */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-1.5 font-mono">
            <Sun className="w-3 h-3 text-[#FFC000]" />
            <span>Time of Day</span>
          </label>
          <div className="grid grid-cols-4 gap-1 bg-[#0D0E14] p-1 rounded-lg border border-[#1E202B]">
            {timeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = simulateContext.timeOfDay === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setContextInput({ timeOfDay: opt.value })}
                  className={`py-1 px-1 rounded-md flex flex-col items-center gap-0.5 text-[10px] font-medium transition-all ${
                    isSelected
                      ? 'bg-[#FFC000] text-black shadow-sm font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar Status Toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0E0F16] border border-[#1E202B]">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                simulateContext.meetingNow
                  ? 'bg-[#FFC000]/20 text-[#FFC000]'
                  : 'bg-[#181922] text-zinc-500'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Calendar Status</div>
              <div className="text-[10px] text-zinc-400 font-medium">
                {simulateContext.meetingNow
                  ? 'Active: "Architecture Sprint Review"'
                  : 'Calendar clear for next 2 hours'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setContextInput({ meetingNow: !simulateContext.meetingNow })}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
              simulateContext.meetingNow ? 'bg-[#FFC000]' : 'bg-[#252838]'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full transition-transform ${
                simulateContext.meetingNow ? 'translate-x-5 bg-black' : 'translate-x-1 bg-zinc-400'
              }`}
            />
          </button>
        </div>

        {/* Motion Level Selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between mb-1.5 font-mono">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>Motion Activity Level</span>
            </span>
            <span className="text-[#FFC000] font-bold">{simulateContext.motionLevel}</span>
          </label>
          <div className="grid grid-cols-3 gap-1 bg-[#0D0E14] p-1 rounded-lg border border-[#1E202B]">
            {motionOptions.map((opt) => {
              const isSelected = simulateContext.motionLevel === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setContextInput({ motionLevel: opt.value })}
                  className={`py-1.5 px-2 rounded-md text-center transition-all ${
                    isSelected
                      ? 'bg-[#FFC000] text-black font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] leading-tight font-bold">{opt.label}</div>
                  <div className="text-[8px] opacity-75 mt-0.5">{opt.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Noise Level Selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between mb-1.5 font-mono">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3 h-3 text-emerald-400" />
              <span>Ambient Sound Level</span>
            </span>
            <span className="text-[#FFC000] font-bold">{simulateContext.noiseLevel}</span>
          </label>
          <div className="grid grid-cols-3 gap-1 bg-[#0D0E14] p-1 rounded-lg border border-[#1E202B]">
            {noiseOptions.map((opt) => {
              const isSelected = simulateContext.noiseLevel === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setContextInput({ noiseLevel: opt.value })}
                  className={`py-1.5 px-2 rounded-md text-center transition-all ${
                    isSelected
                      ? 'bg-[#FFC000] text-black font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] leading-tight font-bold">{opt.label}</div>
                  <div className="text-[8px] opacity-75 mt-0.5">{opt.db}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extended Inactivity / Away Flag */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0E0F16] border border-[#1E202B]">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                simulateContext.isInactive
                  ? 'bg-slate-500/20 text-slate-300'
                  : 'bg-[#181922] text-zinc-500'
              }`}
            >
              <UserX className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Absence / Inactive (&gt;45m)</div>
              <div className="text-[10px] text-zinc-400 font-medium">
                {simulateContext.isInactive
                  ? 'House vacant, geofence armed'
                  : 'Occupancy active'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setContextInput({ isInactive: !simulateContext.isInactive })}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
              simulateContext.isInactive ? 'bg-[#FFC000]' : 'bg-[#252838]'
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full transition-transform ${
                simulateContext.isInactive ? 'translate-x-5 bg-black' : 'translate-x-1 bg-zinc-400'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Trigger Button - iQOO Electric Yellow High Performance Style */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        disabled={isAnalyzing}
        onClick={runDetection}
        className="w-full py-3 px-4 rounded-xl bg-[#FFC000] hover:bg-[#FFD000] text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-[#FFC000]/25 flex items-center justify-center gap-2 group transition-all"
      >
        <Zap className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
        <span>Deploy Context & Run Mode Engine</span>
      </motion.button>
    </div>
  );
};
