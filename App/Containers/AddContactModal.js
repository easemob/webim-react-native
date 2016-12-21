import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Modal, Alert, TouchableHighlight, View, Dimensions} from 'react-native';

// custom
import I18n from 'react-native-i18n'
import {Colors} from '../Themes'
import Styles from './Styles/AddContactModalStyle'
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactsActions from '../Redux/ContactsScreenRedux'

import ModalHeader from '../Components/ModalHeader'
import Button from '../Components/Button'
import Input from '../Components/Input'

//TODO: 连接错误登出时，需要关闭所有的modal框 - mixin 也许可以全局设置
//TODO: 用router的scene代替此页面
export default class AddContactModal extends Component {

  state = {
    id: ''
  }

  // ------------ init -------------


  // ------------ lifecycle ------------


  // ------------ handlers -------------

  // ------------ renders -------------
  render() {
    let {modalVisible, toggle, addContact} = this.props

    return modalVisible ? (
        <View>
          {/* onRequestClose: android */}
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={modalVisible}
          >
            <View style={Styles.container}>
              <ModalHeader
                title={I18n.t('addContact')}
                rightBtn={I18n.t('cancel')}
                rightClick={toggle}
              />
              <View style={Styles.body}>
                <Input
                  ref="addInput"
                  iconName="search"
                  iconSize={13}
                  iconColor={Colors.iconColor}
                  backgroundColor={Colors.snow}
                  value={this.state.id}
                  onChangeText={(v) => {
                    this.setState({id: v})
                  }}
                  placeholder={I18n.t('enterHyphenateID')}
                />
                <Button
                  color={Colors.snow}
                  text={I18n.t('add')}
                  styles={Styles.button}
                  onPress={() => {
                    if (!this.state.id) {
                      return
                    }
                    addContact(this.state.id)
                    Alert.alert(I18n.t('requestHasSent'))
                    this.setState({
                      id: ''
                    })
                  }}
                />
              </View>
            </View>
          </Modal>

          {/* <TouchableHighlight onPress={this.props.toggle}>
           <Text>Show Modal</Text>
           </TouchableHighlight>
           */}
        </View>
      ) : null
  }
}
