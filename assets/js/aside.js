$(function(){
    // 获取元素
    let menuPosts = $('#menu-posts');
    let menuSettings = $('#menu-settings');

    // 获取当前路由名称
    let index = location.href.indexOf('?');
    let routerName = '';
    if(index== -1) {
        // 如果index==-1 则说明后面没有?参数 
        // 则从admin后面斩断截取
        routerName = location.href.substring(location.href.lastIndexOf('/')+1)
    }else{
        // 如果有参数 就从admin和?之间取值
        routerName = location.href.substring(location.href.lastIndexOf('/')+1 , location.href.indexOf('?'))
    }

    // 已经获取路由名称 routerName 接下来判断是否满足条件
    if(routerName == 'posts' || routerName == 'post-add' || routerName == 'categories'){
        menuPosts.addClass('in').attr('aria-expanded',true);
        menuPosts.parent().find('.collapsed').removeClass('.collapsed');
    }
    if(routerName == 'nav-menus' || routerName == 'slides' || routerName == 'settings'){
        menuSettings.addClass('in').attr('aria-expanded',true);
        menuSettings.parent().find('.collapsed').removeClass('.collapsed');
    }  

    $('#'+routerName).addClass('active')
})