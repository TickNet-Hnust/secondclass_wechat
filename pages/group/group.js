// pages/activity/activity.js
import {request} from '../../js/http.js'
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isNeedToRefresh:false,
		toggleDelay:false,
		groupClassificationMap:{},
		dict_ga_group_status:[],
		active: 0,
		value: '',
		recommendGroupList:[],
		recommendNum:2,
		myGroupList:[],
		myPageNum:2,
		collectionGroupList:[],
		collectionNum:2,
		TabCur:''
	},
	tabSelect(e) {
		this.setData({
			TabCur: e.currentTarget.dataset.id,
		})
		// this.toggleDelay()
	  },
	// activeChange(e) {
	// 	console.log(e)
	// 	this.data.active = e.detail.index
	// 	this.setData({
	// 		// active: e.detail.index
	// 	})
	// 	this.toggleDelay()
	// },
	toggleDelay() {
		let temp 
		if(this.data.TabCur == 0) {
			temp = 'toggleDelayOne'
		}else if(this.data.TabCur == 1) {
			temp = 'toggleDelayTwo'
		}else {
			temp = 'toggleDelayThree'
		}
		this.setData({
			[temp]: true
		})
		setTimeout(()=> {
			this.setData({
				[temp]: false
			})
		}, 1500)
	  },
	jumpDetail(e) {
		this.data.isNeedToRefresh = true
		wx.navigateTo({
		  url: `../group-detail/group-detail?gid=${e.currentTarget.dataset.id}`,
		})
	},
	jumpSearch() {
		this.data.isNeedToRefresh = true
		wx.navigateTo({
		  url: '../group-search/group-search',
		})
	},
	jumpRelease() {
		this.data.isNeedToRefresh = true
		wx.navigateTo({
			url: '../group-custom/group-custom',
		  })
	},
	onChange(event) {
		wx.showToast({
		  title: `切换到标签 ${event.detail.name}`,
		  icon: 'none',
		});
	  },
	//recommend
	getRecommend(pageNum = 1,pageSize=10) {
		return request({
			url: '/group/list',
			method: 'GET',
			data: {
				recommend:1,
				status: 0,
				pageNum:pageNum,
				pageSize:pageSize,
			}
		})
	},
	//my
	getMyGroup(pageNum = 1,pageSize=10) {
		return request({
			url: '/group/list/user',
			method: 'GET',
			data:{
				pageNum:pageNum,
				pageSize:pageSize,
			}
		})
	},
	//collection
	getCollection(pageNum = 1,pageSize=10) {
		return request({
			url: '/group/collection/list',
			method: 'GET',
			data:{
				pageNum:pageNum,
				pageSize:pageSize,
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		//推荐
		this.setData({
			dict_ga_group_status: wx.getStorageSync('dict_ga_group_status')
		})
		this.getRecommend().then(value => {
			console.log(value)
			this.setData({
				recommendGroupList: value.rows
			})
		})
		//我的
		this.getMyGroup().then(value => {
			console.log(value)
			this.setData({
				myGroupList: value.rows
			})
		})
		//收藏
		this.getCollection().then(value => {
			console.log(value)
			this.setData({
				collectionGroupList: value.rows
			})
		})
		//分类
		this.setData({
			groupClassificationMap: wx.getStorageSync('groupClassificationMap')
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
		if(this.data.isNeedToRefresh) {
			this.getRecommend().then(value => {
				console.log(value)
				this.setData({
					recommendGroupList: value.rows
				})
			})
			//我的
			this.getMyGroup().then(value => {
				console.log(value)
				this.setData({
					myGroupList: value.rows
				})
			})
			//收藏
			this.getCollection().then(value => {
				console.log(value)
				this.setData({
					collectionGroupList: value.rows
				})
			})
		}
		this.data.isNeedToRefresh = false
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
		Promise.all([
			this.getRecommend(),
			this.getMyGroup(),
			this.getCollection()
		]).then(value => {
			this.setData({
				recommendGroupList: value[0].rows,
				myGroupList: value[1].rows,
				collectionGroupList: value[2].rows,
				recommendNum:2,
				myPageNum:2,
				collectionNum:2
			})
			wx.stopPullDownRefresh({
				success: (res) => {},
			})
			this.toggleDelay()
			app.showSuccess()
		})
		  
		},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function (obj) {
		this.setData({
			isLoading:true
		})
		if(this.data.TabCur == '0') {
			this.getRecommend(this.data.recommendNum,10).then(value => {
				console.log(value)
				this.data.recommendGroupList.push(...value.rows)
				this.setData({
					recommendGroupList:this.data.recommendGroupList,
					recommendNum: this.data.recommendNum + 1,
					
					isLoading:false
				})
			})
		}else if(this.data.TabCur == '1') {
			this.getMyGroup(this.data.myPageNum,10).then(value => {
				console.log(value)
				this.data.myGroupList.push(...value.rows)
				this.setData({
					myGroupList:this.data.myGroupList,
					myPageNum: this.data.myPageNum + 1,
					
					isLoading:false
				})
			})
		} else {
			this.getCollection(this.data.collectionNum,10).then(value => {
				console.log(value)
				this.data.collectionGroupList.push(...value.rows)
				this.setData({
					collectionGroupList:this.data.collectionGroupList,
					collectionNum: this.data.collectionNum + 1,
					
					isLoading:false
				})
			})
		}
		// setTimeout(() => {
		//   this.setData({
		// 	isLoading:false
		//   })
		//   let arr = [...this.data.myGroupList]
		//   this.data.myGroupList.push(...arr)
		//   this.setData({
		// 	myGroupList: this.data.myGroupList
		//   })
		// },1000)
		// console.log(this.data.isLoading,123)
		},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})