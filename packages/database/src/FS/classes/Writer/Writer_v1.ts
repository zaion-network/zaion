export interface IWriter_v1 {
  name: string;
}

export interface Writer_v1 {
  name: string;
}

export class Writer_v1 implements IWriter_v1 {
  constructor(name: string) {
    this.name = name;
  }
}

export type Writer_v1Ctor = {
  new (name: string): Writer_v1;
};

export const Writer_v1Ctor: Writer_v1Ctor = Writer_v1;
