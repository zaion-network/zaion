import ccxt
import pandas as pd


# Inizializza l'exchange (ad esempio Binance)
exchange = ccxt.binance(
    {
        "enableRateLimit": True,  # Limita le richieste API
    }
)


def getLastBtcPrice(pair):
    return exchange.fetch_ticker(pair)["last"]


def getTickerPrecision(pair):
    # Carica le informazioni sui simboli di trading
    symbol_infos = exchange.load_markets()
    result = {}
    result[pair.split("/")[1]] = symbol_infos[pair]["precision"][
        "price"
    ]
    result[pair.split("/")[0]] = symbol_infos[pair]["precision"][
        "amount"
    ]

    if pair in symbol_infos:
        return result
    else:
        return None


def calculateEma(ohlcv, ema_periodo, precision):
    df = pd.DataFrame(
        ohlcv,
        columns=[
            "timestamp",
            "open",
            "high",
            "low",
            "close",
            "volume",
        ],
    )
    df["ema"] = (
        df["close"].ewm(span=ema_periodo, adjust=False).mean()
    )
    return round(df["ema"].iloc[-1], precision)


def getOhlcv(pair, timeframe):
    return exchange.fetch_ohlcv(pair, timeframe, limit=500)


if __name__ == "__main__":
    print("no main")
