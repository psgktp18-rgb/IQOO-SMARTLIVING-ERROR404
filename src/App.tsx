import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneFrame } from './components/layout/PhoneFrame';
import { BottomNav } from './components/layout/BottomNav';
import { ModeHeader } from './components/dashboard/ModeHeader';
import { PredictivePill } from './components/dashboard/PredictivePill';
import { DeviceGrid } from './components/dashboard/DeviceGrid';
import { TimelineView } from './components/timeline/TimelineView';
import { SimulatePanel } from './components/simulate/SimulatePanel';
import { WhyPanel } from './components/why/WhyPanel';
import { AnalyzingOverlay } from './components/simulate/AnalyzingOverlay';
import { useAuraStore } from './store/useAuraStore';

export const App: React.FC = () => {
  const activeTab = useAuraStore((state) => state.activeTab);

  return (
    <PhoneFrame>
      <div className="relative flex-1 flex flex-col overflow-hidden">
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
        <AnalyzingOverlay />
      </div>
    </PhoneFrame>
  );
};

export default App;
