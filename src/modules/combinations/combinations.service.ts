import { Injectable } from '@nestjs/common';

@Injectable()
export class CombinationsService {
  calculateCombinations(phoneNumber: string): { combinations: string[] } {
    const digitToLetters: { [key: string]: string } = {
      '2': 'abc',
      '3': 'def',
      '4': 'ghi',
      '5': 'jkl',
      '6': 'mno',
      '7': 'pqrs',
      '8': 'tuv',
      '9': 'wxyz',
    };

    const combinations: string[] = [];

    const backtrack = (index: number, currentDigit: string) => {
      if (index === phoneNumber.length) {
        combinations.push(currentDigit);
        return;
      }

      const digit = phoneNumber[index];
      const letters = digitToLetters[digit];

      if (letters) {
        for (const letter of letters) {
          backtrack(index + 1, currentDigit + letter);
        }
      }
    };

    backtrack(0, '');
    return { combinations };
  }
}
