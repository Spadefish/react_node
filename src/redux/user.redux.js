import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '', // 登录成功后的跳转
  isAuth: '', // 是否登录
  msg: '', // 错误提示
  user: '',
  type: '' // 身份 boss or genius
}

// reducer
export function user (state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOGIN_SUCCESS:
      return {...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

function registerSuccess (data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

function loginSuccess (data) {
  return {type: LOGIN_SUCCESS, payload: data}
}

function errorMsg (msg) {
  return {msg, type: ERROR_MSG}
}

export function loadData (userinfo) {
  return { type:LOAD_DATA, payload:userinfo }
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名或密码不能为空')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(loginSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function register ({user, pwd, repeatPwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名或密码不能为空')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('密码和确认密码不一致')
  }
  // 通过dispatch 发送异步请求
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(registerSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
