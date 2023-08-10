#!/usr/bin/env python3

import sys
import cctx_utils

USER_ARG = sys.argv[1]
PAIR = "BTC/EUR"


def convertBtcToSats(amount):
    return amount * 10**8


def convertSatsToBtc(sats):
    return sats / 10**8


def convertEuroToSats(eur, price):
    btc = round(eur / price, 8)
    return convertBtcToSats(btc)


def convertSatsToEur(sats, price):
    eur = convertSatsToBtc(sats) * price
    return round(eur, 2)


def deleteSymbol(string):
    return float(string.replace("€", ""))


def doNothing(string):
    return float(string)


def eurLog(conversion, somma, price):
    precision = cctx_utils.getTickerPrecision(PAIR)[
        PAIR.split("/")[1]
    ]
    olhcv = cctx_utils.getOhlcv(PAIR, "12h")
    ema = cctx_utils.calculateEma(olhcv, 377, precision)
    atEma = round(convertBtcToSats(1 / ema) * somma)
    print(
        f"converted: {conversion}, at ema: {atEma} which now equals to {round(convertSatsToBtc(atEma)*price,2)}"
    )
    return


def satsLog(conversion, somma, price):
    print(conversion)
    return


MAPPA = {True: convertEuroToSats, False: convertSatsToEur}
FORMAT = {True: deleteSymbol, False: doNothing}
LOGS = {True: eurLog, False: satsLog}
CONDITION = "€" in USER_ARG


somma = FORMAT[CONDITION](USER_ARG)
price = cctx_utils.getLastBtcPrice(PAIR)
convert = MAPPA[CONDITION]
log = LOGS[CONDITION]

conversion = convert(somma, price)
log(conversion, somma, price)

# print(cctx_utils.getTickerPrecision("BTC/USDT"))
# print(cctx_utils.calculateEma(olhcv, 377, precision))
