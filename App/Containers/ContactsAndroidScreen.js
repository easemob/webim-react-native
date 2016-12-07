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
      <View style={[styles.tabContent, {backgroundColor: 'red'}]}>
        <ScrollView>
          <Text style={styles.tabText}>abc</Text>
          <Text style={styles.tabText}>0 re-renders of the abc</Text>
        </ScrollView>
      </View>
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
