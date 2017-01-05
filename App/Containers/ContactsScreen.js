import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

// custom
import I18n from 'react-native-i18n'
import Styles from './Styles/ContactsScreenStyle'
import {Images, Colors} from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonActions from '../Redux/CommonRedux'
import WebIMActions from '../Redux/WebIMRedux'
import RosterActions from '../Redux/RosterRedux'
import SubscribeActions from '../Redux/SubscribeRedux'
import AddContactModal from '../Containers/AddContactModal'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Button from '../Components/Button'
import BaseListView from '../Components/BaseListView'


class ContactsScreen extends React.Component {

  // ------------ init -------------

  constructor(props) {
    super(props)

    this.state = {
      isRefreshing: false,
      modalVisible: false,
      focused: false,
      search: '',
      selectedTab: 'contacts',
      notifyCount: 0,
      presses: 0,
      data: {
        // [群组通知，好友通知, 通知总数]
        // notices: [null,subscribes, length],
        notices: [],
        // 作为Groups的快捷按钮使用
        groupHeader: ['INIT'],
        friends: [],
      }
    }
  }

  // ------------ logic  ---------------

  updateList(props, search = '') {
    props = props || this.props;
    let roster = props.roster || []
    let subscribes = props.subscribes || []
    let friends = roster && roster.friends
    let friendsFilter = friends
    if (search) {
      friendsFilter = friends.filter((name) => {
        return name.indexOf(search) !== -1
      })
    }

    this.setState({
      data: {
        notices: [null, subscribes, Object.keys(subscribes).length > 0],
        groupHeader: ['INIT'],
        friends: friendsFilter
      }
    })
  }


  // ------------ lifecycle ------------
  componentDidMount() {
    this.updateList()
  }

