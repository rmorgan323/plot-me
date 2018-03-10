import React, { Component } from 'react';
import getCurrencies from '../../helpers/getCurrencies/getCurrencies';
import cleanDataObject from '../../helpers/cleanDataObject/cleanDataObject';
import './Quote.css';
import Plot from 'react-plotly.js';
import moment from 'moment';

class Quote extends Component {
  constructor() {
    super();

    this.state = {
      cleanData: {}
    }
  }

  componentDidMount = async () => {
    const path = window.location.pathname.split('/');
    const ticker = path[path.length - 1];
    const rawData = await getCurrencies([ticker]);
    const cleanData = await cleanDataObject(rawData);
    this.setState({ cleanData: cleanData })
    console.log(this.state)
  }

  render() {
    return (
      <div className="Quote">
        <Plot 
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