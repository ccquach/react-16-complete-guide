import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Redirect } from 'react-router-dom';
import { Auth } from './Auth';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<Auth />', () => {
  let wrapper;
  beforeEach(() =>
    (wrapper = shallow(
      <Auth onAuth={() => {}} onSetAuthRedirectPath={() => {}} />
    )));

  it('should display a spinner if loading', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it('should not display a spinner if not loading', () => {
    wrapper.setProps({ loading: false });
    expect(wrapper.find(Spinner)).toHaveLength(0);
  });

  it('should display an error if thrown', () => {
    wrapper.setProps({ error: { message: 'Something went wrong' } });
    expect(wrapper.find('p').text()).toEqual(`Error! Something went wrong`);
  });

  it('should not display an error if not thrown', () => {
    wrapper.setProps({ error: null });
    expect(wrapper.contains(<p />)).toEqual(false);
  });

  it('should redirect if user is authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('should not redirect if user is not authenticated', () => {
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.find(Redirect)).toHaveLength(0);
  });
});
