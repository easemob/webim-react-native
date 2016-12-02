'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  Switch,
  Image,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS
} from 'react-native'

// custom
import I18n from 'react-native-i18n'
import Styles from './Styles/ContactInfoScreenStyle'
import {Images, Metrics, Colors} from '../Themes'
import ContactsActions from '../Redux/ContactsRedux'
import WebIMActions from '../Redux/WebIMRedux'
import InfoNavBar from '../Components/InfoNavBar'

//TODO: 返回键定义到页面上，因为导航条的返回滚动时不跟着走

const SHEET_BUTTON = ['Delete', 'Cancel']

class ContactInfoScreen extends Component {
  state = {
    isBlocked: true,
  }


  // ------------ init -------------
  constructor(props) {
    super(props)
  }

  // ------------ logic  ---------------

  // ------------ renders -------------

  handleDelete() {
    //TODO: 不同button如何定义不同的颜色
    ActionSheetIOS.showActionSheetWithOptions({
        options: SHEET_BUTTON,
        cancelButtonIndex: 1,
        tintColor: [Colors.orangeRed]
      },
      (buttonIndex) => {
        // this.setState({clicked: SHEET_BUTTON[buttonIndex]});
        if (SHEET_BUTTON[buttonIndex] == 'Delete') {
          this.props.removeContact(this.props.uid)
        }
      });
  }

  // ------------ render -------------
  render() {
    const {uid} = this.props

    {/*contentOffset={{x: 0, y: -10}}*/
    }
    return (
      <View style={[Styles.container]}>
        <ScrollView
          style={[Styles.scrollView, {width: Metrics.screenWidth, height: Metrics.screenHeight}]}
          ref='ScrollView'
          directionalLockEnabled={true}
          contentContainerStyle={Styles.contentContainerStyle}
          automaticallyAdjustContentInsets={false}
        >
          <View style={Styles.top}>
            <InfoNavBar />
            <Image source={Images.default} resizeMode='cover' style={Styles.photo}/>
            <Text style={Styles.name}>{uid}</Text>
            <View style={Styles.rowIcons}>
              <TouchableOpacity style={[Styles.rowIcon, Styles.chat]}>
                <Image source={Images.buttonChat} resizeMode='center'/>
              </TouchableOpacity>
              <TouchableOpacity style={[Styles.rowIcon, Styles.call]}>
                <Image source={Images.buttonCall} resizeMode='center'/>
              </TouchableOpacity>
              <TouchableOpacity style={[Styles.rowIcon, Styles.video]}>
                <Image source={Images.buttonVideo} resizeMode='center'/>
              </TouchableOpacity>
            </View>
          </View>
          {/* 信息区 */}
          <View style={Styles.rowDetails}>
            <View style={[Styles.rowDetail, Styles.rowBorder]}>
              <View style={[Styles.flex]}>
                <Text style={Styles.textLabel}>{I18n.t('infoName')}</Text>
              </View>
              <View style={[Styles.flex]}>
                <Text style={Styles.text}>{uid}</Text>
              </View>
            </View>
            <View style={[Styles.rowDetail]}>
              <View style={[Styles.flex]}>
                <Text style={Styles.textLabel}>{I18n.t('infoID')}</Text>
              </View>
              <View style={[Styles.flex]}>
                <Text style={Styles.text}>{uid}</Text>
              </View>
            </View>
          </View>
          {/* 操作区*/}
          <View style={[Styles.rowDetails, Styles.operator]}>
            <View style={[Styles.rowDetail, Styles.rowBorder, Styles.horizontal]}>
              <View style={[Styles.flex]}>
                <Text style={Styles.text}>{I18n.t('blockContact')}</Text>
              </View>
              <View style={[Styles.flex, Styles.end]}>
                <Switch onValueChange={(v) => {
                  this.setState({
                    isBlocked: v
                  })
                }} value={this.state.isBlocked}/>
              </View>
            </View>
            <View style={[Styles.rowDetail]}>
              <TouchableOpacity onPress={this.handleDelete.bind(this)} style={[Styles.flex]}>
                <Text style={[Styles.text, Styles.deleteText]}>{I18n.t('deleteContact')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View >
    )
  }
}


ContactInfoScreen.propTypes = {
  // 当前查看的用户id
  uid: PropTypes.string,
  // 联系人列表
  roster: PropTypes.shape({
    names: PropTypes.array
  })
}

// ------------ redux -------------
const mapStateToProps = (state) => {
  return {
    show: state.ui.contactInfo.show,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeContact: (id) => dispatch(WebIMActions.removeContact(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfoScreen)
