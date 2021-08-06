// pages/activity-release/activity-release.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active: 'a',
		toggleDelay:false,
		use: [
			{
				title: '班级会议',
				side: '组织开展班会',
			},
			{
				title: '团组织生活会',
				side: '组织开展班级团员活动',
			},
			{
				title: '班级活动',
				side: '组织开展班级活动',
			}
		],
		list:[
			{
				title: '班级会议',
				side: '组织开展班会',
			},
			{
				title: '团组织生活会',
				side: '组织开展班级团员活动',
			},
			{
				title: '班级活动',
				side: '组织开展班级活动',
			},
			{
				title: '线下讲座',
				side: '组织开展有场地的线下讲座',
			},
			{
				title: '线上活动',
				side: '组织开展无场地的线上活动',
			},
			{
				title: '干部竞选',
				side: '组织开展各级干部竞选活动',
			}
		]
	},
	toggleDelay() {
		var that = this;
		that.setData({
		  toggleDelay: true
		})
		setTimeout(function() {
		  that.setData({
			toggleDelay: false
		  })
		}, 1000)
	  },
	jumpTemplate(e) {
		wx.navigateTo({
		  url: '../activity-template/activity-template',
		})
	},
	switchTab(e) {
		console.log(e.detail.title)
		this.toggleDelay()
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