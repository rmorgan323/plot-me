import React from 'react';
import './CurrencyRow.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const CurrencyRow = ({ index, currency, abbreviation, marketCap, price, change, volumeDollars, volume, points }) => {

  return (
    <NavLink className="links" to={`/plotme/quote/${abbreviation}`}>
      <div className="CurrencyRow">
        <div className="currency-container">
          <p className="light currency-index">{index}</p>
          <div className="currency-info">
            <p className="t-left currency-name">{currency}</p>
            <p className="currency-abbr">{abbreviation}</p>
          </div>
          <p className="t-right light currency-cap">{marketCap}</p>
          <p className="t-right light currency-price">{price}</p>
          <p className="t-right light currency-change" style={change[0] === '+' ? {color: 'rgba(0,177,76,1)'} : {color: 'rgba(189,32,37,1)'}} >{change}</p>
          <div className="currency-volume">
            <p className="t-right light">{volumeDollars} USD</p>
            <p className="t-right light-grey">{volume} {abbreviation}</p>
          </div>
          <svg viewBox="0 0 322 100" className="chart">
            <polyline
              fill="none"
              stroke={change[0] === '+' ? 'rgba(0,177,76,1)' : 'rgba(189,32,37,1)'}
              strokeWidth="4"
              points={points}
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </NavLink>
  );
};

export default CurrencyRow;

CurrencyRow.propTypes = {
  index: PropTypes.number,
  currency: PropTypes.string,
  abbreviation: PropTypes.string,
  marketCap: PropTypes.string,
  price: PropTypes.string,
  change: PropTypes.string,
  volumeDollars: PropTypes.string,
  volume: PropTypes.string,
  points: PropTypes.string,
  chartColor: PropTypes.string
};