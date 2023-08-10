export interface IcallCBNTimes {
  <T>(volte: number, callback: Function): T[];
}

/**
 *
 * @param volte
 * @param callback
 * @returns
 */
export const callCBNTimes: IcallCBNTimes = function <T>(
  volte: number,
  callback: Function
): T[] {
  let array: T[] = [];
  while (volte) {
    array.push(callback());
    volte--;
  }
  return array;
};
