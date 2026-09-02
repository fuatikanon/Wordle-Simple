import React from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { LetterStatus } from '../types';

interface KeyboardProps {
  onKey: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  onRestart: () => void;
  letterStatuses: Record<string, LetterStatus>;
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export const Keyboard: React.FC<KeyboardProps> = ({
  onKey,
  onEnter,
  onBackspace,
  onRestart,
  letterStatuses,
  disabled = false,
}) => {
  const getKeyClasses = (key: string) => {
    const status = letterStatuses[key];

    if (status === 'correct') {
      return 'bg-emerald-600 hover:bg-emerald-700 text-white font-black border-2 border-emerald-700 dark:border-emerald-500 shadow-xs';
    }
    if (status === 'present') {
      return 'bg-amber-500 hover:bg-amber-600 text-white font-black border-2 border-amber-600 dark:border-amber-400 shadow-xs';
    }
    if (status === 'absent') {
      return 'bg-slate-400 dark:bg-slate-800 text-white dark:text-slate-500 border-2 border-slate-500 dark:border-slate-800';
    }

    return 'bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600 text-slate-900 dark:text-slate-100 font-bold border-2 border-slate-300 dark:border-slate-700 shadow-xs';
  };

  const handleKeyClick = (key: string) => {
    if (disabled) return;
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACKSPACE') {
      onBackspace();
    } else {
      onKey(key);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-1 sm:px-2 flex flex-col items-center gap-1.5 sm:gap-2 select-none">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 w-full touch-manipulation">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACKSPACE';
            const keyClass = getKeyClasses(key);

            return (
              <button
                id={`keyboard-btn-${key.toLowerCase()}`}
                key={key}
                type="button"
                onClick={() => handleKeyClick(key)}
                className={`flex items-center justify-center rounded-lg sm:rounded-xl transition-all active:scale-95 duration-100 uppercase h-12 sm:h-13 text-sm sm:text-base font-bold ${
                  isSpecial
                    ? 'px-2 sm:px-3 text-xs sm:text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 active:bg-slate-400 dark:active:bg-slate-500 text-slate-900 dark:text-white border-2 border-slate-400 dark:border-slate-600 shadow-xs flex-1.5 max-w-[70px]'
                    : `flex-1 max-w-[42px] ${keyClass}`
                }`}
                aria-label={key === 'BACKSPACE' ? 'ลบตัวอักษร' : key === 'ENTER' ? 'ยืนยันคำตอบ' : key}
              >
                {key === 'BACKSPACE' ? (
                  <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : key === 'ENTER' ? (
                  'ENTER'
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}

      {/* Play Again / Restart Button under the keyboard */}
      <div className="w-full pt-2 sm:pt-3 flex justify-center">
        <button
          id="play-again-btn"
          type="button"
          onClick={onRestart}
          className="w-full max-w-[280px] sm:max-w-xs py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md border-2 border-indigo-700 dark:border-indigo-500 transition-all duration-150 flex items-center justify-center gap-2 text-sm sm:text-base active:scale-98"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>เริ่มเล่นใหม่ (New Game)</span>
        </button>
      </div>
    </div>
  );
};
