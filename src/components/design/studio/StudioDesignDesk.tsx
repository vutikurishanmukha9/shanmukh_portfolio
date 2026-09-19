import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Move,
  RotateCcw,
  Pencil,
  Trash2,
  Undo2,
} from 'lucide-react';

interface DeskArtifact {
  id: string;
  type: 'PENCIL' | 'TYPE' | 'COLOR' | 'GRID' | 'COMPONENT' | 'PROJECT';
  title: string;
  tag: string;
  color: string;
  positionClass: string;
}

interface Stroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  width: number;
}

export const StudioDesignDesk: React.FC = () => {
  const deskContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);

  // Workstation reactive states
  const [deskAccent, setDeskAccent] = useState<string>('#FFD84D');
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(true);
  const [deskTypeVariant, setDeskTypeVariant] = useState<'BOLD' | 'OUTLINE' | 'MONO'>('OUTLINE');

  // Drawing & Pencil Tool States
  const [activeTool, setActiveTool] = useState<'PENCIL' | 'MOVE'>('PENCIL');
  const [pencilColor, setPencilColor] = useState<string>('#FF6B57'); // Coral Redline pencil by default
  const [pencilWidth, setPencilWidth] = useState<number>(3);
  const [strokeCount, setStrokeCount] = useState<number>(0);
  const [isPencilVisible, setIsPencilVisible] = useState<boolean>(false);

  // Drawing tracking refs (isolated from React render cycles to guarantee sketches NEVER clear automatically)
  const isDrawingRef = useRef<boolean>(false);
  const currentStrokeRef = useRef<{ x: number; y: number }[]>([]);
  const strokesRef = useRef<Stroke[]>([]);

  // Artifact cards placed neatly along the perimeter — completely clearing the center
  const initialArtifacts: DeskArtifact[] = [
    {
      id: 'art-pencil',
      type: 'PENCIL',
      title: 'DRAFTING PENCIL',
      tag: 'P_00',
      color: '#FF6B57',
      positionClass: 'top-16 left-3 sm:left-6',
    },
    {
      id: 'art-grid',
      type: 'GRID',
      title: 'GRID MATRIX',
      tag: 'G_03',
      color: '#FF6B57',
      positionClass: 'top-1/2 -translate-y-1/2 left-3 sm:left-6 hidden md:block',
    },
    {
      id: 'art-type',
      type: 'TYPE',
      title: 'TYPE ARTIFACT',
      tag: 'A_01',
      color: '#FFD84D',
      positionClass: 'bottom-16 left-3 sm:left-6',
    },
    {
      id: 'art-color',
      type: 'COLOR',
      title: 'COLOR SWATCH',
      tag: 'C_02',
      color: '#5B8CFF',
      positionClass: 'top-16 right-3 sm:right-6',
    },
    {
      id: 'art-proj',
      type: 'PROJECT',
      title: 'GETREPORT FILE',
      tag: 'P_05',
      color: '#FFFFFF',
      positionClass: 'top-1/2 -translate-y-1/2 right-3 sm:right-6 hidden md:block',
    },
    {
      id: 'art-comp',
      type: 'COMPONENT',
      title: 'TACTILE BUTTON',
      tag: 'B_04',
      color: '#63D6A0',
      positionClass: 'bottom-16 right-3 sm:right-6',
    },
  ];

  // Map pointer event coordinates directly to internal high-res canvas coordinates
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, cssX: 0, cssY: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      cssX: e.clientX - rect.left,
      cssY: e.clientY - rect.top,
    };
  };

  // Direct DOM cursor transform for silky 60-120fps motion with zero React re-render overhead
  const updatePencilPosition = (cssX: number, cssY: number, drawing: boolean) => {
    if (!pencilRef.current) return;
    pencilRef.current.style.transform = `translate3d(${cssX}px, ${cssY}px, 0) ${
      drawing ? 'scale(0.95) rotate(2deg)' : 'scale(1)'
    }`;
  };

  // Redraw all strokes from persistent history (only invoked on explicit UNDO)
  const redrawAllStrokes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scaleFactor = canvas.width / (canvas.clientWidth || 1);

    strokesRef.current.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return;

      if (stroke.points.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, (stroke.width * scaleFactor) / 2, 0, Math.PI * 2);
        ctx.fillStyle = stroke.color;
        ctx.fill();
        return;
      }

      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width * scaleFactor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

      if (stroke.points.length === 2) {
        ctx.lineTo(stroke.points[1].x, stroke.points[1].y);
        ctx.stroke();
        return;
      }

      for (let i = 1; i < stroke.points.length - 1; i++) {
        const midX = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
        const midY = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, midX, midY);
      }

      const last = stroke.points[stroke.points.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    });
  }, []);

  // Real-time user drawing event handlers - permanently writes to canvas buffer
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'PENCIL') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture not supported
    }

    const { x, y, cssX, cssY } = getCanvasCoords(e);
    isDrawingRef.current = true;
    currentStrokeRef.current = [{ x, y }];
    setIsPencilVisible(true);
    updatePencilPosition(cssX, cssY, true);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const scaleFactor = canvas.width / (canvas.clientWidth || 1);
      ctx.beginPath();
      ctx.arc(x, y, (pencilWidth * scaleFactor) / 2, 0, Math.PI * 2);
      ctx.fillStyle = pencilColor;
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y, cssX, cssY } = getCanvasCoords(e);
    updatePencilPosition(cssX, cssY, isDrawingRef.current);

    if (!isDrawingRef.current || activeTool !== 'PENCIL') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const points = currentStrokeRef.current;
    if (points.length === 0) {
      points.push({ x, y });
      return;
    }

    const prev = points[points.length - 1];
    const dist = Math.hypot(x - prev.x, y - prev.y);
    if (dist < 2) return;

    points.push({ x, y });

    const ctx = canvas.getContext('2d');
    if (ctx) {
      const scaleFactor = canvas.width / (canvas.clientWidth || 1);
      ctx.beginPath();
      ctx.strokeStyle = pencilColor;
      ctx.lineWidth = pencilWidth * scaleFactor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore if pointer capture wasn't held
    }

    if (currentStrokeRef.current.length > 0) {
      const newStroke: Stroke = {
        id: `stroke-${Date.now()}`,
        points: [...currentStrokeRef.current],
        color: pencilColor,
        width: pencilWidth,
      };
      strokesRef.current.push(newStroke);
      currentStrokeRef.current = [];
      setStrokeCount(strokesRef.current.length);
    }

    const { cssX, cssY } = getCanvasCoords(e);
    updatePencilPosition(cssX, cssY, false);
  };

  const handlePointerEnter = () => {
    if (activeTool === 'PENCIL') {
      setIsPencilVisible(true);
    }
  };

  const handlePointerLeave = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      if (currentStrokeRef.current.length > 0) {
        strokesRef.current.push({
          id: `stroke-${Date.now()}`,
          points: [...currentStrokeRef.current],
          color: pencilColor,
          width: pencilWidth,
        });
        currentStrokeRef.current = [];
        setStrokeCount(strokesRef.current.length);
      }
    }
    setIsPencilVisible(false);
  };

  // Undo the last stroke
  const handleUndo = () => {
    if (strokesRef.current.length === 0) return;
    strokesRef.current.pop();
    setStrokeCount(strokesRef.current.length);
    redrawAllStrokes();
  };

  // Manual Clear: Only called when the user explicitly clicks CLEAR or RESET
  const handleClear = () => {
    strokesRef.current = [];
    currentStrokeRef.current = [];
    setStrokeCount(0);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleArtifactClick = (type: DeskArtifact['type']) => {
    if (type === 'PENCIL') {
      setActiveTool('PENCIL');
    } else if (type === 'COLOR') {
      const colors = ['#FFD84D', '#5B8CFF', '#FF6B57', '#63D6A0', '#A78BFA'];
      const nextIndex = (colors.indexOf(deskAccent) + 1) % colors.length;
      setDeskAccent(colors[nextIndex]);
    } else if (type === 'GRID') {
      setShowGridOverlay(!showGridOverlay);
    } else if (type === 'TYPE') {
      if (deskTypeVariant === 'BOLD') setDeskTypeVariant('OUTLINE');
      else if (deskTypeVariant === 'OUTLINE') setDeskTypeVariant('MONO');
      else setDeskTypeVariant('BOLD');
    }
  };

  const resetDesk = () => {
    setDeskAccent('#FFD84D');
    setShowGridOverlay(true);
    setDeskTypeVariant('OUTLINE');
    handleClear();
  };

  return (
    <section id="studio-desk" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 select-none">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between border-b-3 border-[#0A0A0A] pb-4 mb-6 sm:mb-8 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FFD84D] border border-[#0A0A0A]" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
              06 / THE SIGNATURE INTERACTION
            </span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-black text-[#0A0A0A] uppercase tracking-tight">
            THE DESIGN DESK
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] border-2 border-[#0A0A0A] text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_#0A0A0A]">
            <span className="w-2 h-2 rounded-full bg-[#63D6A0] animate-pulse" />
            <span>FREEHAND DRAFTING LIVE</span>
          </div>

          <button
            type="button"
            onClick={resetDesk}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#D7DBDF] border-2 border-[#0A0A0A] text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_#0A0A0A] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET DESK</span>
          </button>
        </div>
      </div>

      {/* The Physical Virtual Desk Canvas */}
      <div
        ref={deskContainerRef}
        className="relative w-full min-h-[480px] sm:min-h-[540px] bg-[#FFFFFF] border-3 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] sm:shadow-[8px_8px_0px_#0A0A0A] p-4 sm:p-8 overflow-hidden flex flex-col justify-between"
      >
        
        {/* Visual Cutting Mat Grid Overlay (Toggled by GRID Artifact) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            showGridOverlay ? 'opacity-30' : 'opacity-[0.04]'
          }`}
          style={{
            backgroundImage:
              'linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)',
            backgroundSize: '2rem 2rem',
          }}
        />

        {/* Desk Top Readout & Drawing Toolbar */}
        <div className="relative z-30 flex flex-wrap items-center justify-between border-b-2 border-[#0A0A0A] pb-3 text-xs font-mono gap-3 bg-[#FFFFFF]/90 backdrop-blur-xs p-2">
          
          {/* Mode Switchers: DRAW with Pencil vs MOVE Objects */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTool('PENCIL')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 transition-all cursor-pointer ${
                activeTool === 'PENCIL'
                  ? 'bg-[#FFD84D] text-[#0A0A0A] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
                  : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/40 hover:border-[#0A0A0A]'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>PENCIL [DRAW]</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTool('MOVE')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 transition-all cursor-pointer ${
                activeTool === 'MOVE'
                  ? 'bg-[#0A0A0A] text-[#E3E6E8] border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]'
                  : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/40 hover:border-[#0A0A0A]'
              }`}
            >
              <Move className="w-3.5 h-3.5" />
              <span>MOVE OBJECTS</span>
            </button>
          </div>

          {/* Pencil Color Swatches & Stroke Width */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {activeTool === 'PENCIL' && (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#0A0A0A]/60 uppercase font-bold">INK:</span>
                {[
                  { color: '#FF6B57', name: 'REDLINE' },
                  { color: '#0A0A0A', name: 'GRAPHITE' },
                  { color: '#5B8CFF', name: 'BLUEPRINT' },
                  { color: '#FFD84D', name: 'YELLOW' },
                ].map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    title={c.name}
                    onClick={() => setPencilColor(c.color)}
                    className={`w-5 h-5 border-2 transition-transform cursor-pointer ${
                      pencilColor === c.color ? 'scale-125 border-[#0A0A0A] shadow-[1px_1px_0px_#0A0A0A]' : 'border-[#0A0A0A]/40'
                    }`}
                    style={{ backgroundColor: c.color }}
                  />
                ))}
              </div>
            )}

            {activeTool === 'PENCIL' && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-[#0A0A0A]/60 uppercase font-bold">TIP:</span>
                {[2, 4, 8].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setPencilWidth(w)}
                    className={`px-1.5 py-0.5 text-[9px] font-mono font-bold border cursor-pointer ${
                      pencilWidth === w ? 'bg-[#0A0A0A] text-[#E3E6E8] border-[#0A0A0A]' : 'bg-[#FFFFFF] text-[#0A0A0A] border-[#0A0A0A]/30'
                    }`}
                  >
                    {w}PX
                  </button>
                ))}
              </div>
            )}

            {/* Undo last stroke */}
            {strokeCount > 0 && (
              <button
                type="button"
                onClick={handleUndo}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFFFFF] hover:bg-[#D7DBDF] border border-[#0A0A0A] text-[10px] font-mono font-bold uppercase transition-all cursor-pointer"
                title="Undo last stroke"
              >
                <Undo2 className="w-3 h-3" />
                <span>UNDO</span>
              </button>
            )}

            {/* Clear all strokes manually */}
            {strokeCount > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFFFFF] hover:bg-[#FF6B57] hover:text-[#FFFFFF] border border-[#0A0A0A] text-[10px] font-mono font-bold uppercase transition-all cursor-pointer"
                title="Clear all strokes manually"
              >
                <Trash2 className="w-3 h-3" />
                <span>CLEAR</span>
              </button>
            )}
          </div>
        </div>

        {/* Real-time Freehand Drawing Canvas - Fixed High-Res Coordinate Buffer (Never clears on re-render) */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerEnter={handlePointerEnter}
          style={{ touchAction: 'none' }}
          className={`absolute inset-0 w-full h-full z-20 ${
            activeTool === 'PENCIL' ? 'cursor-none pointer-events-auto' : 'pointer-events-none'
          }`}
        />

        {/* Real-time Tactile Mechanical Drafting Pencil Visual (Direct DOM Transform for 60-120fps) */}
        <div
          ref={pencilRef}
          className={`pointer-events-none absolute top-0 left-0 z-40 will-change-transform transition-opacity duration-150 ${
            isPencilVisible && activeTool === 'PENCIL' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'translate3d(-200px, -200px, 0)' }}
        >
          <svg
            width="110"
            height="110"
            viewBox="0 0 110 110"
            className="pointer-events-none drop-shadow-[3px_5px_8px_rgba(10,10,10,0.35)] overflow-visible"
          >
            {/* 35-degree angled technical drafting pencil pointing right at lead origin */}
            <g transform="rotate(35 0 0)">
              {/* Graphite lead point touching directly at (0, 0) */}
              <polygon points="0,0 -3,12 3,12" fill={pencilColor} stroke="#0A0A0A" strokeWidth="0.5" />
              
              {/* Sharpened cedar wood cone */}
              <polygon points="-3,12 3,12 5,24 -5,24" fill="#E8C39E" stroke="#0A0A0A" strokeWidth="1" />
              
              {/* Hexagonal pencil barrel (Signal Yellow with faceted spine) */}
              <rect x="-5" y="24" width="10" height="64" fill="#FFD84D" stroke="#0A0A0A" strokeWidth="1.5" />
              <line x1="-1.5" y1="24" x2="-1.5" y2="88" stroke="#0A0A0A" strokeWidth="0.8" strokeOpacity="0.35" />
              <line x1="1.5" y1="24" x2="1.5" y2="88" stroke="#0A0A0A" strokeWidth="0.8" strokeOpacity="0.35" />
              
              {/* Micro branding stamp on pencil body */}
              <text
                x="-3.5"
                y="54"
                fontSize="4.5"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#0A0A0A"
                transform="rotate(90 -3.5 54)"
              >
                SHANMUKH // 2B
              </text>
              
              {/* Metal Ferrule Ring */}
              <rect x="-5" y="88" width="10" height="8" fill="#CBD0D5" stroke="#0A0A0A" strokeWidth="1" />
              <line x1="-5" y1="92" x2="5" y2="92" stroke="#0A0A0A" strokeWidth="0.7" />
              
              {/* Drafting Eraser Tip */}
              <rect x="-4.5" y="96" width="9" height="7" rx="1.5" fill="#FF6B57" stroke="#0A0A0A" strokeWidth="1" />
            </g>
          </svg>
        </div>

        {/* Desk Centerpiece Typography Target - 100% visible and unblocked */}
        <div className="relative z-10 my-auto py-10 sm:py-16 text-center pointer-events-none select-none">
          <h3
            className={`font-['Space_Grotesk'] text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight transition-all duration-200 break-words ${
              deskTypeVariant === 'OUTLINE'
                ? 'text-transparent [-webkit-text-stroke:2.5px_#0A0A0A]'
                : deskTypeVariant === 'MONO'
                ? 'font-mono text-2xl sm:text-4xl text-[#0A0A0A]'
                : 'text-[#0A0A0A]'
            }`}
          >
            SHANMUKH STUDIO
          </h3>
          <p className="font-mono text-[10px] sm:text-xs text-[#0A0A0A]/70 uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
            <span>PHYSICAL DRAFTING MAT</span>
            <span>·</span>
            <span className="font-bold text-[#0A0A0A]">CLICK & DRAG PENCIL TO DRAW OR WRITE</span>
          </p>
        </div>

        {/* Perimeter Draggable Artifacts Layer - anchored to edges away from center text */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {initialArtifacts.map((art) => (
            <motion.div
              key={art.id}
              drag={activeTool === 'MOVE'}
              dragConstraints={deskContainerRef}
              dragElastic={0.15}
              whileDrag={{ scale: 1.08, zIndex: 40 }}
              onClick={() => handleArtifactClick(art.type)}
              className={`pointer-events-auto absolute ${art.positionClass} p-2 sm:p-2.5 bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] transition-all ${
                activeTool === 'MOVE' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer hover:bg-[#FFD84D]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-2 h-2 border border-[#0A0A0A]"
                  style={{ backgroundColor: art.color }}
                />
                <span className="text-[9px] font-mono font-bold text-[#0A0A0A]">
                  [{art.tag}]
                </span>
              </div>
              <span className="font-['Space_Grotesk'] font-bold text-[11px] sm:text-xs text-[#0A0A0A] uppercase block leading-tight">
                {art.title}
              </span>
              <span className="text-[8px] font-mono text-[#0A0A0A]/60 block pt-0.5">
                {art.type === 'PENCIL' ? 'SELECT TOOL' : 'CLICK / DRAG'}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Ruler & Status Strip */}
        <div className="relative z-30 border-t-2 border-[#0A0A0A] pt-3 flex flex-wrap items-center justify-between text-[10px] font-mono text-[#0A0A0A]/70 gap-2 bg-[#FFFFFF]/80 backdrop-blur-xs px-1">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#0A0A0A]">SCALE 1:1 · DRAFTING CANVAS</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">STROKES: {strokeCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {activeTool === 'PENCIL'
                ? '✏️ CLICK & DRAG ANYWHERE ON THE CANVAS TO WRITE OR DRAW'
                : '✋ CLICK & DRAG ARTIFACTS TO MOVE AROUND THE WORKBENCH'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

