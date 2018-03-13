import moment from 'moment';
import accounting from 'accounting';

const cleanDailyDataObject = (rawData) => {
  const keys = Object.keys(rawData['Time Series (Digital Currency Daily)']);
  let accum = {
    x: [],
    y: [],
    vx: [],
    vy: [],
    oldestDate: moment(keys[keys.length - 1]).format('l'),
    highSinceOldest: 0,
    lowSinceOldest: 1000000000,
    dateLabels: []
  };
  keys.forEach((key, index) => {
    const day = rawData['Time Series (Digital Currency Daily)'][key];
    const dailyClose = Math.floor(day['4b. close (USD)']);
    const dailyVolume = Math.floor(day['5. volume']);

    accum.x.unshift(moment(key).format());
    accum.y.unshift(accounting.formatMoney(dailyClose, '$', 0));
    accum.vx.unshift(index + 1);
    accum.vy.unshift(dailyVolume);

    if (key.includes('01-01')) {
      accum.dateLabels.unshift(moment(key).format());
    }

    if (parseInt(dailyClose) > accum.highSinceOldest) {
      accum.highSinceOldest = dailyClose;
    }
    if (parseInt(dailyClose) < accum.lowSinceOldest) {
      accum.lowSinceOldest = dailyClose;
    }
  });

  return accum;
};

export default cleanDailyDataObject;