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
  unRead: 0
}

// reducer 函数
export function chat (state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatMsg: action.payload, unRead: action.payload.filter(v => !v.read).length}
    case MSG_RECV:
      return {...state, chatMsg: [...state.chatMsg, action.payload], unRead: state.unRead + 1}
    // case MSG_READ:

    default:
      return state
  }
}

function msgList (msgs) {
  return {type: MSG_LIST, payload: msgs}
}

export function getMsgList () {
  return dispatch => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.msgs))
        }
      })
  }
}

export function sendMsg ({from, to, msg}) {
  return dispatch => {
    socket.emit('sendMsg', {from, to, msg})
  }
}

function msgRecv (msg) {
  return {type: MSG_RECV, payload: msg}
}

export function recvMsg () {
  return dispatch => {
    socket.on('receiveMsg', function (data) {
      console.log('receiveMsg', data)
      dispatch(msgRecv(data))
    })
  }
}

