import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM, {api} from '../Lib/WebIM'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  show: ['show']
})

export const ContactInfoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  show: false,
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state, {username, password}) => {
  return state.merge({username, password, fetching: true, error: false})
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.REMOVE_SUBSCRIBE]: removeSubscribe,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
