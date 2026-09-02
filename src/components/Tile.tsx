import React from 'react';
import { LetterStatus } from '../types';

interface TileProps {
  letter: string;
  status?: LetterStatus;
  index: number;
  isCompleted?: boolean;
  isWinningRow?: boolean;
}

export const Tile: React.FC<TileProps> = ({
  letter,
  status = 'empty',
  index,
  isCompleted = false,
  isWinningRow = false,
}) => {
  let statusClasses = 'bg-white dark:bg-slate-800/90 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs';

  if (status === 'typing' && letter) {
    statusClasses = 'bg-white dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-200 text-slate-950 dark:text-white animate-pop shadow-sm font-black';
  } else if (status === 'correct') {
    statusClasses = 'bg-emerald-600 dark:bg-emerald-600 border-2 border-emerald-700 dark:border-emerald-500 text-white font-black shadow-xs';
  } else if (status === 'present') {
    statusClasses = 'bg-amber-500 dark:bg-amber-500 border-2 border-amber-600 dark:border-amber-400 text-white font-black shadow-xs';
  } else if (status === 'absent') {
    statusClasses = 'bg-slate-500 dark:bg-slate-700 border-2 border-slate-600 dark:border-slate-600 text-white dark:text-slate-200 font-black shadow-2xs';
  }

  // Staggered flip animation for revealed rows
  const animationDelay = isCompleted ? `${index * 120}ms` : '0ms';
  const winningDelay = isWinningRow ? `${index * 100}ms` : '0ms';

  return (
    <div
      className="relative aspect-square w-full flex items-center justify-center select-none"
      style={{ perspective: '1000px' }}
    >
      <div
        style={{
          animationDelay: isWinningRow ? winningDelay : animationDelay,
        }}
        className={`w-full h-full rounded-lg sm:rounded-xl flex items-center justify-center text-center text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase leading-none transition-all duration-200 ${statusClasses} ${
          isCompleted ? 'animate-flip' : ''
        } ${isWinningRow ? 'animate-bounce-win' : ''}`}
      >
        <span className="flex items-center justify-center leading-none mt-[-1px]">
          {letter}
        </span>
      </div>
    </div>
  );
};
