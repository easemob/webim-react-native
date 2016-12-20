import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Modal, Text, TouchableOpacity, View, Dimensions} from 'react-native'

// custom
import I18n from 'react-native-i18n'
import {Images, Colors} from '../Themes'
import Styles from './Styles/ModalHeaderStyle'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ModalHeader extends Component {

  // ------------ init -------------
  constructor(props) {
    super(props)
  }

  // ------------ lifecycle ------------


  // ------------ renders -------------

  render() {
    let {title = 'Title', leftBtn, leftClick, rightBtn, rightClick} = this.props

    return (
      <View style={Styles.container}>
        <View style={Styles.left}>
          <TouchableOpacity onPress={leftClick}>
            <Text style={Styles.leftText}>{leftBtn}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.middle}>
          <Text style={Styles.middleText}>{title}</Text>
        </View>
        <View style={Styles.right}>
          <TouchableOpacity onPress={rightClick}>
            <Text style={Styles.rightText}>{rightBtn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}
