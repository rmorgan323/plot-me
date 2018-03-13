import moment from 'moment';
import accounting from 'accounting';

const cleanDataObject = rawData => {
  const keys = Object.keys(rawData['Time Series (Digital Currency Intraday)']);
  let accum = {
    currency: rawData['Meta Data']['3. Digital Currency Name'],
    yrange: [],
    x: [],
    y: [],
    vx: [],
    vy: [],
    dateTimeRange: [moment(Date.now()).subtract(1, 'days').format(), Date.now()],
    dateTimeVals: [],
    dateTimeLabels: [],
    todayPercentage: '',
    dailyHigh: null,
    dailyLow: null
  };
  const cleanedUp = keys.forEach((timeDataPoint, index) => {   // eslint-disable-line no-unused-vars
    accum.x.unshift(moment(keys[index]).subtract(7, 'hours').format());
    accum.y.unshift(Math.floor(rawData['Time Series (Digital Currency Intraday)'][keys[index]]['1b. price (USD)']));
    accum.vy.unshift(Math.floor(rawData['Time Series (Digital Currency Intraday)'][keys[index]]['2. volume']));

    if (timeDataPoint.includes('00:00:00')) {
      accum.dateTimeVals.unshift(timeDataPoint);
      const day = moment(timeDataPoint).format('dddd');
      accum.dateTimeLabels.unshift(`12am ${day}`);
    } else if (timeDataPoint.includes('06:00:00')) {
      accum.dateTimeVals.unshift(timeDataPoint);
      accum.dateTimeLabels.unshift('6am');
    } else if (timeDataPoint.includes('12:00:00')) {
      accum.dateTimeVals.unshift(timeDataPoint);
      accum.dateTimeLabels.unshift('12pm');
    } else if (timeDataPoint.includes('18:00:00')) {
      accum.dateTimeVals.unshift(timeDataPoint);
      accum.dateTimeLabels.unshift('6pm');
    }
  });

  const midnights = accum.dateTimeVals.filter(dateTimeVal => dateTimeVal.includes('00:00:00'));
  const currentPrice = rawData['Time Series (Digital Currency Intraday)'][Object.keys(rawData['Time Series (Digital Currency Intraday)'])[0]]['1b. price (USD)'];
  const midnightPrice = rawData['Time Series (Digital Currency Intraday)'][midnights[midnights.length - 1]]['1b. price (USD)'];
  const percentage = (currentPrice - midnightPrice) / currentPrice;
  const percentageString = `${percentage < 0 ? '' : '+'}${(percentage * 100).toFixed(2).toString()}%`;

  const allKeys = Object.keys(rawData['Time Series (Digital Currency Intraday)']);
  const keyIndex = allKeys.findIndex(key => key === midnights[midnights.length - 1]);
  const searchKeys = allKeys.slice(0, keyIndex);
  const values = searchKeys.map(val => rawData['Time Series (Digital Currency Intraday)'][val]['1b. price (USD)']);
  // const dailyVolume = searchKeys.reduce((accum, key) => {
  //   accum += parseInt(rawData['Time Series (Digital Currency Intraday)'][key]['2. volume']);
  //   return accum;
  // }, 0);

  const ymin = Math.floor(Math.min(...accum.y));
  const ymax = Math.floor(Math.max(...accum.y));
  const vymin = Math.floor(Math.min(...accum.vy));
  const vyRatio = (ymin * .05) / vymin;

  accum.dailyHigh = accounting.formatMoney(Math.max(...values));
  accum.dailyLow = accounting.formatMoney(Math.min(...values));
  accum.todayPercentage = percentageString;
  accum.yrange = [ymin * .8, ymax * 1.05];
  accum.vx = accum.x;
  accum.vy = accum.vy.map(val => (val * vyRatio) + (ymin * .8));
  accum.y = accum.y.map(val => accounting.formatMoney(val, '$', 0));

  return accum;
};

export default cleanDataObject;