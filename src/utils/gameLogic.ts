import { EvaluatedLetter, LetterStatus } from '../types';

/**
 * Evaluates a 5-letter guess against the target word using standard Wordle rules.
 * Handles duplicate letters with proper frequency counts.
 */
export function evaluateGuess(guess: string, target: string): EvaluatedLetter[] {
  const guessUpper = guess.toUpperCase();
  const targetUpper = target.toUpperCase();
  const length = 5;

  const results: EvaluatedLetter[] = Array.from({ length }, (_, i) => ({
    letter: guessUpper[i] || '',
    status: 'absent' as LetterStatus,
  }));

  // Track letter frequencies in the target word
  const targetLetterCounts: Record<string, number> = {};
  for (let i = 0; i < length; i++) {
    const char = targetUpper[i];
    targetLetterCounts[char] = (targetLetterCounts[char] || 0) + 1;
  }

  // First pass: identify all correct positions ('correct' / green)
  for (let i = 0; i < length; i++) {
    if (guessUpper[i] === targetUpper[i]) {
      results[i].status = 'correct';
      targetLetterCounts[guessUpper[i]]--;
    }
  }

  // Second pass: identify present letters in wrong positions ('present' / yellow)
  for (let i = 0; i < length; i++) {
    if (results[i].status !== 'correct') {
      const char = guessUpper[i];
      if (char && targetLetterCounts[char] && targetLetterCounts[char] > 0) {
        results[i].status = 'present';
        targetLetterCounts[char]--;
      } else {
        results[i].status = 'absent';
      }
    }
  }

  return results;
}

/**
 * Determines key statuses for the virtual keyboard.
 * Priority: 'correct' > 'present' > 'absent' > undefined
 */
export function getKeyboardLetterStatuses(
  evaluatedGuesses: EvaluatedLetter[][]
): Record<string, LetterStatus> {
  const statusMap: Record<string, LetterStatus> = {};

  const priorityOrder: Record<LetterStatus, number> = {
    correct: 3,
    present: 2,
    absent: 1,
    empty: 0,
    typing: 0,
  };

  evaluatedGuesses.forEach((row) => {
    row.forEach(({ letter, status }) => {
      if (!letter) return;
      const currentStatus = statusMap[letter];
      const currentPriority = currentStatus ? priorityOrder[currentStatus] : 0;
      const newPriority = priorityOrder[status] || 0;

      if (newPriority > currentPriority) {
        statusMap[letter] = status;
      }
    });
  });

  return statusMap;
}
