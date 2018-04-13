import axios from 'axios'
import { getRedirectPath } from '../util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '', // 登录成功后的跳转
  msg: '', // 错误提示
  user: '',
  type: '' // 身份 boss or genius
}

// reducer(dispatch a action 来修改组件的状态)
export function user (state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload, pwd:''}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, msg: action.msg}
    case LOGOUT:
      return {...initState,redirectTo:'/login'}
    default:
      return state
  }
}

// function registerSuccess (data) {
//   return {type: REGISTER_SUCCESS, payload: data}
// }
//
// function loginSuccess (data) {
//   return {type: LOGIN_SUCCESS, payload: data}
// }
function authSuccess (data) {
  return {type: AUTH_SUCCESS, payload: data}
}

function errorMsg (msg) {
  return {msg, type: ERROR_MSG}
}

export function loadData (userinfo) {
  return {type: LOAD_DATA, payload: userinfo}
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名或密码不能为空')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
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
          dispatch(authSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function update (data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}


export function logoutSubmit () {
  return {type:LOGOUT}
}