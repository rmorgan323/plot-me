import React, { Component } from 'react';
import './Home.css';
import getCurrencies from '../../helpers/getCurrencies/getCurrencies';
import formatPoints from '../../helpers/formatPoints/formatPoints';
import CurrencyRow from '../CurrencyRow/CurrencyRow';
import accounting from 'accounting';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      currencyData: []
    }
  }

  componentDidMount = async () => {
    // let currenciesOnLoad = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC', 'NEO', 'XLM', 'ADA', 'EOS', 'XMR', 'DASH', 'IOT', 'XEM', 'USDT', 'ETC', 'TRX', 'VEN', 'LSK', 'QTUM', 'BTG']
    let currenciesOnLoad = ['BTC', 'ETH']
    let currencyData = await getCurrencies(currenciesOnLoad);
    this.setState({ currencyData: currencyData })
  }

  displayMetaData = () => {
    if (this.state.currencyData.length) {
      const display = this.state.currencyData.map((currency, index) => {
        const keys = Object.keys(currency['Time Series (Digital Currency Intraday)']);
        const marketCap = currency['Time Series (Digital Currency Intraday)'][keys[0]]['3. market cap (USD)']
        const price = currency['Time Series (Digital Currency Intraday)'][keys[0]]['1b. price (USD)']
        const change = -1 + (price / currency['Time Series (Digital Currency Intraday)'][keys[keys.length - 1]]['1b. price (USD)'])
        const volume = currency['Time Series (Digital Currency Intraday)'][keys[0]]['2. volume']
        const volumeDollars = volume * price;
        const points = formatPoints(currency, true);

        return (
          <CurrencyRow 
            key={index}
            index={index + 1}
            currency={currency['Meta Data']['3. Digital Currency Name']}
            abbreviation={currency['Meta Data']['2. Digital Currency Code']}
            marketCap={accounting.formatMoney(marketCap)}
            price={accounting.formatMoney(price)}
            change={(change * 100).toFixed(2)}
            volumeDollars={accounting.formatMoney(volumeDollars)}
            volume={accounting.formatNumber(Math.floor(volume))}
            points={points[0]}
            chartColor={points[1]}
          />
        )       
      })

      return display;
    }
  }

  render() {
    return (
      <div>
        {this.displayMetaData()}
      </div>
    )
  }
};

export default Home;