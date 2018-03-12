import accounting from 'accounting';
import formatPoints from '../formatPoints/formatPoints';

const formatCurrencyData = (rawData) => {
  const keys = Object.keys(rawData['Time Series (Digital Currency Intraday)']);
  const calcPrice = rawData['Time Series (Digital Currency Intraday)'][keys[0]]['1b. price (USD)']
  const calcVolume = Math.floor(rawData['Time Series (Digital Currency Intraday)'][keys[0]]['2. volume']);

  let result = {
    marketCap: accounting.formatMoney(rawData['Time Series (Digital Currency Intraday)'][keys[0]]['3. market cap (USD)']),
    price: accounting.formatMoney(rawData['Time Series (Digital Currency Intraday)'][keys[0]]['1b. price (USD)']),
    change: ((-1 + (calcPrice / rawData['Time Series (Digital Currency Intraday)'][keys[keys.length - 1]]['1b. price (USD)'])) * 100).toFixed(2),
    volume: accounting.formatNumber(Math.floor(rawData['Time Series (Digital Currency Intraday)'][keys[0]]['2. volume'])),
    volumeDollars: accounting.formatMoney(calcVolume * calcPrice),
    points: formatPoints(rawData, true)
  }

  return result;
}

export default formatCurrencyData;