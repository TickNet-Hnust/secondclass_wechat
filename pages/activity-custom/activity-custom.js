// pages/activity-custom/activity-custom.js
let http = require('../../js/http.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		index: 5,
		modalName: '',
		picker: [],
		//部门列表
		deptList:[],
		//报名范围
		range: [{
			value: 0,
			name: '2020',
			checked:false
		},{
			value: 1,
			name: '2021',
			checked:false
		},{
			value: 2,
			name: '2022',
			checked:false
		},{
			value: 3,
			name: '2023',
			checked:false
		},],
		checkbox: [{
			value: 0,
			name: '10元',
			checked: false,
			hot: false,
		  }, {
			value: 1,
			name: '20元',
			checked: true,
			hot: false,
		  }, {
			value: 2,
			name: '30元',
			checked: true,
			hot: true,
		  }, {
			value: 3,
			name: '60元',
			checked: false,
			hot: true,
		  }, {
			value: 4,
			name: '80元',
			checked: false,
			hot: false,
		  }, {
			value: 5,
			name: '100元',
			checked: false,
			hot: false,
		  }],
		fakeData:{
			enrollStartTimeFront: '2021-07-01',
			enrollStartTimeEnd: '00:00',
			enrollEndTimeFront: '2021-09-01',
			enrollEndTimeEnd: '24:00',
			deptno:null,
			enrollRange: null
		},
		postData:{
			name:'', //活动名称
			groupId: 205, //主办方
			activityReleaserId: 111, //活动发布人
			deptId: null, //指导单位
			guideTeacherId: 105, //指导老师ID

			enrollStartTime: '', //报名开始时间
			enrollEndTime: '',  //报名结束时间
			admissionWay: '', //录取方式
			enrollRange: '', //报名范围
			enrollGrade: '', //报名年级
			maxAdmissionNumber: '', //最大录取人数
			enrollNotice: '', //报名须知

			rankId: '', //活动级别
			activityTag: 'sdf,sdg', //活动标签
			courseClassificationId: '', //课程分类
			courseClassificationName: '', //关联的课程的课程分类完整名字
			integralScheme: '', //积分方案
			activityTime: '', //转换前的活动时间
			activityStartTime: '', //活动开始时间
			activityEndTime: '', //活动结束时间
			vacate: 1, //允许请假
			flowerStatus: '', //是否开启花絮
			evaluateStatus: '', //是否开启评价
			activityPlace: '', //活动地点坐标
			activityRegisteDistance: '', //活动签到距离
			activityPlaceName: '', //活动地点名称
			registeTime: '', //签到时间
			registeStartTime: '', //签到开始时间
			registeEndTime: '', //签到结束时间
			activityManagerId: 103, //活动负责人
			activityOrganizerId: 103, //活动组织者
			images: '', //活动素材
			enclosure: '', //相关附件链接
			activityIntroduce: '', //活动介绍
			schoolYearId: ''
		}
		


	},
	//弹出
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
	  ChooseCheckbox(e) {
		let items = this.data.range;
		let values = e.currentTarget.dataset.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
		  if (items[i].value == values) {
			items[i].checked = !items[i].checked;
			break
		  }
		}
		this.setData({
			range: items
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
			'fakeData.enrollStartTimeEnd': e.detail.value
		})
	},
	//报名结束日期改变
	enrollEndTimeFrontChange(e) {
		this.setData({
			'fakeData.enrollEndTimeFront': e.detail.value
		})
	},
	//报名结束时间改变
	enrollEndTimeEndChange(e) {
		this.setData({
			'fakeData.enrollEndTimeEnd': e.detail.value
		})
	},
	//部门改变
	deptChange(e) {
		this.setData({
			'fakeData.deptno': e.detail.value
		})
		this.setData({
			'postData.deptId' : this.data.deptList[e.detail.value].deptId
		})
		
	},
	//提交
	postActivity() {
		//收集报名开始与结束时间
		this.setData({
			'postData.enrollStartTime' : `${this.data.fakeData.enrollStartTimeFront} ${this.data.fakeData.enrollStartTimeEnd}:00`,
			'postData.enrollEndTime' : `${this.data.fakeData.enrollEndTimeFront} ${this.data.fakeData.enrollEndTimeEnd}:00`
		})

		console.log(this.data.postData)
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
		let tempArr =  wx.getStorageSync('dept')
		this.setData({
			deptList: tempArr
		})
		this.setData({
			picker: tempArr.map(item => item.deptName)
		})
		console.log(this.data.deptList,this.data.picker,12)
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