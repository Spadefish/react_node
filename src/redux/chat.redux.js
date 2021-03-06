import axios from 'axios'
import io from 'socket.io-client'

// ws 就是webocket 协议的简写
const socket = io('ws://localhost:9093')

// 获取聊天信息
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatMsg: [],
  users:{},
  unRead: 0
}

// reducer 函数
export function chat (state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state,users:action.payload.users, chatMsg: action.payload.msgs, unRead: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userId).length}
    case MSG_RECV:
      const num = action.payload.to === action.userId? 1:0
      console.log(action.payload)
      return {...state, chatMsg: [...state.chatMsg, action.payload], unRead: state.unRead + num}
    // case MSG_READ:

    default:
      return state
  }
}

function msgList (msgs,users,userId) {
  return {type: MSG_LIST, payload: {msgs,users,userId}}
}

export function getMsgList () {
  return (dispatch,getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        console.log('getstate',getState())
        if (res.status === 200 && res.data.code === 0) {
          const userId = getState().user._id
          dispatch(msgList(res.data.msgs,res.data.users, userId))
        }
      })
  }
}

export function sendMsg ({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg})
  }
}

function msgRecv (msg,userId) {
  return {userId,type: MSG_RECV, payload: msg}
}

export function recvMsg () {
  return (dispatch,getState) => {
    socket.on('receiveMsg', function (data) {
      const userId = getState().user._id
      console.log('receiveMsg', data)
      dispatch(msgRecv(data,userId))
    })
  }
}

