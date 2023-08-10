const sats = 200_000;
const binance_fee = 10_000;
const breez_fee_perch = 0.0075;
const sat_eur = 28_500;
const usdt_sat = 3221;
const usdt_sat_ema = 3802;

export namespace Satoshi {
  export const sat_to_btc = (sat: number) => sat / 10 ** 8;
  export const btc_to_sat = (btc: number) => btc * 10 ** 8;
  export const round = (sig_int: number) => Math.round(sig_int);
  export const round_prec = (sig_int: number, precision: number) =>
    Math.round(sig_int * precision) / precision;
}

console.log(1 / Satoshi.sat_to_btc(usdt_sat));
console.log(Satoshi.btc_to_sat(1));

const fee = (amount: number) => Satoshi.round(amount * breez_fee_perch);
const amount = (fee: number) => Satoshi.round(fee / breez_fee_perch);
const total_fee = (amount: number, fee: number, binance_fee: number) =>
  `${Satoshi.round_prec(((fee + binance_fee) / amount) * 100, 100)}%`;

const suggested_exchange_tx = 4_000_000;
const min_succested_exchange_tx = 670_000;

console.log(fee(670_000));
console.log(amount(5_000));
console.log(
  total_fee(
    min_succested_exchange_tx,
    fee(min_succested_exchange_tx),
    binance_fee
  )
);
console.log((min_succested_exchange_tx / 10 ** 8) * sat_eur);
