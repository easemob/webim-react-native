// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { Alert } from 'react-native'

import WebIM from '../Lib/WebIM'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object, { username, password}) => {

  console.log(state, username, password, WebIM.conn.isOpened())
  if(WebIM.conn.isOpened()) {
    WebIM.conn.close('logout')
  }
  WebIM.conn.open({
     apiUrl: WebIM.config.apiURL,
     user: username.toLowerCase(),
     pwd: password,
     accessToken: password,
     appKey: WebIM.config.appkey
  })

  return state.merge({ username, password, fetching:true })
}

// we've successfully logged in
export const success = (state: Object, { msg }: Object) => {
  Alert.alert('success')
  return state.merge({ fetching: false, msg })
}
  

// we've had a problem logging in
export const failure = (state: Object, { msg }: Object) => {
  Alert.alert('failure')
  return state.merge({ fetching: false, msg })
}

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
