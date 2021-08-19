// pages/activity-detail/activity-detail.js
import {request} from '../../js/http.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		show:false,
		gid: null,
		memberList:[],
		activityList: [],
		showData:{

		}
	},
	showModal(e) {
		this.setData({
		  modalName: e.currentTarget.dataset.target
		})
	},
	hideModal(e) {
		this.setData({
		  modalName: null
		})
	  },
	jumpActivityScore() {
		wx.navigateTo({
			url: `../activity-score/activity-score?aid=${this.data.aid}`,
		})
	},
	showDialog() {
		this.setData({
			show: true
		})
	},
	getUserInfo(event) {
		console.log(event.detail);
	},
	//点击申请
	joinGroup() {
		request({
			url: `/group/member?groupId=${this.data.gid}`,
			method: 'POST'
		}).then(value => {
			console.log(value)
			// this.setData({
			// 	memberList:value.rows
			// })
			this.getMember()
		})
	},
	getMember() {
		request({
			url: `/group/member/list`,
			method: 'GET',
			data:{
				groupId: this.data.gid,
				pageNum:1,
				pageSize:10
			}
		}).then(value => {
			console.log(value.rows)
			this.setData({
				memberList:value.rows
			})
			// this.computedState()
		})
	},
	switchTab(){},
	onClose() {
		this.setData({ show: false });
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			gid:options.gid
		})
		console.log(options)
		this.getMember()
		request({
			url: `/group/${options.gid}/detail`,
			method: 'GET'
		}).then(value => {
			console.log(value)
			this.setData({
				showData: value.data.groupDetail

			})
		})
		request({
			url: `/secondClass/activity/group/list`,
			method: 'GET',
			data:{
				groupId: options.gid
			}
		}).then(value => {
			console.log(value)
			this.setData({
				activityList: value.rows

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