import getCurrencies from './getCurrencies';

describe('getCurrencies tests', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ status: 'success' })
    })
  );

  it('should be a function', () => {
    expect(getCurrencies).toBeAFunction;
  });

  it('should be called with the correct parameters', async () => {
    const expected = [
      'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=EUR&apikey=L1L7BORXPQM7PG57'
    ];

    await getCurrencies(['BTC']);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
});