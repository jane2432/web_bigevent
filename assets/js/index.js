$(function () {
  getUserInfo()
  var layer = layui.layer
  $('#btnLogout').on('click', function (e) {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index)
    })
  })
})
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      // console.log(res)
      if (res.status != 0) {
        return layui.layer.msg('登录失败!')
      }
      renderAvatar(res.data)
    },
  })
}
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp' + name)
  if (user.user_pic != null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
