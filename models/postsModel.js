// 这个文件是处理所有文章数据的操作
// 引入连接对象
const conn = require('../utils/myconn');

// 获取所有文装数据
// obj是分页查询参数对象 里面必须包含这两个成员
// obj.pageNum: 当前页码
// obj.pageSize: 每页显示的记录数
// obj.cate: 分类id
// obj.stauts: 状态
// 里面包含两个参数 obj和回调函数 
exports.getAllPost = (obj, callback) => {
    // console.log(obj);
    // 创建sql语句  要使用到多表连接
    let sql = `select posts.*,users.nickname,categories.name
    from posts
    join users on posts.user_id = users.id
    join categories on posts.category_id = categories.id
    where 1=1 `
    // 添加恒成立 这样有一个好处 后面进行语句拼接的时候 不用再考虑是拼接where还是拼接and 可以统一拼接and
    if (obj.cate && obj.cate != 'all') {
        // 看有没有传递分类数据
        sql += ` and category_id = ${obj.cate} `
    };
    if (obj.status && obj.status != 'all') {
        sql += ` and posts.status = '${obj.status}' `
    }
    sql += ` order by id desc
            limit ${(obj.pageNum - 1) * obj.pageSize},${obj.pageSize}`

    // 调用方法获取数据
    conn.query(sql, (err, results) => {
        if (err) {
            callback(err)
        } else {
            // 再创建sql语句 进行总记录的查询
            sql = `select count(*) as cnt
                    from posts
                    join users on posts.user_id = users.id
                    join categories on posts.category_id = categories.id
                    where 1=1 `

            if (obj.cate && obj.cate != 'all') {
                // 看有没有传递分类数据
                sql += ` and category_id = ${obj.cate} `
            };
            if (obj.status && obj.status != 'all') {
                sql += ` and posts.status = '${obj.status}' `
            }
            conn.query(sql, (err2, res2) => {
                if (err2) {
                    callback(err2)
                } else {
                    // 如果没有错误,不仅仅要返回之前的查询数据 而且还要返回当前查询的总记录数
                    callback(null, { data: results, total: res2[0].cnt })
                }
            })
        }
    })
}


// 处理文章新增
exports.addPost = (obj, callback) => {
    let sql = `insert into posts values(null,'${obj.slug}','${obj.title}','${obj.feature}','${obj.created}','${obj.content}','${obj.views}','${obj.likes}','${obj.status}','${obj.user_id}','${obj.category}')`
    conn.query(sql,(err,results)=>{
        console.log(err);
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}