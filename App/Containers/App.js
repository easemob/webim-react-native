// @flow

import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {Alert, View} from 'react-native'
import '../I18n/I18n' // keep before root container
import RootContainer from './RootContainer'
import createStore from '../Redux'
import applyConfigSettings from '../Config'
//
import LoadingContent from '../Containers/LoadingContent'
import I18n from 'react-native-i18n'
import WebIM from '../Lib/WebIM'
import WebIMActions from '../Redux/WebIMRedux'
import LoginActions from '../Redux/LoginRedux'
import SubscribeActions from '../Redux/SubscribeRedux'
import BlacklistActions from '../Redux/BlacklistRedux'
import RosterActions from '../Redux/RosterRedux'
import MessageActions from '../Redux/MessageRedux'
import GroupActions from '../Redux/GroupRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'

const RouterWithRedux = connect()(RootContainer);

// Apply config overrides
applyConfigSettings()
// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  constructor() {
    super()
    // store.dispatch(LoginActions.login('lwz2', '1'))
    // store.dispatch(LoginActions.login('w', 'w'))

    WebIM.conn.listen({
      // xmpp连接成功
      onOpened: (msg) => {
        // 出席后才能接受推送消息
        WebIM.conn.setPresence();
        // 获取好友信息
        store.dispatch(RosterActions.getContacts())
        // 通知登陆成功
        store.dispatch(LoginActions.loginSuccess(msg))
        // 获取黑名单列表
        store.dispatch(BlacklistActions.getBlacklist())
        // 获取群组列表
        store.dispatch(GroupActions.getGroups())
      },
      // 出席消息
      onPresence: (msg) => {
        console.debug('onPresence', msg, store.getState())
        switch (msg.type) {
          case 'subscribe':


            // 加好友时双向订阅过程，所以当对方同意添加好友的时候
            // 会有一步对方自动订阅本人的操作，这步操作是自动发起
            // 不需要通知提示，所以此处通过state=[resp:true]标示
            if (msg.status === '[resp:true]') {
              return
            }

            store.dispatch(SubscribeActions.addSubscribe(msg))
            break;
          case 'subscribed':
            store.dispatch(RosterActions.getContacts())
            Alert.alert(msg.from + ' ' + I18n.t('subscribed'))
            break;
          case 'unsubscribe':
            // TODO: 局部刷新
            store.dispatch(RosterActions.getContacts())
            break;
          case 'unsubscribed':
            // 好友退订消息
            store.dispatch(RosterActions.getContacts())
            Alert.alert(msg.from + ' ' + I18n.t('unsubscribed'))
            break;
        }
      },
      // 各种异常
      onError: (error) => {
        console.log(error)
        // 16: server-side close the websocket connection
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
          console.log('WEBIM_CONNCTION_DISCONNECTED', WebIM.conn.autoReconnectNumTotal, WebIM.conn.autoReconnectNumMax);
          if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
            return;
          }
          Alert.alert('Error', 'server-side close the websocket connection')
          NavigationActions.login()
          return;
        }
        // 8: offline by multi login
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
          console.log('WEBIM_CONNCTION_SERVER_ERROR');
          Alert.alert('Error', 'offline by multi login')
          NavigationActions.login()
          return;
        }
        if (error.type == 1) {
          let data = error.data ? error.data.data : ''
          data && Alert.alert('Error', data)
          store.dispatch(LoginActions.loginFailure(error))
        }
      },
      // 连接断开
      onClosed: (msg) => {
        console.log('onClosed')
      },
      // 更新黑名单
      onBlacklistUpdate: (list) => {
        store.dispatch(BlacklistActions.updateBlacklist(list))
      },
      // 文本信息
      onTextMessage: (message) => {
        console.log('onTextMessage', message)
        store.dispatch(MessageActions.addMessage(message, 'txt'))
      },
      onPictureMessage: (message) => {
        console.log('onPictureMessage', message)
        store.dispatch(MessageActions.addMessage(message, 'img'))
      }
    })
  }

  componentWillReceiveProps() {
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux />
      </Provider>
    )
  }
}

export default App
