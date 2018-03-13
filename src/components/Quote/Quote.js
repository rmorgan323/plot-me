import React, { Component } from 'react';
import QuoteMeta from '../QuoteMeta/QuoteMeta';
import QuoteDetail from '../QuoteDetail/QuoteDetail';
import getCurrencies from '../../helpers/getCurrencies/getCurrencies';
import getDailyData from '../../helpers/getDailyData/getDailyData';
import cleanDataObject from '../../helpers/cleanDataObject/cleanDataObject';
import cleanDailyDataObject from '../../helpers/cleanDailyDataObject/cleanDailyDataObject';
import formatPoints from '../../helpers/formatPoints/formatPoints';
// import formatVolume from '../../helpers/formatVolume/formatVolume';
import formatCurrencyData from '../../helpers/formatCurrencyData/formatCurrencyData';
import Loading from '../Loading/Loading';
import ChartToday from '../ChartToday/ChartToday';
import ChartDaily from '../ChartDaily/ChartDaily';
import './Quote.css';

class Quote extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      currentTab: 'intraday',
      cleanData: {
        currency: '',
        yrange: [],
        x: [],
        y: [],
        vx: [],
        vy: [],
        dateTimeRange: [],
        dateTimeVals: [],
        dateTimeLabels: [],
        todayPercentage: '',
        dailyHigh: null,
        dailyLow: null
      },
      currencyData: '',
      // volumeData: [],
      formattedMetaData: {},
      cleanDailyData: {
        x: [],
        y: [],
        vx: [],
        vy: [],
        oldestDate: '',
        highSinceOldest: null,
        lowSinceOldest: null,
        dateLabels: []
      }
    };
  }

  componentDidMount = async () => {
    const path = window.location.pathname.split('/');
    const ticker = path[path.length - 1];
    const rawData = await getCurrencies([ticker]);
    const cleanData = await cleanDataObject(rawData[0]);
    this.setState({ cleanData: cleanData });
    const currencyData = await formatPoints(rawData[0]);
    this.setState({ currencyData: currencyData });
    const formattedMetaData = await formatCurrencyData(rawData[0]);
    this.setState({ formattedMetaData: formattedMetaData, isLoading: false });

    const rawDailyData = await getDailyData(ticker);
    const cleanDailyData = await cleanDailyDataObject(rawDailyData);
    this.setState({ cleanDailyData: cleanDailyData });
    // const volumeData = await formatVolume(rawData[0]);
    // this.setState({ volumeData: volumeData });

  }
       
  // bars = () => {
  //   const buildBars = this.state.volumeData.map((volumeValue, index) => {
  //     return (
  //       <rect 
  //         key={index} 
  //         x={index * 2} 
  //         y={140 - volumeValue} 
  //         width="1.5" 
  //         height={volumeValue} 
  //         style={{fill: 'rgba(255,255,255,.2)'}} 
  //       />
  //     );
  //   });

  //   return buildBars;
  // } 

  // // {this.displayDayGraph()}
  // displayDayGraph = () => {
  //   return (
  //     <svg viewBox="0 0 320 140" className="quote-chart">
  //       <polyline
  //         fill={this.state.currencyData[1]}
  //         stroke={this.state.currencyData[1]}
  //         strokeWidth="1"
  //         points={'0,140 ' + this.state.currencyData[0] + ' 320,140'}
  //         strokeLinejoin="round"
  //       />
  //       <rect width="80.5" height="140" style={{fill: 'rgba(0,0,0,.05)'}} />
  //       <rect x="161" width="80.5" height="140" style={{fill: 'rgba(0,0,0,.05)'}} />
  //       {this.bars()}
  //     </svg>
  //   );
  // }

  handleChartChange = (type) => {
    this.setState({ currentTab: type });
  }

  displayChart = () => {
    if (this.state.currentTab === 'intraday') {
      return (
        <ChartToday 
          cleanData={this.state.cleanData}
          currencyData={this.state.currencyData}
          formattedMetaData={this.state.formattedMetaData}
        />
      );
    }
    if (this.state.currentTab === 'daily') {
      return (
        <ChartDaily 
          currencyName={this.state.cleanData.currency}
          cleanDailyData={this.state.cleanDailyData}
        />
      );
    }
  }

  displayPageOnStateLoad = () => {
    if (!this.state.isLoading) {
      return (
        <div className="Quote">
          <QuoteMeta 
            metaData={this.state.formattedMetaData}
            percentage={this.state.cleanData.todayPercentage}
          />
          <ul className="chart-tabs">
            <li 
              onClick={() => this.handleChartChange('intraday')}
              className={this.state.currentTab === 'intraday' ? 'tab-active' : 'tab-inactive'}
            >INTRADAY</li>
            <li 
              onClick={() => this.handleChartChange('daily')}
              className={this.state.currentTab === 'daily' ? 'tab-active' : 'tab-inactive'}
            >DAILY</li>
          </ul>
          {this.displayChart()}
          <QuoteDetail
            metaData={this.state.formattedMetaData}
            high={this.state.cleanData.dailyHigh}
            low={this.state.cleanData.dailyLow}
            oldestDate={this.state.cleanDailyData.oldestDate}
            highSinceOldest={this.state.cleanDailyData.highSinceOldest}
            lowSinceOldest={this.state.cleanDailyData.lowSinceOldest}
          />
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

export default Quote;