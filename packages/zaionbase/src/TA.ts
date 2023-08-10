export class TA {}
export namespace TA {
  export function calculateEMA(prices: number[], period: number): number {
    const alpha = 2 / (period + 1);
    let ema = prices[0];
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i]! - ema!) * alpha + ema!;
    }
    return ema!;
  }
}
