// pages/activity/activity.js
import {request} from '../../js/http.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		toggleDelay:false,
		// active:0,
		value: '',
		recommendActivityList: [],
		recommendNum:2,
		collectionActivityList: [],
		collectionNum:2,
		myActivityList: [],
		myNum:2,

		TabCur: 0,
	},
	tabSelect(e) {
		this.setData({
		  TabCur: e.currentTarget.dataset.id,
		})
		// this.toggleDelay()
	  },
	// activeChange(e) {
	// 	this.data.active = e.detail.index
	// 	this.setData({
	// 		// active: e.detail.index
	// 	})
	// 	e!= '自定义' && this.toggleDelay()
	// },
	toggleDelay() {
		var that = this;
		let temp
		if(this.data.TabCur == 0) {
			temp = 'toggleDelayOne'
		}else if(this.data.TabCur == 1) {
			temp = 'toggleDelayTwo'
		}else {
			temp = 'toggleDelayThree'
		}
		that.setData({
		  	[temp]: true
		})
		setTimeout(function() {
		  that.setData({
			[temp]: false
		  })
		}, 1500)
	  },
	jumpDetail(e) {
		console.log(e)
		wx.navigateTo({
		  url: `../activity-detail/activity-detail?aid=${e.currentTarget.dataset.id}`,
		})
	},
	jumpSearch() {
		wx.navigateTo({
		  url: '../activity-search/activity-search',
		})
	},
	jumpRelease() {
		wx.navigateTo({
			url: '../activity-release/activity-release',
		  })
	},
	onChange(event) {
		wx.showToast({
		  title: `切换到标签 ${event.detail.name}`,
		  icon: 'none',
		});
	},
	getRecommend(pageNum = 1,pageSize=10) {
		return request({
			url:'/secondClass/activity/list',
			method: 'GET',
			data:{
				recommend:1,
				pageNum:pageNum,
				pageSize:pageSize,
			}
		})
	},
	//my
	getMy(pageNum = 1,pageSize=10) {
		return request({
			url: '/secondClass/activity/user',
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
			url: '/secondClass/activity/collection/list',
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
		this.getRecommend().then(value => {
			console.log(value)
			this.setData({
				recommendActivityList:value.rows
			})
		})

		this.getCollection().then(value => {
			console.log(value)
			this.setData({
				collectionActivityList:value.rows
			})
		})

		this.getMy().then(value => {
			console.log(value)
			this.setData({
				myActivityList:value.rows
			})
		})
		// setTimeout(() => {

			this.toggleDelay()
		// },200)
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
			this.getMy(),
			this.getCollection()
		]).then(value => {
			this.setData({
				recommendActivityList:value[0].rows,
				myActivityList:value[1].rows,
				collectionActivityList:value[2].rows,
				recommendNum:2,
				collectionNum:2,				
				myNum:2
			})
			wx.stopPullDownRefresh({
				success: (res) => {},
			})
			this.toggleDelay()
		})
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		this.setData({
			isLoading:true
		})
		if(this.data.TabCur == '0') {
			this.getRecommend(this.data.recommendNum,10).then(value => {
				console.log(value)
				this.data.recommendActivityList.push(...value.rows)
				this.setData({
					recommendActivityList:this.data.recommendActivityList,
					recommendNum: this.data.recommendNum + 1,
					
					isLoading:false
				})
			})
		}else if(this.data.TabCur == '1') {
			this.getMy(this.data.myNum,10).then(value => {
				console.log(value)
				this.data.myActivityList.push(...value.rows)
				this.setData({
					myActivityList:this.data.myActivityList,
					myNum: this.data.myNum + 1,
					
					isLoading:false
				})
			})
		} else {
			this.getCollection(this.data.collectionNum,10).then(value => {
				console.log(value)
				this.data.collectionActivityList.push(...value.rows)
				this.setData({
					collectionActivityList:this.data.collectionActivityList,
					collectionNum: this.data.collectionNum + 1,
					
					isLoading:false
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