import { parse } from "csv-parse/sync";
import { system } from "../System";

export interface INoizCsv_v1<T> {
  parsed: T;
}

export interface NoizCsv_v1 {
  name: string;
}

export class NoizCsv_v1 {
  records: any[];
  constructor(path: string) {
    const input = system.stringifyFile(path);
    this.records = parse(input, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ";",
    });
  }
}

/**
 * 
  const filpath =
    "/Users/WAW/Documents/Believe/982321_84880_20220101_20220331.csv";
  const smaller =
    "/Users/WAW/Documents/Projects/ZION/packages/@zionrepack/csv/982321_84880_20220101_20220331.csv";
  const input = system.stringifyFile(smaller);
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ";",
  });

  const gotek = records.filter((e) => e["Nome dell'artista"] === "Gotek");

  console.log(
    records.map((r) => {
      return [
        r["Nome dell'artista"],
        r["Titolo della traccia"],
        r["Guadagno netto"],
      ];
    })
 */

export type NoizCsv_v1Ctor = {
  new (name: string): NoizCsv_v1;
};

export const NoizCsv_v1Ctor: NoizCsv_v1Ctor = NoizCsv_v1;
