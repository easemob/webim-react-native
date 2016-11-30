import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, Text, TouchableHighlight, View, Dimensions } from 'react-native';

// custom
import I18n from 'react-native-i18n'
import { Images, Colors } from '../Themes'
import Styles from './Styles/AddContactModalStyle'
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactsActions from '../Redux/ContactsRedux'

import ModalHeader from './ModalHeader'
import Button from './Button'
import Input from './Input'

export default class AddContactModal extends Component {

  state = {
    id: ''
  }

  // ------------ init -------------


  // ------------ lifecycle ------------


  // ------------ handlers -------------

  // ------------ renders -------------
  render() {
    let { modalVisible, toggle, addContact } = this.props

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
               value={this.state.id}
               onChangeText={(v) => {
                 this.setState({ id: v })
               }}
               placeholder={I18n.t('enterHyphenateID')}
             />
             <Button
               color={Colors.snow}
               text={I18n.t('add')}
               styles={Styles.button}
               onPress={() => {
                 addContact(this.state.id)
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
