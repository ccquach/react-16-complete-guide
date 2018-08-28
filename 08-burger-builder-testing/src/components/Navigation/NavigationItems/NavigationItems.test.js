import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  // instead of duplicating method calls for similar tests
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  // set props on rendered component for each unique case
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
