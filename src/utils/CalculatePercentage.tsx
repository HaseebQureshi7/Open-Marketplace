export function CalculatePercentage(number: number, percentage: number): number {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Percentage should be between 0 and 100.');
    }
  
    return (number * percentage) / 100;
  }