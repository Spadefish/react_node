const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
// 0 在查询结果中不显示此字段 1 显示
const _filter = {'pwd':0,'__v':0}

Router.get('/list',function (req, res) {
  // 清空模拟数据
  // User.remove({},function (err,doc) {
  //
  // })
  User.find({},function(err,doc){
    return res.json(doc)
  })
})

Router.post('/login',function (req, res) {
  const {user,pwd} = req.body
  User.findOne({user,pwd:md5Pwd(pwd)},_filter,function (err, doc) {
    if (!doc) {
      return res.json({code:1,msg:'用户名或密码不正确'})
    }
    // 存储cookie
    res.cookie('userId',doc._id)
    return res.json({code:0,data:doc})
  })
})

Router.post('/register',function(req,res){
  // console.log(req.body)
  const {user,pwd,type} = req.body
  User.findOne({user},function (err,doc) {
    if(doc) {
      return res.json({code:1,msg:'该用户已存在'})
    }

    const userModel = new User({user,type,pwd:md5Pwd(pwd)})
    userModel.save(function(err,doc) {
      if(err) {
        return res.json({code:1,msg:'后端接口有误'})
      }
      console.log('注册保存====',doc)
      const {user,type,_id} = doc
      res.cookie('userId',_id)
      return res.json({code:0,data:{user,type,_id}})
    })
    // User.create({user,pwd:md5Pwd(pwd),type},function (err,doc) {
    //   if(err) {
    //     return res.json({code:1,msg:'后端接口有误'})
    //   }
    //   return res.json({code:0})
    // })
  })
})
Router.get('/info',function (req,res) {
  const {userId} = req.cookies
  // 用户有没有cookie
  if (!userId){
    return res.json({code:1})
  }
  // 查询
  User.findOne({_id:userId,_filter,function (err,doc) {
      if(err) {
        return res.json({code:1,msg:'后端接口有误'})
      }
      if (doc) {
        return res.json({code:0,data:doc})
      }
    }})
})


// 加强版md5
function md5Pwd(pwd){
  const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router