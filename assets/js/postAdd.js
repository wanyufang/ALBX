// 为file表单元素添加change时间
// 使用formdata来收集图片数据
// 在事件中使用ajax发送异步请求
$(function(){
    // 只要一选择文件就实现文件的上传操作
    $('#feature').on('change',function(){
        // 使用formdata+ajax
        // 1 获取文件对象
        let myfile = document.querySelector('#feature').files[0];
        // 2 创建formdata对象
        let formdata = new FormData();
        // 3 在formdata中追加数据
        formdata.append('img',myfile);
        formdata.append('username','名字叫: jack');
        // 4 使用ajax发送请求
        $.ajax({
            type: 'post',
            url: '/uploadFile',
            data: formdata,
            // 让ajax不要进行数据的编码处理 直接让formdata来处理
            contentType: false,
            // 让ajax不要进行数据的处理 因为formdata已经处理好了
            processData: false,
            dataType: 'json',
            success: function(res){
                if(res.code == 200) {
                    // 实现预览: 为img标签设置src属性 让浏览器进行解析发起二次请求
                    $('.thumbnail').attr('src','/uploads/'+res.img).show()
                }else{
                    $('.alert-danger>span').text(res.msg).fadeIn(500).delay(3000).fadeOut(500)
                }
            }
        })
    });


    // 分类数据的动态加载
    // 动态加载分类数据
    $.ajax({
        type:'get',
        url:'/getAllCate',
        dataType: 'json',
        success: function(res){
            // 生成分类下拉列表动态结构
            let str = ' <option value="all">所有分类</option> '
            for(let i=0; i<res.data.length;i++){
                str+=` <option value = "${res.data[i].id}">${res.data[i].name}</option> `
            }
            $('#category').html(str)
        }
    });

    // 创建ckeditor富文本框空间替换页面中的textarea
    // 它会创建一个富文本框对象
    CKEDITOR.replace('content');

    // 保存文件
    $('.btnsave').on('click',function(){
        // 同步数据到textarea 
        CKEDITOR.instances.content.updateElement();
        // serialize: 可以获取当前指定表单中所有拥有name属性的表单元素的value值
        $.ajax({
            type: 'post',
            url: '/addPost',
            data: $('form').serialize(),
            dataType: 'json',
            success: function(res){
                console.log(res);
                if(res.code == 200){
                    // 给出提示并跳转
                    alert('提交成功');
                    location.href = '/admin/posts'
                }
            }
        })
    })
})