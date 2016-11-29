// @flow

import React from 'react'
import { TextInput, TouchableWithoutFeedback, Text, View } from 'react-native'

// custom
import I18n from 'react-native-i18n'
import Styles from './Styles/InputStyle'
import { Images, Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Input extends React.Component {

  // ------------ init -------------
  state = {
    focused: false,
    search: ''
  }

  // ------------ logic  ---------------

  // ------------ lifecycle ------------

  // ------------ handlers -------------
  handleChangeSearch (text) {
    this.setState({search: text})
  }

  handleSelectSearch () {
    this.refs.search.focus()
    this.setState({focused: true})
  }

  handleFocusSearch () {
    this.setState({focused: true})
  }

  handleBlurSearch () {
    this.refs.search.blur()
    this.setState({focused: false})
  }

  render () {
    let { placeholder, onChangeText, value} = this.props


    return (
      <TouchableWithoutFeedback onPress={this.handleSelectSearch.bind(this)}>
        {/* 保证搜索按钮的左侧区域点击也会触发input的聚焦事件 */}
        <View style={[Styles.search, this.state.focused ? Styles.searchFocus : {} ]}>
          <View style={[Styles.searchRow, Styles.searchIcon, this.state.focused ? Styles.searchIconFocus : {} ]}>
            <Icon name="search" size={13} color='#8798a4'/>
          </View>
          {/* TODO: returnKeyType */}
          <View style={Styles.searchRow}>
            <TextInput
              ref='search'
              style={Styles.searchInput}
              value={value}
              editable={true}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              onFocus={this.handleFocusSearch.bind(this)}
              onBlur={this.handleBlurSearch.bind(this)}
              onChangeText={onChangeText}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.search.focus()}
              placeholder={placeholder}
              placeholderTextColor={Styles.placeholderTextColor}
              selectionColor={Styles.placeholderTextColor}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

Input.propTypes = {

}
