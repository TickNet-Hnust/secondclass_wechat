// pages/activity-detail/activity-detail.js
import {request} from '../../js/http.js'
const app = getApp()
import Toast from '@vant/weapp/toast/toast';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		targetUserIndex:null,
		//解决textarebug
		textShow:true,
		show:false,
		loading: false,
		gid: null,
		isCollection: false,
		dict_ga_group_status:[],
		memberList:[],
		AllMessageList:[],
		messageList:[],
		activityList: [],
		groupClassificationMap:{},
		CustomBar: app.globalData.CustomBar,
		showData:{

		},
		postData:{
			title: '',
			text: '',
		},
		memberNum: 2,//记录成员的页数
		activityNum: 2,//记录活动的页数
		title:'群组消息发布',
		TabCur:'', //决定是哪个tab
	},
	tabSelect(e) {
		this.setData({
		  TabCur: e.currentTarget.dataset.id,
		})
	},
	showNotice(e) {
		if(this.data.title=='群组消息发布') {
			this.setData({
				textShow:false
			})
		}
	},
	hideNotice(e) {
		this.setData({
			textShow:true
		})
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
	statusChange(e) {
		let copy = {...this.data.memberList[this.data.targetUserIndex]}
		copy.status = +e.currentTarget.dataset.state
		copy.groupId = this.data.gid
		if(e.currentTarget.dataset.state == '1') {
			request({
				url: `/group/member/transfer?userId=${copy.userId}&groupId=${this.data.gid}`,
				method: 'PUT'
			}).then(value => {
				// console.log('转让负责人成功',)
				Toast('转让负责人成功')
				this.getMember().then(value => {
					console.log(value.rows)
					this.setData({
						memberList:value.rows
					})
				})
			})
		}else {
			request({
				url: '/group/member',
				method: 'PUT',
				data: copy
			}).then(value => {
				console.log('设为管理员成功',value)
				Toast(value.msg)
				this.getMember().then(value => {
					console.log('获得群组成员',value)
					this.setData({
						memberList:value.rows
					})
				})
			})
		}
		
	},
	updateJob() {
		// this.data.memberList[this.data.targetUserIndex]
		
			this.setData({
				modalName: 'jobModal'
			})
	},
	jobChange(e) {
		this.data.memberList[this.data.targetUserIndex].job = e.detail.value
	},
	sureUpdate() {
		this.data.memberList[this.data.targetUserIndex].groupId = this.data.gid
		request({
			url: '/group/member',
			method: 'put',
			data: this.data.memberList[this.data.targetUserIndex]
		}).then(value => {
			Toast('修改成功')
			
		this.setData({
			memberList: this.data.memberList
		})
		this.hideModal()
		})
	},
	ViewImage() {
		
		if(this.data.showData.avatar == null) {
			wx.previewImage({
				urls: ['https://img-blog.csdnimg.cn/8e7018841dc04c62b3e6bc2c8882a45b.png'],
				current:'https://img-blog.csdnimg.cn/8e7018841dc04c62b3e6bc2c8882a45b.png'
			});
		}else {
			// if(this.data.showData.avatar.endsWith('.')) {
			// 	this.data.showData.avatar = this.data.showData.avatar.slice(0,-1)
			// }
			console.log(this.data.showData.avatar)
			wx.previewImage({
				urls: [this.data.showData.avatar],
				current:this.data.showData.avatar,
				complete:(res) => {
					console.log(res)
				}
			});
		}
		
	},
	kaifa() {
		wx.showModal({
		  title: '提示',
		  content:'该功能还在开发中，敬请期待...'
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
			this.hideModal()
			this.setData({
				'postData.title': '',
				'postData.text': '',
			})
			if(value.code == 200) {
				console.log('群内消息发送成功',value)
				Toast('发布成功')
				this.getDetail()
				this.getMsg()
			}
		})
	},
	//解散群组
	disMissGoup() {
		wx.showModal({
			title: '提示框',
			content: '您确定要解散群组吗？',
			success:(res) => {
				if(res.confirm) {
					request({
						url: `/group/${this.data.gid}`,
						method:'DELETE'
					}).then(value => {
						wx.navigateBack({
						  delta: 1,
						})
					})
				} else {
					Toast('用户取消')
				}
			}
		})
		
	},
	quitGroup() {
		wx.showModal({
			title: '提示',
  			content: '您确定要退出群组吗？',
		}).then(value => {
			if(value.confirm) {
				request({
					url: `/group/member?groupId=${this.data.gid}`,
					method: 'DELETE',
				}).then(value => {
					console.log(value)
					if(value.msg == '您负责的该群组还有其他成员，无法退出！') {
						Toast('您负责的该群组还有其他成员，无法退出！')
					} else {
						Toast('退出成功')
						this.getMember().then(value => {
							console.log('获得成员列表',value)
							this.setData({
								memberList:value.rows
							})
						})
						this.getDetail()
					}
				})
			}
		})
	},
	showModal(e) {
		if(e.currentTarget.dataset.target == 'controlModal') {
			this.setData({
				targetUserIndex : e.currentTarget.dataset.index
			})
		}
		this.setData({
			modalName: e.currentTarget.dataset.target
		})
	},
	hideModal(e) {
		this.setData({
		  modalName: null,
		})
		setTimeout(() => {
			this.setData({
				title:'群组消息发布',
				'postData.title':'',
				'postData.text':''
			})
		},300)
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
			console.log('申请加入群组',value)
			if(value.data == 200) {
				Toast('申请成功')
			} else if(value.msg == "该群组不允许加入") {
				Toast('该群组不允许加入')
			}
			this.getMember().then(value => {
				console.log('获得成员列表',value)
				this.setData({
					memberList:value.rows
				})
			})
			this.getDetail()
		})
	},
	jumpDetail(e) {
		wx.navigateTo({
		  url: `../activity-detail/activity-detail?aid=${e.currentTarget.dataset.id}`,
		})
	},
	getDetail() {
		return request({
			url: `/group/${this.data.gid}/detail`,
			method: 'GET'
		}).then(value => {
			console.log('获得群组详细数据',value)
			this.setData({
				showData: value.data.groupDetail,
				messageList:value.data.msgList,
			})
		})
	},
	getMember(pageNum=1, pageSize=10) {
		return request({
			url: `/group/member/list`,
			method: 'GET',
			data:{
				groupId: this.data.gid,
				pageNum,
				pageSize
			}
		})
	},
	getActivity(pageNum=1, pageSize=10) {
		return request({
			url: `/secondClass/activity/group/list`,
			method: 'GET',
			data:{
				groupId: this.data.gid,
				pageNum,
				pageSize
			}
		})
	},
	getMsg() {
		return request({
			url: '/group/msg/list',
			method: 'get',
			data:{
				groupId: this.data.gid
			}
		}).then(value => {
			console.log('获得群组发布的消息',value)
			this.setData({
				AllMessageList: value.rows
			})
		})
	},
	//查看信息详情
	showForm(e) {
		this.setData({
			'postData.title': this.data.AllMessageList[e.currentTarget.dataset.index].title,
			'postData.text':this.data.AllMessageList[e.currentTarget.dataset.index].text,
			modalName: 'Messages',
			title:'群组消息查看'
		})
	},
	//删除信息
	deleteMsg(e) {
		wx.showModal({
			title: '提示框',
			content: '确定要删除该条信息吗',
			success:(res) => {
				console.log(res)
				if(!res.cancel) { //确定了
					request({
						url: `/group/msg/${e.currentTarget.dataset.id}`,
						method: 'DELETE'
					}).then(value => {
						Toast('删除成功')
						setTimeout(() => {
							this.getMsg()
							this.getDetail()
						},300)
						this.hideModal()
					})
				}
			}
		})
	},
	switchTab(){},
	onClose() {
		this.setData({ show: false });
	},
	getCollection() {
		//是否收藏了改群组
		return request({
			url: '/group/collection',
			method: 'get',
			data:{
				groupId: this.data.gid
			}
		}).then(value => {
			console.log('是否收藏了群组',value)
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
			Toast('操作成功')
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log('群组Id',options.gid)
		this.setData({
			gid:options.gid,
			dict_ga_group_status: wx.getStorageSync('dict_ga_group_status'),
			dict_ga_group_user_status:wx.getStorageSync('dict_ga_group_user_status'),
			dict_ga_group_join_rule: wx.getStorageSync('dict_ga_group_join_rule'),
			groupClassificationMap: wx.getStorageSync('groupClassificationMap')
		})
		this.getMember().then(value => {
			console.log('获得成员列表',value)
			this.setData({
				memberList:value.rows
			})
		})
		this.getActivity().then(value => {
			console.log('获得活动列表',value)
			this.setData({
				activityList: value.rows
			})
		})
	
		this.getDetail()
		this.getMsg()
		this.getCollection()
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
		
		this.setData({
			activityNum: 2,
			memberNum: 2
		})
		this.getMember().then(value => {
			console.log('memberList',value.rows)
			this.setData({
				memberList:value.rows
			})
		})
		this.getActivity().then(value => {
			console.log('获得活动列表',value)
			this.setData({
				activityList: value.rows
			})
		})
		this.getDetail()
	
		this.getMsg()
		this.getCollection()
		if(app.globalData.toast) {
			Toast({
				message:'群组修改成功',
				zIndex: 2000
			});
			app.globalData.toast = ''
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
		Promise.all([
			this.getMember(),
			this.getDetail(),
			this.getActivity(),
			this.getMsg(),
			this.getCollection()
		]).then(value => {
				this.setData({
					memberList:value[0].rows,
					memberNum: 2,//记录成员的页数
					activityNum: 2,
				})
				this.setData({
					activityList: value[2].rows
				})
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
			isLoading: true
		})
		if(this.data.TabCur == 1) {
			this.getMember(this.data.memberNum).then(value => {
				this.data.memberList.push(...value.rows)
				if(value.rows.length) {
					this.data.memberNum++
				}
				this.setData({
					memberList: this.data.memberList,
					memberNum: this.data.memberNum
				})
				this.setData({
					isLoading: false
				})
			})
		} else if(this.data.TabCur == 2) {
			this.getActivity(this.data.activityNum).then(value => {
				this.data.activityList.push(...value.rows)
				if(value.rows.length) {
					this.data.activityNum++
				}
				this.setData({
					activityList: this.data.activityList,
					activityNum: this.data.activityNum
				})
				this.setData({
					isLoading: false
				})
			})
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})