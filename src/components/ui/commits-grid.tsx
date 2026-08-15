"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// Mathematically Precise & Solid 5x7 Bitmap Matrix Font
const BITMAP_FONT: Record<string, string[]> = {
  S: [
    '#####',
    '#....',
    '#....',
    '#####',
    '....#',
    '....#',
    '#####',
  ],
  H: [
    '#...#',
    '#...#',
    '#...#',
    '#####',
    '#...#',
    '#...#',
    '#...#',
  ],
  A: [
    '#####',
    '#...#',
    '#...#',
    '#####',
    '#...#',
    '#...#',
    '#...#',
  ],
  N: [
    '#...#',
    '##..#',
    '#.#.#',
    '#.#.#',
    '#..##',
    '#..##',
    '#...#',
  ],
  M: [
    '#...#',
    '##.##',
    '#.#.#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
  ],
  U: [
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#####',
  ],
  K: [
    '#...#',
    '#..#.',
    '#.#..',
    '##...',
    '#.#..',
    '#..#.',
    '#...#',
  ],
  B: [
    '####.',
    '#...#',
    '#...#',
    '####.',
    '#...#',
    '#...#',
    '####.',
  ],
  C: [
    '#####',
    '#....',
    '#....',
    '#....',
    '#....',
    '#....',
    '#####',
  ],
  D: [
    '####.',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '####.',
  ],
  E: [
    '#####',
    '#....',
    '#....',
    '####.',
    '#....',
    '#....',
    '#####',
  ],
  F: [
    '#####',
    '#....',
    '#....',
    '####.',
    '#....',
    '#....',
    '#....',
  ],
  G: [
    '#####',
    '#....',
    '#....',
    '#.###',
    '#...#',
    '#...#',
    '#####',
  ],
  I: [
    '#####',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '#####',
  ],
  J: [
    '..###',
    '....#',
    '....#',
    '....#',
    '#...#',
    '#...#',
    '#####',
  ],
  L: [
    '#....',
    '#....',
    '#....',
    '#....',
    '#....',
    '#....',
    '#####',
  ],
  O: [
    '#####',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#####',
  ],
  P: [
    '#####',
    '#...#',
    '#...#',
    '#####',
    '#....',
    '#....',
    '#....',
  ],
  Q: [
    '#####',
    '#...#',
    '#...#',
    '#...#',
    '#.#.#',
    '#..#.',
    '####.',
  ],
  R: [
    '#####',
    '#...#',
    '#...#',
    '#####',
    '#.#..',
    '#..#.',
    '#...#',
  ],
  T: [
    '#####',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
  ],
  V: [
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '#...#',
    '.#.#.',
    '..#..',
  ],
  W: [
    '#...#',
    '#...#',
    '#...#',
    '#.#.#',
    '#.#.#',
    '##.##',
    '#...#',
  ],
  X: [
    '#...#',
    '#...#',
    '.#.#.',
    '..#..',
    '.#.#.',
    '#...#',
    '#...#',
  ],
  Y: [
    '#...#',
    '#...#',
    '.#.#.',
    '..#..',
    '..#..',
    '..#..',
    '..#..',
  ],
  Z: [
    '#####',
    '....#',
    '...#.',
    '..#..',
    '.#...',
    '#....',
    '#####',
  ],
  ' ': [
    '.....',
    '.....',
    '.....',
    '.....',
    '.....',
    '.....',
    '.....',
  ],
};

const GITHUB_LEVELS = [
  { bg: 'bg-[#ebedf0] dark:bg-[#161b22]', border: 'border-[#d0d7de]/50 dark:border-[#21262d]' }, // Level 0 (inactive empty)
  { bg: 'bg-[#9be9a8] dark:bg-[#0e4429]', border: 'border-[#7ee787] dark:border-[#006d32]' },     // Level 1
  { bg: 'bg-[#40c463] dark:bg-[#006d32]', border: 'border-[#38b259] dark:border-[#26a641]' },     // Level 2
  { bg: 'bg-[#30a14e] dark:bg-[#26a641]', border: 'border-[#2c974b] dark:border-[#39d353]' },     // Level 3
  { bg: 'bg-[#216e39] dark:bg-[#39d353]', border: 'border-[#1b6535] dark:border-[#56e36d]' },     // Level 4
];

interface CommitsGridProps {
  text?: string;
  className?: string;
  embedded?: boolean;
}

