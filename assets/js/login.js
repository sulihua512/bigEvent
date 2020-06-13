$(function () {
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
})