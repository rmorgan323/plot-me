import formatCurrencyData from './formatCurrencyData';
import mockGetCurrenciesData from '../../mockData/mockGetCurrenciesData';

describe('formatCurrencyData tests', () => {
  it('should be a function', () => {
    expect(formatCurrencyData).toBeAFunction;
  });

  it('should return a clean result object', () => {
    const expected = { 
      name: 'Ethereum',
      abbr: 'ETH',
      update: 'a day ago',
      marketCap: '$44,022,884',
      price: '$615.93',
      change: '-1.38',
      volume: '71,473',
      volumeDollars: '$43,955,895',
      points: ['0,100 2,85 4,57 6,28 8,0', '#00b14c'] 
    };
    const mockReturn = formatCurrencyData(mockGetCurrenciesData);
    
    expect(mockReturn).toEqual(expected);
  });
});