import React from 'react'
import { List, InputItem , NavBar,Icon, Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList, sendMsg,recvMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
// const socket = io('ws://localhost:9093')

@connect(
  state=>state,
  {getMsgList, sendMsg,recvMsg}
)
class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text:'',
      msg:[],
      showEmoji: false
    }
  }
  componentDidMount() {
    // socket.on('receiveMsg',(data) => {
    //   this.setState({
    //     msg:[...this.state.msg, data.text]
    //   })
    //   console.log(this.state)
    // })
    // 转移到dashbord里面去
    // this.props.getMsgList()
    // this.props.recvMsg()

    // 页面直接进来加载数据
    if (!this.props.chat.chatMsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }

    // 解决Grid初始化样式问题
    // setTimeout (function () {
    //   window.dispatchEvent(new Event('resize'))
    // },0)
  }

  fixCarousel () {
    // 解决Grid初始化样式问题
    setTimeout (function () {
      window.dispatchEvent(new Event('resize'))
    },0)
  }

  handleSubmit () {
    // socket.emit('sendMsg',{text:this.state.text})
    // this.setState({text:''})
    const from = this.props.user._id
    // user 就是路由文件的/chat/:user
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
  }
  render () {
    // emoji
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({text: v}))

    // console.log(this.props)
    const userId = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userId]) {
      return null
    }
    // 绑定聊天的俩个人 实现消息过滤
    const chatId = getChatId(userId,this.props.user._id)
    const chatMsgs = this.props.chat.chatMsg.filter(v=> v.chatId === chatId)
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type="left" />}
          onLeftClick={()=> {
            this.props.history.goBack()
          }}
        >
          {users[userId].name}
        </NavBar>
        {chatMsgs.map( v =>{
          return v.from === userId? (
            <List key={v._id}>
              <Item>
                {v.content}
              </Item>
            </List>
          ) :(
            <List key={v._id}>
              <Item
                extra={'avatar'}
                className='chat-me'
              >
                {v.content}
              </Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=> {
                this.setState({text:v})
              }}
              extra= {
                <div>
                  <span
                    style={{marginRight:15}}
                    onClick={()=>{
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                  >😂</span>
                  {<span onClick={()=>{this.handleSubmit()}}>发送</span>}
                </div>
              }
            >
              信息
            </InputItem>
          </List>
          {this.state.showEmoji? <Grid
            data={emoji}
            columnNum = {9}
            carouselMaxRow = {4}
            isCarousel = {true}
            onClick={el=>{
              this.setState ({
                text: this.state.text + el.text 
              })
              console.log(el)
            }}
          />:null}

        </div>
      </div>
    )
  }

}

export default Chat