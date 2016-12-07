// @flow

import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts} from '../../Themes'
import {create} from '../../Lib/PlatformStyleSheet'

export default create({
  // ListView
  listView: {
    flex: 1,
  },
  row: {
    marginLeft: 15,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    backgroundColor: '#CCCCCC',
  },
  rowLogo: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  rowName: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10
  },
  groupName: {
    ...Fonts.style.rowText,
    color: Colors.almostBlack,
  },
  groupIntro: {
    ...Fonts.style.rowText,
    marginTop: 10,
    color: Colors.steelGrey,
  }

})
