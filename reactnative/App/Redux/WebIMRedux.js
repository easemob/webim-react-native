// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '../Lib/WebIM'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onOpened: ['msg'],
  onError: ['msg'],
})

export const WebIMTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    test: 1,
    error: {},  
})

/* ------------- Reducers ------------- */


export const onOpened = (state: Object, { msg }) => {
  console.log('onOpened', msg)
  return state.merge({test: 2})
}

export const onError = (state, { msg }) => {
  console.log('onError', state, WebIM.conn.Status)
  return state.merge( {error: {isError: true, code: 101, msg: 'abc'}} )
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_OPENED]: onOpened,
  [Types.ON_ERROR]: onError,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
//export const isLoggedIn = (loginState: Object) => loginState.username !== null



/** Constants: Connection Status Constants
 *  Connection status constants for use by the connection handler
 *  callback.
 *
 *  Status.ERROR - An error has occurred
 *  Status.CONNECTING - The connection is currently being made
 *  Status.CONNFAIL - The connection attempt failed
 *  Status.AUTHENTICATING - The connection is authenticating
 *  Status.AUTHFAIL - The authentication attempt failed
 *  Status.CONNECTED - The connection has succeeded
 *  Status.DISCONNECTED - The connection has been terminated
 *  Status.DISCONNECTING - The connection is currently being terminated
 *  Status.ATTACHED - The connection has been attached
 *  Status.CONNTIMEOUT - The connection has timed out
 */