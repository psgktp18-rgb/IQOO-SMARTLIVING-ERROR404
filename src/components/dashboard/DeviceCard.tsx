import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, Thermometer, Lock, Unlock, Volume2, VolumeX, 
  Plus, Minus, Play, Pause, Power
} from 'lucide-react';
import { useAuraStore } from '../../store/useAuraStore';
import { MODE_THEMES } from '../../lib/modeEngine';

export const DeviceCard: React.FC = () => {
  const currentMode = useAuraStore((state) => state.currentMode);
  const theme = MODE_THEMES[currentMode];
  const {
    deviceStates, toggleLightPower, setLightBrightness,
    adjustThermostat, toggleDoorLock, toggleSpeakerPlayback, setSpeakerVolume
  } = useAuraStore();
  const { lights, thermostat, lock, speaker } = deviceStates;

  return (
    <div className="grid grid-cols-2 gap-2.5 px-5 pb-4">
      {/* LIGHTS */}
      <motion.div layout transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative overflow-hidden p-3 rounded-xl border flex flex-col justify-between min-h-[140px] transition-all ${
          lights.power ? 'bg-[#14151D] border-[#2B2E3E]' : 'bg-[#0F1016] border-[#1C1E29] opacity-70'
        }`}
        style={{ boxShadow: lights.power ? `0 4px 20px -2px ${theme.accentHex}20` : undefined }}
      >
        {lights.power && (
          <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl pointer-events-none opacity-25" style={{ backgroundColor: theme.accentHex }} />
        )}
        <div className="flex items-center justify-between">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${lights.power ? 'bg-[#1D1F2B]' : 'bg-[#161720] text-zinc-600'}`}
            style={{ color: lights.power ? theme.accentHex : undefined }}>
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <button onClick={toggleLightPower}
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
              lights.power ? 'bg-[#FFC000] text-black' : 'bg-[#1A1B24] text-zinc-500'
            }`}>
            <Power className="w-3 h-3" />
          </button>
        </div>
        <div className="my-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-zinc-300">Lights</span>
            <span className="text-[11px] font-semibold text-white">{lights.power ? `${lights.brightness}%` : 'Off'}</span>
          </div>
          <p className="text-[10px] text-zinc-500 truncate mt-0.5">{lights.power ? lights.colorDesc : 'Standby mode'}</p>
        </div>
        <input type="range" min="0" max="100" value={lights.brightness}
          onChange={(e) => setLightBrightness(Number(e.target.value))}
          className="w-full h-1 bg-[#20222D] rounded cursor-pointer" />
      </motion.div>

      {/* THERMOSTAT */}
      <motion.div layout transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative overflow-hidden p-3 rounded-xl bg-[#14151D] border border-[#2B2E3E] flex flex-col justify-between min-h-[140px]"
      >
        <div className="flex items-center justify-between">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#1D1F2B]" style={{ color: theme.accentHex }}>
            <Thermometer className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1 bg-[#1A1B24] rounded-lg p-0.5 border border-[#282B3B]">
            <button onClick={() => adjustThermostat(-1)} className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white"><Minus className="w-2.5 h-2.5" /></button>
            <button onClick={() => adjustThermostat(1)} className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white"><Plus className="w-2.5 h-2.5" /></button>
          </div>
        </div>
        <div className="my-1">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-semibold text-zinc-300">Climate</span>
            <span className="text-base font-bold text-white">{thermostat.targetTemp}°</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-0.5">
            <span>Now {thermostat.currentTemp}°F</span>
            <span className="capitalize text-[#FFC000] font-medium">{thermostat.status}</span>
          </div>
        </div>
        <div className="w-full bg-[#20222D] h-1 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(15, (thermostat.targetTemp - 60) * 4))}%`, backgroundColor: theme.accentHex }} />
        </div>
      </motion.div>

      {/* DOOR LOCK */}
      <motion.div layout transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative overflow-hidden p-3 rounded-xl border flex flex-col justify-between min-h-[140px] transition-all ${
          lock.isLocked ? 'bg-[#14151D] border-[#2B2E3E]' : 'bg-[#1B1416] border-red-500/40'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${lock.isLocked ? 'bg-[#1D1F2B] text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {lock.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </div>
          <button onClick={toggleDoorLock}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border transition-all ${
              lock.isLocked ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : 'bg-red-500/20 border-red-500/40 text-red-400'
            }`}>
            {lock.isLocked ? 'Locked' : 'Open'}
          </button>
        </div>
        <div className="my-1">
          <span className="text-[12px] font-semibold text-zinc-300">Smart Lock</span>
          <p className="text-[10px] text-zinc-400 truncate mt-0.5">{lock.statusText}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
          <span className={`w-1.5 h-1.5 rounded-full ${lock.isLocked ? 'bg-emerald-400' : 'bg-red-400 animate-ping'}`} />
          <span>{lock.isLocked ? 'Perimeter secure' : 'Guest access active'}</span>
        </div>
      </motion.div>

      {/* SPEAKER */}
      <motion.div layout transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative overflow-hidden p-3 rounded-xl border flex flex-col justify-between min-h-[140px] transition-all ${
          speaker.isPlaying ? 'bg-[#14151D] border-[#2B2E3E]' : 'bg-[#0F1016] border-[#1C1E29] opacity-75'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${speaker.isPlaying ? 'bg-[#1D1F2B]' : 'bg-[#161720] text-zinc-600'}`}
            style={{ color: speaker.isPlaying ? theme.accentHex : undefined }}>
            {speaker.isPlaying && speaker.volume > 0 ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </div>
          <button onClick={toggleSpeakerPlayback}
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
              speaker.isPlaying ? 'bg-[#FFC000] text-black' : 'bg-[#1A1B24] text-zinc-500'
            }`}>
            {speaker.isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>
        </div>
        <div className="my-1">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-zinc-300">Speaker</span>
            {speaker.isPlaying && (
              <div className="flex items-end gap-0.5 h-2.5">
                <motion.div animate={{ height: ['30%', '100%', '40%'] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
                <motion.div animate={{ height: ['80%', '20%', '90%'] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-0.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
                <motion.div animate={{ height: ['40%', '90%', '20%'] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 rounded-full" style={{ backgroundColor: theme.accentHex }} />
              </div>
            )}
          </div>
          <p className="text-[10px] text-zinc-400 truncate mt-0.5">{speaker.trackName}</p>
        </div>
        <input type="range" min="0" max="100" value={speaker.volume}
          onChange={(e) => setSpeakerVolume(Number(e.target.value))}
          className="w-full h-1 bg-[#20222D] rounded cursor-pointer" />
      </motion.div>
    </div>
  );
};
