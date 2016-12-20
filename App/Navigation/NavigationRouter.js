// @flow

import React, {Component} from 'react'
import {Actions as NavigationActions, Reducer, Scene, Router, Modal, ActionConst} from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import {Platform} from 'react-native'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import ContactsScreen from '../Containers/ContactsScreen'
import ContactsAndroidScreen from '../Containers/ContactsAndroidScreen'
import ContactInfoScreen from '../Containers/ContactInfoScreen'
import GroupListScreen from '../Containers/GroupListScreen'
import GroupCreateScreen from '../Containers/GroupCreateScreen'
import GroupMembersScreen from '../Containers/GroupMembersScreen'
import MessageScreen from '../Containers/MessageScreen'
import LoadingContent from '../Containers/LoadingContent'
import InfoNavBar from '../Components/InfoNavBar'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'


const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class NavigationRouter extends Component {
  render() {
    let scenes = null

    if (Platform.OS == 'ios') {
      scenes = (
        <Scene key='contacts' component={ContactsScreen} title='Contacts' hideNavBar/>
      )
    } else {
      scenes = (
        <Scene key='contacts' component={ContactsAndroidScreen} title='Contacts' hideNavBar/>
      )
    }

    return (
      <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title}
                 leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton} hideNavBar
                 hideTabBar>
            <Scene initial key='login' component={LoginScreen} title='Login'/>
            <Scene key='register' component={RegisterScreen} title='Register'/>
            {/* 联系人信息 */}
            <Scene key='contactInfo' component={ContactInfoScreen}
                   title='Contact Info'
                   hideNavBar={true}
            />
            {/* 聊天窗口 */}
            <Scene key='message' component={MessageScreen}
                   title='Message'
                   navBar={InfoNavBar}
                   hideNavBar={false}
            />
            {/* 群组列表 */}
            {/*rightIcon="ios-add"*/}
            {/*onRight={() => {*/}
            {/*NavigationActions.groupCreate()*/}
            {/*}}*/}
            <Scene key='groupList' component={GroupListScreen}
                   title='Groups'
                   navBar={InfoNavBar}
                   hideNavBar={false}
            />
            {/* 群组创建 */}
            <Scene key='groupCreate' component={GroupCreateScreen}
                   schema="modal"
                   title='Groups Create'
                   navBar={InfoNavBar}
                   rightTitle={I18n.t('cancel')}
                   onRight={() => {
                     NavigationActions.pop()
                   }}
                   leftShow={false}
                   direction="vertical"
                   hideNavBar={false}
            />
            {/* 群组成员 */}
            <Scene key='groupMembers' component={GroupMembersScreen}
                   title='Hyphenate Events'
                   navBar={InfoNavBar}
                   hideNavBar={false}
            />
            {/*navBar={InfoNavBar}*/}
            { scenes }
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter

