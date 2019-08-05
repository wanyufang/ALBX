// 这个控制器完成所有与用户相关的业务操作
const usersModel = require('../models/usersModel.js');


exports.login = (req,res)=>{
    let obj = req.body
    usersModel.login(obj.email,(err,data)=>{
        if(err){
            // res.send({code:400,msg:'服务器异常'})
            // json:可以直接将js对象转换json格式字符串并返回
            res.json({code:400,msg:'服务器异常'})
        }else{
            if(data){
                if(data.password == obj.password){
                    res.json({code:200,msg:'登陆成功'})
                }else{
                    res.json({code:400,msg:'失败'})
                }
            }else{
                res.json({code:400,msg:})
            }
        }
    })
}
module.exports.login = (req,res)=>{
    usersModel.login()
}