function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        success:  (res) => {
            if(res.status !==0 ) return layer.msg(res.message)
            layer.msg('获取用户信息成功')
            //调用渲染函数
            renderAvatar(res.data)
        },
        // complete: (res) => {
        //     console.log(res);
        //     if(
        //         res.responseJSON.status ===1 &&
        //         res.responseJSON.message ==="身份认证失败！"
        //     ) {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 跳转到登录界面
        //         location.href = '/login.html'
        //     }    
        // }
    })
}

//渲染用户信息
const renderAvatar = (user) => {
    const name = user.nickname || user.username
    $('#welcome').html(`欢迎${name}`)
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first)
    }
}

//退出登录
$('#btnlogout').click(() => {
    layer.confirm('是否退出登录?', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem('token')
        location.href="/login.html"
    });
})

getUserInfo()
