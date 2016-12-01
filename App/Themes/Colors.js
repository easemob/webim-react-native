// @flow
import {Platform} from 'react-native'

// 不能使用rgb，必须rgba
const colors = {
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
  login: 'rgba(61, 92, 120, 1)',
  // 输入框plachholder |
  coolGrey: '#adb9c1',
  coolGrey50: 'rgba(173, 185, 193, 0.5)',
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
  buttonSignin: '#00ba6e',
  // ModelHeader
  modelHeaderText: 'rgba(0, 186, 110, 1)',
  // button
  button: '#adb9c1',
  //
  frogGreen: 'rgba(82, 210, 0, 1)',
  //
  iconColor: '#8798a4',
  //
  blueGrey: 'rgba(135, 152, 164, 1)',
  //
  denim: 'rgba(64, 94, 122, 1)',
  // btn green
  buttonGreen: '#08ba6e',
  buttonGrey: '#8798a4',
  steelGrey: 'rgba(112, 126, 137, 1)',
  paleGrey: 'rgba(228, 233, 236, 1)',
  white1: 'rgba(250, 251, 252, 1)'
}
const colorsIos = {}

const colorsAndroid = {}

export default Object.assign(colors, (Platform.OS == 'ios' ? colorsIos : colorsAndroid))
