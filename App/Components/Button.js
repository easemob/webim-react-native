// @flow

import React from 'react'
import {View, TouchableOpacity, Text, TouchableNativeFeedback, Platform} from 'react-native'
import {Colors, Metrics} from '../Themes'
import Styles from './Styles/ButtonStyle'

export default class Button extends React.Component {
  render() {
    const {color, isHighlight = false, styles} = this.props

    // const Touchable = Platform.OS === 'android' ?  : TouchableOpacity;

    let textStyles = [];
    color && textStyles.push({color: color})

    let textWrapperStyles = [Styles.button, styles, {
      // borderWidth: 1,
      justifyContent: 'center',
    }]
    textWrapperStyles.push({backgroundColor: isHighlight ? Colors.buttonGreen : Colors.coolGrey})

    return Platform.OS === 'android' ? (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this.props.onPress}>
          <View style={textWrapperStyles}>
            <Text style={textStyles}>{this.props.text}</Text>
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity
          onPress={this.props.onPress}>
          <View style={textWrapperStyles}>
            <Text style={textStyles}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      )
  }
}
