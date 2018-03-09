import React, { Component } from 'react';
import './Home.css';
import getCurrencies from '../../helpers/getCurrencies/getCurrencies';

class Home extends Component {

  componentDidMount = async () => {
    // let currenciesOnLoad = ['BTC', 'ETH', 'XRP', 'BCH', 'LTC', 'NEO', 'XLM', 'ADA', 'EOS', 'XMR', 'DASH', 'IOT', 'XEM', 'USDT', 'ETC', 'TRX', 'VEN', 'LSK', 'QTUM', 'BTG']
    let currenciesOnLoad = ['BTC', 'ETH', 'XRP']
    let currencyData = await getCurrencies(currenciesOnLoad);
  }

  render() {
    return (
      <div>
        home
      </div>
    )
  }
};

export default Home;