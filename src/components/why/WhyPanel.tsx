import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle2, 
  Lightbulb, 
  Thermometer, 
  Lock, 
  Volume2,
  Layers,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { useAuraStore } from '../../store/useAuraStore';
import { MODE_THEMES } from '../../lib/modeEngine';

export const WhyPanel: React.FC = () => {
  const isWhyPanelOpen = useAuraStore((state) => state.isWhyPanelOpen);
  const setWhyPanelOpen = useAuraStore((state) => state.setWhyPanelOpen);
  const currentMode = useAuraStore((state) => state.currentMode);
  const confidence = useAuraStore((state) => state.confidence);
  const primaryReason = useAuraStore((state) => state.primaryReason);
  const signals = useAuraStore((state) => state.signals);
  const deviceStates = useAuraStore((state) => state.deviceStates);

  const theme = MODE_THEMES[currentMode];

  if (!isWhyPanelOpen) return null;

  // Chart data format for Recharts
  const chartData = signals.map((s) => ({
    name: s.name,
    weight: s.weight,
    value: s.value
  }));

  // iQOO Brand Bar Chart Palette
  const chartColors = [
    '#FFC000', // iQOO Yellow
    '#FF5E00', // Phoenix Orange
    '#00E5FF', // Cyber Cyan
    '#94A3B8'  // Titanium Slate
  ];

  return (
    <AnimatePresence>
      <div className="fixed sm:absolute inset-0 z-50 flex items-end justify-center">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setWhyPanelOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Slide-Up Bottom Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 380 }}
          className="relative z-10 w-full max-h-[85%] bg-[#0F1017] border-t border-[#2A2E42] rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden pb-6"
        >
          {/* Drag Handle */}
          <div className="w-full flex items-center justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-zinc-700" />
          </div>

          {/* Sheet Header */}
          <div className="px-5 py-2.5 flex items-center justify-between border-b border-[#202230]">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center border"
                style={{
                  backgroundColor: `${theme.accentHex}18`,
                  borderColor: `${theme.accentHex}40`
                }}
              >
                <Zap className="w-4 h-4" style={{ color: theme.accentHex }} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white leading-tight uppercase tracking-wide">
                  Decision Explainability
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono">
                  iQOO Edge Reasoning Telemetry
                </p>
              </div>
            </div>

            <button
              onClick={() => setWhyPanelOpen(false)}
              className="w-7 h-7 rounded-full bg-[#181A24] hover:bg-[#222534] flex items-center justify-center text-zinc-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-5 py-3.5 space-y-3 max-h-[calc(85vh-90px)]">
            {/* Primary Plain-Language Reason Banner */}
            <div
              className="p-3 rounded-xl border"
              style={{
                backgroundColor: `${theme.accentHex}12`,
                borderColor: `${theme.accentHex}35`
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[11px] font-black uppercase tracking-wider"
                  style={{ color: theme.accentHex }}
                >
                  {theme.name}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-[10px] font-mono text-[#FFC000] font-bold">
                  {confidence}% Match Score
                </span>
              </div>
              <p className="text-xs text-zinc-100 font-medium leading-relaxed">
                {primaryReason}
              </p>
            </div>

            {/* Recharts Signal Weight Visualization */}
            <div className="p-3 rounded-xl bg-[#14151E] border border-[#232637]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#FFC000]" />
                  <span>Signal Weight Contribution</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-400">Bayesian %</span>
              </div>

              {/* Recharts Bar Chart */}
              <div className="h-36 w-full -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 15, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 500 }}
                      width={105}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#111218] border border-[#2B2E40] p-2 rounded-lg text-xs shadow-xl">
                              <span className="font-bold text-white">{data.name}</span>
                              <div className="text-[#FFC000] font-mono text-[11px] mt-0.5 font-bold">
                                Weight: {data.weight}%
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="weight" radius={[0, 4, 4, 0]} barSize={12}>
                      {chartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Individual Factor Breakdown Cards */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                Context Signals Breakdown
              </span>

              {signals.map((sig, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#14151E] border border-[#212332] flex flex-col gap-0.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5 text-[11px]">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                      />
                      {sig.displayLabel}
                    </span>
                    <span className="font-mono text-[#FFC000] font-bold bg-[#FFC000]/10 px-1.5 py-0.2 rounded text-[10px]">
                      {sig.weight}% weight
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal font-medium">
                    {sig.impact}
                  </p>
                </div>
              ))}
            </div>

            {/* Automated Adjustments Summary */}
            <div className="p-3 rounded-xl bg-[#14151E] border border-[#232637] space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3 h-3 text-[#FFC000]" />
                <span>Autonomous Mesh Configuration</span>
              </span>

              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-medium">
                <div className="p-1.5 rounded bg-[#0D0E14] border border-[#1F212E] flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-zinc-400">Lights: </span>
                    <span className="text-white font-bold">
                      {deviceStates.lights.power ? `${deviceStates.lights.brightness}%` : 'Off'}
                    </span>
                  </div>
                </div>

                <div className="p-1.5 rounded bg-[#0D0E14] border border-[#1F212E] flex items-center gap-1.5">
                  <Thermometer className="w-3 h-3 text-blue-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-zinc-400">Climate: </span>
                    <span className="text-white font-bold">{deviceStates.thermostat.targetTemp}°F</span>
                  </div>
                </div>

                <div className="p-1.5 rounded bg-[#0D0E14] border border-[#1F212E] flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-zinc-400">Lock: </span>
                    <span className="text-white font-bold">
                      {deviceStates.lock.isLocked ? 'Armed' : 'Open'}
                    </span>
                  </div>
                </div>

                <div className="p-1.5 rounded bg-[#0D0E14] border border-[#1F212E] flex items-center gap-1.5">
                  <Volume2 className="w-3 h-3 text-purple-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-zinc-400">Audio: </span>
                    <span className="text-white font-bold">
                      {deviceStates.speaker.isPlaying ? `${deviceStates.speaker.volume}%` : 'Muted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Close CTA */}
            <button
              onClick={() => setWhyPanelOpen(false)}
              className="w-full py-2.5 rounded-lg bg-[#FFC000] hover:bg-[#FFD000] text-black font-black text-xs uppercase tracking-wider transition-colors"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
