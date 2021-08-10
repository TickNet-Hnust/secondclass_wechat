module.exports = {
	httpServer: "http://localhost:8080",  // 业务服务器地址 每个人的不一样，按照需要改！
	httpToken: wx.getStorageSync('token'),  // 存放业务服务器提供的 token 
  }