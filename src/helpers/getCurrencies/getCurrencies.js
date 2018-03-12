import apiKey from '../../apiKey';

const getCurrencies = async (currenciesArray) => {
  try {
    const allData = await currenciesArray.map( async (currency) => {
      const currencyData = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=${currency}&market=EUR&apikey=${apiKey}`);
      const jsonData = await currencyData.json();
      
      return jsonData;
    });
    return Promise.all(allData);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

export default getCurrencies;