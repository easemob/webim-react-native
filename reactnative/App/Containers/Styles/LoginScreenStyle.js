// @flow

import { StyleSheet, PixelRatio } from 'react-native'
import { Colors, Metrics } from '../../Themes'
import { create } from '../../Lib/PlatformStyleSheet'

console.log(PixelRatio.get())

export default create({
  container: {
    flex: 1,
    backgroundColor: Colors.login,
    ios: {
      paddingTop: 100,
    },
    android: {
      paddingTop: 57.5,
    }
  },
  form: {
    alignItems: 'center',
    ios: {
      marginTop: 53,
      marginHorizontal: 20,
    },
    android: {
      marginTop: 31.5,
      marginBottom: 32,
      borderRadius: 2,
      // and only
      elevation: 3,
      marginHorizontal: 25.5,
    }
  },
  borderBottom: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: Colors.centerLine
  },
  row: {
    alignSelf: 'stretch',
    backgroundColor: Colors.snow,
    ios: {
      borderRadius: 2,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#adb9c1',
      paddingHorizontal: Metrics.doubleBaseMargin,
    },
    android: {

    }
  },
  // 提示行
  tips: {
    color: Colors.almostWhite,
    textAlign: 'center'
  },
  tipRow: {
    alignItems: 'center',
  },
  tipsButtonWrapper: {
    // alignSelf: 'stretch',
    marginLeft: 6
  },
  rowLabel: {
    color: Colors.charcoal
  },
  // 输入框
  textInput: {
    height: 50,
    color: Colors.almostBlack,
    android: {
    }
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
    backgroundColor: Colors.snow
  },
  // sign in 按钮
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  buttonLoginRow: {
    // paddingTop: 32,
    // zIndex: -1,
    // height: 30
  },
  loginButtonWrapper: {
    // flex: 1,
    // alignSelf: 'stretch',
    
  },
  loginButton: {
    backgroundColor: Colors.buttonSignin,
    padding: 10,
    android: {
      // and only
      elevation: 3,
    }
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  signUpText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#fff',
  },
  // 顶部logo
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
