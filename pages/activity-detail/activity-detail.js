// pages/activity-detail/activity-detail.js
import {request} from '../../js/http.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		show:false,
		name: 'sfaf',
		aid: null,
		memberList:[],
		flowerList:[],
		remarkList:[],
		showData:{
			name: '',
			groupId: '林舒恒',
			activityReleaserName: '林书豪',
			guideTeacherName: '指导老师林',
			deptName: '计算机学院',
			enrollStartTime: '',
			enrollEndTime: '',
			admissionWay: '报名方式', //
			enrollRange: '',
			enrollGrade:'',
			maxAdmissionNumber:'',
			rankId: '', //
			activityTag: '',
			courseId: '',//
			activityStartTime:'',
			activityEndTime:'',
			vacate:'',
			flowerStatus:'',
			evaluateStatus:'',
			activityPlaceName:'',
			registeStartTime:'',
			registeEndTime:'',
			activityRegisteDistance:'',
			activityManagerName:'',
			activityOrganizerName:'',
			activityIntroduce:'',
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
	onClose() {
		this.setData({ show: false });
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		request({
			url: `/secondClass/activity/${options.aid}/participants`,
			method: 'GET'
		}).then(value => {
			console.log(value)
			value.rows.forEach(item => {
				let tempArr = []
				if(item.identities.includes(0)) {
					tempArr.push('发布者')
				}if(item.identities.includes(2)) {
					tempArr.push('负责人')
				}  if(item.identities.includes(3)) {
					tempArr.push('组织者')
				} if(item.identities.includes(1)){
					tempArr.push('参与者')
				}
				item.identities = tempArr
			})
			this.setData({
				memberList:value.rows
			})
		})
		request({
			url: `/admins/secondClass/activity/${options.aid}`,
			method: 'GET'
		}).then(value => {
			console.log(value)
			this.setData({
				showData: value.data
			})
		})
		//花絮
		request({
			url: '/secondClass/activity/flower/list',
			method: 'GET',
			data:{
				activityId:options.aid
			}
		}).then(value => {
			console.log(value)
			this.setData({
				flowerList: value.rows
			})
		})
		//评论
		request({
			url: '/secondClass/activity/evaluation/list',
			method: 'GET',
			data:{
				activityId:options.aid
			}
		}).then(value => {
			console.log(value,'评论')
			this.setData({
				remarkList: value.rows
			})
		})
		this.setData({
			aid:options.aid
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