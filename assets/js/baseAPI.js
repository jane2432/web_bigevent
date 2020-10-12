$.ajaxPrefilter(function (options) {
  // console.log(option.url)
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  console.log(options.url)
})
