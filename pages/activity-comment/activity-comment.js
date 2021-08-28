// pages/activity-comment/activity-comment.js
import {request} from '../../js/http'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		postData:{
			activityId: '',
			content:'',
			score: null
		}
	},
	onChange(e) {
		console.log(e)
		this.setData({
			'postData.score':e.detail
		})
	},
	contentChange(e) {
		this.setData({
			'postData.content': e.detail.value
		})
	},
	sure() {
		console.log(this.data.postData)
		request({
			url: '/secondClass/activity/evaluation',
			method: 'POST',
			data:this.data.postData
		}).then(value => {
			console.log(value)
			value.code == 200 && wx.showToast({
			  title: '发布成功'
			})
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.data.postData.activityId = options.aid
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