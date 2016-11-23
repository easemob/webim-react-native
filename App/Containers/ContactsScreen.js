import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TabBarIOS, StyleSheet, ScrollView } from 'react-native'

import I18n from 'react-native-i18n'
import { Images, Colors } from '../Themes'

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    color: 'white',
    margin: 50
  }
})

class ContactsScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      selectedTab: 'blueTab',
      notifCount: 0,
      presses: 0
    }
  }

  _renderContent (color, pageText, num) {
    return (
      //
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <ScrollView>
          <Text style={styles.tabText}>{pageText}</Text>
          <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
        </ScrollView>
      </View>
   )
  }

  render () {
    console.log(this.state)

    return (
      <TabBarIOS
        unselectedTintColor='yellow'
        tintColor='white'
        barTintColor={Colors.coolGrey50}
        translucent={false}
          >
        <TabBarIOS.Item
          icon={Images.contacts}
          selectedIcon={Images.contactsActive}
          renderAsOriginal
          selected={this.state.selectedTab == 'blueTab'}
          title=''
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab'
            })
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={Images.chats}
          selectedIcon={Images.chatsActive}
          renderAsOriginal
          selected={this.state.selectedTab === 'redTab'}
          title=''
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1
            })
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={Images.settings}
          selectedIcon={Images.settingsActive}
          renderAsOriginal
          selected={this.state.selectedTab === 'greenTab'}
          title=''
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            })
          }}>
          {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen)
