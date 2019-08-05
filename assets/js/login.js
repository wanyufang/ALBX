$(function () {
    $('.btnLogin').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/login',
            dataType: 'json',
            data: $('form').serialize(),
            success: function (res) {
                console.log(res)
                if(res.code == 400) {
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                }else{
                    // 否则就成功进入页面跳转
                    location.href='/admin/index'
                }
            }
        })
    })
})