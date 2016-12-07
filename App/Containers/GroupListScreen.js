import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'

// custom
import {Images} from '../Themes'
import Styles from './Styles/GroupListScreenStyle'
import BaseListView from '../Components/BaseListView'
import GroupActions from '../Redux/GroupRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'


class GroupListScreen extends Component {

  // ------------ init -------------

  constructor(props) {
    super(props)
  }

  // ------------ logic  ---------------

  // ------------ handlers -------------
  handleRefresh() {
    this.props.getGroups()
  }

  // ------------ renders -------------

  _renderRow(rowData, sectionId, rowID, highlightRow) {
    return (
      <TouchableOpacity onPress={() => {
        let data = this.props.group.byName[rowData]
        console.log(this.props.group, rowData)
        NavigationActions.groupMembers({
          group: data
        })
      }}>
        <View style={Styles.row}>
          <Image source={Images.groupDefault} resizeMode='cover' style={Styles.rowLogo}/>
          <View style={Styles.rowName}>
            <Text style={Styles.groupName}>{rowData}</Text>
            {/* 群组成员数量，由于默认群组信息没有成员信息，所以此处暂不显示 */}
            {/*<Text style={Styles.groupIntro}>{rowData}</Text>*/}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={Styles.separator}
      />
    )
  }

  render() {
    const {group} = this.props
    const names = {
      group: group.names
    }

    return (
      <BaseListView
        hasNav={true}
        data={names}
        handleRefresh={this.handleRefresh.bind(this)}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}
      />
    )
  }
}


GroupListScreen.propTypes = {
  group: PropTypes.object,
}

// ------------ redux -------------
const mapStateToProps = (state) => {
  return {
    group: state.entities.group,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => dispatch(GroupActions.getGroups())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupListScreen)

