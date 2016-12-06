import React from 'react'
import {View, Text, Animated, TouchableOpacity} from 'react-native'
import {Images, Colors} from '../Themes'
import Styles from './Styles/InfoNavBarStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions as NavigationActions} from 'react-native-router-flux'

export default class InfoNavBar extends React.Component {
  render() {
    const {title} = this.props

    return (
      <Animated.View style={Styles.container}>
        <TouchableOpacity style={Styles.leftButton} onPress={NavigationActions.pop}>
          <Icon name='ios-arrow-back' size={15} color='#08BA6E'/>
        </TouchableOpacity>
        {/*<Image style={Styles.logo} source={Images.clearLogo}/>*/}
        <Text style={Styles.title}>{title}</Text>
        <View style={Styles.rightButton}/>
      </Animated.View>
    )
  }
}

