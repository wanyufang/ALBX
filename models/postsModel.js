const conn = require('../utils/myconn');

// 获取所有文装数据
// 里面包含两个参数 obj和回调函数 
exports.getAllPost = (obj,callback)=>{
    // 创建sql语句  要使用到多表连接
    let sql = `SELECT posts.*,users.nickname,categories.name
    from posts
    join users on posts.user_id = users.id
    join categories on posts.category_id = categories.id
    order by id desc
    limit ${(obj.pageNum-1)*obj.pageSize},${obj.pageSize}`
    
    // 调用方法获取数据
    conn.query(sql,(err,results)=>{
        if(err){
            callback(err)
        }else{
            callback(null,results)
        }
    })
}