$(function () {
  // 导入了 layui.all.js 脚本，就可以使用 layui.form
  var form = layui.form

  // 点击了注册的链接
  $('#link-reg').on('click', function () {
    $('.reg-box').show();
    $('.login-box').hide()
  })
  // 点击了登录的链接
  $('#link-login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      // 1. 通过形参，获取到确认密码框中的值
      // 2. 通过 jQuery 获取到密码框中的值
      var pwd = $('.reg-box [name=password]').val();
      // 3. 进行 if 判断
      if (value !== pwd) {
        // return 一个错误消息
        return '两次的密码不一致！'
      }
    }
  })

})