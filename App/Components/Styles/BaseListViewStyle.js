// @flow

import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '../../Themes'
import {create} from '../../Lib/PlatformStyleSheet'

export default create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    // marginTop: Metrics.navBarHeight,
  },
  // 头
  // header: {
  //   // flex: 1,
  //   height: 44,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   flexDirection: 'row',
  //   backgroundColor: Colors.bgGrey,
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   borderBottomColor: Colors.paleGrey
  // },
  // search: {
  //   flex: 1,
  //   borderRadius: 3,
  //   flexDirection: 'row',
  // },
  // searchRow: {
  //   // color: Colors.blueyGrey,
  //   flex: 1,
  //   width: 100,
  //   height: 30,
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  //   backgroundColor: Colors.paleGrey,
  // },
  // searchInput: {
  //   height: 30,
  //   fontSize: 13,
  //   paddingLeft: 4
  // },
  // searchIcon: {
  //   alignItems: 'flex-end',
  //   justifyContent: 'center',
  // },
  // searchFocus: {
  //   flex: 0,
  //   width: 20,
  //   alignItems: 'center'
  // },
  // searchCancel: {
  //   width: 50,
  //   height: 30,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // placeholderTextColor: Colors.blueyGrey,
  // // selectionColor: '#fff',
  // searchPlus: {
  //   width: 30,
  //   height: 30,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // ListView
  listView: {
    flex: 1,
  },
  row: {
    marginHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
    backgroundColor: '#CCCCCC',
  },
  rowLogo: {
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  rowName: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5
  },
  groupHeader: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.steel
  },
  groupHeaderTextWrapper: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
  groupHeaderText: {
    fontSize: 15,
  },
  groupHeaderIcon: {
    flex: 1,
    paddingRight: 16,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  noticeHeaderWrapper: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.denim
  },
  noticeHeaderText: {
    color: Colors.snow,
    textAlign: 'left',
  },
  noticeHeaderLeft: {
    width: 45,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  noticeHeaderRight: {
    flex: 1,
    justifyContent: 'center',
  },
  noticeHeaderMiddle: {
    flex: 1,
    justifyContent: 'center',
  },
  noticeHeaderTextRight: {
    textAlign: 'right',
    paddingRight: 15
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  accept: {
    height: 40,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: Colors.buttonGreen,
    marginRight: 5,
  },
  decline: {
    height: 40,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: Colors.buttonGrey,
  },
})
