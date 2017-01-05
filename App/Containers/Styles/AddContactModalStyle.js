// @flow

import {StyleSheet, PixelRatio} from 'react-native'
import {Colors, Metrics} from '../../Themes'
import {create} from '../../Lib/PlatformStyleSheet'

export default create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  body: {
    // flex: 1,
    height: 200,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 33
  },
  button: {
    marginTop: 39,
    // flex: 0,
  }
})
