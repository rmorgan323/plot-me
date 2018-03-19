const getCurrencies = async () => {
  return await [
    {
      0: {
        'Meta Data': {
          "1. Information": "Intraday Prices and Volumes for Digital Currency",
          "2. Digital Currency Code": "BTC",
          "3. Digital Currency Name": "Bitcoin",
          "4. Market Code": "EUR",
          "5. Market Name": "Euro",
          "6. Interval": "5min",
          "7. Last Refreshed": "2018-03-18 05:50:00",
          "8. Time Zone": "UTC"  
        },
        'Time Series (Digital Currency Intraday)': {
          "2018-03-16 15:25:00": {
            "1a. price (EUR)": "6927.60225006",
            "1b. price (USD)": "8494.39304772",
            "2. volume": "29729.19995767",
            "3. market cap (USD)": "252531509.43459001"
          },
          "2018-03-16 15:30:00": {
            "1a. price (EUR)": "6940.20238513",
            "1b. price (USD)": "8509.84290986",
            "2. volume": "29613.39701341",
            "3. market cap (USD)": "252005356.61133999"
          }
        }
      }
    },
    {
      1: {
        'Meta Data': {
          "1. Information": "Intraday Prices and Volumes for Digital Currency",
          "2. Digital Currency Code": "ETH",
          "3. Digital Currency Name": "Ethereum",
          "4. Market Code": "EUR",
          "5. Market Name": "Euro",
          "6. Interval": "5min",
          "7. Last Refreshed": "2018-03-18 05:50:00",
          "8. Time Zone": "UTC"  
        },
        'Time Series (Digital Currency Intraday)': {
          "2018-03-16 15:25:00": {
            "1a. price (EUR)": "502.32154467",
            "1b. price (USD)": "615.92979544",
            "2. volume": "71473.86582402",
            "3. market cap (USD)": "44022883.55624100"
          },
          "2018-03-16 15:30:00": {
            "1a. price (EUR)": "502.85766268",
            "1b. price (USD)": "616.58716533",
            "2. volume": "71127.02022469",
            "3. market cap (USD)": "43856007.77850700"
          }
        }
      }
    }
  ]
}

export default getCurrencies;