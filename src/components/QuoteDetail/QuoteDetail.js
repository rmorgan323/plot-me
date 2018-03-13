import React from 'react';
import './QuoteDetail.css';
import PropTypes from 'prop-types';

const QuoteDetail = ({ metaData, high, low }) => {
  const { volume, volumeDollars } = metaData;

  return (
    <div className="QuoteDetail">
      <div className="details-pair">
        <p>Daily High (GMT)</p>
        <p><strong>{high}</strong></p>
      </div>
      <div className="details-pair">
        <p>Volume (24hr)</p>
        <p><strong>{volume}</strong></p>
      </div>
      <div className="details-pair pair-bottom">
        <p>Daily Low (GMT)</p>
        <p><strong>{low}</strong></p>
      </div>
      <div className="details-pair pair-bottom">
        <p>Volume (USD)</p>
        <p><strong>{volumeDollars}</strong></p>
      </div>
    </div>
  );
};

export default QuoteDetail;

QuoteDetail.propTypes = {
  metaData: PropTypes.object,
  high: PropTypes.string,
  low: PropTypes.string
};