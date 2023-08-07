export class StringComparer {
  #size = 100;
  chopem(string1: string, string2: string, start: number, end?: number) {
    const length1 = string1.length;
    const length2 = string2.length;
    const pad = end ? end : this.#size;
    const chars = pad + start;
    const chop1 = string1.slice(start, chars);
    const chop2 = string2.slice(start, chars);
    return [
      { value: chop1, length: length1 },
      { value: chop2, length: length2 },
    ];
  }
  interate(strings: string[]) {
    const [string1, string2] = strings;
    const length1 = string1.length;
    const length2 = string2.length;
    let maxlength = length1 > length2 ? length1 : length2;
    let result = [];
    const step = this.#size;
    let start = 0;
    while (start + step < maxlength) {
      const [reschop1, reschop2] = this.chopem(string1, string2, start);
      start = start + step;
      if (reschop1.value === reschop2.value) {
      } else if (reschop1.value !== reschop2.value)
        result.push([reschop1.value, reschop2.value, start]);
    }
    return result;
  }
  /**
   * This function was used to replace the wrong spacing in
   * the resulting XML file. To make it match with the one
   * produced by the builder I created this to repare the
   * wrong spacing. Once I tested that the string was
   * exactly the same I removed this as it is unnecessary.
   * @param  testxml
   * @returns
   */
  replaceWrongSpaceInValue = (testxml: string): string =>
    testxml
      .replaceAll(`" 1"`, `"1"`)
      .replaceAll(`" 2"`, `"2"`)
      .replaceAll(`" 3"`, `"3"`)
      .replaceAll(`" 4"`, `"4"`)
      .replaceAll(`" 5"`, `"5"`)
      .replaceAll(`" 6"`, `"6"`)
      .replaceAll(`" 7"`, `"7"`)
      .replaceAll(`" 8"`, `"8"`)
      .replaceAll(`" 9"`, `"9"`)
      .replaceAll(`" 10"`, `"10"`)
      .replaceAll(`" 11"`, `"11"`)
      .replaceAll(`" 12"`, `"12"`)
      .replaceAll(`" 13"`, `"13"`)
      .replaceAll(`" 14"`, `"14"`)
      .replaceAll(`" 15"`, `"15"`)
      .replaceAll(`" 16"`, `"16"`)
      .replaceAll(`" 17"`, `"17"`)
      .replaceAll(`" 18"`, `"18"`)
      .replaceAll(`" 19"`, `"19"`)
      .replaceAll(`" 20"`, `"20"`);
}
