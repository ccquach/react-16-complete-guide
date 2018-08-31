import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Orders } from './Orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<Orders />', () => {
  let wrapper;
  beforeEach(() =>
    (wrapper = shallow(<Orders orders={[]} onFetchOrders={() => {}} />)));

  it('should render a spinner while loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it('should render two orders', () => {
    wrapper.setProps({ orders: [{}, {}], loading: false });
    expect(wrapper.find(Order)).toHaveLength(2);
  });
});
