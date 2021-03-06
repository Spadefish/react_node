const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL)

const models = {
  user:{
    'user':{'type':String,'require':true},
    'pwd':{'type':String,'require':true},
    // boss or genius
    'type':{'type':String,'require':true},
    // 头像
    'avatar':{'type':String},
    'desc':{'type':String},
    'title':{'type':String},
    // if type===boss
    'company':{'type':String},
    'money':{'type':String}
  },
  chat:{
    'chatId': {'type':String,'require':true},
    'from': {'type':String,'require':true},
    'to': {'type':String,'require':true},
    'read':{'type':Boolean, default:false},
    'content': {'type':String,'require':true, default:''},
    'create_time': {'type':Number,default:new Date().getTime()}
  }
}

// 建立数据库模型
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}