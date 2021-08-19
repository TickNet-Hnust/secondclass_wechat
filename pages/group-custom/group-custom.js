// pages/activity-custom/activity-custom.js
import {request} from '../../js/http.js'
import getImgUrl from '../../utils/upload.js'
import {filterGroupClassificationList} from '../../utils/filterCourseClassificationList.js'
import {filter} from '../../utils/filter'
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//当前学年
		multiArray:[],
		multiIndex:[0,0],
		nowYear:null,
		mapCtx:null,
		CustomBar: app.globalData.CustomBar,
		courseList:[],
		imgList:[],
		fileList:[],
		index: 5,
		modalName: '',
		dict_admissionWay:[],
		dict_rank:[],
		dict_flower:[],
		dict_evaluate_scheme:[],
		//部门列表
		deptList:[],
		//报名范围
		range: [{
			name: '2020',
			checked:false
		},{
			name: '2021',
			checked:false
		},{
			name: '2022',
			checked:false
		},{
			name: '2023',
			checked:false
		}],
		fakeData:{
			enrollStartTimeFront: '2021-07-01',
			enrollStartTimeEnd: '00:00',
			enrollEndTimeFront: '2021-09-01',
			enrollEndTimeEnd: '24:00',
			activityStartTimeFront: '2021-07-01',
			activityStartTimeEnd: '00:00',
			activityEndTimeFront: '2021-09-01',
			activityEndTimeEnd: '24:00',
			deptIdno:null,
			enrollRange: null,
			rankIdno: null,
			admissionWay:null,
			flowerStatus:null,
			evaluateStatus:null
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
	//隐藏model
	hideModal(e) {
		this.setData({
		  modalName: null
		})
	},
	MultiColumnChange(e) {
		
	},
	ViewImage(e) {
		wx.previewImage({
		  urls: this.data.imgList,
		  current: e.currentTarget.dataset.url
		});
	},
	ViewFile(e) {
		wx.previewImage({
			urls: this.data.imgList,
			current: e.currentTarget.dataset.url
		  });
	},
	ChooseImage() {
		wx.chooseImage({
		  count: 4, //默认9
		  sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album'], //从相册选择
		  success: (res) => {
			  console.log(res)
			  getImgUrl(res.tempFilePaths[0]).then(value => console.log(value,147))
			if (this.data.imgList.length != 0) {
			  this.setData({
				imgList: this.data.imgList.concat(res.tempFilePaths)
			  })
			} else {
			  this.setData({
				imgList: res.tempFilePaths
			  })
			}
		  }
		});
	},
	DelImg(e) {
		wx.showModal({
		  title: '提示框',
		  content: '确定要移除这张图片吗？',
		  cancelText: '取消',
		  confirmText: '确定',
		  success: res => {
			if (res.confirm) {
			  this.data.imgList.splice(e.currentTarget.dataset.index, 1);
			  this.setData({
				imgList: this.data.imgList
			  })
			}
		  }
		})
	},
	//部门改变
	deptChange(e) {
		this.setData({
			'fakeData.deptIdno': e.detail.value
		})
		this.setData({
			'postData.deptId' : this.data.deptList[e.detail.value].deptId
		})
		
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.mapCtx = wx.createMapContext('myMap')
		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { 
		//获取部门
		request({
			url: '/dept/util/listCollege',
			method: 'GET'
		}).then(value => {
			this.setData({
				deptList: value.data
			})
		})
		request({
			url: '/secondClass/schoolYear/nowYear',
			method: 'GET'
		}).then(value => {
			this.setData({
				nowYear: Object.keys(value.data)[0]
			})
		})
		request({
			url: '/admins/group/type/list',
			method: 'GET',
		}).then(value => {
			console.log(value, '分类列表')
		})
		
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