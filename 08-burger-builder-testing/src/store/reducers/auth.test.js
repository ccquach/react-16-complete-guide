import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  // No need to declare variable inside beforeAll b/c setup is synchronous.
  // beforeAll waits for asynchronous task to complete before running tests.
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should start loading at authentication start', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_START,
      })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should store the token and stop loading upon login', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: 'some-token',
        userId: 'some-user-id',
      })
    ).toEqual({
      ...initialState,
      token: 'some-token',
      userId: 'some-user-id',
      loading: false,
    });
  });

  it('should store an error and stop loading if login fails', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_FAIL,
        error: '',
      })
    ).toEqual({
      ...initialState,
      error: '',
      loading: false,
    });
  });

  it('should clear the token and user id upon logout', () => {
    expect(
      reducer(
        {
          ...initialState,
          token: 'some-token',
          userId: 'some-user-id',
        },
        { type: actionTypes.AUTH_LOGOUT }
      )
    ).toEqual(initialState);
  });

  it('should update the authentication redirect path', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: '/testing',
      })
    ).toEqual({
      ...initialState,
      authRedirectPath: '/testing',
    });
  });
});
