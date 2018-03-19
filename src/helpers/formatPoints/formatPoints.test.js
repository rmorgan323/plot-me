import formatPoints from './formatPoints';
import mockGetCurrenciesData from '../../mockData/mockGetCurrenciesData';

describe('formatPoints tests', () => {
  it('should be a function', () => {
    expect(formatPoints).toBeAFunction;
  });

  it('should return a clean array of data points', () => {
    const expected = [ '0,120 2,105 4,77 6,48 8,20', '#00b14c' ]
    const cleanArray = formatPoints(mockGetCurrenciesData);
    
    expect(cleanArray).toEqual(expected);
  });
});