import React from 'react';
import './CurrencyRow.css';

const CurrencyRow = ({ index, currency, abbreviation, marketCap, price, change, volumeDollars, volume }) => {

  return (
    <div className="CurrencyRow">
      <p>{index}</p>
      <p>{currency}</p>
      <p>{abbreviation}</p>
      <p>{marketCap}</p>
      <p>{price}</p>
      <p>{change}</p>
      <p>{volumeDollars}USD</p>
      <p>{volume}<span>{abbreviation}</span></p>
    </div>
  )
}

export default CurrencyRow;