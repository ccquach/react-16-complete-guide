import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // if isAuthenticated prop not passed, it is treated as false
    const wrapper = shallow(<NavigationItems isAuthenticated={false} />);
    // Checks that it renders NavigationItem component
    // Expects it to render two NavigationItem components
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
