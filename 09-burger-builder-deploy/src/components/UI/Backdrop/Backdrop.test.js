import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Backdrop from './Backdrop';

configure({ adapter: new Adapter() });

describe('<Backdrop />', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Backdrop clicked={() => {}} />)));

  it('should display a <div /> element if show is true', () => {
    wrapper.setProps({ show: true });
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should display nothing if show is false', () => {
    wrapper.setProps({ show: false });
    expect(wrapper.equals(null)).toEqual(true);
  });
});
