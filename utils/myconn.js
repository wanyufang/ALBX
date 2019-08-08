let mysql = require('mysql');


let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'albx',

    // 也可在此将日期格式进行转换
     dateStrings: true
})

module.exports = connection