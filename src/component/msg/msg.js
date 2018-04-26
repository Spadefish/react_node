import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'


@connect(
  state=>state
)
class Msg extends React.Component {
  getLast (arr) {
    return arr[arr.length-1]
  }
  render () {
    // console.log(this.props)
    const Item = List.Item
    const Brief = Item.Brief
    const msgGroup = {}
    this.props.chat.chatMsg.forEach(v=> {
      msgGroup[v.chatId] = msgGroup[v.chatId]|| []
      msgGroup[v.chatId].push(v)
    })
    console.log(msgGroup)
    const chatList = Object.values(msgGroup)
    console.log(chatList)
    return (
      <div>
        <List>
          {chatList.map(v => {
            const lastItem = this.getLast(v)
            return (
              <Item
                key={lastItem._id}
              >
                {lastItem.content}
              </Item>
            )
            }
          )}

        </List>
      </div>
    )
  }
}

export default Msg