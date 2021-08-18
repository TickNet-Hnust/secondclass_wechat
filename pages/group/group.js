// pages/activity/activity.js
import {request} from '../../js/http.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		toggleDelay:false,
		active: 1,
		value: '',
		recommendGroupList:[],
		myGroupList:[],
		collectionGroupList:[]

	},
	activeChange() {
		this.toggleDelay()
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
	jumpDetail(e) {
		console.log(e)
		wx.navigateTo({
		  url: `../group-detail/group-detail?aid=${e.currentTarget.dataset.id}`,
		})
	},
	jumpSearch() {
		wx.navigateTo({
		  url: '../group-search/group-search',
		})
	},
	jumpRelease() {
		wx.navigateTo({
			url: '../group-custom/group-custom',
		  })
	},
	onChange(event) {
		wx.showToast({
		  title: `切换到标签 ${event.detail.name}`,
		  icon: 'none',
		});
	  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//推荐
		request({
			url: '/group/list',
			method: 'GET',
			data: {
				recommend:1,
				status: 0
			}
		}).then(value => {
			console.log(value)
			this.setData({
				recommendGroupList: value.rows
			})
		})
		//我的
		request({
			url: '/group/list/user',
			method: 'GET'
		}).then(value => {
			console.log(value)
			this.setData({
				myGroupList: value.rows
			})
		})
		//收藏
		request({
			url: '/group/collection/list',
			method: 'GET'
		}).then(value => {
			console.log(value)
			this.setData({
				collectionGroupList: value.rows
			})
		})
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