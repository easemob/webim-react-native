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
import Styles from './Styles/GroupMembersScreenStyle'
import BaseListView from '../Components/BaseListView'
import GroupMemberActions from '../Redux/GroupMemberRedux'


class GroupMembersScreen extends Component {

  // ------------ init -------------

  constructor(props) {
    super(props)
  }

  // ------------ logic  ---------------

  // ------------ lifecycle  -----------
  componentDidMount() {
    const {getGroupMember, group} = this.props
    getGroupMember(group.roomId)
  }

  // ------------ handlers -------------
  handleRefresh() {
    // this.props.getGroupMember()
  }

  // ------------ renders -------------

  _renderRow(rowData, sectionId, rowID, highlightRow) {
    return (
      <TouchableOpacity onPress={() => {
        {/*NavigationActions.contactInfo({"uid": rowData})*/
        }
      }}>
        <View style={Styles.row}>
          <Image source={Images.default} resizeMode='cover' style={Styles.rowLogo}/>
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
    const {groupMember, group} = this.props
    const names = {
      members: (groupMember[group.roomId] && groupMember[group.roomId].names) || []
    }

    return (
      <BaseListView
        listViewStyle={Styles.listView}
        hasNav={true}
        data={names}
        handleRefresh={this.handleRefresh.bind(this)}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}
      />
    )
  }
}


GroupMembersScreen.propTypes = {
  group: PropTypes.object,
}

// ------------ redux -------------
const mapStateToProps = (state) => {
  return {
    groupMember: state.entities.groupMember
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupMember: (id) => dispatch(GroupMemberActions.getGroupMember(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembersScreen)

