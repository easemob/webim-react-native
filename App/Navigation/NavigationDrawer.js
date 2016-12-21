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
    // console.log('componentWillReceiveProps', this.props, nextProps)
    //TODO: hack
    const state = this.props.navigationState

    // if (this.state.fetching != nextProps.fetching) {
    this.setState({
      fetching: nextProps.fetching
    })
    // nextProps.fetching ?
    //   NavigationActions.refresh({key: state.key, open: true}) :
    //   NavigationActions.refresh({key: state.key, open: false})

    // nextProps.fetching ?
    //   this.refs.navigation.open() :
    //   this.refs.navigation.close
    // }

    // console.log("fetching", nextProps.fetching)

  }

  componentDidUpdate() {
    // const {open} = this.props.navigationState
    //
    // setTimeout(() => {
    //   console.log(open)
    //   if (open) {
    //     console.log(this.refs.navigation)
    //     NavigationActions.refresh({key: 'drawer', open: false});
    //     return true
    //   }
    // }, 2000)
  }

  render() {
    const state = this.props.navigationState
    const children = state.children

    console.log('render', state.open)

    // setTimeout(() => {
    //   if (state.open) {
    //     console.log(this.refs.navigation)
    //     NavigationActions.refresh({key: 'drawer', open: false});
    //     return true
    //   }
    // }, 2000)

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
