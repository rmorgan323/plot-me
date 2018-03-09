import React, { Component } from 'react';
import './Home.css';
import getCurrencies from '../../helpers/getCurrencies/getCurrencies';
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
    let currenciesOnLoad = ['BTC']
    let currencyData = await getCurrencies(currenciesOnLoad);
    this.setState({ currencyData: currencyData })
  }

  displayMetaData = () => {
    if (this.state.currencyData.length) {
      const display = this.state.currencyData.map((currency, index) => {
        console.log(currency)
        const keys = Object.keys(currency['Time Series (Digital Currency Intraday)']);
        const marketCap = currency['Time Series (Digital Currency Intraday)'][keys[0]]['3. market cap (USD)']
        const price = currency['Time Series (Digital Currency Intraday)'][keys[0]]['1b. price (USD)']
        const change = -1 + (price / currency['Time Series (Digital Currency Intraday)'][keys[keys.length - 1]]['1b. price (USD)'])
        const volume = currency['Time Series (Digital Currency Intraday)'][keys[0]]['2. volume']
        const volumeDollars = volume * price;

        return (
          <CurrencyRow 
            key={index}
            index={index + 1}
            currency={currency['Meta Data']['3. Digital Currency Name']}
            abbreviation={currency['Meta Data']['2. Digital Currency Code']}
            marketCap={accounting.formatMoney(marketCap)}
            price={accounting.formatMoney(price)}
            change={change}
            volumeDollars={accounting.formatMoney(volumeDollars)}
            volume={volume.toFixed(0)}
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