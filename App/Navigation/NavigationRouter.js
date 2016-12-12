// @flow

import React, {Component} from 'react'
import {Scene, Router, ActionConst} from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import {connect} from 'react-redux'
import I18n from 'react-native-i18n'

// import NavItems from './NavItems'
// import CustomNavBar from '../Components/CustomNavBar'
// import {Actions as NavigationActions} from 'react-native-router-flux'
import {Platform} from 'react-native'

// screens identified by the router
// import PresentationScreen from '../Containers/PresentationScreen'
// import AllComponentsScreen from '../Containers/AllComponentsScreen'
// import UsageExamplesScreen from '../Containers/UsageExamplesScreen'
// import ListviewExample from '../Containers/ListviewExample'
// import ListviewGridExample from '../Containers/ListviewGridExample'
// import ListviewSectionsExample from '../Containers/ListviewSectionsExample'
// import MapviewExample from '../Containers/MapviewExample'
// import APITestingScreen from '../Containers/APITestingScreen'
// import ThemeScreen from '../Containers/ThemeScreen'
// import DeviceInfoScreen from '../Containers/DeviceInfoScreen'

// custom
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import ContactsScreen from '../Containers/ContactsScreen'
import ContactsAndroidScreen from '../Containers/ContactsAndroidScreen'
import ContactInfoScreen from '../Containers/ContactInfoScreen'
import GroupListScreen from '../Containers/GroupListScreen'
import GroupCreateScreen from '../Containers/GroupCreateScreen'
import GroupMembersScreen from '../Containers/GroupMembersScreen'
import MessageScreen from '../Containers/MessageScreen'
import InfoNavBar from '../Components/InfoNavBar'

import {Actions as NavigationActions} from 'react-native-router-flux'


/* **************************
 * Documentation: https://github.com/aksonov/react-native-router-flux
 ***************************/

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
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title}
                 leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            {/*<Scene key='presentationScreen' component={PresentationScreen} title='Ignite'*/}
            {/*renderLeftButton={NavItems.hamburgerButton}/>*/}
            {/*<Scene key='componentExamples' component={AllComponentsScreen} title='Components'/>*/}
            {/*<Scene key='usageExamples' component={UsageExamplesScreen} title='Usage' rightTitle='Example'*/}
            {/*onRight={() => window.alert('Example Pressed')}/>*/}
            {/*<Scene key='listviewExample' component={ListviewExample} title='Listview Example'/>*/}
            {/*<Scene key='listviewGridExample' component={ListviewGridExample} title='Listview Grid'/>*/}
            {/*<Scene key='listviewSectionsExample' component={ListviewSectionsExample} title='Listview Sections'/>*/}
            {/*<Scene key='mapviewExample' component={MapviewExample} title='Mapview Example'/>*/}
            {/*<Scene key='apiTesting' component={APITestingScreen} title='API Testing'/>*/}
            {/*<Scene key='theme' component={ThemeScreen} title='Theme'/>*/}

            {/* Custom navigation bar example */}
            {/*<Scene key='deviceInfo' component={DeviceInfoScreen} title='Device Info' navBar={CustomNavBar}/>*/}
            <Scene key='login' component={LoginScreen} title='Login' hideNavBar/>
            <Scene key='register' component={RegisterScreen} title='Register' hideNavBar/>
            {/* 联系人信息 */}
            <Scene key='contactInfo' component={ContactInfoScreen}
                   schema="modal" title='Contact Info'
                   hideNavBar={true}
            />
            {/* 聊天窗口 */}
            <Scene initial key='message' component={MessageScreen}
                   title='Message'
                   navBar={InfoNavBar}
                   hideNavBar={false}
            />
            {/* 群组列表 */}
            <Scene key='groupList' component={GroupListScreen}
                   title='Groups'
                   navBar={InfoNavBar}
                   rightIcon="ios-add"
                   onRight={() => {
                     NavigationActions.groupCreate()
                   }}
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

