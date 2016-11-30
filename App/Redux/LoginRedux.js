// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { Alert } from 'react-native'
import WebIM, { api } from '../Lib/WebIM'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  registerRequest: ['username', 'password'],
  registerSuccess: ['json'],
  registerFailure: ['registerError'],
  logout: null,

  // ------------- async -----------------
  register: (username, password) => {
    return (dispatch, getState) => {
      var options = {
        username: username.trim().toLowerCase(),
        password: password,
        nickname: username.trim().toLowerCase()
      }
      // console.log(options)
      dispatch(Creators.registerRequest(username, password))

        // must be https for mac policy
      return api.register(options)
        .then(({data}) => {
          console.log('success', data)
          if (data.error) {
            Alert.alert(data.error_description)
            dispatch(Creators.registerFailure(data))
            return Promise.reject()
          }

          Alert.alert('success')
          dispatch(Creators.registerSuccess(data))
        }).catch(() => {
          console.log('error')
        })
    }
  },
  login: (username, password) => {
    return (dispatch, getState) => {
      dispatch(Creators.loginRequest(username, password))

      if (WebIM.conn.isOpened()) {
        WebIM.conn.close('logout')
      }
      console.log('open', username, password)
      WebIM.conn.open({
        apiUrl: WebIM.config.apiURL,
        user: username.trim().toLowerCase(),
        pwd: password,
        //  accessToken: password,
        appKey: WebIM.config.appkey
      })
    }
  }
})

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
  return state.merge({ username, password, fetching: true, error: false })
}

// we've successfully logged in
export const success = (state: Object, { msg }: Object) => {
  return state.merge({ fetching: false, error: false, msg })
}

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) => {
  return state.merge({ fetching: false, error: error })
}

export const registerRequest = (state: Object = INITIAL_STATE, { username, password}) => {
  return state.merge({ username, password, fetching: true })
}

export const registerSuccess = (state: Object = INITIAL_STATE, { json }: Object) => {
  return state.merge({ fetching: false, json, registerError: null })
}

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
