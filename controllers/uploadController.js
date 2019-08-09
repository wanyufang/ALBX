// 这个模块专门来实现文件上传功能
// 引用formidable
const formidable = require('formidable');
// 引用核心模块 path
const path = require('path');

// 使用formidable模块来实现文件上传
exports.uploadFile = (req,res)=>{
    // 1 创建文件上传对象
    let form = new formidable.IncomingForm();
    // 2 设置编码: 这个编码的设置与文件上传没有本质的关系 只不过formidable可以传递普通的键值对, 所以需要设置对这些参数的编码
    form.encoding = 'utf-8';
    // 3 设置文件存储目录
    form.uploadDir = __dirname + '/../uploads';
    // 4 设置保留文件扩展名
    form.keepExtensions = true;
    // 5 调用方法实现文件上传
    // req:请求报文 err:错误信息对象 fields:普通键值对 files:文件上传完成之后的相关信息 主要是存储上传成功之后的信息
    form.parse(req,(err,fields,files)=>{
        if(err) {
            res.json({
                code: 400,
                msg: '文件上传失败'
            })
        }else{
            let imgName = path.basename(files.img.path);
            console.log(imgName);
            res.json({
                code:200,
                msg: '文件上传成功',
                img: imgName
            })
        }
    })
}
