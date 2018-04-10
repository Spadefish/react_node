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
class GeniusInfo extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      title:'',
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
        <NavBar mode='dark'>牛人信息完善页</NavBar>
        <AvatarSelector
          selectAvatar={(imgName)=>{
            this.setState({
              avatar:imgName
            })
          }}
        />
        <InputItem onChange={(v)=>this.onChange('title',v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={(v)=>this.onChange('desc',v)}
          rows={3}
          autoHeight
          title='个人见解'
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

export default GeniusInfo