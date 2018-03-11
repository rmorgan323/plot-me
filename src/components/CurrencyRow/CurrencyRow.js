import React from 'react';
import './CurrencyRow.css';
import { NavLink } from 'react-router-dom';

const CurrencyRow = ({ index, currency, abbreviation, marketCap, price, change, volumeDollars, volume, points, chartColor }) => {

  return (
    <NavLink className="links" to={`/plotme/quote/${abbreviation}`}>
      <div className="CurrencyRow">
        <div className="currency-container">
          <p className="width-1 light currency-index">{index}</p>
          <div className="currency-info">
            <p className="width-0 currency-name">{currency}</p>
            <p className="width-1 currency-abbr">{abbreviation}</p>
          </div>
          <p className="width-3 light">{marketCap}</p>
          <p className="width-2 light">{price}</p>
          <p className="width-1 light" style={{color: chartColor}} >{change}%</p>
          <div className="currency-volume">
            <p className="width-3 light">{volumeDollars} USD</p>
            <p className="width-2 light-grey">{volume} {abbreviation}</p>
          </div>
          <svg viewBox="0 0 322 100" className="chart">
            <polyline
               fill="none"
               stroke={chartColor}
               strokeWidth="4"
               points={points}
               stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </NavLink>
  )
}

export default CurrencyRow;