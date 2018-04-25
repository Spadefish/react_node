const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
// 0 在查询结果中不显示此字段 1 显示
// 在查询过程中 参数总是以对象的形式来传递
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function (req, res) {
  // 清空模拟数据
  // User.remove({},function (err,doc) {
  //
  // })
  const {type} = req.query
  User.find({type}, function (err, doc) {
    // console.log('doc======',doc)
    return res.json({code: 0, data: doc})
  })
})

Router.post('/update', function (req, res) {
  const userId = req.cookies.userId
  if (!userId) {
    return res.json({code: 1, msg: '用户信息更新失败'})
  }
  const body = req.body
  User.findByIdAndUpdate(userId, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data: data})
  })
})

Router.post('/login', function (req, res) {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或密码不正确'})
    }
    // 存储cookie
    res.cookie('userId', doc._id)
    return res.json({code: 0, data: doc})
  })
})

Router.post('/register', function (req, res) {
  // console.log(req.body)
  const {user, pwd, type} = req.body
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '该用户已存在'})
    }

    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '后端接口有误'})
      }
      // console.log('注册保存====',doc)
      const {user, type, _id} = doc
      res.cookie('userId', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
    // User.create({user,pwd:md5Pwd(pwd),type},function (err,doc) {
    //   if(err) {
    //     return res.json({code:1,msg:'后端接口有误'})
    //   }
    //   return res.json({code:0})
    // })
  })
})
Router.get('/info', function (req, res) {
  const {userId} = req.cookies
  // 用户有没有cookie
  if (!userId) {
    return res.json({code: 1})
  }
  // 查询
  User.findOne({_id: userId}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端接口有误'})
    }
    if (doc) {
      // console.log('doc====',doc)
      return res.json({code: 0, data: doc})
    }
  })
})


// 互动聊天接口
Router.get('/getmsglist',function (req,res) {
  const user = req.cookies.userId
  console.log('user======',user)
  User.find ({},function (e, userdoc) {
    let users= {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user,avatar:v.avatar}
    })
    Chat.find({'$or':[{form:user},{to:user}]},function (err,doc) {
      if(!err) {
        res.json({code:0,msgs:doc,users:users})
      }
    })
  })
})



// 加强版md5
function md5Pwd (pwd) {
  const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router