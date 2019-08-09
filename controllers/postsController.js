const postsModel = require('../models/postsModel');
// 引入moment转换日期格式
const moment = require('moment');

// 获取所有文章列表数据
exports.getAllPost = (req, res) => {
    // console.log(111);
    // 获取用户参数
    let obj = req.query;
    // 调用数据模块
    postsModel.getAllPost(obj,(err, data) => {
        // console.log(err)
        if (err) {
            // 先返回查询失败
            res.json({ code: 400, msg: '查询失败了' })
        } else {
            // 添加日期格式的转换
            for (let i = 0; i < data.length; i++) {
                // moment 转化时间格式
                // format 格式化 里面进行自定义的日期格式
                // data[i].created = moment(data[i].created).format('YYYY-MM-DD HH-mm-ss')
            }
            // 如果查询成功 则将data数据返回
            res.json({ code: 200, msg: '查询成功', data: data })
            
        }
    })
}

// 处理文章新增
exports.addPost = (req,res)=>{
    // 接收参数
    let obj = req.body;
    // 添加数据库所需要的三个字段的数据
    obj.views = 0;
    obj.likes = 0;
    obj.user_id = req.session.currentUser.id;
    // 调用数据模块中的方法
    postsModel.addPost(obj,(err)=>{
        if(err){
            res.json({
                code: 400,
                msg: '数据新增失败'
            })
        }else{
            res.json({
                code: 200,
                msg: '新增成功'
            })
        }
    })
}
