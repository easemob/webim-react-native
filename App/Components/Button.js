// @flow

import React from 'react'
import { View, TouchableOpacity, Text, TouchableNativeFeedback, Platform } from 'react-native'
import styles from './Styles/ButtonStyle'

export default class Button extends React.Component {
  render () {
    const { color } = this.props

    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    let textStyles = [];
    color && textStyles.push({color: color})

    return (
      <Touchable style={[styles.button, this.props.styles]} onPress={this.props.onPress}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={textStyles}>{this.props.text}</Text>
        </View>
      </Touchable>
    )
  }
}
