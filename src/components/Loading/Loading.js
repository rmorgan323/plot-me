import React from 'react';
import loading from './loading.gif';
import './Loading.css';

const Loading = () => {

  return (
    <div className="Loading">
      <img src={loading} className="loading-gif" alt="loading" />
    </div>
  );
};

export default Loading;