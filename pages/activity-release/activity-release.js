// pages/activity-release/activity-release.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active: 'a'
	},
	jumpTemplate(e) {
		wx.navigateTo({
		  url: '../activity-template/activity-template',
		})
	},
	switchTab(e) {
		console.log(e.detail.title)
		if(e.detail.title == '自定义')
		wx.navigateTo({
		  url: '../activity-custom/activity-custom',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.selectComponent('#tabs').resize();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.setData({     //解决bug做出的奇怪行为1
			active : 'a'     
		})
	},	

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		this.setData({     //解决bug做出的奇怪行为2
			active : 'c'
		})
		this.selectComponent('#tabs').resize();

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})