import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from './components/layout/PhoneFrame';
import { BottomNav } from './components/layout/BottomNav';
import { ModeHeader } from './components/dashboard/ModeHeader';
import { PredictivePill } from './components/dashboard/PredictivePill';
import { DeviceGrid } from './components/dashboard/DeviceGrid';
import { TimelineView } from './components/timeline/TimelineView';
import { SimulatePanel } from './components/simulate/SimulatePanel';
import { WhyPanel } from './components/why/WhyPanel';
import { ConnectedDevicesSheet } from './components/dashboard/ConnectedDevicesSheet';
import { AnalyzingOverlay } from './components/simulate/AnalyzingOverlay';
import { WelcomeSplashScreen } from './components/layout/WelcomeSplashScreen';
import { useAuraStore } from './store/useAuraStore';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const activeTab = useAuraStore((state) => state.activeTab);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  return (
    <PhoneFrame>
      <div className="relative flex-1 flex flex-col overflow-hidden">
        {/* Welcome Splash Screen */}
        <AnimatePresence>
          {!hasEntered && (
            <WelcomeSplashScreen onEnter={() => setHasEntered(true)} />
          )}
        </AnimatePresence>

        {/* Active Tab Screen Content with Smooth Spring Transition */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col overflow-y-auto no-scrollbar"
              >
                <ModeHeader />
                <PredictivePill />
                <DeviceGrid />
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                key="timeline-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <TimelineView />
              </motion.div>
            )}

            {activeTab === 'simulate' && (
              <motion.div
                key="simulate-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <SimulatePanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Navigation */}
        <BottomNav />

        {/* Global Modals & Overlays */}
        <WhyPanel />
        <ConnectedDevicesSheet />
        <AnalyzingOverlay />

        {/* Floating Quick Re-open Splash Button (Top Right of Phone) */}
        {hasEntered && (
          <button
            onClick={() => setHasEntered(false)}
            title="View Welcome Screen"
            className="absolute top-2 right-4 z-40 p-1.5 rounded-lg bg-[#161822]/80 hover:bg-[#1E2130] border border-[#272A3C] text-zinc-400 hover:text-[#FFC000] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </PhoneFrame>
  );
};

export default App;
