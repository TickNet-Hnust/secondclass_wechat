// pages/activity-search/activity-search.js
import {request} from '../../js/http.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		toggleDelay: false,
		checked: false,
		active: 0,
		value: '',
		show: true,
		tags: [],
		hotActivityList:[],
		hotNum:2,
		allActivityList:[],
		allNum:2,
		searchActivityList:[],
		searchNum:2,
		searchValue:'',
		TabCur:''
	},
	tabSelect(e) {
		this.setData({
		  TabCur: e.currentTarget.dataset.id,
		})
		// setTimeout(() => {
			this.toggleDelay()
		// })
	  },
	toggleDelay() {
		var that = this;
		let temp = this.data.TabCur == 1 ? 'toggleDelayTwo': 'toggleDelayThree'
		that.setData({
		  [temp]: true
		})
		setTimeout(function() {
		  that.setData({
			[temp]: false
		  })
		}, 1000)
	},
	jumpDetail(e) {
		console.log(e)
		wx.navigateTo({
		  url: `../activity-detail/activity-detail?aid=${e.currentTarget.dataset.id}`,
		})
	},
	//按钮改变触发
	onChange({ detail }) {
		// 需要手动对 checked 状态进行更新
		this.setData({ checked: detail });
		this.getAll().then(value=> {
			this.setData({
				allActivityList:value.rows,
			})
		})
	},
	//点击标签触发
	tagSearch(event) {
		this.setData({
			value:event.target.dataset.item, //搜索框
			show:false  
		})
		this.data.tags.unshift(...this.data.tags.splice(event.target.dataset.index,1))
		this.setData({
			tags:this.data.tags
		})
		wx.setStorageSync('Atags', this.data.tags)
		this.getSearch(1,10,event.target.dataset.item.trim()).then(value => {
			this.setData({
				searchActivityList:value.rows,
				searchValue: event.target.dataset.item
			})
		})
	},
	//点击垃圾桶触发
	clearTags() {
		wx.showModal({
			title: '提示',
			content: '确定删除所有搜索记录吗',
			success:(res) => {
			  if (res.confirm) {
				console.log('用户点击确定')
				this.setData({
					tags:[]
				})
				wx.setStorageSync('Atags', [])
				wx.showToast({
					title: '清除成功',
					icon: 'success',
					duration: 1000
				})
			  } else if (res.cancel) {
				console.log('用户点击取消')
				wx.showToast({
					title: '用户取消',
					icon: 'none',
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
	},
	//确认搜索触发
	searchActivity(event){
		event.detail = event.detail.trim()
		if(event.detail) {
			let temp = wx.getStorageSync('Atags') || []
			temp.length >= 8 && temp.pop()
			temp.unshift(event.detail)
			let index = temp.indexOf(event.detail)
			wx.setStorageSync('Atags',temp)

			this.getSearch(1,10,event.detail).then(value => {
				this.setData({
					searchActivityList:value.rows,
					searchValue: event.detail
				})
			})
			this.setData({
				show: false
			})
		} else {
			wx.showToast({
			  title: '请输入内容再搜索',
			  icon: 'none'
			})
		}
	
	},
	//api请求数据
	getActivityList(condition,option) {
		request({
			url: '/secondClass/activity/list',
			method: 'GET',
			data: option
		}).then(value => {
			if(condition == 0) {
				this.setData({
					searchActivityList:value.rows
				})
			}else {
				this.setData({
					allActivityList:value.rows
				})
			}
		})
	},
	activeChange(e) {
		this.data.active = e.detail.index
		this.toggleDelay()
		this.setData({
			// active: event.detail.index
		})
	},
	getSearch(pageNum = 1,pageSize=10,name) {
		return request({
			url:'/secondClass/activity/list',
			method: 'GET',
			data:{
				name:name,
				pageNum:pageNum,
				pageSize:pageSize,
			}
		})
	},
	//my
	getAll(pageNum = 1,pageSize=10) {
		return request({
			url: '/secondClass/activity/list',
			method: 'GET',
			data:{
				status: +this.data.checked,
				pageNum:pageNum,
				pageSize:pageSize,
			}
		})
	},
	//hot
	getHot(pageNum = 1,pageSize=10) {
		return request({
			url: '/secondClass/activity/hotList',
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
		request({
			url: '/secondClass/activity/hotList',
			method: 'GET'
		}).then(value => {
			console.log(value)
			this.setData({
				hotActivityList:value.rows
			})
		})
		this.getActivityList(1)
		this.setData({
			tags: wx.getStorageSync('Atags')
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
		console.log(getCurrentPages())
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
			this.getAll(),
			this.getHot()
		]).then(value => {
			this.setData({
				allActivityList:value[0].rows,
				hotActivityList:value[1].rows,
				hotNum:2,
				allNum:2,				
				searchNum:2
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
		if(this.data.active == '0') {
			console.log('test',this.data.searchNum,10,this.data.searchValue)
			this.getSearch(this.data.searchNum,10,this.data.searchValue).then(value => {
				console.log(value)
				this.data.searchActivityList.push(...value.rows)
				this.setData({
					searchActivityList:this.data.searchActivityList,
					searchNum: this.data.searchNum + 1,
					
					isLoading:false
				})
			})
		}else if(this.data.active == '1') {
			this.getAll(this.data.allNum,10).then(value => {
				console.log(value)
				this.data.allActivityList.push(...value.rows)
				this.setData({
					allActivityList:this.data.allActivityList,
					allNum: this.data.allNum + 1,
					isLoading:false
				})
			})
		} else {
			this.getHot(this.data.hotNum,10).then(value => {
				console.log(value)
				this.data.hotActivityList.push(...value.rows)
				this.setData({
					hotActivityList:this.data.hotActivityList,
					hotNum: this.data.hotNum + 1,
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