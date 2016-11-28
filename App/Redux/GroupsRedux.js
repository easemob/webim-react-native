// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { Alert } from 'react-native'
import WebIM, { api } from '../Lib/WebIM'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  add2Roster: ['username', 'password'],
  del2Roster: ['username'],
})

export const RosterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
})

/* ------------- Reducers ------------- */

export const request = (state: Object, { username, password}) => {
  return state.merge({ fetching: true, error: false })
}

export const success = (state: Object, { msg }: Object) => {
  return state.merge({ fetching: false, error: false, msg })
}

export const failure = (state: Object, { error }: Object) => {
  return state.merge({ fetching: false, error: true })
}


// we've logged out
export const logout = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD2_ROSTER]: request,
  [Types.DEL2_ROSTER]: success,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
