// pages/Group-search/Group-search.js
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
		hotGroupList:[],
		allGroupList:[],
		searchGroupList:[],
		hotNum:2,
		allNum:2,				
		searchNum:2
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
	// onChange({ detail }) {
	// 	// 需要手动对 checked 状态进行更新
	// 	this.setData({ checked: detail });
	// 	this.getGroupList(1,{
	// 		status: this.data.checked?0:''
	// 	})
	// },
	//点击标签触发
	tagSearch(event) {
		this.setData({
			value:event.target.dataset.item,
			show:false
		})
		this.getSearch(event.target.dataset.item).then(value => {
			this.setData({
				searchGroupList: value.rows
			})
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
		if(event.detail.trim()) {
			let temp = wx.getStorageSync('Gtags') || []
			temp.unshift(event.detail.trim())
			wx.setStorageSync('Gtags',temp)
			this.getSearch(event.detail.trim()).then(value => {
				this.setData({
					searchGroupList: value.rows,
					show: false
				})
			})
		}
	},
	//api请求数据
	getGroupList(condition,option) {
		then(value => {
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
		this.toggleDelay()
		this.setData({
			active: event.detail.index
		})
	},
	getHot(pageNum=1,pageSize=10) {
		return request({
			url: '/group/hotList',
			method: 'GET',
			data:{
				pageNum,
				pageSize
			}
		})
	},
	getAll(pageNum=1,pageSize=10) {
		return request({
			url: '/group/list',
			method: 'GET',
			data: {
				status:0, //正常的群组
				pageNum,
				pageSize
			}
		})
	},
	getSearch(name,pageNum=1,pageSize=10) {
		return request({
			url: '/group/list',
			method: 'GET',
			data: {
				status:0,
				deptName:name,
				pageNum,
				pageSize
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		Promise.all([
			this.getAll(),
			this.getHot()
		]).then(value => {
			this.setData({
				allGroupList:value[0].rows,
				hotGroupList:value[1].rows
			})
			this.toggleDelay()
		})
		this.setData({
			tags: wx.getStorageSync('Gtags'),
			groupClassificationMap: wx.getStorageSync('groupClassificationMap'),
			dict_ga_group_status: wx.getStorageSync('dict_ga_group_status')
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
		console.log('onPullDownRefresh')
		Promise.all([
			this.getAll(),
			this.getHot()
		]).then(value => {
			this.setData({
				allGroupList:value[0].rows,
				hotGroupList:value[1].rows,
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
				this.data.allGroupList.push(...value.rows)
				this.setData({
					allGroupList:this.data.allGroupList,
					allNum: this.data.allNum + 1,
					isLoading:false
				})
			})
		} else {
			this.getHot(this.data.hotNum,10).then(value => {
				console.log(value)
				this.data.hotGroupList.push(...value.rows)
				this.setData({
					hotGroupList:this.data.hotGroupList,
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