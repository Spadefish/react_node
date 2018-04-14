
// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import {chatUser} from './redux/chatUser.redux'
import {chat} from './redux/chat.redux'

export default combineReducers({user, chatUser,chat})

