export interface IDati_v1 {
  name: string;
  status:
    | "working ✅"
    | "notter ⛔️"
    | "default-noiz"
    | "icons-not-showing"
    | "index-??";
}

export interface Dati_v1 {
  name: string;
  status:
    | "working ✅"
    | "notter ⛔️"
    | "default-noiz"
    | "icons-not-showing"
    | "index-??";
}

export class Dati_v1 implements IDati_v1 {}

export type Dati_v1Ctor = {
  new (name: string): Dati_v1;
};

export const Dati_v1Ctor: Dati_v1Ctor = Dati_v1;
