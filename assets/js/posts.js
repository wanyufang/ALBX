$(function(){
    $.ajax({
        url:'/getAllPost',
        type:'get',
        data: {
            pageNum: 1,
            pageSize: 3
        },
        success:function(result){
            // console.log(result);
            let html = template('postListTemp',result);
            $('tbody').html(html);
        }
    })
})