const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// work with express
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

// io 表示全局广播 socket 表示当前用户的连接
io.on('connection',function (socket) {
  socket.on('sendMsg',function (data) {
    console.log(data)
    // 发送全局广播
    io.emit('receiveMsg',data)
  })
})
const userRouter = require('./user')
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
server.listen(9093, function () {
  console.log('Node app server start at port 9093')
})