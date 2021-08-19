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
			flag:'',
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
		},
		enroll:{
			disabled: false,
			content: ''
		},
		registe:{
			disabled: false,
			content: ''
		},
		leave:{
			disabled: false,
			content: ''
		},
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
	computedState() {
		//本人参加了
		if(this.data.memberList[0].identities.includes(4)) {
			//报名了
			if(this.data.memberList[0].enrollStatus==1) {
				//签到了
				if(this.data.memberList[0].registeStatus==1) {
					
				} else {//没签到
					this.setData({
						'enroll.disabled': false,
						'registe.disabled': false,
						'leave.disabled': false,
						'enroll.content': '取消报名',
						'registe.content': '签到',
						'leave.content': '请假',
					})
				}
			} else { //取消报名了

			}
			//请假申请中
			if(this.data.memberList[0].identities.leaveStatus==0) {

			}
			//
			if(this.data.memberList[0].identities.leaveStatus==1) {

			}
		} else { //本人没参加
			this.setData({
				'enroll.disabled': false,
				'registe.disabled': true,
				'leave.disabled': true,
				'enroll.content': '报名',
				'registe.content': '签到',
				'leave.content': '请假',
			})
		}
	},
	enroll() {
		request({
			url: '/secondClass/activity/enroll',
			method: 'post',
			data:{
				activityId: this.data.aid
			}
		}).then(value => {
			console.log(value)
			if(value.code == 200) {
				wx.showToast({
					title: '报名成功',
					icon: 'none',
					duration:2000
				})
				this.getMember()
			} else {
				wx.showToast({
					title: value.msg,
					icon: 'none',
					duration:2000
				})
			}
			
		})
	},
	registe(e) {
		let pos = wx.getLocation({
			isHighAccuracy:true,
			success:(res) => {
				console.log(res)
				request({
					url: '/secondClass/activity/registe',
					method: 'post',
					data:{
						activityId: this.data.aid,
						location:`${res.longitude},${res.latitude}`
					}
				}).then(value => {
					console.log(value)
					if(value.code == 200) {
						wx.showToast({
							title: '签到成功',
							icon: 'none',
							duration:2000
						})
						this.getMember()
					} else {
						wx.showToast({
							title: value.msg,
							icon: 'none',
							duration:2000
						})
					}
					
				})
			}
		})
	},
	computedEnroll() {
		return '123'
	},
	getMember() {
		request({
			url: `/secondClass/activity/${this.data.aid}/participants`,
			method: 'GET',
			data:{
				pageNum:1,
				pageSize:10
			}
		}).then(value => {
			console.log(value.rows)
			// value.rows.forEach(item => {
			// 	let tempArr = []
			// 	if(item.identities.includes(0)) {
			// 		tempArr.push('发布者')
			// 	}if(item.identities.includes(2)) {
			// 		tempArr.push('负责人')
			// 	}  if(item.identities.includes(3)) {
			// 		tempArr.push('组织者')
			// 	} if(item.identities.includes(1)){
			// 		tempArr.push('参与者')
			// 	}
			// 	item.identities = tempArr
			// })
			this.setData({
				memberList:value.rows
			})
			this.computedState()
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
			aid:options.aid
		})
		console.log(options)
		this.getMember()
		request({
			url: `/secondClass/activity/${options.aid}`,
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