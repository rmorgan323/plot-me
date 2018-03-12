const formatVolume = (rawData) => {
  const keys = Object.keys(rawData['Time Series (Digital Currency Intraday)']).slice(300, rawData['Time Series (Digital Currency Intraday)'].length);
  let resultArray = keys.reduce((array, key) => {
    array.push(Math.floor(rawData['Time Series (Digital Currency Intraday)'][key]['2. volume']))
    return array;
  }, []);
  const max = Math.max(...resultArray);
  const adjVal = 20 / max;

  resultArray = resultArray.map(val => {
    return (val * adjVal).toFixed(2);
  })
  return resultArray;
};

export default formatVolume;