import React from 'react';
import './CurrencyRow.css';
import { NavLink } from 'react-router-dom';

const CurrencyRow = ({ index, currency, abbreviation, marketCap, price, change, volumeDollars, volume }) => {

  return (
    <NavLink className="links" to={`/plotme/quote/${abbreviation}`}>
      <div className="CurrencyRow">
        <p>{index}</p>
        <p>{currency}</p>
        <p>{abbreviation}</p>
        <p>{marketCap}</p>
        <p>{price}</p>
        <p>{change}%</p>
        <p>{volumeDollars}USD</p>
        <p>{volume}{abbreviation}</p>
      </div>
    </NavLink>
  )
}

export default CurrencyRow;