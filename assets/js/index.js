$(function () {
    var layer = layui.layer
    getUserInfo();

    // 退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清除本地token
            localStorage.removeItem('token');
            // 2. 跳转到登录页面
            location.href = '/login.html'
            // layer.close 表示关闭指定的弹出层
            layer.close(index);
        });

    })
})
// 渲染用户头像和欢迎文本
function renderAvatar(user) {
    // console.log('用户信息', res);

    // 1.获取用户的名称
    var name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染头像
    if (user.user_pic) {
        // 图片
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        // 文本
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}
// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        headers: {
            // 通过 Authorization 字段，把 token 发送给服务器，进行身份认证
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！')
            }
            // console.log('获取用户信息成功');
            renderAvatar(res.data)
        }
    })
}