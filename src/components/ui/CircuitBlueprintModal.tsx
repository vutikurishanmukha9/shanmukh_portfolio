import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Maximize2,
  Cpu,
  Zap,
  Radio,
  Layers,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CircuitBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Hotspot {
  id: string;
  title: string;
  category: string;
  specs: string[];
  x: number; // percentage
  y: number; // percentage
  icon: React.ElementType;
}

const hotspots: Hotspot[] = [
  {
    id: 'intelligence',
    title: '5-Tier Intelligence Layer (On-Board & Edge)',
    category: 'Edge AI & Context Engine',
    specs: [
      'Data Fusion & Context Engine (Sensor Fusion, Context Awareness, Pattern Recognition)',
      'Occupancy & Activity Analytics (People Counting, Zone Detection, Activity Classification)',
      'Predictive & Adaptive Engine (Usage Prediction, Light & HVAC Optimization)',
      'Decision Engine (Rules Engine, Priority Manager, Comfort & Energy Balance)',
      'Action Orchestrator (Light Control, HVAC Control, Alerts & Notifications)',
    ],
    x: 50,
    y: 44,
    icon: Cpu,
  },
  {
    id: 'power',
    title: 'Power Regulation Subsystem',
    category: 'AC/DC Power Stage',
    specs: [
      '230V AC, 50Hz Mains Input',
      'Step-down Transformer: 230V AC to 12V AC',
      'Full-wave Bridge Rectifier: 12V AC to 12V DC',
      'Voltage Regulator & Filter Capacitors: 12V DC to Clean 5V DC',
      'Stable 5V Core Power Bus powering Arduino UNO (ATmega328P)',
    ],
    x: 39,
    y: 74,
    icon: Zap,
  },
  {
    id: 'sensors',
    title: 'Sensory & Wireless Telemetry Bus',
    category: 'Input Interfaces',
    specs: [
      'Incoming Sensor: Analog differential waveform for bidirectional entry detection',
      'Outgoing Sensor: Analog differential waveform for exit tracking',
      'DHT Sensor: Digital temperature and relative humidity telemetry',
      'Nordic WiFi Module: Serial UART (TX/RX) for weather API & cloud sync',
    ],
    x: 17,
    y: 28,
    icon: Radio,
  },
  {
    id: 'actuators',
    title: 'Actuators & HVAC 5-Way Control',
    category: 'Output Actuation',
    specs: [
      'Relay Module (IN/VCC/GND): Galvanic isolation switching 230V AC lighting',
      'LCD 16x2 Module: Digital output for real-time status & occupancy telemetry',
      'HVAC 5-Way Output Control: Fan speed, Mode (Cool/Heat/Auto), Temperature setpoint, Airflow direction, Humidity control',
    ],
    x: 82,
    y: 35,
    icon: Layers,
  },
  {
    id: 'storage',
    title: 'Data Storage & Edge Persistence',
    category: 'Local Persistence',
    specs: [
      'Local Storage: MicroSD Card / EEPROM',
      'Offline Calibration Logs, Rule Models, & Configuration Presets',
      'Autonomous failover operation during WiFi / network outages',
    ],
    x: 35,
    y: 83,
    icon: Database,
  },
];

