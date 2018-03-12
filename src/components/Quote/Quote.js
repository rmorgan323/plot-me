import React, { Component } from 'react';
import getCurrencies from '../../helpers/getCurrencies/getCurrencies';
import cleanDataObject from '../../helpers/cleanDataObject/cleanDataObject';
import formatPoints from '../../helpers/formatPoints/formatPoints';
import formatVolume from '../../helpers/formatVolume/formatVolume';
import formatCurrencyData from '../../helpers/formatCurrencyData/formatCurrencyData';
import './Quote.css';
import Plot from 'react-plotly.js';
import moment from 'moment';

class Quote extends Component {
  constructor() {
    super();

    this.state = {
      cleanData: {
        currency: '',
        yrange: [],
        x: [],
        y: [],
        vx: [],
        vy: [],
        dateTimeRange: [],
        dateTimeVals: [],
        dateTimeLabels: []
      },
      currencyData: '',
      volumeData: [],
      formattedMetaData: {}
    }
  }

  componentDidMount = async () => {
    const path = window.location.pathname.split('/');
    const ticker = path[path.length - 1];
    const rawData = await getCurrencies([ticker]);
    const cleanData = await cleanDataObject(rawData);
    this.setState({ cleanData: cleanData })
    
    const currencyData = await formatPoints(rawData[0])
    this.setState({ currencyData: currencyData })

    const volumeData = await formatVolume(rawData[0])
    this.setState({ volumeData: volumeData })

    const formattedMetaData = await formatCurrencyData(rawData[0]);
    this.setState({ formattedMetaData: formattedMetaData })
  }
       
  bars = () => {
    const buildBars = this.state.volumeData.map((volumeValue, index) => {
      return <rect key={index} x={index * 2} y={140 - volumeValue} width="1.5" height={volumeValue} style={{fill: 'rgba(255,255,255,.2)'}} />
    })

    return buildBars;
  } 

  displayDayGraph = () => {
    return (
      <svg viewBox="0 0 320 140" className="quote-chart">
        <polyline
           fill={this.state.currencyData[1]}
           stroke={this.state.currencyData[1]}
           strokeWidth="1"
           points={'0,140 ' + this.state.currencyData[0] + ' 320,140'}
           strokeLinejoin="round"
        />
        <rect width="80.5" height="140" style={{fill: 'rgba(0,0,0,.05)'}} />
        <rect x="161" width="80.5" height="140" style={{fill: 'rgba(0,0,0,.05)'}} />
        {this.bars()}
      </svg>
    )
  }

        // {this.displayDayGraph()}
  render() {
    return (
      <div className="Quote">
        <Plot 
          className="plotly-graph"
          data={[
            {
              type: 'scatter',
              mode: 'none',
              x: this.state.cleanData.x,
              y: this.state.cleanData.y,
              fill: 'tozeroy',
              yanchor: 'right',
              fillcolor: 'rgba(0,177,76,.6)',
              name: this.state.cleanData.currency,
              hoverinfo: 'text+name',
              hoverlabel: { font: { color: '#ffffff' }, bordercolor: '#ffffff', bgcolor: '#008a2d' },
              text: this.state.cleanData.y,
              hovermode: 'closest'
            },
            // {
            //   type: 'bar',
            //   x: this.state.cleanData.vx,
            //   y: this.state.cleanData.vy,
            //   marker: { 
            //     color: 'rgba(0,177,76,1)',
            //     line: {
            //       color: 'rgb(255,255,255,1)',
            //       width: .5
            //     }
            //   },
            //   name: 'volume',
            //   hoverinfo: 'none'
            // }
          ]}
          layout={{
            width: 800,
            height: 400,
            spikedistance: -1,
            yaxis: {
              range: this.state.cleanData.yrange,
              side: 'right',
              position: 1,
              showspikes: true,
              spikecolor: 'rgba(0,0,0,.2)',
              spikethickness: 1,
              spikedash: 'solid',
              spikemode: 'across',
              hovermode: 'closest',
              tickfont: { 
                family: 'Carbon',
                color: '#999',
                size: 14
              }
            },
            xaxis: {
              nticks: 4,
              autorange: false,
              range: this.state.cleanData.dateTimeRange,
              tickvals: this.state.cleanData.dateTimeVals,
              ticktext: this.state.cleanData.dateTimeLabels,
              showspikes: true,
              hovermode: 'closest',
              spikecolor: 'rgba(0,0,0,.2)',
              spikethickness: 0,
              spikedash: 'solid',
              spikemode: 'across',
              tickfont: { 
                family: 'Carbon',
                color: '#999',
                size: 14
              }
            },
            showlegend: false,
            margin: { pad: 5, 
              l: 40, 
              r: 60, 
              t: 30, 
              b: 40 
            },
            anchor: 'free',
            position: .5,
            plot_bgcolor: '#fff'
          }}
        />
      </div> 
    )
  }
}

export default Quote;