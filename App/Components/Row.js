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

export default class Row extends React.Component {

  static key = 1

  renderComponent(sub) {
    const {type, style = {}} = sub

    switch (type) {
      case 'text':
        return <Text {...sub}>{sub.text}</Text>
        break
      case 'image':
        return <Image resizeMode="cover" {...sub} />
        break
    }
  }

  renderSubs(subs, isWrapper = true) {
    const views = []
    subs.forEach((sub) => {
      const {wrapperStyle = {}, onPress} = sub
      const Wrapper = onPress ? TouchableOpacity : View
      const rowStyle = isWrapper ? Styles.rowDetail : Styles.flex
      Row.key++
      // console.log(sub, isWrapper)
      if (sub.subs) {
        views.push(
          <Wrapper key={Row.key} style={[Styles.rowDetail, wrapperStyle]}>
            { this.renderSubs(sub.subs, false) }
          </Wrapper>
        )
      } else {
        views.push(
          <Wrapper key={Row.key} style={[rowStyle, wrapperStyle]}>
            { this.renderComponent(sub) }
          </Wrapper>
        )
      }
    })

    return views
  }

  render() {
    const {
      onPress = () => {
      },
      wrapperStyle = {},
      subs = null,
    } = this.props.data || {}

    if (!subs) return null

    const subView = this.renderSubs(subs)

    return (
      <View onPress={onPress} style={[wrapperStyle, Styles.horizontal]}>
        {subView}
      </View>
    )
  }
}
