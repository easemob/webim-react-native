// @flow

import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts} from '../../Themes'
import {create} from '../../Lib/PlatformStyleSheet'

export default create({
  // ListView
  listView: {
    // flex: 1,
    backgroundColor: Colors.paleGrey
  },
  row: {
    paddingLeft: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.snow
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    backgroundColor: '#CCCCCC',
  },
  rowLogo: {
    width: 30,
    height: 30,
    borderRadius: 15
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
