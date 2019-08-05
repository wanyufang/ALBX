let express = require('express');
let querystring = require('querystring');
let session = require('express-session');

let app = express()
app.listen(8080,()=>{
    console.log('http://127.0.0.1:8080');
})

// 在express中使用session中间件 因为默认情况下 express并不会开启session的使用
app.use(session(
    {
        // 加密 加盐
        secret: 'wan',
        resave: false,
        saveUninitialized: false
    }
))

app.get('/',(req,res)=>{
    // 使用方式都通过req.session进行处理
    // req.session是一个对象
    console.log(req.session);

    if(req.session.isLogin&&req.session.isLogin == 'true'){
        res.end('welcome back 123')
    }else{
        req.session.isLogin = 'true',
        req.session.currentUser = {name:'jack',age:20}
        res.end('first come 456')
    }
})