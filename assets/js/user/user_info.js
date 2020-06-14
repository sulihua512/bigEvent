$(function () {
    var layer = layui.layer
    var form = layui.form

    // 自定义校验规则
    form.verify({
        // 昵称的验证规则
        nickname: [/^[\S]{2,6}$/, '昵称必须2到6位，且不能出现空格']
    })

    // 初始化用户的基本信息
    initUserInfo();

    // 监听重置按钮的点击事件
    $('#btnReset').on('click', function (e) {
        // 1. 阻止重置按钮的默认行为
        e.preventDefault();
        // 2. 重新获取用户信息,并渲染表单数据
        initUserInfo()
    })

    // 
    $("#form").on('submit', function (e) {
        // 1. 阻止表单的默认行为
        e.preventDefault()
        // 2. 请求修改数据
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功!')
                // 更新 index.html 页面中的欢迎文本
                window.parent.getUserInfo()
            }
        })
    })

    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res.data);

                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                $('[name=username]').val(res.data.username)
                form.val('f1', res.data)
            }
        })
    }
})