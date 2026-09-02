import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-200">
      <div className="bg-slate-900/95 dark:bg-slate-800/95 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg backdrop-blur-xs flex items-center gap-2 border border-slate-700 dark:border-slate-600 animate-pop">
        <span>{message}</span>
      </div>
    </div>
  );
};
