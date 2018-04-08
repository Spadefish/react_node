import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Button, WingBlank, WhiteSpace } from 'antd-mobile'
class Register extends React.Component {
  constructor (props) {
    super (props)
    this.register = this.register.bind(this)
  }
  register () {
    this.props.history.push('/register')
  }
  render () {
    return (
      <div>
        <Logo/>
        <WingBlank>
          <Button type='primary'>登录</Button>
          <WhiteSpace/>
          <Button
            onClick={this.register}
            type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register