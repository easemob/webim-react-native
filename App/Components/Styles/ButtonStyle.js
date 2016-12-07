// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  button: {
    marginVertical: 5,
    borderRadius: 3,
    backgroundColor: Colors.button,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 40,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  }
})