export const CommitsGrid: React.FC<CommitsGridProps> = ({
  text = 'SHANMUKH',
  className,
  embedded = false,
}) => {
  // Generate grid matrix from 5x7 bitmap font
  const { grid, totalCols, totalRows, letterCellCount } = useMemo(() => {
    const chars = text.toUpperCase().split('').filter((c) => BITMAP_FONT[c]);
    const letterWidth = 5;
    const letterHeight = 7;
    const letterSpacing = 1;
    const paddingX = 2;
    const paddingY = 1;

    const contentWidth = chars.length * letterWidth + (chars.length - 1) * letterSpacing;
    const totalCols = contentWidth + paddingX * 2;
    const totalRows = letterHeight + paddingY * 2;

    // Initialize 2D grid (all strictly empty 0 by default)
    const matrix: { isLetter: boolean; level: number; count: number; date: string }[][] = Array.from(
      { length: totalRows },
      () => Array.from({ length: totalCols }, () => ({ isLetter: false, level: 0, count: 0, date: '' }))
    );

    let currentX = paddingX;
    let letterCellCount = 0;

    chars.forEach((char) => {
      const bitmap = BITMAP_FONT[char];
      if (bitmap) {
        for (let r = 0; r < letterHeight; r++) {
          const rowStr = bitmap[r];
          for (let c = 0; c < letterWidth; c++) {
            if (rowStr[c] === '#') {
              const gridRow = r + paddingY;
              const gridCol = currentX + c;
              // Clean commit intensity variation (levels 2, 3, 4) for letters
              const level = 2 + ((gridRow * 2 + gridCol * 3) % 3);
              const count = level * 3 + Math.floor((gridCol % 3) * 2) + 2;
              matrix[gridRow][gridCol] = {
                isLetter: true,
                level,
                count,
                date: `Day ${gridCol * 7 + gridRow + 1}`,
              };
              letterCellCount++;
            }
          }
        }
      }
      currentX += letterWidth + letterSpacing;
    });

    // Clean inactive dates for remaining cells
    for (let r = 0; r < totalRows; r++) {
      for (let c = 0; c < totalCols; c++) {
        if (!matrix[r][c].isLetter) {
          matrix[r][c] = {
            isLetter: false,
            level: 0,
            count: 0,
            date: `Day ${c * 7 + r + 1}`,
          };
        }
      }
    }

    return { grid: matrix, totalCols, totalRows, letterCellCount };
  }, [text]);

  const daysOfWeek = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  const gridContent = (
    <div className="w-full flex flex-col items-center">
      {/* Commit Heatmap Grid Canvas */}
      <div className="overflow-x-auto pb-2 pt-1 hide-scrollbar w-full flex justify-center">
        <div className="flex gap-2.5 min-w-[640px] justify-center items-center py-2">
          {/* Days of Week Labels */}
          <div className="flex flex-col justify-between py-1 text-[8.5px] font-mono text-muted-foreground/60 h-full select-none pr-1">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="h-3.5 sm:h-4 flex items-center">
                {day}
              </div>
            ))}
          </div>

          {/* Grid Columns */}
          <div
            className="grid gap-1 sm:gap-1.5 p-3 rounded-xl bg-background/50 border-[0.5px] border-border/60 shadow-inner"
            style={{
              gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${totalRows}, minmax(0, 1fr))`,
            }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const style = GITHUB_LEVELS[cell.level];
                return (
                  <motion.div
                    key={`${r}-${c}`}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: (c * 0.008) + (r * 0.004),
                      duration: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ scale: 1.3, zIndex: 30 }}
                    className={cn(
                      'w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 rounded-[2.5px] border-[0.5px] cursor-pointer transition-all duration-150 relative',
                      style.bg,
                      style.border,
                      cell.isLetter && 'shadow-[0_0_8px_rgba(38,166,65,0.4)] dark:shadow-[0_0_10px_rgba(57,211,83,0.35)]'
                    )}
                    data-tooltip-id="commit-tooltip"
                    data-tooltip-content={
                      cell.count > 0
                        ? `${cell.count} commits on ${cell.date}`
                        : `No contributions on ${cell.date}`
                    }
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Heatmap Footer Legend & Meta */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t-[0.5px] border-border/50 text-[9.5px] font-mono text-muted-foreground relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-foreground font-semibold uppercase tracking-wider">
            Commit Matrix: {text}
          </span>
          <span className="text-muted-foreground/60 hidden sm:inline">
            ({letterCellCount} active glyph nodes)
          </span>
        </div>

        {/* GitHub Commit Scale Legend */}
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {GITHUB_LEVELS.map((lvl, idx) => (
              <div
                key={idx}
                className={cn('w-2.5 h-2.5 rounded-[2px] border-[0.5px]', lvl.bg, lvl.border)}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <Tooltip
        id="commit-tooltip"
        className="!text-[10px] !font-mono !bg-card !text-foreground !border !border-border !rounded-md !px-2.5 !py-1 !shadow-lg !z-50"
      />
    </div>
  );

  if (embedded) {
    return <div className={cn('w-full select-none', className)}>{gridContent}</div>;
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto select-none', className)}>
      {/* Sleek Machined Terminal Frame */}
      <div className="relative rounded-2xl border-[0.5px] border-border/80 bg-card/60 backdrop-blur-xl p-5 sm:p-7 shadow-sm overflow-hidden group">
        {/* Apple Specular Top Highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent transition-all duration-500 group-hover:via-emerald-500/80 group-hover:h-[1.5px] z-20" />

        {/* Ambient Top Light Bloom */}
        <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-3/4 h-14 bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-5 border-b-[0.5px] border-border/60 relative z-10 font-mono">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] text-foreground font-semibold ml-2">
              git log --graph --author="Shanmukh"
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <GitCommit className="w-3 h-3" />
              1,842 commits
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
              <Flame className="w-3 h-3" />
              184 day streak
            </span>
          </div>
        </div>

        {gridContent}
      </div>
    </div>
  );
};
