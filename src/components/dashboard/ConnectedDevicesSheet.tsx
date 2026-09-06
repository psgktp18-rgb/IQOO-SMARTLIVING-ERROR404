import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Lightbulb, 
  Thermometer, 
  Lock, 
  Unlock,
  Volume2, 
  VolumeX,
  Wifi,
  Bluetooth,
  Radio,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';
import { MODE_THEMES } from '../../lib/modeEngine';
import { ConnectionStatusDot } from './ConnectionStatusDot';
import { DeviceStates } from '../../types/aura';

// 4-Bar Signal Strength Visual Component
const SignalBars: React.FC<{ bars: number; connected: boolean }> = ({ bars, connected }) => {
  return (
    <div 
      className="flex items-end gap-0.5 h-3 px-1 py-0.5" 
      title={`Signal Strength: ${connected ? `${bars}/4` : 'No Signal'}`}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-0.5 rounded-full transition-all duration-300 ${
            connected && i <= bars ? 'bg-emerald-400' : 'bg-zinc-700'
          }`}
          style={{ height: `${i * 25}%` }}
        />
      ))}
    </div>
  );
};

export const ConnectedDevicesSheet: React.FC = () => {
  const isConnectedDevicesOpen = useAuraStore((state) => state.isConnectedDevicesOpen);
  const setConnectedDevicesOpen = useAuraStore((state) => state.setConnectedDevicesOpen);
  const currentMode = useAuraStore((state) => state.currentMode);
  const deviceStates = useAuraStore((state) => state.deviceStates);
  const toggleDeviceConnection = useAuraStore((state) => state.toggleDeviceConnection);

  const theme = MODE_THEMES[currentMode];

  if (!isConnectedDevicesOpen) return null;

  // Metadata for the 4 devices
  const devicesList: Array<{
    key: keyof DeviceStates;
    name: string;
    icon: React.ReactNode;
    stateText: string;
    protocolIcon: React.ReactNode;
    state: DeviceStates[keyof DeviceStates];
  }> = [
    {
      key: 'lights',
      name: 'Smart Lights',
      icon: <Lightbulb className="w-4 h-4" />,
      stateText: deviceStates.lights.power ? `${deviceStates.lights.brightness}% Brightness` : 'Off',
      protocolIcon: <Radio className="w-3 h-3 text-amber-400" />,
      state: deviceStates.lights
    },
    {
      key: 'thermostat',
      name: 'Climate Control',
      icon: <Thermometer className="w-4 h-4" />,
      stateText: `${deviceStates.thermostat.targetTemp}°F • ${deviceStates.thermostat.status}`,
      protocolIcon: <Wifi className="w-3 h-3 text-cyan-400" />,
      state: deviceStates.thermostat
    },
    {
      key: 'lock',
      name: 'Smart Lock',
      icon: deviceStates.lock.isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />,
      stateText: deviceStates.lock.isLocked ? 'Locked & Secure' : 'Unlocked',
      protocolIcon: <Bluetooth className="w-3 h-3 text-blue-400" />,
      state: deviceStates.lock
    },
    {
      key: 'speaker',
      name: 'Aura Sound System',
      icon: deviceStates.speaker.isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />,
      stateText: deviceStates.speaker.isPlaying ? `${deviceStates.speaker.volume}% Volume` : 'Muted',
      protocolIcon: <Wifi className="w-3 h-3 text-cyan-400" />,
      state: deviceStates.speaker
    }
  ];

  const connectedCount = devicesList.filter((d) => d.state.connected).length;

  return (
    <AnimatePresence>
      <div className="fixed sm:absolute inset-0 z-50 flex items-end justify-center">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setConnectedDevicesOpen(false)}
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
                <Wifi className="w-4 h-4" style={{ color: theme.accentHex }} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white leading-tight uppercase tracking-wide">
                  Connected Devices
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono">
                  {connectedCount} of 4 devices online • Mesh Active
                </p>
              </div>
            </div>

            <button
              onClick={() => setConnectedDevicesOpen(false)}
              className="w-7 h-7 rounded-full bg-[#181A24] hover:bg-[#222534] flex items-center justify-center text-zinc-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-5 py-3.5 space-y-2.5 max-h-[calc(85vh-90px)]">
            {/* Status Summary Banner */}
            <div 
              className="p-3 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: `${theme.accentHex}10`,
                borderColor: `${theme.accentHex}30`
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-white leading-tight">
                    Smart Mesh Telemetry Active
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Real-time low-latency synchronization
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#FFC000] bg-[#FFC000]/10 px-2 py-0.5 rounded border border-[#FFC000]/20">
                100% Health
              </span>
            </div>

            {/* List of 4 Devices */}
            <div className="space-y-2">
              {devicesList.map((dev) => {
                const isConn = dev.state.connected;

                return (
                  <motion.div
                    key={dev.key}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isConn 
                        ? 'bg-[#14151E] border-[#222535]' 
                        : 'bg-[#101117] border-[#1C1E2A] opacity-75'
                    }`}
                  >
                    {/* Left side: Icon + Name + Subtext */}
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                          isConn
                            ? 'bg-[#1C1E2B] border-[#2E3248] text-white'
                            : 'bg-[#14151F] border-[#1E202D] text-zinc-600'
                        }`}
                        style={{ color: isConn ? theme.accentHex : undefined }}
                      >
                        {dev.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {dev.name}
                          </span>

                          {/* Protocol Label */}
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-[#1C1E29] text-zinc-300 border border-[#2A2C3C] flex items-center gap-1">
                            {dev.protocolIcon}
                            {dev.state.connectionType}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-0.5">
                          <ConnectionStatusDot connected={isConn} size={6} />
                          <span>{isConn ? 'Connected' : 'Syncing...'}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-500">
                            {isConn ? 'Last synced: just now' : 'Reconnecting'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Signal Bars & Connection Toggle */}
                    <div className="flex items-center gap-3">
                      <SignalBars bars={dev.state.signalBars} connected={isConn} />

                      {/* Interactive Connection Toggle button */}
                      <button
                        onClick={() => toggleDeviceConnection(dev.key)}
                        title={isConn ? 'Simulate Disconnect' : 'Reconnect Device'}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-colors flex items-center gap-1 ${
                          isConn
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        {isConn ? (
                          <span>Live</span>
                        ) : (
                          <>
                            <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                            <span>Retry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Close CTA */}
            <button
              onClick={() => setConnectedDevicesOpen(false)}
              className="w-full py-2.5 rounded-lg bg-[#FFC000] hover:bg-[#FFD000] text-black font-black text-xs uppercase tracking-wider transition-colors mt-2"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
