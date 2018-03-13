import React from 'react';
import './QuoteMeta.css';
import { PropTypes } from 'prop-types';

const QuoteMeta = ({ metaData, percentage }) => {
  const { name, abbr, update, price  } = metaData;

  return (
    <div className="QuoteMeta">
      <h3>{name} ({abbr})</h3>
      <div className="meta-price-container">
        <h2>{price}</h2>
        <h3 className={percentage[0] === '+' ? "change-green" : "change-red"}>{percentage}</h3>
      </div>
      <h5>As of {update}.</h5>
    </div>
  );
};

export default QuoteMeta;

QuoteMeta.propTypes = {
  metaData: PropTypes.object,
  percentage: PropTypes.string
};