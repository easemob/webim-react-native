// @flow

import { StyleSheet, PixelRatio } from 'react-native'
import { Colors, Metrics } from '../../Themes'
import { create } from '../../Lib/PlatformStyleSheet'

export default create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 18,
  },
  // 头
  header: {
    // flex: 1,
    height: 44,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: Colors.bgGrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.paleGrey
  },
  search: {
    flex: 1,
    borderRadius: 3,
    flexDirection: 'row',
  },
  searchRow: {
    // color: Colors.blueyGrey,
    flex: 1,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.paleGrey,
  },
  searchInput: {
    height: 30,
    fontSize: 13,
    paddingLeft: 4
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
  searchCancel: {
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTextColor: Colors.blueyGrey,
  // selectionColor: '#fff',
  searchPlus: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ListView
  listView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  rowLogo: {
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  rowName: {
    flex:1,
    justifyContent: 'center',
    marginLeft: 5
  }
})
