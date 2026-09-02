import React from 'react';
import { Trophy, Frown, RotateCcw } from 'lucide-react';
import { GameStatus, WordItem } from '../types';

interface StatusBannerProps {
  status: GameStatus;
  triesUsed: number;
  wordItem: WordItem;
  onRestart: () => void;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  status,
  triesUsed,
  wordItem,
  onRestart,
}) => {
  if (status === 'playing') return null;

  const isWon = status === 'won';

  return (
    <div className="w-full max-w-lg mx-auto px-4 my-2">
      <div
        className={`rounded-2xl p-4 border-2 shadow-sm transition-all duration-300 ${
          isWon
            ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400 dark:border-emerald-600/70 text-slate-900 dark:text-slate-100'
            : 'bg-red-50 dark:bg-red-950/80 border-red-400 dark:border-red-600/70 text-slate-900 dark:text-slate-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                isWon ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isWon ? <Trophy className="w-6 h-6 animate-bounce-win" /> : <Frown className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className={`text-lg sm:text-xl font-black ${isWon ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'}`}>
                  {isWon ? '🎉 ชนะแล้วยอดเยี่ยม!' : '😢 เสียใจด้วย ทายครบ 6 ครั้งแล้ว'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-0.5 font-medium">
                {isWon ? (
                  <span>
                    คุณทายคำศัพท์ถูกต้องในจำนวน <strong className="font-bold text-slate-950 dark:text-white">{triesUsed}</strong> จาก 6 ครั้ง
                  </span>
                ) : (
                  <span>
                    คำตอบที่ถูกต้องคือ:{' '}
                    <strong className="text-red-700 dark:text-red-400 tracking-wider text-base font-black">
                      {wordItem.word}
                    </strong>{' '}
                    <span className="text-slate-700 dark:text-slate-300">({wordItem.meaningTh})</span>
                  </span>
                )}
              </p>
              {isWon && (
                <p className="text-xs text-emerald-900 dark:text-emerald-300 font-semibold mt-0.5">
                  คำศัพท์: <strong>{wordItem.word}</strong> แปลว่า "{wordItem.meaningTh}"
                </p>
              )}
            </div>
          </div>

          <button
            id="status-banner-restart-btn"
            type="button"
            onClick={onRestart}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0 ${
              isWon
                ? 'bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-xs'
                : 'bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-500 text-white shadow-xs'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>เล่นอีกรอบ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
