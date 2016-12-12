import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import WebIM from '../Lib/WebIM'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addMessage: ['message', 'status'],
  updateMessageStatus: ['message', 'status'],
  // ---------------async------------------
  sendMessage: (type, id, message) => {
    return (dispatch, getState) => {
      console.log(type, id)
      const uniqueId = WebIM.conn.getUniqueId();
      const msg = new WebIM.message('txt', uniqueId);
      msg.set({
        msg: message,
        to: id,
        //TODO: cate type == 'chatrooms'
        roomType: false,
        success: function () {
          msg.body.type = 'chat'
          dispatch(Creators.updateMessageStatus(msg.body, 'sent'))
        },
        fail: function () {
          msg.body.type = 'chat'
          dispatch(Creators.updateMessageStatus(msg.body, 'failed'))
        }
      });
      console.log(msg, msg.body)

      if (type !== 'chat') {
        msg.setGroup('groupchat');
      }
      msg.body.chatType = 'singleChat'
      WebIM.conn.send(msg.body);

      dispatch(Creators.addMessage({
        ...msg.body,
        type: 'chat',
        data: msg.body.msg
      }, 'sending'))
    }
  },
})

export const MessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  byId: {},
  chat: {},
  groupChat: {},
  extra: {}
})

/* ------------- Reducers ------------- */
/**
 * 添加信息
 * @param state
 * @param message object `{data,error,errorCode,errorText,ext:{weichat:{originType:webim}},from,id,to,type}`
 * @param status enum [sending, sent ,fail]
 * @returns {*}
 */
export const addMessage = (state, {message, status = 'sent'}) => {
  const {username = ''} = state.user || {}
  const {type = 'extra', id, to} = message
  // 消息来源：没有from默认即为当前用户发送
  const from = message.from || username
  // 当前用户：标识为自己发送
  const bySelf = from == username
  // 房间id：自己发送或者不是单聊的时候，是接收人的ID， 否则是发送人的ID
  const chatId = bySelf || type !== 'chat' ? to : from
  state = state.setIn(['byId', id], {
    ...message,
    bySelf,
    time: +new Date(),
    status: status,
  })
  const chatData = state[type] && state[type][chatId] ? state[type][chatId].asMutable() : []
  chatData.push(id)
  state = state.merge({
    [type]: {
      [chatId]: chatData
    }
  })
  return state
}

/**
 * updateMessageStatus 更新消息状态
 * @param state
 * @param message object
 * @param status enum [sending, sent ,fail]
 * @returns {*}
 */
export const updateMessageStatus = (state, {message, status = ''}) => {
  const {id} = message

  return state.setIn(['byId', id, 'status'], status)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_MESSAGE]: addMessage,
  [Types.UPDATE_MESSAGE_STATUS]: updateMessageStatus,
})

/* ------------- Selectors ------------- */
