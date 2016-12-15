import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
  Platform,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  ActivityIndicator,
  Keyboard,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'

// custom
import I18n from 'react-native-i18n'
import Styles from './Styles/MessageScreenStyle'
import {Images, Colors, Metrics} from '../Themes'
import MessageActions from '../Redux/MessageRedux'
import BaseListView from '../Components/BaseListView'
import ImagePicker from 'react-native-image-picker'
import Emoji from 'react-native-emoji'
import Swiper from 'react-native-swiper'
import WebIM from '../Lib/WebIM'
import debounce from 'lodash/function/debounce'

const {width, height} = Dimensions.get('window')


const options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

class MessageScreen extends React.Component {

  // ------------ init -------------
  constructor(props) {
    super(props)

    this.state = {
      height: 34,
      isRefreshing: false,
      modalVisible: false,
      focused: false,
      visibleHeight: Metrics.screenHeight,
      isEmoji: false,
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

  componentWillMount() {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
    })
    console.log('visibleHeight', newSize)
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
    })
  }
  // ------------ handlers -------------
  handleRefresh() {
    this.setState({isRefreshing: true})
    // this.props.getContacts()
    // TODO: 刷新成功/刷新失败
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 1000)
  }

  handleFocusSearch() {
    this.setState({
      focused: true,
      isEmoji: false,
    })

  }

  handleBlurSearch() {
    this.setState({focused: false})
  }

  handleSend() {
    if (!this.state.value || !this.state.value.trim()) return
    this.props.sendTxtMessage(this.props.type, this.props.id, {
      msg: this.state.value.trim()
    })
    this.setState({
      value: '',
      height: 34
    })
  }

  handleChangeText(v) {
    // 场景1：正常+ -
    // 场景2：从中间位置+ - -> 如果删除一个字符后字符串匹配，则非中间位置
    // 场景3：删除操作可以从textInput直接编辑，适应于以上情况
    // 场景5：从emoji的删除按钮删除，则从末尾位置编辑
    // 场景6：点击外部区域隐藏emoji框
    const splitValue = this.state.value ? this.state.value.split('') : []
    splitValue.pop()
    if (v == splitValue.join('')) {
      this.handleEmojiCancel()
    }
  }

  handleImagePicker() {
    this.setState({
      isEmoji: false
    })
    ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          // You can display the image using either data...
          //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

          // or a reference to the platform specific asset location
          let source = null;
          if (Platform.OS === 'ios') {
            source = {uri: response.uri.replace('file://', ''), isStatic: true};
          } else {
            source = {uri: response.uri, isStatic: true};
          }

          response.uri = source.uri
          const {type, id} = this.props
          this.props.sendImgMessage(type, id, {}, response)
        }
      }
    )
    ;
  }

  handleCameraPicker() {
    this.setState({
      isEmoji: false
    })
    // Launch Camera:
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        let source = null;
        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }

        response.uri = source.uri
        const {type, id} = this.props
        this.props.sendImgMessage(type, id, {}, response)
      }
    });
  }

  handleEmojiOpen() {
    this.setState({
      isEmoji: !this.state.isEmoji
    })

    this.refs.search.blur()
  }

  handleEmojiClick(v) {
    this.setState({
      value: (this.state.value || '') + v
    })
  }

  handleEmojiCancel() {
    if (!this.state.value) return
    const arr = this.state.value.split('')
    const len = arr.length
    let newValue = ''

    if (arr[len - 1] != ']') {
      arr.pop()
      newValue = arr.join('')
    } else {
      const index = arr.lastIndexOf('[')
      newValue = arr.splice(0, index).join('')
    }

    this.setState({
      value: newValue
    })
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
    const type = rowData.body.type || ''
    const obj = {
      txt: this._renderRightTxt.bind(this),
      img: this._renderRightImg.bind(this),
    }
    return typeof obj[type] == 'function' ? (obj[type](rowData)) : null
  }

  _renderRightTxt(rowData = {}) {
    return (
      <View style={[Styles.row, Styles.directionEnd]}>
        <Image source={Images.default} resizeMode='cover' style={[Styles.rowLogo, Styles.rowLogoRight]}/>
        <View style={Styles.rowMessage}>
          {/*<Text style={[Styles.nameText, Styles.textRight]}>{rowData.from}</Text>*/}
          <View style={[Styles.message, Styles.messageRight]}>
            <Text style={[Styles.messageText, Styles.messageTextRight]}>{this._renderTxt(rowData.body.msg || '')}</Text>
          </View>
          <Text style={[Styles.timeText, Styles.textRight]}>{this._renderDate(rowData.time)}</Text>
        </View>
      </View>
    )
  }

  _renderRightImg(rowData = {}) {
    const {body} = rowData
    const maxWidth = 250
    let width = Math.min(maxWidth, body.width)
    let height = body.height * width / body.width
    const loading = rowData.status == 'sending' ? (
        <ActivityIndicator style={{margin: 5}}/>
      ) : null

    return (
      <View style={[Styles.row, Styles.directionEnd]}>
        <Image source={Images.default} resizeMode='cover' style={[Styles.rowLogo, Styles.rowLogoRight]}/>
        <View style={Styles.rowMessage}>
          {/*<Text style={[Styles.nameText, Styles.textRight]}>{rowData.from}</Text>*/}
          <View style={[Styles.message, Styles.messageRight, Styles.messageImage]}>
            <Image source={{uri: body.uri || body.url}}
                   style={[Styles.rowImage, {width, height}]}/>
          </View>
          <Text style={[Styles.timeText, Styles.textRight]}>{this._renderDate(rowData.time)}</Text>
        </View>
        {loading}
      </View>
    )
  }

  _renderLeftRow(rowData) {
    const type = rowData.body.type || ''
    const obj = {
      txt: this._renderLeftTxt.bind(this),
      img: this._renderLeftImg.bind(this),
    }
    return typeof obj[type] == 'function' ? (obj[type](rowData)) : null
  }

  _renderLeftTxt(rowData = {}) {
    return (
      <View style={Styles.row}>
        <Image source={Images.default} resizeMode='cover' style={Styles.rowLogo}/>
        <View style={Styles.rowMessage}>
          <Text style={Styles.nameText}>{rowData.from}</Text>
          <View style={Styles.message}>
            <Text style={Styles.messageText}>{this._renderTxt(rowData.body.msg || '')}</Text>
          </View>
          <Text style={Styles.timeText}>{this._renderDate(rowData.time)}</Text>
        </View>
      </View>
    )
  }

  _renderLeftImg(rowData = {}) {
    const loading = rowData.status == 'sending' ? (
        <ActivityIndicator style={{margin: 5}}/>
      ) : null

    return (
      <View style={Styles.row}>
        <Image source={Images.default} resizeMode='cover' style={Styles.rowLogo}/>
        <View style={Styles.rowMessage}>
          <Text style={Styles.nameText}>{rowData.from}</Text>
          <View style={[Styles.message, Styles.messageImage]}>
            <Image source={{uri: rowData.body.url}} style={[Styles.rowImage, {}]}/>
          </View>
          <Text style={Styles.timeText}>{this._renderDate(rowData.time)}</Text>
        </View>
        {loading}
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

  _renderTxt(txt) {
    const emoji = WebIM.emoji

    // 替换不能直接用replace，必须以数组组合的方式，因为混合着dom元素
    let rnTxt = []
    let match = null
    const regex = /(\[.*?\])/g
    let start = 0
    let index = 0
    while (match = regex.exec(txt)) {
      index = match.index
      if (index > start) {
        rnTxt.push(txt.substring(start, index))
      }
      if (match[1] in emoji.map) {
        rnTxt.push((
          <Emoji style={{marginBottom: 3}} key={`emoji-${index}-${match[1]}`} name={emoji.map[match[1]]}/>
        ))
      } else {
        rnTxt.push(match[1])
      }
      start = index + match[1].length
    }
    rnTxt.push(txt.substring(start, txt.length))

    return rnTxt
  }

  _renderEmoji() {
    const {isEmoji, focused} = this.state
    const emoji = WebIM.emoji
    const emojiStyle = []
    const rowIconNum = 7
    const rowNum = 3
    const emojis = Object.keys(emoji.map).map((v, k) => {
      const name = emoji.map[v]
      return (
        <TouchableOpacity key={v + k} onPress={() => {
          this.handleEmojiClick(v)
        }}>
          <Text style={[Styles.emoji, emojiStyle]}><Emoji name={name}/></Text>
        </TouchableOpacity>
      )
    })
    return isEmoji ? (
        <View style={Styles.emojiRow}>
          <Swiper style={Styles.wrapper} loop={false}
                  height={125}
                  dotStyle={ {bottom: -30} }
                  activeDotStyle={ {bottom: -30} }
          >
            <View style={Styles.slide}>
              <View style={Styles.slideRow}>
                {emojis.slice(0, rowIconNum)}
              </View>
              <View style={Styles.slideRow}>
                {emojis.slice(1 * rowIconNum, rowIconNum * 2)}
              </View>
              <View style={Styles.slideRow}>
                {emojis.slice(2 * rowIconNum, rowIconNum * 3 - 1)}
                <TouchableOpacity onPress={this.handleEmojiCancel.bind(this)}>
                  <Text style={[Styles.emoji, emojiStyle]}><Emoji name="arrow_left"/></Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={Styles.slide}>
              <View style={Styles.slideRow}>
                {emojis.slice(3 * rowIconNum - 1, rowIconNum * 4 - 1)}
              </View>
              <View style={Styles.slideRow}>
                {emojis.slice(4 * rowIconNum - 1, rowIconNum * 5 - 1)}
              </View>
              <View style={Styles.slideRow}>
                {emojis.slice(5 * rowIconNum - 1, rowIconNum * 6 - 1)}
                <TouchableOpacity>
                  <Text style={[Styles.emoji, emojiStyle]}><Emoji name="arrow_left"/></Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swiper>
          <View style={Styles.sendRow}>
            <TouchableOpacity style={Styles.send} onPress={this.handleSend.bind(this)}>
              <Text style={Styles.sendText}>{I18n.t('send')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null
  }

  _renderMessageBar() {
    const {value = '', isEmoji} = this.state

    return (
      <Animated.View style={Styles.search}>
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
          <TouchableOpacity style={Styles.iconTouch} onPress={debounce(this.handleCameraPicker.bind(this), 2000, true)}>
            <Image source={Images.iconCamera}/>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.iconTouch} onPress={debounce(this.handleImagePicker.bind(this), 2000, true)}>
            <Image source={Images.iconImage}/>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.iconTouch} onPress={this.handleEmojiOpen.bind(this)}>
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
        {this._renderEmoji()}
      </Animated.View>
    )
  }

// ------------ render -------------
  render() {
    const {messages = {}, visibleHeight} = this.state

    return (
      <Animated.View style={[Styles.container, {height: visibleHeight}]}>
        <BaseListView
          autoScroll={true}
          hasNav={true}
          data={messages}
          handleRefresh={this.handleRefresh.bind(this)}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={() => null}
        />
        {this._renderMessageBar()}
      </Animated.View>
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
  return {
    // TODO: 如何过滤无用的请求 、普通聊天和群里拆离 or 判断props？
    message: state.entities.message,
    type: 'chat',
    id: 'lwz3'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTxtMessage: (type, id, message) => dispatch(MessageActions.sendTxtMessage(type, id, message)),
    sendImgMessage: (type, id, message, source) => dispatch(MessageActions.sendImgMessage(type, id, message, source))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen)
