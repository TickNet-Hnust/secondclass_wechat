// pages/activity-detail/activity-detail.js
import {request} from '../../js/http.js'
import getImgUrl from '../../utils/upload.js'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isNeedToRefresh: false,//是否需要刷新
		//决定是否显示哪一个tab
		TabCur:0,
		//节流判断变量
		valid:true,
		count:0,
		operation: [
			[
				// { title: '修改', status: 0 },
				{
					title: '申请发布',
					status: 1
				},
				// {
				// 	title: '管理员发布',
				// 	status: 2
				// },
				{
					title: '取消',
					status: 4
				}
			],
			[
				// { title: '审批', status: 2 },
				// {
				// 	title: '撤回',
				// 	status: 0
				// }
			],
			[
				{
					title: '启动报名',
					status: 5
				},
				// {
				// 	title: '撤回',
				// 	status: 0
				// },
				// {
				// 	title: '取消',
				// 	status: 4
				// }
			],
			[
				// { title: '修改', status: 0 },
				{
					title: '取消',
					status: 4
				}
			],
			[
				{
					title: '恢复',
					status: 0
				}
			],
			[
				{
					title: '结束报名',
					status: 6
				},
				{
					title: '启动活动',
					status: 7
				},
				{
					title: '暂停报名',
					status: 2
				},
				// {
				// 	title: '撤回',
				// 	status: 0
				// }
			],
			[
				{
					title: '启动活动',
					status: 7
				},
				{
					title: '恢复报名',
					status: 5
				}
			],
			[
				{
					title: '结束活动',
					status: 8
				},
				{
					title: '暂停活动',
					status: 6
				}
			],
			[
				// {
				// 	title: '取消',
				// 	status: 4
				// },
				{
					title: '恢复活动',
					status: 7
				}
			]
		],
		active:0,
		isCollection:false,
		CustomBar: app.globalData.CustomBar,
		show:false,
		loadModal:true,
		name: 'sfaf',
		aid: null,
		memberList:[],
		flowerList:[],
		remarkList:[],
		showData:{
			name: '',
			groupId: '',
			activityReleaserName: '',
			guideTeacherName: '',
			deptName: '',
			enrollStartTime: '',
			enrollEndTime: '',
			admissionWay: '', //
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
			activityStatusId:''
		},
		enroll:{
			disabled: false,
			content: '报名',
			hint:'未报名'
		},
		registe:{
			disabled: false,
			content: '签到',
			hint:'未签到'
		},
		leave:{
			disabled: false,
			content: '请假',
			hint:'未请假'
		},
		//花絮
		dict_flower:[],
		//评价
		dict_evaluate_scheme:[],
		//级别
		dict_rank:[],
		//录取方式
		dict_admissionWay:[],
		imgList:[],
		leaveReason:'', //请假原因
		material:'', //请假材料
		memberNum: 2,
		flowerNum: 2,
		evaluateNum: 2,
	},
	//tab切换
	tabSelect(e) {
		this.setData({
		  TabCur: e.currentTarget.dataset.id,
		})
		// this.toggleDelay()
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
	kaifa() {
		wx.showModal({
		  title: '提示',
		  content:'该功能还在开发中，敬请期待...'
		})
	  },
	jumpActivityScore() {
		wx.navigateTo({
			url: `../activity-score/activity-score?aid=${this.data.aid}`,
		})
	},
	//进入发布花絮页面
	jumpSideLight() {
		wx.navigateTo({
			url: `../activity-sideLight/activity-sideLight?aid=${this.data.aid}`,
		})
	},
	jumpEntry() {
		wx.navigateTo({
			url: `../activity-entry/activity-entry?aid=${this.data.aid}`,
		})
	},
	canSendF() {
		wx.showToast({
			title: '该活动暂不允许发布花絮',
			icon: 'none'
		})
	},
	canSendP() {
		wx.showToast({
			title: '该活动暂不允许发布评论',
			icon: 'none'
		})
	},
	//进入发布评论页面
	jumpComment() {
		wx.navigateTo({
			url: `../activity-comment/activity-comment?aid=${this.data.aid}`,
		})
	},
	showDialog() {
		this.setData({
			show: true
		})
	},
	getCollection() {
		//是否收藏了改群组
		return request({
			url: `/secondClass/activity/collection/${this.data.aid}`,
			method: 'get'
		}).then(value => {
			console.log('是否收藏了',value)
			this.setData({
				isCollection: value.data
			})
		})
	},
	updateActivity() {
		this.isNeedToRefresh = true
		wx.navigateTo({
		  url: `../activity-custom/activity-custom?aid=${this.data.aid}`,
		})
	},
	setCollection() {
		//改变收藏了改群组
		request({
			url: `/secondClass/activity/collection/${this.data.aid}`,
			method: 'POST'
		}).then(value => {
			console.log('收藏了',value)
			this.getCollection()
			wx.showToast({
				title: '操作成功',
				duration:1000
			})
		})
	},
	//改变活动状态
	changeState(e) {
		request({
			url: `/secondClass/activity/${this.data.aid}/${e.currentTarget.dataset.status}`,
			method: 'PUT',
		}).then(value => {
			wx.showToast({
			  title: value.msg,
			  icon: 'none',
			  duration:2000
			})
			if(value.code == 200) {
				this.setData({
					'showData.status': e.currentTarget.dataset.status
				})
				wx.showToast({
				  title: '修改活动状态成功',
				  icon: 'none'
				})
			}
			
		})
	},
	reasonInput(e) {
		this.setData({
			reason: e.detail.value
		})
	},
	putLeave() {
		console.log(this.data.aid,
			 this.data.reason,
			 this.data.material)
			 if(!this.data.reason) {
				Toast({
					zIndex:9999,
					message: '请填写请假原因'
				})
				return
			 }
		request({
			url: '/secondClass/activity/leave',
			method: 'POST',
			data:{
				activityId: this.data.aid,
				reason: this.data.reason,
				material: this.data.material
			}
		}).then(value => {
			console.log(value)
			if(value.code == 200) {
				this.hideModal()
				Toast({
					zIndex:9999,
					message: '提交成功'
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
	getUserInfo(event) {
		console.log(event.detail);
	},
	ViewImage(e) {
		wx.previewImage({
		  urls: this.data.imgList,
		  current: e.currentTarget.dataset.url
		});
	},
	
	ViewFlower(e) {
		console.log(e)
		wx.previewImage({
		  urls: e.currentTarget.dataset.all,
		  current: e.currentTarget.dataset.all[e.target.dataset.index]
		});
	},
	ChooseImage() {
		let that =  this
		wx.chooseImage({
		  count: 1, //默认9
		  sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album','camera'], //从相册选择
		  success: (res) => {
			console.log(res,77,)
			if(!["jpg"].includes(res.tempFiles[0].path.slice(-3))) {
				wx.showToast({
				  title: '图片只支持jpg格式',
				  icon: 'none',
				  duration:2000
				})
				return ;
			}
			if(res.tempFiles[0].size > 1024*1024*2) {
				wx.showToast({
				  title: '图片大小不能超过2M',
				  icon: 'none',
				  duration:2000
				})
				return ;
			}
			that.setData({
				imgList: res.tempFilePaths
			})
			console.log(res.tempFilePaths[0],'历经啊')
				wx.compressImage({
					src: res.tempFilePaths[0], // 图片路径
					quality: 10, // 压缩质量
					success:(val) => {
						getImgUrl(val.tempFilePath).then(value => {
						  that.setData({
							  'material': value
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
	computedState() {
		
		//本人参加了
		if(this.data?.memberList[0]?.identities.includes(4)) {
			//报名了
			if(this.data?.memberList[0].enrollStatus==1) {
				this.setData({
					'enroll.disabled':true,
					'enroll.hint':'已报名',
				})
				//签到了
				if(this.data?.memberList[0].registeStatus==1) {
					this.setData({
						'registe.disabled': true,
						'registe.hint': '已签到',
					})
				} else {//没签到
					this.setData({
						'registe.disabled': false,
						// 'enroll.content': '取消报名',//目前还没有写取消报名
						'registe.content': '签到',
					})
				}
			} else { //取消报名了

			}
			//请假申请中
			if(this.data?.memberList[0].leaveStatus==0) {
				this.setData({
					'leave.disabled': true,
					'leave.hint':'请假中'
				})
			}
			//
			if(this.data?.memberList[0].leaveStatus==1) {
				this.setData({
					'leave.disabled': true,
					'leave.hint':'请假成功'
				})
			}
			if(this.data?.memberList[0].leaveStatus==2) {
				this.setData({
					'leave.disabled': false,
					'leave.hint':'请假'
				})
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
	throttle(e){
		
		//拿到点击时传来的方法名
		// let funcName = e.currentTarget.dataset.methods
		// console.log(funcName,'传来的方法名')
		// 	if(!this.data.valid){
		// 		return false 
		//  }
		//  this.setData({
		// 	 valid:false,
		//  })
		//  console.log(this.data.count,'执行次数')
		//  if(this.data.count==0)
		//  {
		// 	this[funcName]();
		// 	this.setData({
		// 		valid:true,
		// 		count:this.data.count+1,
		// 	})

		//  }else{
		// 	  setTimeout(() => {
		// 	 //通过方法名运行该函数
		// 	  this[funcName]();
		// 		this.setData({
		// 			valid:true,
		// 			count:this.data.count+1,
		// 		})
		//   }, 2000)
		//  }
		// let funcName = e.currentTarget.dataset.methods
		// console.log(funcName,'传进来的方法名')
		// console.log(this.data.valid,'进来时的状态')
		//  if(this.data.valid)
		//  {
		// 	console.log('执行函数');
		// 	this[funcName]();
		// 	this.setData({
		// 		valid:false,
		// 	})
			
		//  }else{
		// 	  console.log('return false');
		// 	  return false;
		//  }
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
				Toast('报名成功');
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
		let flag = true
		wx.getSystemInfo({
			success: e => {
				console.log(e,666)
				if(e.locationEnabled == false) {
					wx.showModal({
						showCancel:false,
						content: '为确保定位准确，请先手动打开GPS'
					})
					flag = false
				}
			}
		})
		if(flag) {
			wx.showLoading({
			  title: '获取定位中',
			  mask:true
			})
			wx.getLocation({
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
						wx.hideLoading()
						if(value.code == 200) {
							Toast('签到成功');
							this.enroll.disabled = true //防止用户狂点触发第二次
							this.getMember()
						} else {
							wx.showToast({
								title: value.msg,
								icon: 'none',
								mask:true,
								duration:2000
							})
						}
					}).catch(() => {
						wx.hideLoading()
					})
				}
			})
		}
	},
	//请假
	leave() {
		
	},
	computedEnroll() {
		return '123'
	},
	getMember(pageNum = 1,pageSize = 10) {
		return request({
			url: `/secondClass/activity/${this.data.aid}/participants`,
			method: 'GET',
			data:{
				pageNum,
				pageSize
			}
		}).then(value => {
			console.log(value,'getmember')
			this.setData({
				memberList:value.rows
			})
			wx.nextTick(() => {
				
			})
			this.computedState()
		})
	},
	getFlower(pageNum = 1,pageSize = 10) {
		return request({
			url: '/secondClass/activity/flower/list',
			method: 'GET',
			data:{
				activityId:this.data.aid,
				pageNum,
				pageSize
			}
		}).then(value => {
			this.setData({
				flowerList: value.rows
			})
		})
	},
	getEvaluation(pageNum = 1,pageSize = 10) {
		return request({
			url: '/secondClass/activity/evaluation/list',
			method: 'GET',
			data:{
				activityId:this.data.aid,
				pageNum,
				pageSize
			}
		}).then(value => {
			console.log(value,'评论')
			this.setData({
				remarkList: value.rows
			})
		})
	},
	getDetail() {
		return request({
			url: `/secondClass/activity/detail/${this.data.aid}`,
			method: 'GET',
			data:{
				activityId:this.data.aid
			}
		}).then(value => {
			console.log(value,'showdaata')
			this.setData({
				showData: value.data
			})
		})
	},
	switchTab(e){
		this.setData({
			active: e.detail.index
		})
	},
	onClose() {
		this.setData({ show: false });
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log('aid',options.aid)
		this.setData({
			aid:options.aid
		})
		Promise.all([
			this.getDetail(),
			this.getCollection(),
			this.getMember(),
			this.getFlower(),
			this.getEvaluation()
		]).then(value => {
			this.setData({
				loadModal: false,
			});
		})
		this.setData({
			dict_admissionWay:wx.getStorageSync('dict_admissionWay'),
			dict_rank:wx.getStorageSync('dict_rank'),
			dict_evaluate_scheme:wx.getStorageSync('dict_evaluate_scheme'),
			dict_flower:wx.getStorageSync('dict_flower'),
			dict_sc_activity_status:wx.getStorageSync('dict_sc_activity_status')
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
		if(this.isNeedToRefresh) {
			
			Promise.all([
				this.getDetail(),
				this.getCollection(),
				this.getMember(),
				this.getFlower(),
				this.getEvaluation()
			]).then(value => {
				this.setData({
					loadModal: false,
				});
				wx.showToast({
					title: '修改成功',
				})
			})
			this.setData({
				dict_admissionWay:wx.getStorageSync('dict_admissionWay'),
				dict_rank:wx.getStorageSync('dict_rank'),
				dict_evaluate_scheme:wx.getStorageSync('dict_evaluate_scheme'),
				dict_flower:wx.getStorageSync('dict_flower'),
				dict_sc_activity_status:wx.getStorageSync('dict_sc_activity_status')
			})
			this.isNeedToRefresh = false
		}
		
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
		console.log('onPullDownRefresh')
		this.computedState()
		let arr = []
		if(this.data.TabCur == 0) {
			arr = [
				this.getDetail(),
				this.getCollection(),
				this.getMember()
			]
		} else if(this.data.TabCur ==1) {
			arr = [
				this.getMember()
			]
		}else if(this.data.TabCur ==2) {
			arr = [
				this.getFlower()
			]
		}else {
			arr = [
				this.getEvaluation()
			]
		}
		Promise.all(arr).then(() => {
			wx.stopPullDownRefresh({
				success: (res) => {},
			})
			app.showSuccess()
		})
		
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		this.setData({
			isLoading:true
		})
		if(this.data.TabCur == 1) {
			request({
				url: `/secondClass/activity/${this.data.aid}/participants`,
				method: 'GET',
				data:{
					pageNum:this.data.memberNum,
					pageSize:10
				}
			}).then(value => {
				this.data.memberList.push(...value.rows)
				this.data.memberNum++
				this.setData({
					memberList: this.data.memberList,
					memberNum: this.data.memberNum,
				})
			})
		} else if(this.data.TabCur == 2) {
			request({
				url: '/secondClass/activity/flower/list',
				method: 'GET',
				data:{
					activityId:this.data.aid,
					pageNum:this.data.flowerNum
				}
			}).then(value => {
				this.data.flowerList.push(...value.rows)
				this.data.flowerNum++
				this.setData({
					flowerList: this.data.flowerList,
					flowerNum: this.data.flowerNum
				})
			})
		} else if(this.data.TabCur == 3) {
			request({
				url: '/secondClass/activity/evaluation/list',
				method: 'GET',
				data:{
					activityId:this.data.aid,
					pageNum:this.data.evaluateNum,
					pageSize:10
				}
			}).then(value => {
				this.data.remarkList.push(...value.rows)
				this.data.evaluateNum++
				this.setData({
					remarkList: this.data.remarkList,
					evaluateNum: this.data.evaluateNum
				})
			})
		}
		this.setData({
			isLoading:false
		})
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})