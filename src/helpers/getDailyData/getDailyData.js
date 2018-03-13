import apiKey from '../../apiKey';

const getDailyData = async (ticker) => {
  try {
    const dailyData = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${ticker}&market=USD&apikey=${apiKey}`);
    const jsonData = await dailyData.json();
    
    return jsonData;
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }
};

export default getDailyData;