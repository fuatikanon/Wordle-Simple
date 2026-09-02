import React, { useState, useEffect, useCallback } from 'react';
import { getRandomWord, WORD_LIST, isValidWord } from './words';
import { evaluateGuess, getKeyboardLetterStatuses } from './utils/gameLogic';
import { GameStatus, EvaluatedLetter, WordItem, GameStats } from './types';
import { Header } from './components/Header';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { StatusBanner } from './components/StatusBanner';
import { Toast } from './components/Toast';

const STATS_STORAGE_KEY = 'wordle_simple_stats';
const THEME_STORAGE_KEY = 'wordle_theme_dark';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [targetWord, setTargetWord] = useState<WordItem>(() => getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<EvaluatedLetter[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [winningRowIndex, setWinningRowIndex] = useState<number | null>(null);

  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      played: 0,
      won: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    };
  });

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Auto clear toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 1800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const letterStatuses = React.useMemo(() => {
    return getKeyboardLetterStatuses(evaluations);
  }, [evaluations]);

  const handleRestart = useCallback(() => {
    let nextWord = getRandomWord();
    // Try to pick a different word if more than 1 word in list
    if (WORD_LIST.length > 1 && nextWord.word === targetWord.word) {
      const filtered = WORD_LIST.filter((w) => w.word !== targetWord.word);
      nextWord = filtered[Math.floor(Math.random() * filtered.length)];
    }

    setTargetWord(nextWord);
    setGuesses([]);
    setEvaluations([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setIsShaking(false);
    setWinningRowIndex(null);
    showToast('เริ่มเกมใหม่แล้ว! ลองทายคำ 5 ตัวอักษรดูสิ');
  }, [targetWord.word, showToast]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length >= 5) return;

    const upperKey = key.toUpperCase();
    if (/^[A-Z]$/.test(upperKey)) {
      setCurrentGuess((prev) => prev + upperKey);
    }
  }, [gameStatus, currentGuess.length]);

  const handleBackspace = useCallback(() => {
    if (gameStatus !== 'playing') return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [gameStatus]);

  const handleEnter = useCallback(() => {
    if (gameStatus !== 'playing') return;

    if (currentGuess.length < 5) {
      setIsShaking(true);
      showToast('กรุณากรอกตัวอักษรให้ครบ 5 ตัว');
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Check if the entered word is in the valid words list
    if (!isValidWord(currentGuess)) {
      setIsShaking(true);
      showToast('ไม่ใช่คำในรายการ (Not in word list)');
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const evaluation = evaluateGuess(currentGuess, targetWord.word);
    const newGuesses = [...guesses, currentGuess];
    const newEvaluations = [...evaluations, evaluation];
    const currentRowIdx = guesses.length;

    setGuesses(newGuesses);
    setEvaluations(newEvaluations);
    setCurrentGuess('');

    const isWin = evaluation.every((e) => e.status === 'correct');

    if (isWin) {
      setGameStatus('won');
      setWinningRowIndex(currentRowIdx);
      showToast(`ยอดเยี่ยม! คุณชนะใน ${newGuesses.length}/6 ครั้ง 🎉`);

      setStats((prev) => {
        const newStreak = prev.currentStreak + 1;
        const newStats = {
          ...prev,
          played: prev.played + 1,
          won: prev.won + 1,
          currentStreak: newStreak,
          maxStreak: Math.max(prev.maxStreak, newStreak),
          guessDistribution: {
            ...prev.guessDistribution,
            [newGuesses.length]: (prev.guessDistribution[newGuesses.length] || 0) + 1,
          },
        };
        try {
          localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
        } catch {
          // ignore
        }
        return newStats;
      });
    } else if (newGuesses.length >= 6) {
      setGameStatus('lost');
      showToast(`หมดโอกาสแล้ว! คำตอบคือ: ${targetWord.word}`);

      setStats((prev) => {
        const newStats = {
          ...prev,
          played: prev.played + 1,
          currentStreak: 0,
        };
        try {
          localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
        } catch {
          // ignore
        }
        return newStats;
      });
    }
  }, [currentGuess, gameStatus, guesses, evaluations, targetWord.word, showToast]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is using keyboard shortcuts with Ctrl/Cmd/Alt
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnter();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter, handleBackspace, handleKeyPress]);

  // Auto sync dark mode class to html element and save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, String(isDark));
    } catch {
      // ignore
    }

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#f8fafc';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#0f172a';
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-900 text-slate-100' : 'bg-white text-slate-900'} flex flex-col justify-between py-2 sm:py-4 px-2 select-none font-sans transition-colors duration-150`}>
      <Toast message={toastMessage} />

      {/* Top Header & Instructions */}
      <Header
        onRestart={handleRestart}
        streak={stats.currentStreak}
        playedCount={stats.played}
        isDark={isDark}
        onToggleDark={toggleTheme}
      />

      {/* Result feedback message when won or lost */}
      <StatusBanner
        status={gameStatus}
        triesUsed={guesses.length}
        wordItem={targetWord}
        onRestart={handleRestart}
      />

      {/* Main 6x5 Wordle Board */}
      <main className="flex-1 flex items-center justify-center my-1 sm:my-2">
        <Grid
          guesses={guesses}
          evaluations={evaluations}
          currentGuess={currentGuess}
          currentRowIndex={guesses.length}
          isShakingCurrentRow={isShaking}
          winningRowIndex={winningRowIndex}
        />
      </main>

      {/* Virtual Touch/Mouse Keyboard */}
      <footer className="w-full pb-2">
        <Keyboard
          onKey={handleKeyPress}
          onEnter={handleEnter}
          onBackspace={handleBackspace}
          onRestart={handleRestart}
          letterStatuses={letterStatuses}
          disabled={gameStatus !== 'playing'}
        />
      </footer>
    </div>
  );
}
