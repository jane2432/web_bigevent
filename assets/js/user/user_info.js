$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    },
  })
  initUserInfo()

  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取失败')
        }
        console.log(res)
        form.val('formUserInfo', res.data)
      },
    })
  }
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })
  //更新用户资料
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    console.log('11')
    // 发起ajax请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败')
        }
        layer.msg('更新用户信息成功')
        // console.log(res.status)
        window.parent.getUserInfo()
      },
    })
  })
})
