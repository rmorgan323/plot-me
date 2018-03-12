import React from 'react';
import './QuoteMeta.css';
import { PropTypes } from 'prop-types';

const QuoteMeta = ({ metaData }) => {
  const { name, abbr, update, price, change } = metaData;

  return (
    <div className="QuoteMeta">
      <h3>{name} ({abbr})</h3>
      <div className="meta-price-container">
        <h2>{price}</h2>
        <h3 className={change >= 0 ? "change-green" : "change-red"}>{change >= 0 ? '+' : '-'}{change}%</h3>
      </div>
      <h5>As of {update}.</h5>
    </div>
  );
};

export default QuoteMeta;

QuoteMeta.propTypes = {
  metaData: PropTypes.object
};