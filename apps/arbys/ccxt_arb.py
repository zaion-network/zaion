
#   ! first:
#   pip install ccxt

#   will add comments and such 
#   to the mayhem soon.

import ccxt

triads = [['AAVE/USDT', 'AAVE/ETH', 'ETH/USDT'], ['AAVE/USDT', 'AAVE/BTC', 'BTC/USDT'], ['ADA/USDT', 'ADA/ETH', 'ETH/USDT'], ['ADA/USDT', 'ADA/BTC', 'BTC/USDT'], ['ALGO/USDT', 'ALGO/BTC', 'BTC/USDT'], ['ANT/USDT', 'ANT/BTC', 'BTC/USDT'], ['APE/USDT', 'APE/BTC', 'BTC/USDT'], ['ATOM/USDT', 'ATOM/ETH', 'ETH/USDT'], ['ATOM/USDT', 'ATOM/BTC', 'BTC/USDT'], ['AVAX/USDT', 'AVAX/ETH', 'ETH/USDT'], ['AVAX/USDT', 'AVAX/BTC', 'BTC/USDT'], ['BAT/USDT', 'BAT/BTC', 'BTC/USDT'], ['BCH/USDT', 'BCH/BTC', 'BTC/USDT'], ['BETH/USDT', 'BETH/ETH', 'ETH/USDT'], ['BSV/USDT', 'BSV/BTC', 'BTC/USDT'], ['CHZ/USDT', 'CHZ/BTC', 'BTC/USDT'], ['COMP/USDT', 'COMP/BTC', 'BTC/USDT'], ['CRO/USDT', 'CRO/BTC', 'BTC/USDT'], ['CRV/USDT', 'CRV/ETH', 'ETH/USDT'], ['CRV/USDT', 'CRV/BTC', 'BTC/USDT'], ['CVC/USDT', 'CVC/BTC', 'BTC/USDT'], ['DASH/USDT', 'DASH/ETH', 'ETH/USDT'], ['DASH/USDT', 'DASH/BTC', 'BTC/USDT'], ['DGB/USDT', 'DGB/BTC', 'BTC/USDT'], ['DOGE/USDT', 'DOGE/ETH', 'ETH/USDT'], ['DOGE/USDT', 'DOGE/BTC', 'BTC/USDT'], ['DOT/USDT', 'DOT/ETH', 'ETH/USDT'], ['DOT/USDT', 'DOT/BTC', 'BTC/USDT'], ['DYDX/USDT', 'DYDX/BTC', 'BTC/USDT'], ['EGLD/USDT', 'EGLD/BTC', 'BTC/USDT'], ['ENJ/USDT', 'ENJ/BTC', 'BTC/USDT'], ['ENS/USDT', 'ENS/BTC', 'BTC/USDT'], ['EOS/USDT', 'EOS/ETH', 'ETH/USDT'], ['EOS/USDT', 'EOS/BTC', 'BTC/USDT'], ['ETC/USDT', 'ETC/ETH', 'ETH/USDT'], ['ETC/USDT', 'ETC/BTC', 'BTC/USDT'], ['ETH/USDT', 'ETH/BTC', 'BTC/USDT'], ['ETHW/USDT', 'ETHW/BTC', 'BTC/USDT'], ['FIL/USDT', 'FIL/ETH', 'ETH/USDT'], ['FIL/USDT', 'FIL/BTC', 'BTC/USDT'], ['FLOW/USDT', 'FLOW/BTC', 'BTC/USDT'], ['GRT/USDT', 'GRT/BTC', 'BTC/USDT'], ['HBAR/USDT', 'HBAR/BTC', 'BTC/USDT'], ['ICP/USDT', 'ICP/BTC', 'BTC/USDT'], ['INT/USDT', 'INT/BTC', 'BTC/USDT'], ['IOST/USDT', 'IOST/ETH', 'ETH/USDT'], ['IOST/USDT', 'IOST/BTC', 'BTC/USDT'], ['KLAY/USDT', 'KLAY/BTC', 'BTC/USDT'], ['KNC/USDT', 'KNC/BTC', 'BTC/USDT'], ['KSM/USDT', 'KSM/ETH', 'ETH/USDT'], ['KSM/USDT', 'KSM/BTC', 'BTC/USDT'], ['LINK/USDT', 'LINK/ETH', 'ETH/USDT'], ['LINK/USDT', 'LINK/BTC', 'BTC/USDT'], ['LRC/USDT', 'LRC/BTC', 'BTC/USDT'], ['LTC/USDT', 'LTC/ETH', 'ETH/USDT'], ['LTC/USDT', 'LTC/BTC', 'BTC/USDT'], ['LUNA/USDT', 'LUNA/BTC', 'BTC/USDT'], ['LUNC/USDT', 'LUNC/BTC', 'BTC/USDT'], ['MANA/USDT', 'MANA/ETH', 'ETH/USDT'], ['MANA/USDT', 'MANA/BTC', 'BTC/USDT'], ['MATIC/USDT', 'MATIC/BTC', 'BTC/USDT'], ['MKR/USDT', 'MKR/ETH', 'ETH/USDT'], ['MKR/USDT', 'MKR/BTC', 'BTC/USDT'], ['NEAR/USDT', 'NEAR/ETH', 'ETH/USDT'], ['NEAR/USDT', 'NEAR/BTC', 'BTC/USDT'], ['NEO/USDT', 'NEO/ETH', 'ETH/USDT'], ['NEO/USDT', 'NEO/BTC', 'BTC/USDT'], ['NULS/USDT', 'NULS/ETH', 'ETH/USDT'], ['NULS/USDT', 'NULS/BTC', 'BTC/USDT'], ['OKB/USDT', 'OKB/ETH', 'ETH/USDT'], ['OKB/USDT', 'OKB/BTC', 'BTC/USDT'], ['OKT/USDT', 'OKT/ETH', 'ETH/USDT'], ['OKT/USDT', 'OKT/BTC', 'BTC/USDT'], ['OM/USDT', 'OM/ETH', 'ETH/USDT'], ['OMG/USDT', 'OMG/BTC', 'BTC/USDT'], ['ONT/USDT', 'ONT/BTC', 'BTC/USDT'], ['PEOPLE/USDT', 'PEOPLE/BTC', 'BTC/USDT'], ['QTUM/USDT', 'QTUM/ETH', 'ETH/USDT'], ['QTUM/USDT', 'QTUM/BTC', 'BTC/USDT'], ['REN/USDT', 'REN/BTC', 'BTC/USDT'], ['RVN/USDT', 'RVN/BTC', 'BTC/USDT'], ['SHIB/USDT', 'SHIB/BTC', 'BTC/USDT'], ['SNX/USDT', 'SNX/ETH', 'ETH/USDT'], ['SOL/USDT', 'SOL/ETH', 'ETH/USDT'], ['SOL/USDT', 'SOL/BTC', 'BTC/USDT'], ['STETH/USDT', 'STETH/ETH', 'ETH/USDT'], ['STX/USDT', 'STX/BTC', 'BTC/USDT'], ['SUSHI/USDT', 'SUSHI/ETH', 'ETH/USDT'], ['THETA/USDT', 'THETA/BTC', 'BTC/USDT'], ['TRX/USDT', 'TRX/ETH', 'ETH/USDT'], ['TRX/USDT', 'TRX/BTC', 'BTC/USDT'], ['UNI/USDT', 'UNI/ETH', 'ETH/USDT'], ['UNI/USDT', 'UNI/BTC', 'BTC/USDT'], ['WAVES/USDT', 'WAVES/BTC', 'BTC/USDT'], ['WBTC/USDT', 'WBTC/ETH', 'ETH/USDT'], ['WBTC/USDT', 'WBTC/BTC', 'BTC/USDT'], ['WXT/USDT', 'WXT/BTC', 'BTC/USDT'], ['XCH/USDT', 'XCH/BTC', 'BTC/USDT'], ['XEM/USDT', 'XEM/BTC', 'BTC/USDT'], ['XLM/USDT', 'XLM/ETH', 'ETH/USDT'], ['XLM/USDT', 'XLM/BTC', 'BTC/USDT'], ['XMR/USDT', 'XMR/ETH', 'ETH/USDT'], ['XMR/USDT', 'XMR/BTC', 'BTC/USDT'], ['XRP/USDT', 'XRP/ETH', 'ETH/USDT'], ['XRP/USDT', 'XRP/BTC', 'BTC/USDT'], ['XTZ/USDT', 'XTZ/BTC', 'BTC/USDT'], ['YFI/USDT', 'YFI/ETH', 'ETH/USDT'], ['YFI/USDT', 'YFI/BTC', 'BTC/USDT'], ['ZEC/USDT', 'ZEC/ETH', 'ETH/USDT'], ['ZEC/USDT', 'ZEC/BTC', 'BTC/USDT'], ['ZEN/USDT', 'ZEN/BTC', 'BTC/USDT'], ['ZIL/USDT', 'ZIL/BTC', 'BTC/USDT'], ['ZRX/USDT', 'ZRX/BTC', 'BTC/USDT']]

def fetch_prices(exchange, pairs):
    prices = {}
    for pair in pairs:
        ticker = exchange.fetch_ticker(pair)
        prices[pair] = ticker['close']
    return prices

def check_arbitrage(prices, pairs):
    fee = 0.0008
    wallet = 100
    wallet = (wallet - (wallet * fee)) / prices[pairs[0]]
    wallet = (wallet - (wallet * fee)) * prices[pairs[1]]
    wallet = (wallet - (wallet * fee)) * prices[pairs[2]]

    if wallet-100 > 0.0:
        return wallet-100
    return False

exchange = ccxt.okex()

for triad in triads:
    pairs = triad
    prices = fetch_prices(exchange, pairs)
    check = check_arbitrage(prices, pairs)

    if check:
        opp = ''

        if check >= 1:
            opp = 'Arbitrage opportunity detected'
        print(f"{round(check, 4)} -- {triad[0].split('/')[0]} -> {triad[1].split('/')[1]} -> {triad[2].split('/')[1]} | {opp}")
