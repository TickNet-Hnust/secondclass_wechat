// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.qy.login({
		// 	success: function(res) {
		// 		console.log(res)
		// 		if (res.code) {
		// 		  //发起网络请求
		// 		  wx.request({
		// 			url: 'https://loxg.top/loginByCode',
		// 			data: {
		// 			  code: res.code
		// 			}
		// 		  })
		// 		} else {
		// 		  console.log('登录失败！' + res.errMsg)
		// 		}
				
		// 	}
		// })
  },
  globalData: {
    userInfo: null
  }
})
