const mysql = require('mysql');

let conn = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'albx'
});


// 实现登录验证 mysql
exports.login = function(email, callback){
    console.log(email);
    // 创建sql语句
    let sql = `select * from users where email = "${email}"`;
    // 调用mysql模块
    conn.query(sql, (err, results) => {
        console.log(err);
        if (err) {
            // 如果错误则直接返回错误
            callback(err)
        } else {
            // results 查询返回一个一个结果集(数组) 如果数组有数据
            callback(null, results[0])
        }
    })
}
