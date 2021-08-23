// pages/Group-search/Group-search.js
import {request} from '../../js/http.js'
Page({
	onPullDownRefresh: function () {
		console.log('onPullDownRefresh')
		// this.queryData(id)
		setTimeout(() => {
		  wx.stopPullDownRefresh({
			success: (res) => {},
		  })
		},1000)
	  },
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
		hotGroupList:[],
		allGroupList:[],
		searchGroupList:[],
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
		this.getGroupList(1,{
			status: this.data.checked?0:''
		})
	},
	//点击标签触发
	tagSearch(event) {
		this.setData({
			value:event.target.dataset.item,
			show:false
		})
		this.getGroupList(0,{
			deptName: event.target.dataset.item
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
				wx.setStorageSync('Gtags', [])
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
			tags: wx.getStorageSync('Gtags')
		})
	},
	//确认搜索触发
	searchGroup(event){
		if(event.detail) {
			let temp = wx.getStorageSync('Gtags') || []
			temp.unshift(event.detail)
			wx.setStorageSync('Gtags',temp)

			this.getGroupList(0,{
				deptName: event.detail
			})
			this.setData({
				show: false
			})
		}
	
	},
	//api请求数据
	getGroupList(condition,option) {
		request({
			url: '/group/list',
			method: 'GET',
			data: option
		}).then(value => {
			if(condition == 0) {
				this.setData({
					searchGroupList:value.rows
				})
			}else {
				this.setData({
					allGroupList:value.rows
				})
			}
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
		request({
			url: '/group/hotList',
			method: 'GET'
		}).then(value => {
			console.log(value)
			this.setData({
				hotGroupList:value.rows
			})
		})
		this.getGroupList(1)
		this.setData({
			tags: wx.getStorageSync('Gtags')
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
			url: '../Group-search/Group-search'
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