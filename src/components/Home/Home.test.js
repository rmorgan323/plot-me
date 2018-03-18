import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';

describe('Home tests', () => {
  it('should match the snapshot', () => {
    const renderedHome = shallow(<Home />, {disableLifecycleMethods: true});

    expect(renderedHome).toMatchSnapshot();
  });
});
