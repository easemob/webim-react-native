import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import Styles from './Styles/RowStyle'
import {Images, Metrics, Colors} from '../Themes'

const data = {
  onPress: null,
  style: {},
  subs: [
    {
      type: 'image'
    },
    {
      onPress: null, // func / null
      style: {},
      subs: [
        {
          style: {},
          wrapperStyle: {},
          type: 'text',
          text: '123'
        },
        {
          style: {},
          type: 'text',
          text: '456'
        }
      ]
    }
  ]
}
// 复杂对象
// - {{}}
// 多组合
// - 1-2-1
// - m-tt-b  (i:icon m:image t:text b:button s:switch)
// [{, [{}, {}], {}]


export default class Base extends React.Component {

  renderComponent(sub) {
    const {type, style = {}} = sub

    switch (type) {
      case 'text':
        return <Text {...sub}>sub.text</Text>
        break
    }

  }

  renderSubs(subs) {
    const views = []

    subs.forEach((sub) => {
      const {wrapperStyle = {}} = sub

      if (sub.subs) {
        views.push(
          <View style={[Styles.rowDetail, Styles.horizontal, wrapperStyle]}>
            { this.renderSubs(sub.subs) }
          </View>
        )
      } else {
        views.push(
          <View style={[Styles.rowDetail, wrapperStyle]}>
            { this.renderComponent(sub) }
          </View>
        )
      }
    })

    return views
  }

  render() {

    if (!data) return null

    const subs = this.renderSubs(data.subs)

    return (
      <View style={[]}>
        {subs}
      </View>
    )
  }
}