  componentWillReceiveProps(nextProps) {
    // TODO: 是否需要更新的校验
    // TODO: props更新，有没有更好的方式通知
    this.updateList(nextProps, this.state.search)
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

  handleChangeSearch(text) {
    this.setState({search: text})
    this.updateList(false, text)
  }

  handleFocusSearch() {
    this.setState({focused: true})
  }

  handleBlurSearch() {
    this.refs.search.blur()
    this.setState({focused: false})
  }

  handleCancelSearch() {
    this.refs.search.blur()
    this.setState({
      focused: false,
      search: null,
    })
    this.updateList()
  }

  handleInitSearch() {
    this.setState({
      search: null,
    })
    this.updateList()
  }

  handleDecline(name) {
    this.props.declineSubscribe(name)
  }

  handleAccept(name) {
    this.props.acceptSubscribe(name)
  }

  // ------------ renders -------------
  _renderInput() {
    return (
      <TouchableWithoutFeedback onPress={this.handleSelectSearch.bind(this)}>
        {/* 保证搜索按钮的左侧区域点击也会触发input的聚焦事件 */}
        <View style={Styles.search}>
          <View style={[Styles.searchRow, Styles.searchIcon, this.state.focused ? Styles.searchFocus : {}]}>
            <Ionicons name="ios-search-outline" size={15} color='#8798a4'/>
            {/*<Icon name='ios-add' size={20} color='#8798a4'/>*/}
          </View>
          <View style={Styles.searchRow}>
            <TextInput
              ref='search'
              style={Styles.searchInput}
              value={this.state.search}
              editable={true}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              onFocus={this.handleFocusSearch.bind(this)}
              onBlur={this.handleBlurSearch.bind(this)}
              onChangeText={this.handleChangeSearch.bind(this)}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.search.focus()}
              placeholder={I18n.t('search')}
              placeholderTextColor={Styles.placeholderTextColor}
              selectionColor={Styles.selectionColor}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderCancel() {
    return this.state.focused ? (
        <TouchableOpacity style={Styles.searchCancel} onPress={this.handleCancelSearch.bind(this)}>
          <View>
            <Text>Cancel</Text>
          </View>
        </TouchableOpacity>
      ) : null;
  }

  _renderContent() {

    return (
      <View style={[Styles.container]}>
        {/* 头部 */}
        <View style={Styles.header}>
          {/* TODO: Input */}
          {this._renderInput()}
          {/* TODO: longPress */}
          {/* 取消按钮，当input聚焦的时候出现 */}
          {this._renderCancel()}
          {/* 加号 */}
          <TouchableOpacity style={Styles.searchPlus} onPress={NavigationActions.addContactModal}>
            <Ionicons size={30} name="ios-add" color={Colors.buttonGreen}/>
          </TouchableOpacity>
        </View>
        <BaseListView
          autoScroll={false}
          data={this.state.data}
          handleRefresh={this.handleRefresh.bind(this)}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={this._renderSeparator.bind(this)}
        />
      </View>
    )
  }

  _renderRow(rowData, sectionId, rowID, highlightRow) {
    // console.log(sectionId, rowData, typeof rowData == 'boolean')
    switch (sectionId) {
      case 'groupHeader':
        return this._renderSectionGroupHeader()
        break;
      case 'friends':
        return this._renderSectionFriends(rowData)
        break;
      case 'notices':
        // 无通知消息
        if (rowData == null) return null
        // 空白分割行，参数是未读消息数目
        if (typeof rowData == 'boolean') return rowData ? this._renderSectionNoticesSpace() : null
        // 有通知消息
        return this._renderSectionNotices(rowData)
        break;
      default:
        return null
        break;
    }
  }

  _renderSectionFriends(rowData) {
    return (
      <TouchableOpacity onPress={() => {
        this.handleInitSearch()
        NavigationActions.contactInfo({"uid": rowData})
      }}>
        <View style={Styles.row}>
          <Image source={Images.default} resizeMode='cover' style={Styles.rowLogo}/>
          <View style={Styles.rowName}>
            <Text>{rowData}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSectionNotices(rowData) {
    let keys = Object.keys(rowData)
    if (keys.length == 0) return null
    return (
      <View>
        <View style={Styles.noticeHeaderWrapper}>
          <View style={Styles.noticeHeaderLeft}>
            <Image source={Images.requestsIcon}/>
          </View>
          <View style={Styles.noticeHeaderMiddle}>
            <Text style={Styles.noticeHeaderText}>{I18n.t('contactRequests')}</Text>
          </View>
          <View style={Styles.noticeHeaderRight}>
            <Text
              style={[Styles.noticeHeaderText, Styles.noticeHeaderTextRight]}>{keys.length > 0 ? `(${keys.length})` : ''}</Text>
          </View>
        </View>
        {this._renderSectionnoticesRequests(rowData)}
      </View>
    )
  }

  _renderSectionNoticesSpace() {
    // console.log('gogoogo')
    return (
      <View style={{height: 30, backgroundColor: '#e4e9ec'}}>
      </View>
    )
  }

  _renderSectionnoticesRequests(rowData) {
    let requests = []
    let keys = Object.keys(rowData);

    keys.forEach((k) => {
      v = rowData[k]
      requests.push(
        <View key={`request-${k}`}>
          <View style={Styles.row}>
            <Image source={Images.default} resizeMode='cover' style={Styles.rowLogo}/>
            <View style={Styles.rowName}>
              <Text>{v.from}</Text>
            </View>
            <View style={Styles.buttonGroup}>
              <Button
                styles={Styles.accept}
                onPress={() => {
                  this.handleAccept(v.from)
                }}
                text={I18n.t('accept')}
                color={Colors.snow}
                backgroundColor={Colors.buttonGreen}
              />
              <Button
                styles={Styles.decline}
                onPress={() => {
                  this.handleDecline(v.from)
                }}
                text={I18n.t('decline')}
                color={Colors.snow}
                backgroundColor={Colors.buttonGrey}
              />
            </View>
          </View>
        </View>
      )
    })
    return requests
  }

  _renderSectionGroupHeader() {
    return (
      <TouchableOpacity style={Styles.groupHeader} onPress={() => {
        NavigationActions.groupList()
      }}>
        <View style={Styles.groupHeaderTextWrapper}>
          <Text style={Styles.groupHeaderText}>{I18n.t('groups')}</Text>
        </View>
        <View style={Styles.groupHeaderIcon}>
          <Icon name="chevron-right" size={13} color={Colors.blueGrey}/>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    // only friends list needed separator line
    // 只有好友列表才需要分割线
    if (sectionID != 'friends') return null;
    return (
      // backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
      <View
        key={`${sectionID}-${rowID}`}
        style={Styles.separator}
      />
    )
  }

  // ------------ rende -------------
  render() {
    return this._renderContent()
  }
}


ContactsScreen.propTypes = {
  roster: PropTypes.shape({
    names: PropTypes.array
  })
}

// ------------ redux -------------
const mapStateToProps = (state) => {
  return {
    roster: state.entities.roster,
    subscribes: state.entities.subscribe.byFrom,
    user: state.ui.login.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContacts: () => dispatch(RosterActions.getContacts()),
    addContact: (id) => dispatch(RosterActions.addContact(id)),
    acceptSubscribe: (name) => dispatch(SubscribeActions.acceptSubscribe(name)),
    declineSubscribe: (name) => dispatch(SubscribeActions.declineSubscribe(name)),
    logout: () => dispatch(WebIMActions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen)
