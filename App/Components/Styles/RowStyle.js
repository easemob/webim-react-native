// @flow

import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '../../Themes'
import {create} from '../../Lib/PlatformStyleSheet'

export default create({
  container: {
    flex: 1,
    // paddingTop: 33,
    backgroundColor: Colors.paleGrey,
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column'
  },
  scrollViewContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  top: {
    overflow: 'visible',
    paddingTop: 33,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white1,
    paddingBottom: 25,
    ios: {
      shadowOffset: {
        width: 0,
        height: 0.1,
      },
      shadowColor: Colors.coolGrey50,
      shadowOpacity: 0.5,
      shadowRadius: 0.1,
    },
    android: {
      elevation: 0.5
    }
  },
  photo: {
    height: 60,
    width: 60,
    borderRadius: 30,
    // flex: 1,
  },
  name: {
    width: 122,
    marginTop: 15,
    fontSize: Metrics.tiny2,
    color: Colors.almostBlack,
    textAlign: 'center'
  },
  rowIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    width: 223,
    marginTop: 23
  },
  rowIcon: {
    height: 56
  },
  rowDetails: {
    marginTop: 0.5,
    paddingLeft: 15,
    backgroundColor: Colors.snow
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'column',
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.paleGrey,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textLabel: {
    // height: 14,
    fontSize: 13,
    color: Colors.steelGrey,
  },
  text: {
    // height: 14,
    fontSize: 13,
  },
  deleteText: {
    color: 'red'
  },
  operator: {
    marginTop: 15
  },
  horizontal: {
    flexDirection: 'row'
  },
  end: {
    paddingRight: 15,
    alignItems: 'flex-end'
  }
})
