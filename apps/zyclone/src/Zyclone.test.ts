import { ExchangePlatform, Exchanger, Currency, Fee } from "./Zyclone";
import { getBinancePrice } from "./btcprice";

const Btc_Eur_Rate = Exchanger.ExchangeRate.Binance.Btc_Eur.Btc_Eur;
const bnb = new Currency.CryptoCurrency.Bnb.Bnb();
const fee = new Fee.ExchangeFee.ExchangeFee(100, bnb, 0, 0.0075);
const binance = new ExchangePlatform.Binance.Receipts.Exchange.BTCEUR.BTCEUR(
  100
);
console.log(binance);

Exchanger.PriceOracle.Binance;
const oracle = new Exchanger.PriceOracle.Binance.Btc_Eur.Btc_Eur();
oracle
  .getExchangeRate(
    async (pair) => {
      const price = await getBinancePrice();
      return Number(price.price).valueOf();
    },
    [new Currency.CryptoCurrency.Btc.Btc(), new Currency.FiatCurrency.Eur.Eur()]
  )
  .then((n) => {
    const price = n();
    console.log(price);
  });
console.log(oracle);
