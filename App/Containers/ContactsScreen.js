import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text, TabBarIOS, StyleSheet, ScrollView, ListView, StatusBar, Image, RecyclerViewBackedScrollView, TouchableHighlight, TouchableWithoutFeedback} from 'react-native'

// custom
import I18n from 'react-native-i18n'
import { Images, Colors } from '../Themes'
import Styles from './Styles/ContactsScreenStyle'
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactsActions from '../Redux/ContactsRedux'

class ContactsScreen extends React.Component {

  // ------------ init -------------
  static propTypes = {

  }

  constructor (props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      focused: false,
      search: '',
      selectedTab: 'contacts',
      notifCount: 0,
      presses: 0,
      dataSource: ds.cloneWithRows(this.props.roster.names || []),
      ds,
    }
  }
  // ------------ logic  ---------------



  // ------------ lifecycle ------------
  componentDidMount() {
    console.log('componentDidMount')
    this.props.getRoster()
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    this.setState({
      dataSource: this.state.ds.cloneWithRows(nextProps.roster.names)
    })
  }

  // ------------ handlers -------------
  handleSelectSearch () {
    console.log('handleSelectSearch')
    this.refs.search && this.refs.search.focus()
    this.setState({focused: true})
  }

  handleChangeSearch (text) {
    let names = this.props.roster.names || []

    if (this.state.text != text) {
      let namesFilter = names.filter((name) => {
        return name.indexOf(text) !== -1
      })

      this.setState({
        dataSource: this.state.ds.cloneWithRows(namesFilter)
      })
    }

    this.setState({search: text})
  }

  handleFocusSearch () {
    this.setState({focused: true})
  }

  handleBlurSearch () {
    this.refs.search.blur()
    this.setState({focused: false})
  }

  handleCancelSearch () {
    this.refs.search.blur()
    this.setState({
      focused: false,
      search: null,
      dataSource: this.state.ds.cloneWithRows(this.props.roster.names)
    })
  }

  // ------------ renders -------------
  _renderContent (color, pageText, num) {
    const cancel = this.state.focused ?
       (<TouchableHighlight style={Styles.searchCancel}>
         <View>
           <Text onPress={this.handleCancelSearch.bind(this)}>Cancel</Text>
         </View>
      </TouchableHighlight>) : null;


    return (
      <View style={[Styles.container]}>
        {/* 头部 */}
        <View style={Styles.header}>
          {/* 保证搜索按钮的左侧区域点击也会触发input的聚焦事件 */}
          <TouchableWithoutFeedback onPress={this.handleSelectSearch.bind(this)}>
            <View style={Styles.search}>
              <View style={[Styles.searchRow, Styles.searchIcon, this.state.focused ? Styles.searchFocus : {} ]}>
                <Icon name="search" size={13} color='#8798a4'/>
              </View>
              {/* TODO: returnKeyType */}
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
          {/* 取消按钮，当input聚焦的时候出现 */}
          {/* TODO: longPress */}
          {cancel}
          {/* 加号 */}
          <View style={Styles.searchPlus}>
            <Icon size={20} name="plus" color='#8798a4'/>
          </View>
        </View>
        {/* 内容区：listview */}
        <ListView
          automaticallyAdjustContentInsets={false}
          initialListSize={10}
          enableEmptySections={true}
          style={Styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeparator}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        />
      </View>
   )
  }

  _renderRow (rowData, sectionId, rowID) {
    return (
      <TouchableHighlight>
        <View style={Styles.row}>
          <Image source={Images.chatsActive} resizeMode='cover' style={Styles.rowLogo}/>
          <View style={Styles.rowName}>
            <Text>{rowData}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      // backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
      <View
        key={`${sectionID}-${rowID}`}
        style={Styles.separator}
      />
    )
  }

  // ------------ rende -------------
  render () {
    console.log(this.state)

    return (
      <TabBarIOS
        unselectedTintColor='yellow'
        tintColor='white'
        barTintColor={Colors.coolGrey50}
        translucent={false}
      >
        <TabBarIOS.Item
          icon={Images.contacts}
          selectedIcon={Images.contactsActive}
          renderAsOriginal
          selected={this.state.selectedTab == 'contacts'}
          title=''
          onPress={() => {
            this.props.getRoster()
            this.setState({
              selectedTab: 'contacts'
            })
          }}>
          {this._renderContent('#414A8C', 'Blue Tab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={Images.chats}
          selectedIcon={Images.chatsActive}
          renderAsOriginal
          selected={this.state.selectedTab === 'chats'}
          title=''
          onPress={() => {
            this.setState({
              selectedTab: 'chats',
              notifCount: this.state.notifCount + 1
            })
          }}>
          {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          icon={Images.settings}
          selectedIcon={Images.settingsActive}
          renderAsOriginal
          selected={this.state.selectedTab === 'settings'}
          title=''
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
              presses: this.state.presses + 1
            })
          }}>
          {this._renderContent('#21551C', 'Green Tab', this.state.presses)}
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

// ------------ redux -------------
const mapStateToProps = (state) => {
  return {
    roster: state.entities.roster,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRoster: () => dispatch(ContactsActions.getRoster())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsScreen)
