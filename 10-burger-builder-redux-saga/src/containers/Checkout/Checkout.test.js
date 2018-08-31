import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Redirect, Route } from 'react-router-dom';
import { Checkout } from './Checkout';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

configure({ adapter: new Adapter() });

describe('<Checkout />', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Checkout match={{ path: '' }} />)));

  it('should redirect home if there are no ingredients', () => {
    wrapper.setProps({ ings: null, purchased: false });
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('should redirect home if there are ingredients and purchased', () => {
    wrapper.setProps({ ings: {}, purchased: true });
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('should not redirect home if there are ingredients and not purchased', () => {
    wrapper.setProps({ ings: {}, purchased: false });
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });

  it('should render a <CheckoutSummary /> element if there are ingredients', () => {
    wrapper.setProps({ ings: {}, purchased: false });
    expect(wrapper.find(CheckoutSummary)).toHaveLength(1);
  });

  it('should render a <Route /> element if there are ingredients', () => {
    wrapper.setProps({
      ings: {},
      purchased: false,
      match: { path: '/relative/path' },
    });
    expect(wrapper.find(Route)).toHaveLength(1);
  });
});
