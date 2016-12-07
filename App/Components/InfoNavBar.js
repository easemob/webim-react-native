import React from 'react'
import {View, Text, Animated, TouchableOpacity} from 'react-native'
import {Images, Colors} from '../Themes'
import Styles from './Styles/InfoNavBarStyle'
import Icon from 'react-native-vector-icons/Ionicons'
import {Actions as NavigationActions} from 'react-native-router-flux'

export default class InfoNavBar extends React.Component {
  render() {
    const {
      title,
      containerStyle = {},
      rightTitle = '',
      rightIcon = '',
      rightShow = true,
      onRight = NavigationActions.pop,
      leftTitle = '',
      leftIcon = 'ios-arrow-back',
      onLeft = NavigationActions.pop,
      leftShow = true
    } = this.props

    const rightButtonTitleComponent = rightTitle
      ? (<Text style={{color: Colors.buttonGreen}}>{rightTitle}</Text>) : null
    const rightButtonIconComponent = rightIcon
      ? (<Icon name={rightIcon} size={25} color={Colors.buttonGreen}/>) : null
    const rightButton = (
      <TouchableOpacity style={Styles.rightButton} onPress={onRight}>
        {rightButtonTitleComponent || rightButtonIconComponent}
      </TouchableOpacity>
    )

    const leftButtonTitleComponent = leftTitle
      ? (<Text style={{color: Colors.buttonGreen}}>{leftTitle}</Text>) : null
    const leftButtonIconComponent = leftIcon
      ? (<Icon name={leftIcon} size={20} color={Colors.buttonGreen}/>) : null
    const leftButton = (
      <TouchableOpacity style={Styles.leftButton} onPress={onLeft}>
        {leftButtonTitleComponent || leftButtonIconComponent}
      </TouchableOpacity>
    )
    return (
      <Animated.View style={[Styles.container, containerStyle]}>
        <View style={Styles.flexLeft}>
          {leftShow ? leftButton : null}
        </View>
        <Text style={Styles.title}>{title}</Text>
        <View style={Styles.flexRight}>
          {rightShow ? rightButton : null}
        </View>
      </Animated.View>
    )
  }
}

