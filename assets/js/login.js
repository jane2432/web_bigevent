$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  //从layui中获取form对象

  const form = layui.form
  const layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      //通过形参那到的是确认密码框中的内容
      const pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码输入不一致'
      }
    },
  })
  //监听注册表单
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    const data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
    }
    $.ajax({
      url: '/api/reguser',
      data,
      method: 'POST',

      //...some code
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
      },
    })
    setTimeout(function () {
      $('#link_login').click()
    }, 2000)
  })
  //监听登陆表单
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      data: $(this).serialize(),
      method: 'POST',
      success(res) {
        if (res.status !== 0) {
          layer.msg('登录失败')
        }
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      },
    })
  })
})
