// pages/activity-detail/activity-detail.js
import {request} from '../../js/http.js'
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		show:false,
		loadProgress:0,
		gid: null,
		isCollection: false,
		memberList:[],
		AllMessageList:[],
		messageList:[],
		activityList: [],
		CustomBar: app.globalData.CustomBar,
		showData:{

		},
		postData:{
			title: '',
			text: '',
		},
		title:'群组消息发布'
	},
	titleChange(e) {
		this.setData({
			'postData.title':e.detail.value
		})
	},
	textChange(e) {
		this.setData({
			'postData.text':e.detail.value
		})
	},
	postMsg() {
		request({
			url: '/group/msg',
			method: 'POST',
			data:{
				title: this.data.postData.title,
				text: this.data.postData.text,
				groupId: this.data.gid
			}
		}).then(value => {
			console.log(value)
			this.hideModal()
			this.setData({
				'postData.title': '',
				'postData.text': '',
			})
			if(value.code == 200) {
				wx.showToast({
				  title: '发布成功',
				  duration:2000
				})
			}
		})
	},
	//解散群组
	disMissGoup() {
		request({
			url: `/group/${this.data.gid}`,
			method:'DELETE'
		}).then(value => {
			wx.navigateBack({
			  delta: 1,
			})
		})
	},
	showModal(e) {
		this.setData({
		  modalName: e.currentTarget.dataset.target
		})
	},
	hideModal(e) {
		this.setData({
		  modalName: null,
		  title:'',
		  'postData.title':'',
		  'postData.text':''
		})
	},
	jumpGroupCustom() {
		wx.navigateTo({
		  url: `../group-custom/group-custom?gid=${this.data.gid}`
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
			this.getDetail()
		})
	},
	getDetail() {
		request({
			url: `/group/${this.data.gid}/detail`,
			method: 'GET'
		}).then(value => {
			console.log(value)
			this.setData({
				showData: value.data.groupDetail,
				messageList:value.data.msgList,
			})
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
	//查看信息详情
	showForm(e) {
		console.log(e)
		this.setData({
			'postData.title': this.data.AllMessageList[e.currentTarget.dataset.index].title,
			'postData.text':this.data.AllMessageList[e.currentTarget.dataset.index].text,
			modalName: 'Messages',
			title:'群组消息查看'
		})
	},
	switchTab(){},
	onClose() {
		this.setData({ show: false });
	},
	getCollection() {
		//是否收藏了改群组
		request({
			url: '/group/collection',
			method: 'get',
			data:{
				groupId: this.data.gid
			}
		}).then(value => {
			console.log('是否收藏了',value)
			this.setData({
				isCollection: value.data
			})
		})
	},
	setCollection() {
		//改变收藏了改群组
		request({
			url: `/group/collection?groupId=${this.data.gid}`,
			method: 'PUT'
		}).then(value => {
			console.log('收藏了',value)
			this.getCollection()
			wx.showToast({
				title: '操作成功',
				duration:1000
			})
		})
	},
	
	loadProgress(){
		this.setData({
		  loadProgress: this.data.loadProgress+3
		})
		if (this.data.loadProgress<100){
		  setTimeout(() => {
			this.loadProgress();
		  }, 100)
		}else{
		  this.setData({
			loadProgress: 0
		  })
		}
	  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.loadProgress()
		this.setData({
			gid:options.gid
		})
		console.log(options)
		this.getMember()
		this.getDetail()
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

		//人员状态
		this.setData({
			'dict_ga_group_user_status':wx.getStorageSync('dict_ga_group_user_status')
		})
		this.getCollection()
		request({
			url: '/group/msg/list',
			method: 'get',
			data:{
				groupId: this.data.gid
			}
		}).then(value => {
			console.log(value)
			this.setData({
				AllMessageList: value.rows
			})
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		setTimeout(() => {
			this.setData({
				loading: false,
			});
			this.selectComponent('#tabs').resize();

		},2000)
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