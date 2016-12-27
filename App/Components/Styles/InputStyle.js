// @flow

import {StyleSheet} from 'react-native'
import {Fonts, Colors} from '../../Themes/'

export default StyleSheet.create({
  search: {
    borderRadius: 3,
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.coolGrey,
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
  searchFocus: {
    borderColor: Colors.frogGreen
  },
  iconSize: 13,
  searchRow: {
    // color: Colors.blueyGrey,
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.paleGrey,
    flexDirection: 'column',
    // borderWidth: 1
  },
  searchInput: {
    // height: 30,
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 13,
    paddingLeft: 4,
    paddingVertical: 5
  },
  searchIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  searchIconFocus: {
    flex: 0,
    width: 20,
    alignItems: 'center'
  },
  searchCancel: {
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // placeholderTextColor: Colors.blueGrey,
})
