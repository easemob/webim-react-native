// @flow

import React, {PropTypes, Component} from 'react'
import Drawer from 'react-native-drawer'
import {DefaultRenderer, Actions as NavigationActions} from 'react-native-router-flux'
// import DrawerContent from '../Containers/DrawerContent'
import LoadingContent from '../Containers/LoadingContent'
import {connect} from 'react-redux'
import Styles from './Styles/NavigationDrawerStyle'

/* *******************
 * Documentation: https://github.com/root-two/react-native-drawer
 ********************/

class NavigationDrawer extends Component {

  state = {
    fetching: false
  }

  componentWillReceiveProps(nextProps) {
    //TODO: hack
    const state = this.props.navigationState

    if (this.state.fetching != nextProps.fetching) {
      this.setState({
        fetching: nextProps.fetching
      })
      nextProps.fetching ?
        NavigationActions.refresh({key: state.key, open: true}) :
        NavigationActions.refresh({key: state.key, open: false})
    }
  }

  render() {
    const state = this.props.navigationState
    const children = state.children
    //TODO: hack
    if (!state.open) {
      return <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
    }
    return (
      <Drawer
        ref='navigation'
        type='overlay'
        open={state.open}
        onOpen={() => NavigationActions.refresh({key: state.key, open: true})}
        onClose={() => NavigationActions.refresh({key: state.key, open: false})}
        content={<LoadingContent />}
        styles={Styles}
        tapToClose
        openDrawerOffset={0}
        panCloseMask={0}
        negotiatePan
        tweenDuration={0}
        tweenHandler={(ratio) => ({
          main: {opacity: Math.max(0.54, 1 - ratio)}
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
      </Drawer>
    )
  }
}

NavigationDrawer.propTypes = {
  navigationState: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fetching: state.ui.common.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
