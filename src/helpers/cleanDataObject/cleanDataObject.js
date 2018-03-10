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
    vy: []
  };
  const cleanedUp = keys.forEach((timeDataPoint, index) => {   
    accum.x.unshift(moment(keys[index]).subtract(7, 'hours').format()),
    accum.y.unshift(Math.floor(rawData[0]['Time Series (Digital Currency Intraday)'][keys[index]]['1b. price (USD)']))
    accum.vy.unshift(Math.floor(rawData[0]['Time Series (Digital Currency Intraday)'][keys[index]]['2. volume']))
  })
  accum.x = accum.x.slice(300, accum.x.length - 1)
  accum.y = accum.y.slice(300, accum.y.length - 1)
  accum.vy = accum.vy.slice(300, accum.vy.length - 1)
  const ymin = Math.floor(Math.min(...accum.y));
  const ymax = Math.floor(Math.max(...accum.y));
  const vymin = Math.floor(Math.min(...accum.vy));
  // const vymax = Math.floor(Math.max(...accum.vy));  
  const vyRatio = (ymin * .05) / vymin

  accum.yrange = [ymin * .8, ymax * 1.05]
  accum.vx = accum.x
  accum.vy = accum.vy.map(val => (val * vyRatio) + (ymin * .8))
  accum.y = accum.y.map(val => accounting.formatMoney(val, '$', 0))
  return accum;
}

export default cleanDataObject;