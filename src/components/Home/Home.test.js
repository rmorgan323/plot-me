import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';

jest.mock('../../helpers/getCurrencies/getCurrencies.js');

describe('Home tests', () => {
  it('should match the snapshot', () => {
    const renderedHome = shallow(<Home />, {disableLifecycleMethods: true});

    expect(renderedHome).toMatchSnapshot();
  });

  it('should have a default state on load', () => {
    const renderedHome = shallow(<Home />, {disableLifecycleMethods: true});

    expect(renderedHome.state('isLoading')).toEqual(true);
    expect(renderedHome.state('currencyData')).toEqual([]);
  });

  it.skip('should set state correctly when component mounts', async () => {
    // const renderedHome = await shallow(<Home />);

    // console.log(renderedHome);
  });
});
