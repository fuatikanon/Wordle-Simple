import React from 'react';
import { EvaluatedLetter } from '../types';
import { Row } from './Row';

interface GridProps {
  guesses: string[];
  evaluations: EvaluatedLetter[][];
  currentGuess: string;
  currentRowIndex: number;
  isShakingCurrentRow: boolean;
  winningRowIndex: number | null;
}

export const Grid: React.FC<GridProps> = ({
  guesses,
  evaluations,
  currentGuess,
  currentRowIndex,
  isShakingCurrentRow,
  winningRowIndex,
}) => {
  const totalRows = 6;
  const rows = Array.from({ length: totalRows }, (_, index) => {
    const isSubmitted = index < currentRowIndex;
    const isCurrent = index === currentRowIndex;

    return (
      <Row
        key={index}
        guess={isCurrent ? currentGuess : guesses[index] || ''}
        evaluation={isSubmitted ? evaluations[index] : undefined}
        isCurrent={isCurrent}
        isShaking={isCurrent && isShakingCurrentRow}
        isWinningRow={winningRowIndex === index}
      />
    );
  });

  return (
    <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto flex flex-col gap-1.5 sm:gap-2 my-2 sm:my-4 px-2">
      {rows}
    </div>
  );
};
