// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { Alert } from 'react-native'
import WebIM, { api } from '../Lib/WebIM'
import RosterActions from './RosterRedux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  request: ['username', 'password'],
  success: ['username'],
  failure: ['error'],

  // ------------- async -----------------

  // 获取好友列表
  getContacts: () => {
    return (dispatch, getState) => {
      WebIM.conn.getRoster({
        success:(roster) => {
          // console.log('getRoster success', roster)
          dispatch(RosterActions.updateRoster(roster))
        },
        error:(error) => {
          console.log('getRoster error', error)
        }
      })
    }
  }
})

export const ContactsTypes = Types
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
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
