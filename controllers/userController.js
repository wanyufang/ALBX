// 这个控制器完成所有与用户相关的业务操作
const usersModel = require('../models/usersModel');
const bodyParser = require('body-parser')
module.exports.login = (req,res)=>{
    usersModel.login()
}