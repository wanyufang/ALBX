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


// 使用session实现登陆状态的保持
// 添加use中间件
// 在express中使用session中间件 因为默认情况下 express并不会开启session的使用
app.use(session(
    {
        // 加密 加盐 相当于一个加密密钥,值可以是任意字符串
        secret: 'wan',
        resave: false,
        saveUninitialized: false
    }
))


// 配置body-parser
// 处理post方式的请求
// extended:false 将参数字符串转换为对象
app.use(bodyParser.urlencoded({extended: false}));
// 后期你可能会传递json格式字符串
app.use(bodyParser.json())


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

// 使用cookie状态保持
// app.get('/',(req,res)=>{
//     // 判断是否有登陆状态
//     // 获取之前可能存储的登陆状态
//     let mycook = req.header.cookie;
//     let obj = querystring.parse(mycook);
//     if(obj.islogin && obj.islogin == 'true') {
//         res.end('welcome back')
//     }else{
//         // 如果是第一次访问 显示 first come
//         // 如果有登陆状态 显示 welcome back
//         // 存储cookie数据: 通过响应头的方式写入cookie
//         res.writeHead(200,{
//             'Content-Type': 'text/html; charset = utf-8',
//             'Set-Cookie' : 'islogin = true'
//         })
//         res.end('first come')
//     }
// })


// 注意添加git忽略文件
// 在项目根目录(app.js)同级目录添加一个文件 .gitignore
// 添加忽略node_modules/


// 在express提供了一个中间件,这个中间件可每个请求都会经过
// 添加全局的中间件 每次请求都会经过这个中间件
app.use(function(req,res,next){
    // 三种场合不用登陆
    // 登录页 前台三个页面 有登录状态的
    if(req.session.isLogin && req.session.isLogin == 'true'|| req.url == '/admin/login'|| req.url.indexOf('/admin')== -1) {
        next();
    }else {
        // redirect : 实现重定向
        res.redirect('/admin/login');
    }
})

// 让app使用Router进行路由管理
app.use(router);
