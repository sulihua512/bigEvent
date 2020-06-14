$(function () {

    var form = layui.form;
    var layer = layui.layer;
    // 自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            var pwd = $('[name=oldPwd').val();
            if (pwd === value) {
                return '新旧密码不能重复'
            }
        },
        samePwd: function (value) {
            var pwd = $('[name=newPwd]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 绑定submit事件
    $('#form').on('submit', function (e) {
        // 1.阻止表单的默认行为
        e.preventDefault()
        // 2.请求修改数据
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败!')
                }
                layer.msg('更新密码成功!')
                // 重置表单中的数据
                $('#form')[0].reset()
            }
        })
    })
})