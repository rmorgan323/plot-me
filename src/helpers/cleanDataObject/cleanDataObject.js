import moment from 'moment';
import accounting from 'accounting';

const cleanDataObject = rawData => {
  const keys = Object.keys(rawData[0]['Time Series (Digital Currency Intraday)']);
  let accum = {
    currency: rawData[0]['Meta Data']['3. Digital Currency Name'],
    yrange: [],
    x: [],
    y: [],
    vx: [],
    vy: [],
    dateTimeRange: [moment(Date.now()).subtract('days', 1).format(), Date.now()],
    dateTimeVals: [],
    dateTimeLabels: []
  };
  const cleanedUp = keys.forEach((timeDataPoint, index) => {   // eslint-disable-line no-unused-vars
    accum.x.unshift(moment(keys[index]).subtract(7, 'hours').format());
    accum.y.unshift(Math.floor(rawData[0]['Time Series (Digital Currency Intraday)'][keys[index]]['1b. price (USD)']));
    accum.vy.unshift(Math.floor(rawData[0]['Time Series (Digital Currency Intraday)'][keys[index]]['2. volume']));

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

  const ymin = Math.floor(Math.min(...accum.y));
  const ymax = Math.floor(Math.max(...accum.y));
  const vymin = Math.floor(Math.min(...accum.vy));
  const vyRatio = (ymin * .05) / vymin;

  accum.yrange = [ymin * .8, ymax * 1.05];
  accum.vx = accum.x;
  accum.vy = accum.vy.map(val => (val * vyRatio) + (ymin * .8));
  accum.y = accum.y.map(val => accounting.formatMoney(val, '$', 0));

  return accum;
};

export default cleanDataObject;