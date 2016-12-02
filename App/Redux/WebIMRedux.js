// @flow

import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '../Lib/WebIM'
import I18n from 'react-native-i18n'
import {Actions as NavigationActions} from 'react-native-router-flux'
import ContactsActions from '../Redux/ContactsRedux'
import CommonActions from '../Redux/CommonRedux'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  subscribe: ['msg'],
  removeSubscribe: ['name'],
  // 删除好友
  removeContact: (id) => {
    return (dispatch, getState) => {
      //loading
      dispatch(CommonActions.fetching())
      WebIM.conn.removeRoster({
        to: id,
        success: function () {
          //loading end
          dispatch(CommonActions.fetched())
          dispatch(ContactsActions.getContacts())

          WebIM.conn.unsubscribed({
            to: id
          });
        },
        error: function () {
        }
      })
    }
  },
  // 添加好友
  requestSubscribe: (id) => {
    return (dispatch, getState) => {
      WebIM.conn.subscribe({
        to: id,
        message: I18n.t('request')
      })
    }
  },
  // 接受好友请求
  acceptSubscribe: (name) => {
    return (dispatch, state) => {
      dispatch(Creators.removeSubscribe(name))

      WebIM.conn.subscribed({
        to: name,
        message: '[resp:true]'
      })

      WebIM.conn.subscribe({
        to: name,
        message: '[resp:true]'
      })
    }
  },
  // 拒绝好友请求
  declineSubscribe: (name) => {
    return (dispatch, state) => {
      dispatch(Creators.removeSubscribe(name))

      WebIM.conn.unsubscribed({
        to: name,
        message: new Date().toLocaleString()
      })
    }
  },
  // 登出
  logout: () => {
    return (dispatch, state) => {
      if (WebIM.conn.isOpened()) {
        WebIM.conn.close('logout')
      }

      NavigationActions.login();
    }
  },
})

export const WebIMTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  msgs: {},
  subscribes: {}
})

/* ------------- Reducers ------------- */

export const subscribe = (state, {msg}) => {
  return state.merge({
    subscribes: Immutable(state.subscribes).set(msg.from, msg)
  }, {deep: true})
}

export const removeSubscribe = (state, {name}) => {
  let subs = state.subscribes.asMutable()
  console.log('subs', subs)
  delete subs[name]
  console.log('subs', subs)
  return state.merge({
    subscribes: Immutable(subs)
  })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBSCRIBE]: subscribe,
  [Types.REMOVE_SUBSCRIBE]: removeSubscribe,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
// export const isLoggedIn = (loginState: Object) => loginState.username !== null

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
