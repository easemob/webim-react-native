// @flow

import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyle'


// import WebIM from '../Lib/WebIM'
// import WebIMActions from '../Redux/WebIMRedux'

class RootContainer extends Component {

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' hidden={true}  />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToDispatch = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  // dispatch: dispatch
})

export default connect(null, mapStateToDispatch)(RootContainer)
