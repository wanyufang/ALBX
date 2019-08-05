$(function () {
    $('.btnLogin').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/login',
            dataType: 'json',
            data: $('from').serialize(),
            success: function (res) {
                console.log(res)
            }
        })
    })
})