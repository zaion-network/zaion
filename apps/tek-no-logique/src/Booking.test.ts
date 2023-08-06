import { Booking } from "./Booking";

const converter = (num: number) => Math.round(num * 3700);
const modulator: (
  dividend?: number,
  subtraend?: number,
  multiplier?: number
) => (num: number) => number =
  (dividend: number = 1, subtraend: number = 0, multiplier: number = 1) =>
  (num: number) =>
    (1 / Math.log2(num / dividend - subtraend)) * multiplier;

let booking = new Booking.Booking({
  capacity: 250,
  ticketPrice: [7, 0],
  location: "milano",
  venue: "TBC",
  address: "TBC",
  converter,
  modulator,
});
const gotek = new Booking.Artist({
  name: "Gotek",
  location: "Grosseto",
  preferredAccomodation: "camper",
  relevance: "TOP",
  requestedCachè: 2_500_000,
  departureAirports: ["Rome"],
});
const kosmo = new Booking.Artist({
  name: "Kosmo",
  location: "Grosseto",
  preferredAccomodation: "camper",
  relevance: "MID",
  requestedCachè: 1_500_000,
  departureAirports: ["Rome"],
});
const nu = new Booking.Artist({
  name: "nu",
  location: "Grosseto",
  preferredAccomodation: "camper",
  relevance: "SMALL",
  requestedCachè: 1_500_000,
  departureAirports: ["Rome"],
});
booking = booking.addArtist(gotek, converter);
booking = booking.addTransportation(250, converter);
booking = booking.addAccomodation(80, converter);

booking = booking.addArtist(kosmo, converter);
booking = booking.addTransportation(0, converter);
booking = booking.addAccomodation(80, converter);

// booking = booking.addArtist(nu, converter);
// booking = booking.addTransportation(30, converter);
// booking = booking.addAccomodation(80, converter);

console.table(booking);
console.log(booking.margin[1] + booking.total[1]);

const tuplevalues = [10, 0.7, 50];
console.log(modulator(...tuplevalues)(50));
console.log(modulator(...tuplevalues)(100));
console.log(modulator(...tuplevalues)(200));
console.log(modulator(...tuplevalues)(400));
console.log(modulator(...tuplevalues)(500));
console.log(modulator(...tuplevalues)(600));
console.log(modulator(...tuplevalues)(800));
console.log(modulator(...tuplevalues)(1000));
console.log(modulator(...tuplevalues)(2000));
console.log(modulator(...tuplevalues)(4000));
console.log(modulator(...tuplevalues)(5000));
console.log(modulator(...tuplevalues)(10000));
console.log(modulator(...tuplevalues)(20000));
console.log(modulator(...tuplevalues)(40000));
