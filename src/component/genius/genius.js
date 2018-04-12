import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatUser.redux'
import UserCard from '../usercard/usercard'

@connect (
  state=> state.chatUser,
  {getUserList}
)
class Genius extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.props.getUserList('Boss')
  }

  render () {
    return <UserCard userList = {this.props.userList}/>
  }
}

export default Genius