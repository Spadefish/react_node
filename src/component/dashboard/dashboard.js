import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../msg/msg'
import {getMsgList,recvMsg} from '../../redux/chat.redux'

@connect(
  state => state,
  {getMsgList, recvMsg}
)
class DashBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    // 解决一次发送多条聊天信息的bug
    if(!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render () {
    const {pathname} = this.props.location
    const user = this.props.user
    console.log('user======', user)
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}/>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}/>
      </div>
    )
  }
}

export default DashBoard