export const CircuitBlueprintModal: React.FC<CircuitBlueprintModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [activeHotspotId, setActiveHotspotId] = useState<string>('intelligence');

  if (!isOpen) return null;

  const activeHotspot = hotspots.find((h) => h.id === activeHotspotId) || hotspots[0];

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.25));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.85));
  const handleResetZoom = () => setZoom(1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040914]/90 backdrop-blur-md transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative z-50 w-full max-w-6xl max-h-[92dvh] bg-card border-2 border-black rounded-none shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden text-foreground"
        >
          {/* Top Bar / CAD Header */}
          <div className="px-3.5 sm:px-5 py-3 border-b-2 border-black bg-primary flex flex-wrap items-center justify-between gap-2.5 text-black">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse shrink-0" />
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-head uppercase tracking-widest text-black font-bold truncate">
                  PROJECT BLUEPRINT // SYSTEM SCHEMATIC
                </h3>
                <p className="text-[9px] font-mono text-black/80 font-bold truncate">
                  AUTO ENVIRONMENT MONITORING & CONTROL • REV 1.0 (A4)
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              <div className="flex items-center bg-card border-2 border-black rounded-none p-0.5 shadow-xs mr-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1 rounded-none text-black hover:bg-muted transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-[10px] font-mono font-bold text-black">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-1 rounded-none text-black hover:bg-muted transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  className="p-1 rounded-none text-black hover:bg-muted transition-colors border-l-2 border-black ml-0.5 hidden sm:inline-block cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              <a
                href="/ieee-blueprint.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-none text-black bg-card border-2 border-black hover:bg-muted transition-colors shadow-xs"
                title="Open Raw High-Res Image"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </a>

              <a
                href="/ieee-blueprint.jpg"
                download="IEEE_System_Intelligence_Blueprint.jpg"
                className="p-1.5 rounded-none text-black bg-card border-2 border-black hover:bg-muted transition-colors shadow-xs hidden sm:inline-flex"
                title="Download Blueprint Image"
              >
                <Download className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-none text-white bg-black hover:bg-red-600 border-2 border-black transition-colors ml-0.5 cursor-pointer shadow-xs"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Grid: Blueprint Canvas + Subsystem Inspector Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto lg:overflow-hidden min-h-0">
            
            {/* Left/Center: Interactive Blueprint Canvas */}
            <div className="lg:col-span-8 bg-muted/20 relative overflow-auto p-2 sm:p-4 flex items-center justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-black min-h-[260px] sm:min-h-[380px] lg:min-h-[460px]">
              
              {/* Technical Dot Grid */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none" 
                style={{ 
                  backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
                  backgroundSize: '1.25rem 1.25rem'
                }} 
              />

              {/* Scalable Blueprint Image Container */}
              <motion.div
                animate={{ scale: zoom }}
                transition={{ duration: 0.2 }}
                className="relative max-w-full rounded-none shadow-[6px_6px_0px_#000] overflow-hidden border-2 border-black bg-white transform-gpu origin-center"
              >
                <img
                  src="/ieee-blueprint.jpg"
                  alt="Automatic Environment Monitoring and Control System with Intelligence Layer Blueprint"
                  className="max-h-[68vh] w-auto object-contain block select-none pointer-events-none"
                />

                {/* Interactive Clickable Hotspots overlaying the Blueprint */}
                {hotspots.map((spot) => {
                  const Icon = spot.icon;
                  const isSelected = activeHotspotId === spot.id;

                  return (
                    <button
                      type="button"
                      key={spot.id}
                      onClick={() => setActiveHotspotId(spot.id)}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-none border-2 border-black transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs group z-30",
                        isSelected
                          ? "bg-primary text-black scale-125 font-bold shadow-[3px_3px_0_0_#000]"
                          : "bg-card text-black hover:bg-primary hover:scale-110"
                      )}
                      title={spot.title}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* Right: Subsystem Inspector & Technical Ledger */}
            <div className="lg:col-span-4 bg-card p-5 flex flex-col justify-between overflow-y-auto space-y-6">
              
              <div className="space-y-4">
                {/* Hotspot Switcher Tabs */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-head font-bold uppercase tracking-widest text-muted-foreground block">
                    SUBSYSTEM SELECTOR // HOTSPOTS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hotspots.map((h) => (
                      <button
                        type="button"
                        key={h.id}
                        onClick={() => setActiveHotspotId(h.id)}
                        className={cn(
                          "px-2.5 py-1 rounded-none text-[9px] font-head font-bold uppercase tracking-wider transition-colors border-2 border-black shadow-xs cursor-pointer active:translate-x-0.5 active:translate-y-0.5",
                          activeHotspotId === h.id
                            ? "bg-primary text-black shadow-[2px_2px_0_0_#000]"
                            : "bg-card text-foreground hover:bg-muted"
                        )}
                      >
                        {h.category.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Subsystem Breakdown Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHotspot.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 rounded-none border-2 border-black bg-muted/40 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                      <span className="text-[9px] font-head font-bold uppercase tracking-widest text-foreground">
                        {activeHotspot.category}
                      </span>
                      <span className="text-[9px] font-head font-bold px-1.5 py-0.5 bg-primary text-black border border-black uppercase">
                        VERIFIED SPEC
                      </span>
                    </div>

                    <h4 className="text-base font-head font-bold text-foreground tracking-tight leading-snug uppercase">
                      {activeHotspot.title}
                    </h4>

                    <div className="space-y-2 pt-1 font-mono text-xs text-foreground">
                      {activeHotspot.specs.map((spec) => (
                        <div key={spec} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Title Block CAD Ledger */}
              <div className="border-t-2 border-black pt-4 space-y-2 font-mono text-[10px] text-foreground">
                <div className="flex justify-between border-b border-black/20 pb-1">
                  <span className="text-muted-foreground font-bold">PROJECT:</span>
                  <span className="font-bold">AUTO MONITORING & CONTROL</span>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-1">
                  <span className="text-muted-foreground font-bold">CONTROLLER:</span>
                  <span className="font-bold">ARDUINO UNO (ATmega328P)</span>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-1">
                  <span className="text-muted-foreground font-bold">DRAWN BY:</span>
                  <span className="font-bold">ENGINEER // 10-05-2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-bold">SCALE / SIZE:</span>
                  <span className="font-bold">NTS // A4 (210x297 mm)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Bar Status */}
          <div className="px-5 py-2.5 bg-muted border-t-2 border-black flex flex-wrap items-center justify-between text-[9px] font-mono text-foreground font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 border border-black animate-pulse" />
              CAD ENGINE READY • CLICK HOTSPOTS ON BLUEPRINT TO INSPECT SUBSYSTEMS
            </span>
            <span>IEEE PUBLICATION // 11101373</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
