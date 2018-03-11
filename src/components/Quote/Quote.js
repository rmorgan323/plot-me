import React, { Component } from 'react';
import getCurrencies from '../../helpers/getCurrencies/getCurrencies';
import cleanDataObject from '../../helpers/cleanDataObject/cleanDataObject';
import formatPoints from '../../helpers/formatPoints/formatPoints';
import formatVolume from '../../helpers/formatVolume/formatVolume';
import './Quote.css';
import Plot from 'react-plotly.js';
import moment from 'moment';
import './Quote.css';

class Quote extends Component {
  constructor() {
    super();

    this.state = {
      cleanData: {},
      currencyData: '',
      volumeData: []
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
  }
       
  bars = () => {
    const buildBars = this.state.volumeData.map((volumeValue, index) => {
      console.log(index)
      return <rect x={index * 2} y={120 - volumeValue} width="1.5" height={volumeValue} style={{fill: 'rgba(255,255,255,.2)'}} />
    })

    return buildBars;
  } 

  displayDayGraph = () => {
    return (
      <svg viewBox="0 0 320 120" className="quote-chart">
        <polyline
           fill={this.state.currencyData[1]}
           stroke={this.state.currencyData[1]}
           strokeWidth="1"
           points={'0,120 ' + this.state.currencyData[0] + ' 320,120'}
           strokeLinejoin="round"
        />
        <rect width="80.5" height="120" style={{fill: 'rgba(0,0,0,.05)'}} />
        <rect x="161" width="80.5" height="120" style={{fill: 'rgba(0,0,0,.05)'}} />
        {this.bars()}
      </svg>
    )
  }

  render() {
    return (
      <div className="Quote">
        {this.displayDayGraph()}
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
              hoverlabel: { font: { color: '#ffffff' }, bordercolor: '#ffffff' },
              text: this.state.cleanData.y
            },
            {
              type: 'bar',
              x: this.state.cleanData.vx,
              y: this.state.cleanData.vy,
              marker: { 
                color: 'rgba(0,177,76,1)',
                line: {
                  color: 'rgb(255,255,255,1)',
                  width: .5
                }
              },
              name: 'volume',
              hoverinfo: 'none'
            }
          ]}
          layout={{
            width: 800,
            height: 400,
            yaxis: {
              range: this.state.cleanData.yrange,
              side: 'right',
              position: 1
            },
            xaxis: {
              nticks: 0
            },
            showlegend: false,
            margin: { pad: 5 },
            anchor: { enumerated: 'free' },
            position: .5
          }}
        />
      </div> 
    )
  }
}

export default Quote;