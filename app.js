// 引入express
const express = require('express');
// 引入fs
// const fs = require('fs');
// 引入body-parser
const bodyParser = require('body-parser');

const router = require('./router')

const session = require('express-session')

// 创建服务器
const app = express();
// 添加端口监听
app.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})
// 托管静态资源
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));

// 使用ejs抽离公共结构
// 配置ejs模板引擎
app.set('view engine', 'ejs');

// 设置目录
app.set('views', __dirname + '/views');


// // 添加路由配置
// app.get('/', (req, res) => {
//     res.render('index.ejs')
// })

// app.get('/admin', (req, res) => {
//     res.render('index.ejs')
// })

// 让app使用Router进行路由管理
app.use(router);


// 注意添加git忽略文件
// 在项目根目录(app.js)同级目录添加一个文件 .gitignore
// 添加忽略node_modules/

