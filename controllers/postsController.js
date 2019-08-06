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
                data[i].created = moment(data[i].created).format('YYYY-MM-DD HH-mm-ss')
            }
            // 如果查询成功 则将data数据返回
            res.json({ code: 200, msg: '查询成功', data: data })
            
        }
    })
}
