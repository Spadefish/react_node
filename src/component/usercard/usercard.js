import React from 'react'
import PropType from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import {withRouter} from 'react-router-dom'


@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userList: PropType.array.isRequired
  }
  handleClick(v){
    this.props.history.push(`/chat/${v.user}`)
  }
  render () {
    const Header = Card.Header
    const Body = Card.Body
    // console.log(this.props)
    return (
      <WingBlank>
        <WhiteSpace/>
        {this.props.userList.map(v => (
          v.avatar ? (
            <Card
              style={{zIndex:10}}
              key={v._id}
              onClick={() => this.handleClick(v)}
            >
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            />
            <Body>
            {v.type === 'Boss' ? <div>公司：{v.company}</div> : null}
            {v.desc.split('\n').map(val => (
              <div key={val}>{val}</div>
            ))}
            {v.type === 'Boss' ? <div>薪资：{v.money}</div> : null}
            </Body>
          </Card>) : null
        ))}
      </WingBlank>
    )
  }
}

export default UserCard