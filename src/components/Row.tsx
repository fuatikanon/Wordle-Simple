import React from 'react';
import { EvaluatedLetter } from '../types';
import { Tile } from './Tile';

interface RowProps {
  guess?: string;
  evaluation?: EvaluatedLetter[];
  isCurrent?: boolean;
  isShaking?: boolean;
  isWinningRow?: boolean;
}

export const Row: React.FC<RowProps> = ({
  guess = '',
  evaluation,
  isCurrent = false,
  isShaking = false,
  isWinningRow = false,
}) => {
  const letters = Array.from({ length: 5 }, (_, i) => {
    if (evaluation && evaluation[i]) {
      return {
        letter: evaluation[i].letter,
        status: evaluation[i].status,
      };
    }
    const char = guess[i] || '';
    return {
      letter: char,
      status: char ? (isCurrent ? 'typing' : 'empty') : 'empty',
    };
  });

  return (
    <div
      className={`grid grid-cols-5 gap-1.5 sm:gap-2 w-full ${
        isShaking ? 'animate-shake' : ''
      }`}
    >
      {letters.map((item, index) => (
        <Tile
          key={index}
          index={index}
          letter={item.letter}
          status={item.status}
          isCompleted={Boolean(evaluation)}
          isWinningRow={isWinningRow}
        />
      ))}
    </div>
  );
};
