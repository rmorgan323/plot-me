import React from 'react';
import './CurrencyRow.css';
import { NavLink } from 'react-router-dom';

const CurrencyRow = ({ index, currency, abbreviation, marketCap, price, change, volumeDollars, volume, points, chartColor }) => {

  return (
    <NavLink className="links" to={`/plotme/quote/${abbreviation}`}>
      <div className="CurrencyRow">
        <p className="width-1">{index}</p>
        <p className="width-0">{currency}</p>
        <p className="width-1">{abbreviation}</p>
        <p className="width-3">{marketCap}</p>
        <p className="width-2">{price}</p>
        <p className="width-1">{change}%</p>
        <p className="width-3">{volumeDollars}USD</p>
        <p className="width-2">{volume}{abbreviation}</p>
        <svg viewBox="0 0 322 100" className="chart">
          <polyline
             fill="none"
             stroke={chartColor}
             strokeWidth="3"
             points={points}
          />
        </svg>
      </div>
    </NavLink>
  )
}

export default CurrencyRow;