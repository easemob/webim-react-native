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
  registerRequest: ['username', 'password'],
  registerSuccess: ['json'],
  registerFailure: ['registerError'],
  logout: null
})

Types.REGISTER_REQUEST_PROMISE = 'REGISTER_REQUEST_PROMISE'
Creators.registerRequestPromise = (username, password) => {
  return (dispatch, getState) => {
    var options = {
      username: username.trim().toLowerCase(),
      password: password,
      nickname: username.trim().toLowerCase()
          // appKey: WebIM.config.appkey,
          // apiUrl: WebIM.config.apiURL,
          // success: function () {
          //   console.log('success')
          // },
          // error: function (e) {
          //   console.log('error')
          // }
    }
    console.log(options)
    dispatch(Creators.registerRequest(username, password))

      // must be https for mac policy
    return fetch('https://a1.easemob.com/easemob-demo/chatdemoui/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('success', json)
        if (json.error) {
          Alert.alert(json.error_description)
          dispatch(Creators.registerFailure(json))
          return Promise.reject()
        }

        Alert.alert('success')
        dispatch(Creators.registerSuccess(json))
      }).catch(() => {
        console.log('error')
      })
      // WebIM.utils.registerUser(options);
  }
}

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  fetching: false,
  registerError: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object, { username, password}) => {
  console.log(state, username, password, WebIM.conn.isOpened())
  if (WebIM.conn.isOpened()) {
    WebIM.conn.close('logout')
  }
  WebIM.conn.open({
    apiUrl: WebIM.config.apiURL,
    user: username.trim().toLowerCase(),
    pwd: password,
    //  accessToken: password,
    appKey: WebIM.config.appkey
  })

  return state.merge({ username, password, fetching: true, error: false })
}

// we've successfully logged in
export const success = (state: Object, { msg }: Object) => {
  Alert.alert('success')
  return state.merge({ fetching: false, error: false, msg })
}

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) => {
  let msg = error && error.data && error.data.data
  Alert.alert(msg || 'failure')
  return state.merge({ fetching: false, error: true })
}

// we're attempting to login
export const registerRequest = (state: Object = INITIAL_STATE, { username, password}) => {
  return state.merge({ username, password, fetching: true })
}

// we've successfully logged in
export const registerSuccess = (state: Object = INITIAL_STATE, { json }: Object) => {
  return state.merge({ fetching: false, json, registerError: null })
}

// we've had a problem logging in
export const registerFailure = (state: Object = INITIAL_STATE, { registerError }: Object) => {
  return state.merge({ fetching: false, registerError })
}

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
