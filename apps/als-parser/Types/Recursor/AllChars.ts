interface AllChars {
  "\u0000": string;
  "\u0001": string;
  "\u0002": string;
  "\u0003": string;
  "\u0004": string;
  "\u0005": string;
  "\u0006": string;
  "\u0007": string;
  "\b": string;
  "\t": string;
  "\n": string;
  "\u000b": string;
  "\f": string;
  "\r": string;
  "\u000e": string;
  "\u000f": string;
  "\u0010": string;
  "\u0011": string;
  "\u0012": string;
  "\u0013": string;
  "\u0014": string;
  "\u0015": string;
  "\u0016": string;
  "\u0017": string;
  "\u0018": string;
  "\u0019": string;
  "\u001a": string;
  "\u001b": string;
  "\u001c": string;
  "\u001d": string;
  "\u001e": string;
  "\u001f": string;
  " ": string;
  "!": string;
  '"': string;
  "#": string;
  $: string;
  "%": string;
  "&": string;
  "'": string;
  "(": string;
  ")": string;
  "*": string;
  "+": string;
  ",": string;
  "-": string;
  ".": string;
  "/": string;
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  ":": string;
  ";": string;
  "<": string;
  "=": string;
  ">": string;
  "?": string;
  "@": string;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  G: string;
  H: string;
  I: string;
  J: string;
  K: string;
  L: string;
  M: string;
  N: string;
  O: string;
  P: string;
  Q: string;
  R: string;
  S: string;
  T: string;
  U: string;
  V: string;
  W: string;
  X: string;
  Y: string;
  Z: string;
  "[": string;
  "\\": string;
  "]": string;
  "^": string;
  _: string;
  "`": string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
  h: string;
  i: string;
  j: string;
  k: string;
  l: string;
  m: string;
  n: string;
  o: string;
  p: string;
  q: string;
  r: string;
  s: string;
  t: string;
  u: string;
  v: string;
  w: string;
  x: string;
  y: string;
  z: string;
  "{": string;
  "|": string;
  "}": string;
  "~": string;
  "\\x7F": string;
  "\\x80": string;
  "\\x81": string;
  "\\x82": string;
  "\\x83": string;
  "\\x84": string;
  "\\x85": string;
  "\\x86": string;
  "\\x87": string;
  "\\x88": string;
  "\\x89": string;
  "\\x8A": string;
  "\\x8B": string;
  "\\x8C": string;
  "\\x8D": string;
  "\\x8E": string;
  "\\x8F": string;
  "\\x90": string;
  "\\x91": string;
  "\\x92": string;
  "\\x93": string;
  "\\x94": string;
  "\\x95": string;
  "\\x96": string;
  "\\x97": string;
  "\\x98": string;
  "\\x99": string;
  "\\x9A": string;
  "\\x9B": string;
  "\\x9C": string;
  "\\x9D": string;
  "\\x9E": string;
  "\\x9F": string;
  "\\xA0": string;
  "¡": string;
  "¢": string;
  "£": string;
  "¤": string;
  "¥": string;
  "¦": string;
  "§": string;
  "¨": string;
  "©": string;
  ª: string;
  "«": string;
  "¬": string;
  "­": string;
  "®": string;
  "¯": string;
  "°": string;
  "±": string;
  "²": string;
  "³": string;
  "´": string;
  µ: string;
  "¶": string;
  "·": string;
  "¸": string;
  "¹": string;
  º: string;
  "»": string;
  "¼": string;
  "½": string;
  "¾": string;
  "¿": string;
  À: string;
  Á: string;
  Â: string;
  Ã: string;
  Ä: string;
  Å: string;
  Æ: string;
  Ç: string;
  È: string;
  É: string;
  Ê: string;
  Ë: string;
  Ì: string;
  Í: string;
  Î: string;
  Ï: string;
  Ð: string;
  Ñ: string;
  Ò: string;
  Ó: string;
  Ô: string;
  Õ: string;
  Ö: string;
  "×": string;
  Ø: string;
  Ù: string;
  Ú: string;
  Û: string;
  Ü: string;
  Ý: string;
  Þ: string;
  ß: string;
  à: string;
  á: string;
  â: string;
  ã: string;
  ä: string;
  å: string;
  æ: string;
  ç: string;
  è: string;
  é: string;
  ê: string;
  ë: string;
  ì: string;
  í: string;
  î: string;
  ï: string;
  ð: string;
  ñ: string;
  ò: string;
  ó: string;
  ô: string;
  õ: string;
  ö: string;
  "÷": string;
  ø: string;
  ù: string;
  ú: string;
  û: string;
  ü: string;
  ý: string;
  þ: string;
  ÿ: string;
}

const allChars = [];

for (let i = 0; i <= 255; i++) {
  const char = String.fromCharCode(i);
  allChars.push(char);
}

type InferArrayType<A> = A extends Array<infer X> ? X : never;

interface Mapper<
  P extends Array<any>,
  T extends InferArrayType<P> = InferArrayType<P>
> {
  (value: T, currentIndex?: number, array?: P): T;
}

interface Joiner {
  (arr: string[]): string;
}

const condition = (value: string) =>
  typeof value === "string" &&
  value.length === 1 &&
  value.charCodeAt(0) > 126 &&
  value.charCodeAt(0) < 161;

const formatSpecialChars = (value: string) =>
  `\\x${value.charCodeAt(0).toString(16).toLocaleUpperCase()}`;

const replacer = (key: string, value: any) => {
  if (condition(value)) value = formatSpecialChars(value);
  return value;
};

const formatter: Mapper<typeof allChars> = (value) => {
  return `${JSON.stringify(value, replacer)} : string`;
};

const joiner: Joiner = (arr) => {
  return arr.join(";\n");
};

const res = (array: string[]) => `interface AllChars {
  ${joiner(array.map(formatter))}
}`;

console.log(res(allChars));
