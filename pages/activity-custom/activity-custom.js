// pages/activity-custom/activity-custom.js
import {request} from '../../js/http.js'
import getImgUrl from '../../utils/upload.js'
import {nullToast} from '../../utils/nullToast.js'
import {filterTwoLayer} from '../../utils/filterTwoLayer.js'
import {filter} from '../../utils/filter'
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//分类
		multiArray:[],
		multiIndex:[0,0],
		multiCourse:[],
		multiCourseIndex:0,
		searchValue:'',
		farSearch:[],
		searchShow: false,
		//当前学年
		nowYear:null,
		//地图
		mapCtx:null,
		CustomBar: app.globalData.CustomBar,
		courseList:[],
		courseClassificationList:[],
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
			registerStartTimeFront: '2021-07-01',
			registerStartTimeEnd: '00:00',
			registerEndTimeFront: '2021-09-01',
			registerEndTimeEnd: '24:00',
			registerStatus: true, //签到状态
			deptIdno:null,
			groupIdno:null,
			enrollRange: null,
			rankIdno: null,
			admissionWay:null,
			flowerStatus:null,
			integralStatus: null,//积分状态
			evaluateStatus:null,

		},
		activityReleaserName: '',//发布人
		guideTeacherName:'', //指导老师
		activityManagerName:'',//负责人
		activityOrganizerName:'',//组织者
		postData:{
			name:'', //活动名称
			groupId: '', //主办方
			activityReleaserId: '', //活动发布人
			deptId: '', //指导单位
			guideTeacherId: '', //指导老师ID

			enrollStartTime: '', //报名开始时间
			enrollEndTime: '',  //报名结束时间
			admissionWay: '', //录取方式
			enrollRange: '', //报名范围
			enrollGrade: '', //报名年级
			maxAdmissionNumber: '', //最大录取人数
			enrollNotice: '', //报名须知

			rankId: '', //活动级别
			activityTag: '', //活动标签
			courseId:'',
			courseClassificationId: '', //课程分类
			courseClassificationIdPath: '', //关联的课程的课程分类完整名字
			courseClassificationDetail: '',
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
	ChooseImage() {
		let that = this
		wx.chooseImage({
		  count: 1, //默认9
		  sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album','camera'], //从相册选择
		  success: (res) => {
			  	console.log(res.tempFilePaths,77)
			  	getImgUrl(res.tempFilePaths[0]).then(value => {
					console.log(value,147,"sdfg")
					that.setData({
						'postData.images': value
					})
				}) 
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
			wx.hideLoading()
		})
		console.log(this.data.searchValue)
	},
	//选定人
	sureHuman(e) {
		let {name,id} = this.data.state
		console.log(name,id,e,1212)
		this.setData({
			[name]: e.currentTarget.dataset.name,
			[id]: e.currentTarget.dataset.id
		})
		this.setData({
			searchShow:false
		})
		console.log(this.data[name],)
		console.log(e.currentTarget.dataset.name)
		console.log(e.currentTarget.dataset.id)
	},
	onSearch(){},
	onChange(e) {
		this.setData({
			searchValue:e.detail
		})
	},
	//打开远程搜索框
	showSearch(e) {
		this.setData({
			searchShow:true,
			'state.name':e.currentTarget.dataset.name,
			'state.id':e.currentTarget.dataset.id,
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
			'postData.name':e.detail.value
		})
	},
	VALUECHANGED(e) {
		console.log(e)
		this.setData({
			[e.currentTarget.dataset.value]:e.detail.value
		})
	},
	//最大录取人数改变
	numberChanged(e) {
		this.setData({
			'postData.maxAdmissionNumber': e.detail.value
		})
	},
	//确定分类
	MultiChange(e) {
		console.log(e.detail.value[0])
		this.setData({
			'postData.courseClassificationId': this.data.courseClassificationList[e.detail.value[0]].children[e.detail.value[1]].id,
			'postData.courseClassificationIdPath': this.data.courseClassificationList[e.detail.value[0]].id + ',' +this.data.courseClassificationList[e.detail.value[0]].children[e.detail.value[1]].id
		})
		request({
			url: '/secondClass/course/list',
			method: 'GET',
			data:{
				classificationId: this.data.courseClassificationList[e.detail.value[0]].children[e.detail.value[1]].id,
				schoolYearId: this.data.nowYear, 
				status: 1,
				term: 1,
				rank: this.data.postData.rankId
			}
		}).then(value => {
			console.log(value)
			this.setData({
				multiCourse:value.data
			})
		})
	},
	//分类列改变
	MultiColumnChange(e) {
		console.log(e)
		//复制数组
		let temp = [...this.data.multiArray]
		let index = [...this.data.multiIndex]
		//改变的是第一列，则让第二列为第一列对应的值children
		if(e.detail.column==0) {
			temp[1] = this.data.courseClassificationList[e.detail.value].children.map(item => item.name)
			index[0] = e.detail.value //改变选中的下标
			index[1] = 0
		}else { //否则，就只用改变第二列的选择
			index[1] = e.detail.value
		}
		this.setData({
			multiArray:temp,
			multiIndex:index,
			// 'postData.courseClassificationId': this.data.courseClassificationList[index[0]].children[index[1]].id,
			// 'postData.courseClassificationIdPath': this.data.courseClassificationList[index[0]].id + ',' +this.data.courseClassificationList[index[0]].children[index[1]].id
		})
		console.log(this.data.courseClassificationList[index[0]].children[index[1]].id)
		console.log(this.data.nowYear)
		console.log(this.data.postData.rankId)
		// e.datail.value
		
	},
	//确定经纬度
	surePosition() {
		this.mapCtx.getCenterLocation({
			success:(res)=>{
			  console.log(res.longitude)
			  console.log(res.latitude)
			  this.setData({
				'postData.activityPlace': res.longitude + ';' + res.latitude
			})
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
			range: items
		})
		console.log(this.data.range,values)
	},
	//活动开始日期改变
	TimeChange(e) {
		this.setData({
			[e.currentTarget.dataset.time]: e.detail.value
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
	//积分方案改变
	integralChange(e) {
		this.setData({
			'fakeData.integralStatus': e.detail.value
		})
		this.setData({
			'postData.integralScheme' : this.data.dict_flower[e.detail.value].dictValue
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
	//课程改变
	courseChange(e) {
		this.setData({
			'multiCourseIndex': e.detail.value,
			'postData.courseId': this.data.multiCourse[e.detail.value].id
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
		request({
			url: '/admins/group/list',
			method: 'get',
			data:{
				parentId: this.data.deptList[e.detail.value].deptId
			}
		}).then(value => {
			console.log(value,'group')
			this.setData({
				groupList: value.rows
			})
			this.setData({
				'fakeData.groupIdno': 0
			})
		})
	},
	groupChange(e) {
		
		this.setData({
			'fakeData.groupIdno': e.detail.value
		})
		this.setData({
			'postData.groupId' : this.data.groupList[e.detail.value].deptId
		})
	},
	//提交
	postActivity() {
		console.log(this.data.fakeData.registerStatus,777)
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
		console.log()
		//收集报名学院范围
		this.setData({
			'postData.enrollRange': this.data.deptList.filter(item => item.checked).map(item => item.deptId).join(';')
		})
		//收集报名年级
		this.setData({
			'postData.enrollGrade': this.data.range.filter(item => item.checked).map(item => item.name).join('，')
		})
		this.setData({
			'postData.schoolYearId': this.data.nowYear //默认当前学年
		})
		console.log(this.data.postData)
		let msg = nullToast(this.data.postData,'activity')

		if(msg == 'ok') {
			request({
				url: '/admins/secondClass/activity',
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
		} else {
			wx.showToast({
			  	title: msg,
			  	icon: 'none',
				duration: 2000
			})
		}
		
		
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
		// this.setData({
		// 	'postData.admissionWay': this.data.dict_admissionWay[0].dictValue
		// })

		this.setData({
			dict_flower: wx.getStorageSync('dict_flower').map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel}))
		})
		

		this.setData({
			dict_integral: wx.getStorageSync('dict_integral').map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel}))
		})
		

		this.setData({
			dict_evaluate_scheme: wx.getStorageSync('dict_evaluate_scheme').map(item => ({dictValue:item.dictValue,dictLabel:item.dictLabel}))
		})
		

		this.setData({
			courseClassificationList: filterTwoLayer(wx.getStorageSync('courseClassificationList'))
		})
		let temp = []
		temp.push(this.data.courseClassificationList.map(item => item.name))
		temp.push(this.data.courseClassificationList[0]?.children?.map(item =>item.name))
		this.setData({
			multiArray: temp,
			multiCourseIndex:0
		})

		this.setData({
			nowYear: wx.getStorageSync('nowYear')
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