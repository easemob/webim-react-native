// @flow

import { StyleSheet, PixelRatio } from 'react-native'
import { Colors, Metrics } from '../../Themes'
import { create } from '../../Lib/PlatformStyleSheet'

export default create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    height: 42,
    backgroundColor: Colors.bgGrey,
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.paleGrey,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  leftText: {
    fontSize: 13,
    color: Colors.modelHeaderText
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleText: {
    fontSize: 17,
    marginBottom: 3
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  rightText: {
    fontSize: 13,
    color: Colors.modelHeaderText
  },
})
