// pages/activity-custom/activity-custom.js
import {request} from '../../js/http.js'
import getImgUrl from '../../utils/upload.js'
import {nullToast} from '../../utils/nullToast.js'
import {filterTwoLayer} from '../../utils/filterTwoLayer.js'
import {filter} from '../../utils/filter'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		TabCur: 0,
		trainingProgramId: null,
		trainingProgramList:[], //培养方案列表
		courseClassificationList:[], //积分分类列表
		courseClassificationListTwoId: null, //二级积分分类列表
		courseClassificationListTwo:[], //二级积分分类列表
		courseList:[], //课程列表
		title: '自定义活动',//页面标题
		//分类
		multiArray:[],
		multiIndex:[0,null],
		multiCourse:[],
		multiCourseIndex:0,
		searchValue:'',
		farSearch:[],
		recordList:[],//本地缓存记录
		recordState:true, //是否显示record
		searchShow: false,
		//当前学年
		nowYear:null,
		//地图
		mapCtx:null,
		CustomBar: app.globalData.CustomBar,
		imgList:[],
		fileList:[],
		index: 5,
		modalName: '',
		dict_admissionWay:[],
		dict_rank:[],
		dict_flower:[],
		dict_integral:[],
		dict_evaluate_scheme:[],
		//部门列表
		deptList:[],
		//群组
		groupList:[],
		//报名范围
		range: [{
			name: '2018',
			checked:false
		},{
			name: '2019',
			checked:false
		},{
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
			enrollRange: null,
		},
		activityReleaserName: '',//发布人
		guideTeacherName:'', //指导老师
		activityManagerName:'',//负责人
		activityOrganizerName:'',//组织者
		postData:{
			name:'', //活动名称
			groupId: '', //主办方
			activityReleaserId: '', //活动发布人
			deptId: null, //指导单位
			guideTeacherId: '', //指导老师ID

			enrollStartTime: '', //报名开始时间
			enrollEndTime: '',  //报名结束时间
			admissionWay: '', //录取方式
			enrollRange: '', //报名范围
			enrollGrade: '', //报名年级
			maxAdmissionNumber: '', //最大录取人数
			enrollNotice: '', //报名须知

			rankId: 0, //活动级别
			activityTag: '', //活动标签
			courseId:'',
			courseClassificationId: '', //课程分类
			courseClassificationPath: '', //关联的课程的课程分类Id
			courseClassificationName: '', //关联的课程的课程分类完整名字
			integralScheme: '', //积分方案
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
			activityManagerId: '', //活动负责人
			activityOrganizerId: '', //活动组织者
			images: '', //活动素材
			enclosure: '', //相关附件链接
			activityIntroduce: '', //活动介绍
			schoolYearId: '',
			recommend: 0 //默认不推荐
		},
		state:{
			name: '',
			id: '',
		},
		enrollNoticeShow: true,
		IntroduceShow:true
	},
	tabSelect(e) {
		this.setData({
			TabCur: e.currentTarget.dataset.id
		})
	},
	showNotice(e) {
		console.log(123)
		this.setData({
			[e.currentTarget.dataset.thing]:false
		})
	},
	hideNotice(e) {
		console.log(456)
		this.setData({
			[e.currentTarget.dataset.thing]:true
		})
	},
	//弹出
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
	ChooseImage() {
		let that = this
		wx.chooseImage({
		  count: 1, //默认9
		  sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album','camera'], //从相册选择
		  success: (res) => {
				console.log(res,77,res.tempFiles[0].size)
				
				if(!["jpg"].includes(res.tempFiles[0].path.slice(-3))) {
					Toast('图片只支持jpg')
					return ;
				}
				if(res.tempFiles[0].size > 1024 * 1024 * 2) {
					Toast('图片大小不能超过2M')
					return ;
				}
				that.setData({
					imgList:res.tempFilePaths
				})
				let file = res.tempFilePaths[0]
				wx.compressImage({
					src: file, // 图片路径
					quality: 10, // 压缩质量
					success:(res) => {
						console.log(file,'test1')
						console.log(res,'test2')
						getImgUrl(res.tempFilePath).then(value => {
							console.log(value,'图片的地址')
						  that.setData({
							  'postData.images': value
							})
						})
					}
				})
			
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
	//远程搜索人
	onClick() {
		wx.showLoading({
		  title: '加载中',
		})
		request({
			url: '/user/util/listByName',
			method: 'get',
			data:{
				name:this.data.searchValue
			}
		}).then(value => {
			console.log(value)
			this.setData({
				'farSearch' :value.data
			})
			if(value.data.length == 0) {
				Toast('没有找到匹配的人')
			}
		})
		console.log(this.data.searchValue)
	},
	//选定人并添加记录
	sureAddHuman(e) {
		let {name:proxyName,id:proxyId} = this.data.state
		//检测是否需要新添加记录
		const {id} = e.currentTarget.dataset
		const index = this.data.recordList.findIndex(item => {
			return item.id == id
		})
		if(index != -1) { //有对应记录
			let tempObj = this.data.recordList.splice(index,1)
			this.data.recordList.unshift(...tempObj)
		} else {
			this.data.recordList.unshift({ //添加记录
				id: e.currentTarget.dataset.id,
				name: e.currentTarget.dataset.name
			})
		}
		if(this.data.recordList.length > 10) { //记录数超限
			this.data.recordList.pop()
		}
		this.setData({
			recordList: this.data.recordList,
			searchShow:false //隐藏搜索组件
		})
		wx.setStorageSync('recordList', this.data.recordList)
		console.log(proxyName,proxyId,e,1212)
		this.setData({
			[proxyName]: e.currentTarget.dataset.name,
			[proxyId]: e.currentTarget.dataset.id
		})
		console.log(this.data[proxyName],)
		console.log(e.currentTarget.dataset.name)
		console.log(e.currentTarget.dataset.id)
	},
	//选定人
	sureHuman(e) {
		let {name,id} = this.data.state
		this.setData({
			[name]: e.currentTarget.dataset.name,
			[id]: e.currentTarget.dataset.id
		})
		//选中哪一个就到最前面
		let tempObj = this.data.recordList.splice(e.currentTarget.dataset.index,1)
		this.data.recordList.unshift(...tempObj)
		this.setData({
			searchShow:false,
			recordList: this.data.recordList
		})
	},
	onFocus() {
		this.setData({
			recordState: false
		})
	},
	onSearch(){},
	onChange(e) {
		this.setData({
			searchValue:e.detail
		})
	},
	//打开远程搜索框并清空上一次的选择
	showSearch(e) {
		this.setData({
			searchShow:true,
			recordState: true,
			'state.name':e.currentTarget.dataset.name,
			'state.id':e.currentTarget.dataset.id,
			searchValue:'',
			farSearch:[]
		})
		console.log(this.data.state)
	},
	//隐藏远程搜索框
	hideSearch() {
		this.setData({
			searchShow:false
		})
	},
	//name改变
	nameChanged(e) {
		this.setData({
			'postData.name':e.detail.value.trim()
		})
	},
	VALUECHANGED(e) {
		this.setData({
			[e.currentTarget.dataset.value]:e.detail.value.trim()
		})
	},
	//最大录取人数改变
	numberChanged(e) {
		this.setData({
			'postData.maxAdmissionNumber': e.detail.value.trim()
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
	//点击了课程
	pickCourse(e) {
		this.setData({
			'fakeData.courseName':e.target.dataset.name
		})
		this.hideModal()
	},
	//点击了部门多选项
	ChooseDeptCheckbox(e) {
		let items = this.data.deptList;
		let values = e.currentTarget.dataset.value; //点击了某个
		for (let i = 0, lenI = items.length; i < lenI; ++i) {
		  if (i == values) {
			items[i].checked = !items[i].checked;
			break
		  }
		}
		this.setData({
			deptList: items,
			'postData.enrollRange': this.data.deptList.filter(item => item.checked).map(item => item.deptId).join(';')
		})
	},
	//签到状态改变
	registerChange(e) {
		this.setData({
			'fakeData.registerStatus':e.detail.value
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
			range: items,
			'postData.enrollGrade': this.data.range.filter(item => item.checked).map(item => item.name).join('，')
		})
		console.log(this.data.range,values)
	},
	//报名开始日期改变
	enrollStartTimeChange(e) {
		this.setData({
			'postData.enrollStartTime': e.detail
		})
	},
	//报名结束日期改变
	enrollEndTimeChange(e) {
		this.setData({
			'postData.enrollEndTime': e.detail
		})
	},
	//活动开始时间改变
	activityStartTimeChange(e) {
		this.setData({
			'postData.activityStartTime': e.detail
		})
	},
	//活动结束时间改变
	activityEndTimeChange(e) {
		this.setData({
			'postData.activityEndTime': e.detail
		})
	},
	//签到开始时间改变
	registeStartTimeChange(e) {
		this.setData({
			'postData.registeStartTime': e.detail
		})
	},
	//签到结束时间改变
	registeEndTimeChange(e) {
		
		console.error(e)
		this.setData({
			'postData.registeEndTime': e.detail
		})
	},
	//评价状态改变
	evaluateStatusChange(e) {
		this.setData({
			'postData.evaluateStatus' : e.detail
		})
	},
	//花絮改变
	flowerChange(e) { //over
		this.setData({
			'postData.flowerStatus' : e.detail
		})
	},
	//积分方案改变
	integralChange(e) {
		this.setData({
			'postData.integralScheme' : e.detail
		})
	},
	//录取方式改变
	admissionWayChange(e) {  //over
		this.setData({
			'postData.admissionWay' : e.detail
		})
	},
	//课程改变
	courseChange(e) {
		this.setData({
			'multiCourseIndex': e.detail.value,
			'postData.courseId': this.data.multiCourse[e.detail.value].id
		})
	},
	//活动级别改变
	rankChange(e) { //over
		this.setData({
			'postData.rankId' : e.detail
		})
	},
	//培养方案改变
	trainingProgramChange(e) { //over
		this.setData({
			'trainingProgramId' : e.detail
		})
	},
	//一级分类改变
	courseClassificationChange(e) {
		this.setData({
			'postData.courseClassificationId' : e.detail
		})
		request({
			url: '/secondClass/course/list',
			method: 'get',
			data:{
				classificationId: e.detail,
				schoolYearId: this.data.nowYear,
				status: 1,
				rank: 0, //todo 假设现在都是院级
				trainingProgramId: this.data.trainingProgramId
			}
		}).then(value => {
			this.setData({
				courseList: value.data
			})
		})
		request({
			url: '/secondClass/courseClassification/listByParentId',
			method: 'get',
			data:{
				pid: e.detail,
			}
		}).then(value => {
			this.setData({
				courseClassificationListTwo: value.data
			})
		})
	},
	//课程改变
	courseChange(e) {
		this.setData({
			'postData.courseId' : e.detail
		})
	},
	//二级分类改变
	courseClassificationTwoChange(e) {
		const frontName = this.data.courseClassificationList.find(item => {
			return item.id == this.data.postData.courseClassificationId
		}).name
		const endName = this.data.courseClassificationListTwo.find(item => {
			return item.id == e.detail
		}).name
		this.setData({
			'postData.courseClassificationListTwoId' : e.detail,
			'postData.courseClassificationPath': `${this.data.postData.courseClassificationId}、${e.detail}`,
			'postData.courseClassificationName': `${frontName}、${endName}`
		})

	},
	//部门改变
	deptChange(e) {  //over
		this.setData({
			'postData.deptId' : e.detail
		})
		request({
			url: '/group/list',
			method: 'get',
			data:{
				parentId: e.detail
			}
		}).then(value => {
			console.log(value,'group')
			this.setData({
				'postData.groupId': this.data.postData.groupId,
				groupList: value.rows
			})
		})
	},
	groupChange(e) {
		this.setData({
			'postData.groupId' : e.detail
		})
	},
	//提交
	postActivity() {
		if(this.data.trainingProgramId == null) {
			Toast("培养方案不能为空")
			return 
		}
		this.setData({
			'postData.schoolYearId': this.data.nowYear //默认当前学年
		})
		let msg = nullToast(this.data.postData,'activity')
		
		if(msg == 'ok') {
			if(this.data.title == '修改活动') {
				request({
					url: '/secondClass/activity',
					method: 'PUT',
					data:this.data.postData
				}).then(value => {
					console.log(value,333)
					wx.navigateBack()
				})
			} else {
				request({
					url: '/secondClass/activity',
					method: 'POST',
					data:this.data.postData
				}).then(value => {
					console.log(value)
					if(value.code == 500) {
						Toast(value.msg)
					} else if(value.code == 200) {
						Toast('成功')
						wx.navigateBack({
							delta: 2,
						})
					}
				})
			}
			
		} else {
			Toast(msg)
		}
		
		
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		request({
			url: `/secondClass/activity/template/${options.tid}`,
			method: 'get'
		}).then(value => {
			
			Object.assign(value.data,{
				guideTeacherId : value.data.activityReleaserId,
				guideTeacherName : value.data.activityReleaserName,
				enrollStartTime: this.data.postData.enrollStartTime,
				enrollEndTime: this.data.postData.enrollEndTime,
				activityStartTime:this.data.postData.activityStartTime,
				activityEndTime:this.data.postData.activityEndTime,
				registeStartTime:this.data.postData.registeStartTime,
				registeEndTime:this.data.postData.registeEndTime,
				courseClassificationListTwoId: this.data.courseClassificationListTwoId,
				integralScheme: 0,
				recommend: 0
			})
			this.setData({
				postData: value.data
			})
		})
		request({
			url: '/secondClass/trainingProgram/list',
			method: 'GET'
		}).then(value => {
			this.setData({
				trainingProgramList: value.data
			})
		})

		this.mapCtx = wx.createMapContext('myMap')
		let tempDept =  wx.getStorageSync('deptList')
		this.setData({
			deptList: tempDept.map(item => ({...item,checked:false})),
			deptList_picker: tempDept.map(item => item.deptName)
		})

		let tempRank = wx.getStorageSync('dict_rank')
		this.setData({
			dict_rank: tempRank.map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel})),
			dict_rank_picker: tempRank.map(item => item.dictLabel)
		})

		this.setData({
			dict_admissionWay: wx.getStorageSync('dict_admissionWay').map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel}))
		})
		this.setData({
			recordList: wx.getStorageSync('recordList') || [],
			dict_flower: wx.getStorageSync('dict_flower').map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel})),
			dict_integral: wx.getStorageSync('dict_integral').map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel})),
			dict_evaluate_scheme: wx.getStorageSync('dict_evaluate_scheme').map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel})),
			courseClassificationList: filterTwoLayer(wx.getStorageSync('courseClassificationList'))
		})
		let temp = []
		temp.push(this.data.courseClassificationList.map(item => item.name))
		temp.push(this.data.courseClassificationList[0]?.children?.map(item =>item.name))
		this.setData({
			multiArray: temp,
			multiCourseIndex:0
		})
		setTimeout(() => {
			console.log(this.data.postData)
		},5000)
		this.setData({
			nowYear: wx.getStorageSync('nowYear')
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		setTimeout(() => {
			this.mapCtx.moveToLocation()
		},1000)  

		
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