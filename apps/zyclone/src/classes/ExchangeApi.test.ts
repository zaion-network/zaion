import { writeFileSync } from "fs";
import dotenv from "dotenv";
import { ExchangeApi } from "./ExchangeApi";
import { TopUtilities } from "@zaionstate/zaionbase";

async function run() {
  dotenv.config();

  const calculateEMA = TopUtilities.TA.calculateEMA;
  console.log(process.env.BINANCE_API_KEY_WRITE);

  const binance = new ExchangeApi.Binance.BinanceApi(
    process.env.BINANCE_API_KEY_WRITE!,
    process.env.BINANCE_SECRET_KEY_WRITE!
  );
  // binance.getTickerPrice("BTCEUR").then(console.log);
  const res = await binance.getTickerCandles({
    symbol: "BTCEUR",
    interval: "1d",
    limit: 20,
  });
  const closingprices: number[] = res.map(e => parseFloat((e as string)[2]));
  console.log(
    Math.round((1 / calculateEMA(closingprices, 170)) * 10 ** 8) / 10 ** 8
  );

  writeFileSync(`./test.json`, JSON.stringify(res));

  const orderId = 3055567082;
  // Esempio di utilizzo
  const symbol = "BTCEUR"; // Simbolo del ticker per la coppia di trading
  const side = "SELL"; // Lato dell'ordine: BUY (acquisto) o SELL (vendita)
  const type = "LIMIT"; // Tipo di ordine: MARKET (mercato) o LIMIT (limite)
  const quantity = 0.0006; // Quantità dell'asset da acquistare/vendere
  const price = Math.round(28300 * 1.01075 * 100) / 100; // Prezzo limite per l'ordine di tipo LIMIT
  const spesa = quantity * price;

  // binance.getOrders({ symbol }).then((r) => console.log(r));
  // binance.getOrdersDetails({ symbol }).then(console.log);
  // binance.cancelOrder({ symbol, orderId }).then(console.log);
  // binance.createOrder({ symbol, side, type, quantity, price }).then(console.log);
}
run();
