// pages/activity-custom/activity-custom.js
let http = require('../../js/http.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		name:'', //活动名称
		groupId: 205, //主办方
		activityReleaserId: 111, //活动发布人
		deptId: '', //指导单位
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


	},
	//选择报名时间
	pickEnrollTime() {

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