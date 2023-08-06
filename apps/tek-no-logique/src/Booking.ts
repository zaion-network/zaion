export namespace Booking {
  enum artistRelevance {
    TOP = "TOP",
    MID = "MID",
    SMALL = "SMALL",
  }
  export interface PriceCalculator {
    capacity: number;
    ticketPrice: number;
    grossRevenue: number;
    suggestedPrice: number;
    modulator: (
      dividend?: number,
      subtraend?: number,
      multiplier?: number
    ) => (num: number) => number;
    setCoeff(
      artist: keyof typeof artistRelevance,
      modulator: (
        dividend?: number,
        subtraend?: number,
        multiplier?: number
      ) => (num: number) => number
    ): this;
  }
  export class PriceCalculator implements PriceCalculator {
    #coeff: number;
    #capacity: number;
    #ticketPrice: number;
    #grossRevenue: number;
    constructor(
      capacity: number,
      ticketPrice: number,

      coeff: number = 0.2
    ) {
      this.#coeff = coeff;
      this.#capacity = capacity;
      this.#ticketPrice = ticketPrice;
      this.#grossRevenue = this.#capacity * this.#ticketPrice;
      this.suggestedPrice = Math.round(this.#grossRevenue * this.#coeff);
    }
    setCoeff(
      artist: keyof typeof artistRelevance,
      modulator: (
        dividend?: number,
        subtraend?: number,
        multiplier?: number
      ) => (num: number) => number
    ): PriceCalculator {
      const map = new Map();
      let capacitycoeff = modulator(8, 0, 6)(this.#capacity);
      let pricecoeff = modulator(1, 0.2, 0.5)(this.#ticketPrice);

      const base = capacitycoeff * pricecoeff;

      map.set(artistRelevance.TOP, base);
      map.set(artistRelevance.MID, base / 2);
      map.set(artistRelevance.SMALL, base / 4);
      this.#coeff = map.get(artistRelevance[artist]);
      return new PriceCalculator(
        this.#capacity,
        this.#ticketPrice,

        this.#coeff
      );
    }
  }

  export interface Booking {
    capacity: number;
    ticketPrice: [number, number];
    location: string;
    venue: string;
    address: string;
    grossRevenue: [number, number];
    artists: string[][];
    cachès: [number, number][];
    transportations: [number, number][];
    accomodations: [number, number][];
    total: [number, number];
    percentage: string;
    margin: [number, number];
    converter: (num: number) => number;
    modulator: (
      dividend?: number,
      subtraend?: number,
      multiplier?: number
    ) => (num: number) => number;
    addArtist(artist: Artist, converter: (num: number) => number): this;
    addTransportation(cost: number, converter: (num: number) => number): this;
    addAccomodation(cost: number, converter: (num: number) => number): this;
  }
  export class Booking implements Booking {
    constructor(
      props: Omit<
        Booking,
        | "grossRevenue"
        | "artists"
        | "cachès"
        | "addArtist"
        | "total"
        | "margin"
        | "percentage"
        | "transportations"
        | "accomodations"
        | "addTransportation"
        | "addAccomodation"
      > &
        Partial<
          Pick<
            Booking,
            | "grossRevenue"
            | "artists"
            | "cachès"
            | "total"
            | "margin"
            | "percentage"
            | "transportations"
            | "accomodations"
            | "addTransportation"
            | "addAccomodation"
          >
        >
    ) {
      this.capacity = props.capacity;
      props.ticketPrice[1] = props.converter(props.ticketPrice[0]);
      this.ticketPrice = props.ticketPrice;
      this.location = props.location;
      const grossrevenue = this.capacity * this.ticketPrice[0];
      this.grossRevenue = [grossrevenue, props.converter(grossrevenue)];
      this.artists = [];
      this.cachès = [];
      this.transportations = [];
      this.accomodations = [];
      this.total = [0, 0];
      this.percentage = "0%";
      this.converter = props.converter;
      this.modulator = props.modulator;
    }
    #calculateTotal = (converter: (num: number) => number = this.converter) => {
      this.total = this.cachès
        .concat(this.accomodations)
        .concat(this.transportations)
        .reduce((p, c) => [p[0] + c[0], p[1] + p[1]]);
      this.total[1] = converter(this.total[0]);
      const marginInEur = this.grossRevenue[0] - this.total[0];
      this.margin = [marginInEur, converter(marginInEur)];
      this.percentage = `${Math.round(
        (this.total[0] / this.grossRevenue[0]) * 100
      )}%`;
    };
    addArtist(
      artist: Artist,
      converter: (num: number) => number = this.converter
    ): this {
      this.artists.push([artist.name, artist.preferredAccomodation]);
      const cachè = new PriceCalculator(
        this.capacity,
        this.ticketPrice[0]
      ).setCoeff(artist.relevance, this.modulator).suggestedPrice;
      this.cachès.push([cachè, converter(cachè)]);
      this.#calculateTotal();
      return this;
    }
    addTransportation(
      cost: number,
      converter: (num: number) => number = this.converter
    ): this {
      this.transportations.push([cost, converter(cost)]);
      this.#calculateTotal();
      return this;
    }
    addAccomodation(
      cost: number,
      converter: (num: number) => number = this.converter
    ): this {
      this.accomodations.push([cost, converter(cost)]);
      this.#calculateTotal();
      return this;
    }
  }

  export interface Artist {
    name: string;
    relevance: keyof typeof artistRelevance;
    suggestedCachè: number;
    requestedCachè: number;
    location: string;
    preferredAccomodation: string;
    departureAirports: string[];
  }

  export class Artist {
    constructor(
      props: Omit<Artist, "suggestedCachè"> &
        Partial<Pick<Artist, "suggestedCachè">>
    ) {
      this.name = props.name;
      this.location = props.location;
      this.preferredAccomodation = props.preferredAccomodation;
      this.requestedCachè = props.requestedCachè;
      this.relevance = props.relevance;
    }
  }
}
