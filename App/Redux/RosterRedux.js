// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { Alert } from 'react-native'
import WebIM, { api } from '../Lib/WebIM'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addRoster: ['username', 'password'],
  delRoster: ['username'],
  updateRoster: ['roster']
})

export const RosterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  byName: null,
  names: null
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

export const updateRoster = (state, { roster }) => {
  let byName = {}
  roster.forEach((v) => { byName[v.name] = v} )
  return state.merge({
      byName,
      names: Object.keys(byName).sort()
   })
}

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_ROSTER]: request,
  [Types.DEL_ROSTER]: success,
  [Types.UPDATE_ROSTER]: updateRoster,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
