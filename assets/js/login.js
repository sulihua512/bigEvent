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

  // 监听注册表单的提交事件
  $('#form-reg').on('submit', function (e) {
    // 1. 阻止表单的默认提交行为
    e.preventDefault();
    // 2. 发起Ajax请求
    $.ajax({
      // 指定请求的方式
      type: 'POST',
      // 指定请求的 URL 地址
      url: 'http://www.liulongbin.top:3007/api/reguser',
      data: $(this).serialize(),
      success: function (res) {
        // 注册失败
        if (res.status !== 0) {
          return layer.msg('注册失败');
        }
        // 注册成功，跳转到登录界面
        $('#link-login').click()
      }
    })
  })
  // 监听登录表单的提交事件
  $('#form-login').on('submit', function (e) {
    // 1. 阻止表单的默认提交行为
    e.preventDefault();
    // 2. 发起Ajax请求
    $.ajax({
      type: 'POST',
      // 指定请求的 URL 地址
      url: 'http://www.liulongbin.top:3007/api/login',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        // 登录失败
        if (res.status != 0) {
          return layer.msg('登录失败');
        }
        // 提示用户登录成功
        layer.msg('登录成功')
        // 登录成功，跳转到首页
        location.href = "/index.html"
      }
    })
  })
})