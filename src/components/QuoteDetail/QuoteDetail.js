import React from 'react';
import './QuoteDetail.css';

const QuoteDetail = ({ metaData }) => {
  const { price, marketCap, volume, volumeDollars } = metaData;

  return (
    <div className="QuoteDetail">
      <div className="details-pair">
        <p>Current Price</p>
        <p><strong>{price}</strong></p>
      </div>
      <div className="details-pair">
        <p>Volume (24hr)</p>
        <p><strong>{volume}</strong></p>
      </div>
      <div className="details-pair">
        <p>Market Cap</p>
        <p><strong>{marketCap}</strong></p>
      </div>
      <div className="details-pair">
        <p>Volume (USD)</p>
        <p><strong>{volumeDollars}</strong></p>
      </div>
    </div>
  )
}

export default QuoteDetail;