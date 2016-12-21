// @flow

import React, {Component} from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'

// import styles from './Styles/LoadingContentStyle'
// import {Images} from '../Themes'
// import DrawerButton from '../Components/DrawerButton'
// import {Actions as NavigationActions} from 'react-native-router-flux'

class LoadingContent extends Component {

  constructor(props) {
    super(props)
    // set state with passed in props
    this.state = {
      message: props.error,
      hide: props.hide,
    }
    // bind functions
    this.dismissModal = this.dismissModal.bind(this)
  }

  dismissModal() {
    this.setState({hide: true})
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentDidMount() {
    // BackAndroid.addEventListener('hardwareBackPress', () => {
    //   if (this.context.drawer.props.open) {
    //     this.toggleDrawer()
    //     return true
    //   }
    //   return false
    // })
    // TODO: 10秒没有通知即关闭loading防止应该用户正常操作
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log('setTimeout', this.context.drawer.props)
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
    }, 2000)
  }

  toggleDrawer() {
    this.context.drawer.toggle()
  }


  render() {
    // if(this.props.hide) {
    //   return null
    // }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
        <View style={{
          width: 70,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
          borderRadius: 10
        }}>
          <ActivityIndicator
            animating={true}
            style={{}}
            color="#fff"
            size="large"
          />
        </View>
      </View>
    )
  }

}

LoadingContent.contextTypes = {
  drawer: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    hide: !state.ui.common.fetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContent)

