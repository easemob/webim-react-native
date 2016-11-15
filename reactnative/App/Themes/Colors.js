// @flow
import { Platform } from 'react-native'

const colorsIos = {
  background: '#1F0808',
  clear: 'rgba(0,0,0,0)',
  facebook: '#3b5998',
  transparent: 'rgba(0,0,0,0)',
  silver: '#F7F7F7',
  steel: '#CCCCCC',
  error: 'rgba(200, 0, 0, 0.8)',
  ricePaper: 'rgba(255,255,255, 0.75)',
  frost: '#D8D8D8',
  cloud: 'rgba(200,200,200, 0.35)',
  windowTint: 'rgba(0, 0, 0, 0.4)',
  panther: '#161616',
  charcoal: '#595959',
  coal: '#2d2d2d',
  bloodOrange: '#fb5f26',
  snow: 'white',
  ember: 'rgba(164, 0, 48, 0.5)',
  fire: '#e73536',
  drawer: 'rgba(30, 30, 29, 0.95)',
  login: 'rgba(15, 28, 54, 1)',
  // 输入框plachholder |
  coolGrey: 'rgba(173, 185, 193, 1)',
  // 输入框激活 |
  almostBlack: 'rgba(12, 18, 24, 1)',
  // sign up 提示
  almostWhite: 'rgba(255, 255, 255, 0.7)',
  // and borderBottom
  centerLine: '#4a4a4a',
  // and 背景
  andBgStart: '#3e5c78',
  andBgEnd: '#243e55',
  andPlachholder: '#adb9c1',
  android: {

  }
}

const colorsAndroid = {
  background: '#1F0808',
  clear: 'rgba(0,0,0,0)',
  facebook: '#3b5998',
  transparent: 'rgba(0,0,0,0)',
  silver: '#F7F7F7',
  steel: '#CCCCCC',
  error: 'rgba(200, 0, 0, 0.8)',
  ricePaper: 'rgba(255,255,255, 0.75)',
  frost: '#D8D8D8',
  cloud: 'rgba(200,200,200, 0.35)',
  windowTint: 'rgba(0, 0, 0, 0.4)',
  panther: '#161616',
  charcoal: '#595959',
  coal: '#2d2d2d',
  bloodOrange: '#fb5f26',
  snow: 'white',
  ember: 'rgba(164, 0, 48, 0.5)',
  fire: '#e73536',
  drawer: 'rgba(30, 30, 29, 0.95)',
  login: '#3e5c78',
  // 输入框plachholder |
  coolGrey: '#adb9c1',
  placeholderTextColor: '#adb9c1',
  selectionColor: '#404f5a',
  // 输入框激活 |
  almostBlack: 'rgba(12, 18, 24, 1)',
  // sign up 提示
  almostWhite: 'rgba(255, 255, 255, 0.7)',
  // and borderBottom
  centerLine: '#4a4a4a',
  // and 背景
  andBgStart: '#3e5c78',
  andBgEnd: '#243e55',
  //
  buttonSignin: '#00ba6e'
}

export default (Platform.os == 'ios' ? colorsIos : colorsAndroid)
