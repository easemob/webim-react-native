import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
  RefreshControl,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  TabBarIOS,
  StyleSheet,
  ScrollView,
  ListView,
  StatusBar,
  Image,
  RecyclerViewBackedScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'

// custom
import I18n from 'react-native-i18n'
import Styles from './Styles/MessageScreenStyle'
import {Images, Colors, Metrics} from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonActions from '../Redux/CommonRedux'
import WebIMActions from '../Redux/WebIMRedux'
import RosterActions from '../Redux/RosterRedux'
import SubscribeActions from '../Redux/SubscribeRedux'
import MessageActions from '../Redux/MessageRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import BaseListView from '../Components/BaseListView'
import _ from 'lodash'
import Row from '../Components/Row'

class MessageScreen extends React.Component {

  // ------------ init -------------
  constructor(props) {
    super(props)

    this.state = {
      height: 34,
      isRefreshing: false,
      modalVisible: false,
      focused: false,
    }
  }

  // ------------ logic  ---------------
  updateList(props) {
    const {message, type, id} = props
    const {byId} = message
    const typeData = message[type] || {}
    const chatData = typeData[id] || []
    console.log(type, id, message, typeData, chatData)
    this.setState({
      messages: {
        messages: chatData
      }
    })
  }

  // ------------ lifecycle ------------
  componentDidMount() {
    this.updateList(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateList(nextProps)
  }

  // ------------ handlers -------------
  handleRefresh() {
    this.setState({isRefreshing: true})
    this.props.getContacts()
    // TODO: 刷新成功/刷新失败
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 1000)
  }

  handleSelectSearch() {
    this.refs.search && this.refs.search.focus()
    this.setState({focused: true})
  }

  handleFocusSearch() {
    this.setState({focused: true})
  }

  handleBlurSearch() {
    this.setState({focused: false})
  }

  handleSend() {
    if (!this.state.value.trim()) return
    this.props.sendMessage(this.props.type, this.props.id, this.state.value.trim())
    this.setState({
      value: '',
      height: 34
    })
  }

  handleChangeText() {
  }

  // ------------ renders -------------
  _renderRow(rowId, sectionId, rowID, highlightRow) {
    const {message} = this.props
    const rowData = message.byId[rowId] || {}
    if (rowData.bySelf) {
      return this._renderRightRow(rowData)
    } else {
      return this._renderLeftRow(rowData)
    }
  }

  _renderRightRow(rowData) {
    return (
      <View style={[Styles.row, Styles.directionEnd]}>
        <Image source={Images.default} resizeMode='cover' style={[Styles.rowLogo, Styles.rowLogoRight]}/>
        <View style={Styles.rowMessage}>
          {/*<Text style={[Styles.nameText, Styles.textRight]}>{rowData.from}</Text>*/}
          <View style={[Styles.message, Styles.messageRight]}>
            <Text style={[Styles.messageText, Styles.messageTextRight]}>{rowData.data}</Text>
          </View>
          <Text style={[Styles.timeText, Styles.textRight]}>{this._renderDate(rowData.time)}</Text>
        </View>
      </View>
    )
  }

  _renderLeftRow(rowData) {
    return (
      <View style={Styles.row}>
        <Image source={Images.default} resizeMode='cover' style={Styles.rowLogo}/>
        <View style={Styles.rowMessage}>
          <Text style={Styles.nameText}>{rowData.from}</Text>
          <View style={Styles.message}>
            <Text style={Styles.messageText}>{rowData.data}</Text>
          </View>
          <Text style={Styles.timeText}>{this._renderDate(rowData.time)}</Text>
        </View>
      </View>
    )
  }

  _renderDate(time) {
    // I18n.locale.substr(0, 2)
    // .toLocaleString('zh-Hans-CN', {hour12: false, })
    const d = new Date(time)
    return `${d.getMonth() + 1}-${d.getDay() > 9 ? d.getDay() : '0' + d.getDay()  } ${d.getHours()}:${d.getMinutes()}`
  }

  _renderSendButton() {
    const {focused} = this.state

    return focused ? (
      <TouchableOpacity style={Styles.searchExtra} onPress={this.handleSend.bind(this)}>
        <Text style={Styles.sendText}>{I18n.t('send')}</Text>
      </TouchableOpacity>
    ) : null
  }

  _renderMessageBar() {
    const {value = ''} = this.state

    return (
      <View style={Styles.search}>
        <View style={Styles.inputRow}>
          <View style={Styles.searchRow}>
            <TextInput
              ref="search"
              style={[Styles.searchInput, {height: Math.min(Math.max(this.state.height, 34), 100)}]}
              value={value}
              editable={true}
              keyboardType='default'
              returnKeyType='default'
              autoCapitalize='none'
              autoCorrect={false}
              multiline={true}
              onChange={(event) => {
                this.setState({
                  value: event.nativeEvent.text,
                  // 5 for padding
                  height: event.nativeEvent.contentSize.height + 5,
                });
              }}
              onFocus={this.handleFocusSearch.bind(this)}
              onBlur={this.handleBlurSearch.bind(this)}
              onChangeText={this.handleChangeText.bind(this)}
              onEndEditing={() => {
              }}
              onLayout={() => {
              }}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.search.focus()}
              placeholder={I18n.t('sendMessage')}
            />
          </View>
          {this._renderSendButton()}
        </View>
        <View style={Styles.iconRow}>
          <TouchableOpacity>
            <Image source={Images.iconCamera}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.iconImage}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.iconEmoji}/>
          </TouchableOpacity>
          {/*<TouchableOpacity>*/}
          {/*<Image source={Images.iconAudio}/>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity>*/}
          {/*<Image source={Images.iconLocation}/>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity>*/}
          {/*<Image source={Images.iconFile}/>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </View>
    )
  }

  // ------------ render -------------
  render() {
    const {messages = {}} = this.state

    return (
      <View style={Styles.container}>
        <BaseListView
          autoScroll={true}
          hasNav={true}
          data={messages}
          handleRefresh={this.handleRefresh.bind(this)}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={() => null}
        />
        {this._renderMessageBar()}
      </View>
    )
  }
}

MessageScreen.propTypes = {
  message: PropTypes.object,
  // type: PropTypes.oneOf(['chat', 'groupChat']),
  // id: PropTypes.string
}

// ------------ redux -------------
const mapStateToProps = (state) => {
  console.log(state.entities.message)
  return {
    // TODO: 如果过滤无用的请求 、普通聊天和群里拆离 or 判断props？
    message: state.entities.message,
    // message: {
    //   byId: {
    //     '11': {
    //       bySelf: false,
    //       data: 'dada',
    //       error: false,
    //       errorCode: '',
    //       errorText: '',
    //       from: 'lwz3',
    //       id: '11',
    //       type: 'chat'
    //     }
    //   },
    //   chat: {
    //     lwz3: ['11']
    //   }
    // },
    // test
    type: 'chat',
    id: 'lwz3'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (type, id, message) => dispatch(MessageActions.sendMessage(type, id, message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)
