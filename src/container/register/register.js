import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, Button, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  {register}
)
@imoocForm
class Register extends React.Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   user:'',
    //   pwd:'',
    //   repeatPwd:'',
    //   type:'genius'
    // }
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount () {
    // this.props.setState({
    //   type:'genius'
    // })
    this.props.handleChange('type', 'genius')

  }

  handleRegister () {
    this.props.register(this.props.state)
  }

  // handleChange(key,val){
  //   this.setState({
  //     [key]:val
  //   })
  //   // console.log(val)
  // }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <List>
          {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem
            onChange={(val) => {this.props.handleChange('user', val)}}
          >用户名</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={(val) => {this.props.handleChange('pwd', val)}}
          >密码</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={(val) => {this.props.handleChange('repeatPwd', val)}}
          >确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem
            checked={this.props.state.type === 'genius'}
            onChange={() => {this.props.handleChange('type', 'genius')}}
          >牛人</RadioItem>
          <WhiteSpace/>
          <RadioItem
            checked={this.props.state.type === 'Boss'}
            onChange={() => {this.props.handleChange('type', 'Boss')}}
          >Boss</RadioItem>
        </List>
        <WingBlank>
          <WhiteSpace/>
          <Button
            onClick={this.handleRegister}
            type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register