// @flow

import {StyleSheet, PixelRatio} from 'react-native'
import {Colors, Metrics, Fonts} from '../../Themes'
import {create} from '../../Lib/PlatformStyleSheet'

export default create({
  container: {
    flexDirection: 'column',
  },
  search: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    // width: 50,
    // height: 30
    marginTop: 5,
    flexDirection: 'column',
    paddingTop: 10,
    backgroundColor: Colors.white1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.coolGrey50
  },
  inputRow: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 2,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.coolGrey50
  },
  iconTouch: {
    padding: 8,
  },
  searchRow: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
  searchInput: {
    borderRadius: 3,
    height: 34,
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.coolGrey190
  },
  searchIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  searchFocus: {
    flex: 0,
    width: 20,
    alignItems: 'center'
  },
  searchExtra: {
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPlus: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    ...Fonts.rowText,
    color: Colors.textRed,
    textAlign: 'center'
  },
  // message left
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 15,
  },
  rowLogo: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 5,
    // marginTop: 12
  },
  rowImage: {
    flex: 1,
    // height: 100,
    // alignSelf: 'flex-start',
    minHeight: 50,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  rowLogoRight: {
    marginLeft: 5
  },
  rowMessage: {},
  nameText: {
    ...Fonts.normal,
    fontSize: 11,
    color: Colors.denim,
    marginLeft: 12,
    marginBottom: 7
  },
  message: {
    maxWidth: 250,
    borderRadius: 10,
    backgroundColor: Colors.paleGreyTwo,
    padding: 11
  },
  messageImage: {
    width: 250,
    backgroundColor: Colors.transparent,
    padding: 0
  },
  messageRight: {
    backgroundColor: Colors.messageSelf
  },
  messageText: {
    color: Colors.almostBlack,
    paddingBottom: 2,
    // textAlignVertical: 'center'
  },
  messageTextRight: {
    color: Colors.snow
  },
  timeText: {
    ...Fonts.normal,
    fontSize: 11,
    color: Colors.steelGrey,
    marginTop: 7,
    marginLeft: 12,
  },
  directionEnd: {
    flexDirection: 'row-reverse'
  },
  textRight: {
    textAlign: 'right',
    marginRight: 12
  },
  emojiRow: {
    backgroundColor: Colors.emojiBackground,
  },
  wrapper: {
    backgroundColor: Colors.emojiBackground,
  },
  slide: {
    height: 120,
    paddingTop: 5,
    paddingHorizontal: 11,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  slideRow: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
  },
  sendRow: {
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  emoji: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    paddingLeft: 4,
    paddingBottom: 1,
    // height: 30
    color: '#fff'
  },
  send: {
    marginRight: 12,
    paddingVertical: 8,
    width: 50,
  }
})
