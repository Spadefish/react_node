import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, WingBlank, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout = () => {
    const alert = Modal.alert
    alert('注销', '确认退出登录吗???', [
      {text: '取消', onPress: () => null},
      {
        text: '确认', onPress: () => {
          browserCookie.erase('userId')
          // window.location.reload()
          this.props.logoutSubmit()
        }
      }
    ])
  }

  render () {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt="用户头像"/>}
          title={props.title}
          message={props.type === 'Boss' ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item
            multipLine='true'
          >
            {props.title}
            {props.desc.split('\n').map(v => (
              <Brief key={v}>{v}</Brief>
            ))}
            {props.money ? <Brief>薪资：{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Item onClick={this.logout} type='ghost' style={{zIndex: 10}}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo}/>
  }
}

export default User