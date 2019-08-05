let express = require('express');
let querystring = require('querystring');
let app = express();
app.listen(8080,()=>{
    console.log('http://127.0.0.1:8080');
})

app.get('/',(req,res)=>{
    // 判断是否有登陆状态
    // 获取之前可能存储的登陆状态
    let mycook = req.header.cookie
    let obj = querystring.parse(mycook)

    if(obj.islogin&&obj.islogin == 'true'){
        res.end('welcome back')
    }else{
        // 如果第一次访问,显示: first come
        // 如果有登陆状态,那么显示: welcome back
        // 存储cookie数据 通过响应头的方式写入cookie
        res.writeHead(200,{
            'Content-Type':'text/html;charset=utf-8',
            'Set-Cookie': 'islogin=true'
        })
        res.end('first come')
    }
})