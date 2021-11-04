// pages/activity-release/activity-release.js
import {request} from '../../js/http.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		TabCur: 0,
		templateList:[],
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
	
	kaifa() {
		wx.showModal({
		  title: '提示',
		  content:'该功能还在开发中，敬请期待...'
		})
	},
	tabSelect(e) {
		// setTimeout(() => {
			// },300)
			// this.data.TabCur == e.currentTarget.dataset.id
			if(e.currentTarget.dataset.id == 2) {
				wx.navigateTo({
					url: '../activity-custom/activity-custom',
				})
				return
			}
			this.setData({
				TabCur: e.currentTarget.dataset.id,
			})
	  },
	toggleDelay() {
		var that = this;
		let temp
		if(this.data.TabCur == 0) {
			temp = 'toggleDelayOne'
		}else {
			temp = 'toggleDelayTwo'
		}
		that.setData({
		  [temp]: true
		})
		setTimeout(function() {
		  that.setData({
			[temp]: false
		  })
		}, 1500)
	  },
	jumpTemplate(event) {
		wx.navigateTo({
		  url: `../activity-template/activity-template?tid=${event.currentTarget.dataset.id}`,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		request({
			url: '/secondClass/activity/template/list',
			method: 'GET'
		}).then(value => {
			this.setData({
				templateList:value.rows
			})
			console.log(value.rows)
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		
	},	

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		

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
		this.toggleDelay()
		setTimeout(() => {
			wx.stopPullDownRefresh()
		},1000)
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