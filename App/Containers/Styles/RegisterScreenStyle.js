// @flow

import {StyleSheet, PixelRatio} from 'react-native'
import {Colors, Metrics} from '../../Themes'
import {create} from '../../Lib/PlatformStyleSheet'

export default create({
  container: {
    flex: 1,
    backgroundColor: Colors.login,
    ios: {
      paddingTop: 100
    },
    android: {
      paddingTop: 57.5
    }
  },
  form: {
    alignItems: 'center',
    ios: {
      marginTop: 53,
      marginHorizontal: 20
    },
    android: {
      marginTop: 31.5,
      marginBottom: 32,
      borderRadius: 2,
      // and only
      // elevation: 3,
      marginHorizontal: 25.5
    }
  },
  borderRadius: {
    android: {
      elevation: 3,
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
      paddingHorizontal: Metrics.doubleBaseMargin
    },
    android: {
      paddingHorizontal: Metrics.doubleBaseMargin
    }
  },
  // 提示行
  tips: {
    color: Colors.almostWhite,
    textAlign: 'center'
  },
  tipRow: {
    alignItems: 'center'
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
    android: {}
  },
  textInputReadonly: {
    // height: 40,
    color: Colors.steel,
    backgroundColor: Colors.snow
  },
  // sign in 按钮
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    ios: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      paddingTop: 17,
      paddingBottom: 16,
      backgroundColor: Colors.buttonSignin,
    },
    android: {
      flex: 1,
      marginTop: 32,
      marginBottom: 18,
      elevation: 3,
      paddingTop: 10,
      paddingBottom: 9.5,
      backgroundColor: Colors.buttonSignin,
      alignSelf: 'stretch',
    },
    // height: 50
  },
  loginButton: {
    backgroundColor: Colors.buttonSignin,
    ios: {
      paddingTop: 17,
      paddingBottom: 16
    },
    android: {
      // and only
      elevation: 3,
      paddingTop: 10,
      paddingBottom: 9.5
    }
  },
  loginText: {
    ios: {
      fontSize: 17
    },
    android: {
      fontSize: 16.5
    },
    textAlign: 'center',
    color: Colors.silver
  },
  signUpText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#fff'
  },
  // 顶部logo
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
