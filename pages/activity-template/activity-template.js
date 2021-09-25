// pages/activity-template/activity-template.js
import {request} from '../../js/http.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		TabCur:0,
		fakeData:{
			enrollStartTimeFront: '2021-09-01',
			enrollStartTimeEnd: '00:00',
			enrollEndTimeFront: '2021-10-01',
			enrollEndTimeEnd: '24:00',
			activityStartTimeFront: '2021-09-01',
			activityStartTimeEnd: '00:00',
			activityEndTimeFront: '2021-10-01',
			activityEndTimeEnd: '24:00',
			registerStartTimeFront: '2021-09-01',
			registerStartTimeEnd: '00:00',
			registerEndTimeFront: '2021-10-01',
			registerEndTimeEnd: '24:00',
			registerStatus: true, //签到状态
			deptIdno:null,
			groupIdno:null,
			enrollRange: null,
			rankIdno: 0,
			admissionWay:null,
			flowerStatus:null,
			integralStatus: null,//积分状态
			evaluateStatus:null,

		},
		postData:{}
	},
	tabSelect(e) {
		this.setData({
		  TabCur: e.currentTarget.dataset.id,
		})
	  },
	  TimeChange(e) {
		this.setData({
			[e.currentTarget.dataset.time]: e.detail.value
		})
	},
	moveToLocation: function () {
		this.mapCtx.moveToLocation()
	  
	},
	registerChange(e) {

		this.setData({
			'fakeData.registerStatus':e.detail.value
		})
},
	//活动结束时间改变
	activityEndTimeEndChange(e) {
		this.setData({
			'fakeData.activityEndTimeEnd': e.detail.value
		})
	},
	//报名开始日期改变
	enrollStartTimeFrontChange(e) {
		this.setData({
			'fakeData.enrollStartTimeFront': e.detail.value
		})
	},
	//报名开始时间改变
	enrollStartTimeEndChange(e) {
		this.setData({
			'': e.detail.value
		})
	},
	//报名结束日期改变
	enrollEndTimeFrontChange(e) {
		this.setData({
			'': e.detail.value
		})
	},
	//报名结束时间改变
	enrollEndTimeEndChange(e) {
		this.setData({
			'fakeData.enrollEndTimeEnd': e.detail.value
		})
	},
	showModal(e) {
		let flag = true
		if(e.currentTarget.dataset.target == 'bottomModal') {
			wx.getSystemInfo({
				success: e => {
					if(e.locationEnabled == false) {
						wx.showModal({
							showCancel:false,
							content: '为确保定位准确，请先手动打开GPS'
						})
						flag = false
					}
				}
			})
		}
		flag && this.setData({
		  modalName: e.currentTarget.dataset.target
		})
	},
	VALUECHANGED(e) {
		console.log(e)
		this.setData({
			[e.currentTarget.dataset.value]:e.detail.value.trim()
		})
	},
	//name改变
	nameChanged(e) {
		this.setData({
			'postData.name':e.detail.value.trim()
		})
	},
	//隐藏model
	hideModal(e) {
		this.setData({
		  modalName: null
		})
	},
	//确定经纬度
	surePosition() {
		this.mapCtx.getCenterLocation({
			success:(res)=>{
			  console.log(res.longitude)
			  console.log(res.latitude)
			  this.setData({
				'postData.activityPlace': res.longitude + ',' + res.latitude
			})
			}
		})
		
		this.hideModal()
	},
	postActivity() {
		//允许请假没用
		if(!this.data.fakeData.registerStatus) {
			//收集签到开始与结束时间
			this.setData({
				'postData.registerStartTime' : `${this.data.fakeData.registerStartTimeFront} ${this.data.fakeData.registerStartTimeEnd}:00`,
				'postData.registerEndTime' : `${this.data.fakeData.registerEndTimeFront} ${this.data.fakeData.registerEndTimeEnd}:00`
			})
		} else {
			this.setData({
				'postData.registerStartTime' : '',
				'postData.registerEndTime' : ''
			})
		}
		//收集报名开始与结束时间
		this.setData({
			'postData.enrollStartTime' : `${this.data.fakeData.enrollStartTimeFront} ${this.data.fakeData.enrollStartTimeEnd}:00`,
			'postData.enrollEndTime' : `${this.data.fakeData.enrollEndTimeFront} ${this.data.fakeData.enrollEndTimeEnd}:00`
		})
		//收集活动开始时间与结束时间
		this.setData({
			'postData.activityStartTime' : `${this.data.fakeData.activityStartTimeFront} ${this.data.fakeData.activityStartTimeEnd}:00`,
			'postData.activityEndTime' : `${this.data.fakeData.activityEndTimeFront} ${this.data.fakeData.activityEndTimeEnd}:00`
		})

		if(!this.data.postData.name.trim()) {
			wx.showToast({
				title: '活动名称不能为空',
				icon: 'none'
			})
			return
		}
		if(!this.data.postData.activityPlace) {
			wx.showToast({
				title: '活动地点不能为空',
				icon: 'none'
			})
			return
		}
		if(!this.data.postData.activityPlaceName) {
			wx.showToast({
				title: '地点详细描述不能为空',
				icon: 'none'
			})
			return
		}

		request({
			url: '/secondClass/activity',
			method: 'POST',
			data:this.data.postData
		}).then(value => {
			console.log(value)
			if(value.code == 500) {
				wx.showToast({
					title: value.msg,
					icon: 'none',
					duration: 2000
				})
			} else if(value.code == 200) {
				wx.showToast({
					title: '成功',
					icon: 'success',
					duration: 2000,
					success:() =>{
						wx.navigateBack({
						  delta: 2,
						})
					}
				})
				
			}
		})
		
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.mapCtx = wx.createMapContext('myMap')
		setTimeout(() => {
			this.mapCtx.moveToLocation()
		},1000) 
		console.log(options)
		request({
			url: `/secondClass/activity/template/${options.tid}`,
			method: 'GET'
		}).then(value => {
			value.data.schoolYearId= wx.getStorageSync('nowYear')
			this.setData({
				postData: value.data
			})
			console.log(value,123)
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		// this.selectComponent('#tabs').resize();
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