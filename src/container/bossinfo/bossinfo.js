import React from 'react'
import {NavBar,InputItem, TextareaItem, Button, WingBlank} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect (
  state=>state.user,
  { update }
)
class BossInfo extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      title:'',
      company:'',
      money:'',
      desc:''
    }
    this.handleUserInfoUpdate = this.handleUserInfoUpdate.bind(this)
  }
  onChange(key,val) {
    this.setState({
      [key]:val
    })
  }
  handleUserInfoUpdate () {
    console.log(this.props)
    this.props.update(this.state)
  }
  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}/> :null}
        <NavBar mode='dark'>BOSS信息完善页</NavBar>
        <AvatarSelector
          selectAvatar={(imgName)=>{
            this.setState({
              avatar:imgName
            })
          }}
        />
        <InputItem onChange={(v)=>this.onChange('title',v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('company',v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('money',v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={(v)=>this.onChange('desc',v)}
          rows={3}
          autoHeight
          title='职位要求'
        >
        </TextareaItem>
        <WingBlank>
          <Button
            onClick={this.handleUserInfoUpdate}
            type='primary'
          >保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default BossInfo