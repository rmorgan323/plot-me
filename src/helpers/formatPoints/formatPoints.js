const formatPoints = (rawData) => {
  // console.log(rawData)
  const keys = Object.keys(rawData['Time Series (Digital Currency Intraday)']).slice(300, rawData['Time Series (Digital Currency Intraday)'].length);
  let highValue = 0;
  let lowValue = 1000000;
  let array = keys.reduce((priceArray, key, index) => {
    let yVal = Math.floor(rawData['Time Series (Digital Currency Intraday)'][key]['1b. price (USD)'])
    if (yVal > highValue) { highValue = yVal }
    if (yVal < lowValue) { lowValue = yVal }
    priceArray.push([index * 2, yVal])
    return priceArray
  }, [])
  let colorValue;
  if (array[0][1] <= array[array.length - 1][1]) {
    colorValue = '#00b14c';
  } else {
    colorValue = '#bc383d';
  }
  const range = highValue - lowValue;
  const adjustmentValue = 100 / range;
  array = array.map(pair => {
    pair[1] = 100 - Math.ceil((pair[1] - lowValue) * adjustmentValue);
    return pair.toString();
  })
  return [array.join(' '), colorValue];
}

export default formatPoints;