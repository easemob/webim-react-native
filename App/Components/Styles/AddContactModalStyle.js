// @flow

import { StyleSheet, PixelRatio } from 'react-native'
import { Colors, Metrics } from '../../Themes'
import { create } from '../../Lib/PlatformStyleSheet'

export default create({
  container: {
    flex: 1,
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 33
  },
  button: {
    marginTop: 39
  }
})
