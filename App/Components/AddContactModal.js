import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, Text, TouchableHighlight, View, Dimensions } from 'react-native';

// custom
import I18n from 'react-native-i18n'
import { Images, Colors } from '../Themes'
import Styles from './Styles/AddContactModalStyle'
import Icon from 'react-native-vector-icons/FontAwesome';
// import ContactsActions from '../Redux/ContactsRedux'

import ModalHeader from './ModalHeader'
import Button from './Button'
import Input from './Input'

export default class AddContactModal extends Component {

  state = {
    id: ''
  }

  // ------------ init -------------
  constructor(props) {
    super(props)
  }

  // ------------ lifecycle ------------


  // ------------ handlers -------------
  handleAdd () {

  }

  // ------------ renders -------------
  render() {
    let { modalVisible, toggle } = this.props

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
               defaultValue={this.state.id}
               onChangeText={(v) => {
                 this.setState({
                   id: v
                 })
                 console.log(v)
               }}
               placeholder={I18n.t('enterHyphenateID')}
             />
             <Button
               text={I18n.t('add')}
               styles={Styles.button}
               onPress={this.handleAdd}
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
