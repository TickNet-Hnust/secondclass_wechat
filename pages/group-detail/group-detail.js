// pages/activity-detail/activity-detail.js
import {request} from '../../js/http.js'
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		targetUserIndex:null,
		//解决textarebug
		textShow:true,
		show:false,
		loadModal:true,
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
		title:'群组消息发布',
		TabCur:'', //决定是哪个tab
	},
	tabSelect(e) {
		this.setData({
		  TabCur: e.currentTarget.dataset.id,
		})
	},
	showNotice(e) {
		console.log(123)
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
		console.log(e)
		let copy = {...this.data.memberList[this.data.targetUserIndex]}
		copy.status = +e.currentTarget.dataset.state
		if(e.currentTarget.dataset.state == '1') {
			console.log(7777777777777,copy, this.data.gid)
			request({
				url: `/group/member/transfer?userId=${copy.userId}&groupId=${this.data.gid}`,
				method: 'PUT'
			}).then(value => {
				console.log(value)
			})
		}else {
			request({
				url: '/group/member',
				method: 'PUT',
				data: copy
			}).then(value => {
				console.log(value,copy)
			})
		}
		
	},
	ViewImage() {
		if(this.data.showData.avatar == null) {
			wx.previewImage({
				urls: ['../../images/group.png'],
				current:'../../images/group.png'
			});
		}else {
			wx.previewImage({
				urls: [this.data.showData.avatar.split(';')[0]],
				current:this.data.showData.avatar.split(';')[0]
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
			console.log(value)
			this.hideModal()
			this.setData({
				'postData.title': '',
				'postData.text': '',
			})
			if(value.code == 200) {
				wx.showToast({
				  title: '发布成功',
				  duration:2000
				})
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
					wx.showToast({
					  title: '用户取消',
					  icon:'none'
					})
				}
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
		  title:'群组消息发布',
		  'postData.title':'',
		  'postData.text':''
		})
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
			console.log(value)
			// this.setData({
			// 	memberList:value.rows
			// })
			this.getMember()
			this.getDetail()
		})
	},
	jumpDetail(e) {
		console.log(e)
		wx.navigateTo({
		  url: `../activity-detail/activity-detail?aid=${e.currentTarget.dataset.id}`,
		})
	},
	getDetail() {
		return request({
			url: `/group/${this.data.gid}/detail`,
			method: 'GET'
		}).then(value => {
			console.log(value)
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
	getActivity() {
		return request({
			url: `/secondClass/activity/group/list`,
			method: 'GET',
			data:{
				groupId: this.data.gid
			}
		}).then(value => {
			console.log(value)
			this.setData({
				activityList: value.rows
			})
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
			console.log(value)
			this.setData({
				AllMessageList: value.rows
			})
		})
	},
	//查看信息详情
	showForm(e) {
		console.log(e)
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
						wx.showToast({
						  title: '删除成功',
						  icon:'none',
						  duration:2000,
						})
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
			console.log('是否收藏了',value)
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
			wx.showToast({
				title: '操作成功',
				duration:1000
			})
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		this.setData({
			gid:options.gid,
			dict_ga_group_status: wx.getStorageSync('dict_ga_group_status'),
			dict_ga_group_user_status:wx.getStorageSync('dict_ga_group_user_status'),
			dict_ga_group_join_rule: wx.getStorageSync('dict_ga_group_join_rule'),
			groupClassificationMap: wx.getStorageSync('groupClassificationMap')
		})
		console.log(options)
		this.getMember().then(value => {
			console.log(value.rows)
			this.setData({
				memberList:value.rows
			})
		})
		this.getDetail()
		this.getActivity()
		this.getMsg()
		this.getCollection()
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {	
		this.setData({
			loadModal: false,
		});
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
		Promise.all([
			this.getMember(),
			this.getDetail(),
			this.getActivity(),
			this.getMsg(),
			this.getCollection()
		]).then(value => {
				this.setData({
					memberList:value[0].rows
				})
			
			wx.stopPullDownRefresh({
				success: (res) => {},
			})
		})
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		this.setData({
			loading: true
		})
		if(this.data.TabCur == 1) {
			this.getMember(this.data.memberNum).then(value => {
				this.data.memberList.push(...value.rows)
				this.data.memberNum++
				this.setData({
					memberList: this.data.memberList,
					memberNum: this.data.memberNum
				})
				this.setData({
					loading: false
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