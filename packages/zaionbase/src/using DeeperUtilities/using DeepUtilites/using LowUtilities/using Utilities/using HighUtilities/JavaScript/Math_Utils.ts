export namespace Math_Utils {
  export interface IconvertDecimalToFractionString_v1 {
    (decimale: number): string;
  }

  /**
   * Crea una string con il formato di frazione a partire da
   * un numero con la virgola.
   * @param decimale numero con virgola per il quale deve
   * essere creata la string.
   * @returns una string con formato frazione (0,2 => '1/5')
   */
  export const convertDecimalToFractionString: IconvertDecimalToFractionString_v1 =
    function (decimale: number): string {
      let frazioneInString: string;
      if (decimale === 1) return "1";
      if (decimale >= 1)
        return "il valore passato deve essere un numero decimale!";
      const numeriDopoLaVirgola = quantiDecimaliDopoLaVirgola(decimale);
      let denominatore: number = Math.pow(10, numeriDopoLaVirgola);
      let numeratore: number = decimale * denominatore;
      const divisore: number = massimoComuneDivisore(numeratore, denominatore);
      numeratore /= divisore;
      denominatore /= divisore;
      frazioneInString =
        `${Math.floor(numeratore)}` + `/${Math.floor(denominatore)}`;
      return frazioneInString;
    };

  export interface IquantiDecimaliDopoLaVirgola_v1 {
    (number: number): number;
  }

  /**
   * @param number
   * @returns
   */
  export const quantiDecimaliDopoLaVirgola: IquantiDecimaliDopoLaVirgola_v1 =
    function quantiDecimaliDopoLaVirgola(number: number): number {
      const len = number.toString().length - 2;
      return len;
    };

  export interface ImassimoComuneDivisore_v1 {
    (a: number, b: number): number;
  }

  /**
   *
   * @param a
   * @param b
   * @returns
   */
  export const massimoComuneDivisore: ImassimoComuneDivisore_v1 =
    function massimoComuneDivisore(a: number, b: number): number {
      if (b < 0.0000001) return a;

      function mcdmcm(A: number, B: number) {
        var a, b, r, MCD, mcm;

        a = parseInt(A.toString());
        b = parseInt(B.toString());

        r = a % b;
        while (r != 0) {
          a = b;
          b = r;
          r = a % b;
        }

        MCD = b;
        mcm = (parseInt(A.toString()) * parseInt(B.toString())) / MCD;
        return { MCD: MCD, mcm: mcm };
      }
      return mcdmcm(a, b).MCD;
    };

  export interface Imodulo_v1 {
    (a: number, b: number): number;
  }

  /**
   *
   * @param a
   * @param b
   * @returns
   */
  export const modulo: Imodulo_v1 = function modulo(
    a: number,
    b: number
  ): number {
    return a % b;
  };
}
