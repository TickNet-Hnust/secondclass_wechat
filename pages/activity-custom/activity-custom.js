// pages/activity-custom/activity-custom.js
import {request} from '../../js/http.js'
import getImgUrl from '../../utils/upload.js'
import {filterCourseClassificationList} from '../../utils/filterCourseClassificationList.js'
import {filter} from '../../utils/filter'
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
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
	getCenterLocation: function () {
		this.mapCtx.getCenterLocation({
		  success: function(res){
			console.log(res.longitude)
			console.log(res.latitude)
		  }
		})
	  },
	  moveToLocation: function () {
		this.mapCtx.moveToLocation()
	  
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
		wx.chooseMedia({
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
	surePosition() {
		this.mapCtx.getCenterLocation({
			success: function(res){
			  console.log(res.longitude)
			  console.log(res.latitude)
			}
		  })
		this.hideModal()
	},
	//点击了课程
	pickCourse(e) {
		console.log(e)
		this.setData({
			'fakeData.courseName':e.target.dataset.name
		})
		this.hideModal()
	},
	//点击了部门多选项
	ChooseDeptCheckbox(e) {
		let items = this.data.deptList;
		let values = e.currentTarget.dataset.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
		  if (i == values) {
			items[i].checked = !items[i].checked;
			break
		  }
		}
		this.setData({
			deptList: items
		})
	},
	//允许请假改变
	vacateChange(e){
		this.setData({
			'postData.vacate': Number(e.detail.value)
		})
	},
	//点击了报名年级多选项
	ChooseRangeCheckbox(e) {
		let items = this.data.range;
		let values = e.currentTarget.dataset.value;
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
		  if (i == values) {
			items[i].checked = !items[i].checked;
			break
		  }
		}
		this.setData({
			range: items
		})
		console.log(this.data.range,values)
	},
	//活动开始日期改变
	activityStartTimeFrontChange(e) {
		this.setData({
			'fakeData.activityStartTimeFront': e.detail.value
		})
	},
	//活动开始时间改变
	activityStartTimeEndChange(e) {
		this.setData({
			'fakeData.activityStartTimeEnd': e.detail.value
		})
	},
	//活动结束日期改变
	activityEndTimeFrontChange(e) {
		this.setData({
			'fakeData.activityEndTimeFront': e.detail.value
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
	evaluateStatusChange(e) {
		this.setData({
			'fakeData.evaluateStatus': e.detail.value
		})
		this.setData({
			'postData.evaluateStatus' : this.data.dict_evaluate_scheme[e.detail.value].dictValue
		})
	},
	//花絮改变
	flowerChange(e) {
		this.setData({
			'fakeData.flowerStatus': e.detail.value
		})
		this.setData({
			'postData.flowerStatus' : this.data.dict_flower[e.detail.value].dictValue
		})
	},
	//录取方式改变
	admissionWayChange(e) {
		this.setData({
			'fakeData.admissionWay': e.detail.value
		})
		this.setData({
			'postData.admissionWay' : this.data.dict_admissionWay[e.detail.value].dictValue
		})
	},
	//活动级别改变
	rankChange(e) {
		this.setData({
			'fakeData.rankIdno': e.detail.value
		})
		this.setData({
			'postData.rankId' : this.data.dict_rank[e.detail.value].dictValue
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
	//提交
	postActivity() {
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
		console.log()
		//收集报名学院范围
		this.setData({
			'postData.enrollRange': this.data.deptList.filter(item => item.checked).map(item => item.deptId).join(';')
		})
		//收集报名年级
		this.setData({
			'postData.enrollGrade': this.data.range.filter(item => item.checked).map(item => item.name).join(';')
		})
		
		console.log(this.data.postData)
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
		setTimeout(() => {
			this.mapCtx.moveToLocation()
		},1000)  
		//获取部门
		request({
			url: '/dept/util/listByType',
			method: 'GET',
			data:{type:1}
		}).then(value => {
			let tempArr =  value.data
			this.setData({
				deptList: tempArr.map(item => ({...item,checked:false}))
			})
			this.setData({
				deptList_picker: tempArr.map(item => item.deptName)
			})
		})
		//获取字典
		//活动级别
		request({
			url: '/dict/data/type/sc_train_program_rank',
			method: 'GET',
		}).then(value => {
			console.log(value)
			this.setData({
				dict_rank: value.data.map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel}))
			})
			this.setData({
				dict_rank_picker: value.data.map(item => item.dictLabel)
			})
		})
		//报名方式
		request({
			url: '/dict/data/type/sc_activity_admission_way',
			method: 'GET',
		}).then(value => {
			console.log(value)
			this.setData({
				dict_admissionWay: value.data.map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel}))
			})
		})
		//花絮管理
		request({
			url: '/dict/data/type/sc_activity_flower_scheme',
			method: 'GET',
		}).then(value => {
			console.log(value)
			this.setData({
				dict_flower: value.data.map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel}))
			})
		})
		//评价管理 
		request({
			url: '/dict/data/type/sc_activity_evaluate_scheme',
			method: 'GET',
		}).then(value => {
			console.log(value)
			this.setData({
				dict_evaluate_scheme: value.data.map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel}))
			})
		})
		//所有课程
		request({
			url: '/admins/secondClass/trainingProgram/detail',
			method: 'GET',
		}).then(value => {
			console.log(value,1212)
			this.setData({
				courseList: value.data.pageData.list
			})
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