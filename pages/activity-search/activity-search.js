// pages/activity-search/activity-search.js
let http = require('../../js/http.js')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		toggleDelay: false,
		checked: false,
		active: 'a',
		value: '',
		show: true,
		tags: [],
		hotActivityList:[],
		allActivityList:[],
		serchActivityList:[],
	},
	toggleDelay() {
		var that = this;
		that.setData({
		  toggleDelay: true
		})
		setTimeout(function() {
		  that.setData({
			toggleDelay: false
		  })
		}, 1000)
	  },
	//按钮改变触发
	onChange({ detail }) {
		// 需要手动对 checked 状态进行更新
		this.setData({ checked: detail });
		this.getActivityList(1,{
			status: +this.data.checked
		})
	},
	//点击标签触发
	tagSearch(event) {
		this.setData({
			value:event.target.dataset.item,
			show:false
		})
		this.getActivityList(0,{
			name: event.target.dataset.item
		})
	},
	//点击垃圾桶触发
	clearTags() {
		wx.showModal({
			title: '提示',
			content: '确定删除所有搜素记录吗',
			success:(res) => {
			  if (res.confirm) {
				console.log('用户点击确定')
				this.setData({
					tags:[]
				})
				wx.setStorageSync('tags', [])
				wx.showToast({
					title: '清除成功',
					icon: 'success',
					duration: 1000
				  })
			  } else if (res.cancel) {
				console.log('用户点击取消')
				wx.showToast({
					title: '用户取消',
					icon: 'success',
					duration: 1000
				  })
				  
			  }
			}
		})
		
	},
	//光标聚焦触发
	focusSearch() {
		this.setData({
			show: true
		})
		this.setData({
			tags: wx.getStorageSync('tags')
		})
	},
	//确认搜索触发
	serchActivity(event){
		if(event.detail) {
			let temp = wx.getStorageSync('tags') || []
			temp.unshift(event.detail)
			wx.setStorageSync('tags',temp)

			this.getActivityList(0,{
				name: event.detail
			})
			this.setData({
				show: false
			})
		}
	
	},
	//api请求数据
	getActivityList(condition,option) {
		wx.showLoading({
			title:'加载数据中',
			mask:true
		})
		http.getData('/secondClass/activity/list',option,(res) => {
			if(condition == 0) {
				this.setData({
					serchActivityList:res.rows
				})
			}else {
				this.setData({
					allActivityList:res.rows
				})
			}
			wx.hideLoading()
		})
	},
	activeChange(event) {
		console.log(event.detail.name)
		this.toggleDelay()
		this.setData({
			active: event.detail.name
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading({
			title:'加载数据中',
			mask:true
		})
		http.getData('/secondClass/activity/hotList',{},(res) => {
			console.log(res)
			this.setData({
				hotActivityList:res.rows
			})
			wx.hideLoading()
		})
		this.getActivityList(1)
		this.setData({
			tags: wx.getStorageSync('tags')
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.selectComponent('#tabs').resize();
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
		wx.reLaunch({
			url: '../activity-search/activity-search'
		  })
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