import accounting from 'accounting';
import formatPoints from '../formatPoints/formatPoints';
import moment from 'moment';

const formatCurrencyData = (rawData) => {
  const keys = Object.keys(rawData['Time Series (Digital Currency Intraday)']);
  const calcPrice = Math.floor(rawData['Time Series (Digital Currency Intraday)'][keys[0]]['1b. price (USD)']);
  const calcVolume = Math.floor(rawData['Time Series (Digital Currency Intraday)'][keys[0]]['2. volume']);
  
  let result = {
    name: rawData['Meta Data']['3. Digital Currency Name'],
    abbr: rawData['Meta Data']['2. Digital Currency Code'],
    update: moment(rawData['Meta Data']['7. Last Refreshed']).subtract(6, 'hours').startOf(Date.now()).fromNow(),
    marketCap: accounting.formatMoney((rawData['Time Series (Digital Currency Intraday)'][keys[0]]['3. market cap (USD)']), '$', 0),
    price: accounting.formatMoney(rawData['Time Series (Digital Currency Intraday)'][keys[0]]['1b. price (USD)']),
    change: ((-1 + (calcPrice / rawData['Time Series (Digital Currency Intraday)'][keys[keys.length - 1]]['1b. price (USD)'])) * 100).toFixed(2),
    volume: accounting.formatNumber(Math.floor(rawData['Time Series (Digital Currency Intraday)'][keys[0]]['2. volume'])),
    volumeDollars: accounting.formatMoney((calcVolume * calcPrice), '$', 0),
    points: formatPoints(rawData, true)
  };

  return result;
};

export default formatCurrencyData;