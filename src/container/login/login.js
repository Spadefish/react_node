import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Button, WingBlank, WhiteSpace } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect (
  state=>state.user,
  {login}
)
@imoocForm
class Login extends React.Component {
  constructor (props) {
    super (props)
    // this.state = {
    //   user:'',
    //   pwd:''
    // }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  // handleChange(key,val){
  //   this.setState({
  //     [key]:val
  //   })
  // }

  register () {
    console.log(this.props)
    this.props.history.push('/register')
  }
  handleLogin() {
    // this.props.login 这个是redux给的
    console.log(this.props)
    this.props.login(this.props.state)
  }
  render () {
    return (
      <div>
        { this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null }
        <Logo/>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem
              onChange={(val)=>{this.props.handleChange('user',val)}}
            >用户名</InputItem>
            <InputItem
              onChange={(val)=>{this.props.handleChange('pwd',val)}}
            >密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button
            type='primary'
            onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button
            onClick={this.register}
            type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login