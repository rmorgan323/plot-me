import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header tests', () => {

  it('matches the snapshot', () => {
    const renderedHeader = shallow(<Header />);

    expect(renderedHeader).toMatchSnapshot();
  });
});