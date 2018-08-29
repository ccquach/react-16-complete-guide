import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BuildControls from './BuildControls';

configure({ adapter: new Adapter() });

describe('<BuildControls />', () => {
  let wrapper;
  beforeEach(() =>
    (wrapper = shallow(
      <BuildControls
        price={0}
        ordered={() => {}}
        ingredientAdded={() => {}}
        ingredientRemoved={() => {}}
        disabled={{}}
        isAuth={false}
      />
    )));

  it('should have an Order Now button if the user is authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find('button').text()).toEqual('ORDER NOW');
  });

  it('should have a Sign Up to Order button if the user is not authenticated', () => {
    wrapper.setProps({ isAuth: false });
    expect(wrapper.find('button').text()).toEqual('SIGN UP TO ORDER');
  });
});
