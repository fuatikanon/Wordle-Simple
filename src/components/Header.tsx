import React, { useState } from 'react';
import { HelpCircle, RefreshCw, Info, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onRestart: () => void;
  streak: number;
  playedCount: number;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRestart, isDark, onToggleDark }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="w-full max-w-lg mx-auto pt-3 pb-2 px-4 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between">
        <button
          id="help-toggle-btn"
          type="button"
          onClick={() => setShowHelp((prev) => !prev)}
          className={`p-2 transition-all duration-150 flex items-center gap-1.5 text-sm font-semibold rounded-lg active:scale-95 ${
            showHelp
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40'
              : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
          }`}
          title={showHelp ? 'ซ่อนวิธีเล่น' : 'ดูวิธีเล่น'}
          aria-label={showHelp ? 'ซ่อนวิธีเล่น' : 'ดูวิธีเล่น'}
          aria-expanded={showHelp}
        >
          <HelpCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="hidden sm:inline">วิธีเล่น</span>
        </button>

        <div className="text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide uppercase flex items-center justify-center gap-1 sm:gap-1.5">
            <span className="bg-emerald-600 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs border border-emerald-700">W</span>
            <span className="bg-amber-500 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs border border-amber-600">O</span>
            <span className="bg-slate-700 dark:bg-slate-600 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs border border-slate-800 dark:border-slate-500">R</span>
            <span className="bg-emerald-600 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs border border-emerald-700">D</span>
            <span className="bg-amber-500 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs border border-amber-600">L</span>
            <span className="bg-slate-700 dark:bg-slate-600 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs border border-slate-800 dark:border-slate-500">E</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">เกมทายคำศัพท์ภาษาอังกฤษ 5 ตัวอักษร</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleDark}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all duration-150 active:scale-95"
            title={isDark ? 'สลับเป็นโหมดสว่าง (Light Mode)' : 'สลับเป็นโหมดมืด (Dark Mode)'}
            aria-label={isDark ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 transition-transform hover:-rotate-12" />
            )}
          </button>

          <button
            id="header-restart-btn"
            type="button"
            onClick={onRestart}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-all duration-150 active:scale-95"
            title="เริ่มเกมใหม่"
            aria-label="เริ่มเกมใหม่"
          >
            <RefreshCw className="w-5 h-5 transition-transform active:rotate-180 duration-300" />
          </button>
        </div>
      </div>

      {/* Instruction Card toggled on click */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-slate-50 dark:bg-slate-800 rounded-xl p-3.5 border border-slate-200 dark:border-slate-700 shadow-xs relative transition-colors">
              <button
                id="close-help-btn"
                type="button"
                onClick={() => setShowHelp(false)}
                className="absolute top-2.5 right-2.5 p-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-700"
                aria-label="ปิดกล่องวิธีเล่น"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-2.5 pr-6">
                <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed w-full">
                  <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">กติกาการเล่น (ทายได้ 6 ครั้ง):</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-2">
                    พิมพ์คำศัพท์ภาษาอังกฤษ 5 ตัวอักษร แล้วกด{' '}
                    <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded font-mono text-xs text-slate-800 dark:text-slate-200 font-semibold shadow-2xs">
                      ENTER
                    </kbd>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 px-2.5 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800/60 font-medium">
                      <span className="w-5 h-5 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        A
                      </span>
                      <span>
                        <strong className="text-emerald-900 dark:text-emerald-200">เขียว:</strong> ถูกต้องทั้งตัวอักษรและตำแหน่ง
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/50 text-amber-950 dark:text-amber-200 px-2.5 py-1.5 rounded-lg border border-amber-300 dark:border-amber-800/60 font-medium">
                      <span className="w-5 h-5 rounded bg-amber-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        B
                      </span>
                      <span>
                        <strong className="text-amber-900 dark:text-amber-200">เหลือง:</strong> มีในคำแต่อยู่ผิดตำแหน่ง
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/60 text-slate-800 dark:text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 font-medium">
                      <span className="w-5 h-5 rounded bg-slate-500 dark:bg-slate-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        C
                      </span>
                      <span>
                        <strong className="text-slate-900 dark:text-slate-300">เทา:</strong> ไม่มีตัวอักษรนี้ในคำ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
