import getDailyData from './getDailyData';
import React from 'react';
import apiKey from '../../apiKey';

describe('getDailyData tests', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve()
    })
  )

  it('should be a function', () => {
    expect(getDailyData).toBeAFunction;
  });

  it('getDailyData should be called with the correct parameters', async () => {
    const expected = [
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${apiKey}`
    ];

    await getDailyData('BTC');
    expect(window.fetch).toHaveBeenCalledWith(...expected)
  });
});