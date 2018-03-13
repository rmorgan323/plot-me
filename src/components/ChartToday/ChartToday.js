import React from 'react';
import './ChartToday.css';
import Plot from 'react-plotly.js';

const ChartToday = ({ cleanData, currencyData, formattedMetaData }) => {

  return (
    <div className="ChartToday">
      <Plot 
        className="plotly-graph"
        data={[
          {
            type: 'scatter',
            mode: 'none',
            x: cleanData.x,
            y: cleanData.y,
            fill: 'tozeroy',
            yanchor: 'right',
            fillcolor: cleanData.todayPercentage[0] === '+' ? 'rgba(0,177,76,.6)' : 'rgba(189,32,37,.6)',
            name: cleanData.currency,
            hoverinfo: 'text+name',
            hoverlabel: { 
              font: { 
                color: '#fff'
              }, 
              bordercolor: '#fff', 
              bgcolor: cleanData.todayPercentage[0] === '+' ? 'rgba(0,177,76,1)' : 'rgba(189,32,37,1)' 
            },
            text: cleanData.y,
            hovermode: 'closest'
          }
          // {
          //   type: 'bar',
          //   x: cleanData.vx,
          //   y: cleanData.vy,
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
            range: cleanData.yrange,
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
            range: cleanData.dateTimeRange,
            tickvals: cleanData.dateTimeVals,
            ticktext: cleanData.dateTimeLabels,
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
          plot_bgcolor: '#fff'  // eslint-disable-line camelcase
        }}
      />
    </div>
  )
};

export default ChartToday;