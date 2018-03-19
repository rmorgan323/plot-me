import React, { Component } from 'react';
import getCurrencies from '../../helpers/getCurrencies/getCurrencies';
import formatPoints from '../../helpers/formatPoints/formatPoints';
import cleanDataObject from '../../helpers/cleanDataObject/cleanDataObject';
import CurrencyRow from '../CurrencyRow/CurrencyRow';
import accounting from 'accounting';
import Loading from '../Loading/Loading';
import './Home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      currencyData: []
    };
  }

  componentDidMount = async () => {
    // let currenciesOnLoad = ['BTC', 'ETH', 'BCH', 'LTC', 'NEO', 'XLM', 'ADA', 'EOS', 'XMR', 'DASH', 'IOT', 'XEM', 'USDT', 'ETC', 'TRX', 'VEN', 'LSK', 'QTUM', 'BTG']
    let currenciesOnLoad = ['BTC', 'ETH'];
    // let currenciesOnLoad = ['BTC'];
    let currencyData = await getCurrencies(currenciesOnLoad);
    console.log('hello 1', currencyData)
    this.setState({ currencyData: currencyData, isLoading: false });
  }

  displayMetaData = () => {
    if (Object.keys(this.state.currencyData[0]).length) {
      const display = this.state.currencyData.map((currency, index) => {
        const cleanObject = cleanDataObject(currency);

        const keys = Object.keys(currency['Time Series (Digital Currency Intraday)']);
        const marketCap = currency['Time Series (Digital Currency Intraday)'][keys[0]]['3. market cap (USD)'];
        const price = currency['Time Series (Digital Currency Intraday)'][keys[0]]['1b. price (USD)'];
        const volume = currency['Time Series (Digital Currency Intraday)'][keys[0]]['2. volume'];
        const volumeDollars = volume * price;
        const points = formatPoints(currency, true);

        return (
          <CurrencyRow 
            key={index}
            index={index + 1}
            currency={currency['Meta Data']['3. Digital Currency Name']}
            abbreviation={currency['Meta Data']['2. Digital Currency Code']}
            marketCap={accounting.formatMoney(marketCap)}
            price={cleanObject.y[cleanObject.y.length - 1]}
            change={cleanObject.todayPercentage}
            volumeDollars={accounting.formatMoney(volumeDollars)}
            volume={accounting.formatNumber(Math.floor(volume))}
            points={points[0]}
          />
        );
      });

      return display;
    }
  }

  displayPageOnStateLoad = () => {
    if (!this.state.isLoading) {
      return (
        <div>
          {this.displayMetaData()}
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }

  render() {
    return (
      <div>
        {this.displayPageOnStateLoad()}
      </div>
    );
  }
}

export default Home;