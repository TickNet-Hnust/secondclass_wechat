// pages/activity-sideLight/activity-sideLight.js
import getImgUrl from '../../utils/upload.js'
import {request} from '../../js/http'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgList:[],
		postData:{
			activityId:'',
			content:'',
			picture:''
		}
	},
	contentChange(e) {
		this.setData({
			'postData.content': e.detail.value
		})
	},
	sure() {
		if(this.data.postData.content=='') {
			wx.showToast({
			  title: '文字内容不能为空',
			  icon: 'none'
			})
			return
		}
		if(this.data.postData.picture=='') {
			wx.showToast({
				title: '请至少要上传一张图片',
				icon: 'none'
			})
			return
		}
		request({
			url: '/secondClass/activity/flower',
			method: 'POST',
			data:this.data.postData
		}).then(value => {
			console.log(value)
			value.code == 200 && wx.showToast({
			  title: '发布成功'
			})
			wx.navigateBack()
		})
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
		  count: 9-this.data.imgList.length, //默认9
		  sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album','camera'], //从相册选择
		  success: async(res) => {
				console.log(res,77,res.tempFiles[0].size)
				this.setData({
					imgList: res.tempFilePaths
				})
				for(let i = 0; i< res.tempFiles.length;i++) {
					await getImgUrl(res.tempFiles[i].path)
						.then(value => {
							if(i == 0) {
								that.setData({
									'postData.picture': value //原图
								})	
							} else {
								that.data.postData.picture += `_${value}`
								that.setData({
									'postData.picture': that.data.postData.picture
								})
							}
							return wx.compressImage({
								src: res.tempFiles[i].path, // 图片路径
								quality: 10, // 压缩质量
							})
						}).then((val) => {
							return getImgUrl(val.tempFilePath)
						}).then(value => {
							that.data.postData.picture += `;${value}`
							that.setData({
								'postData.picture': that.data.postData.picture
							})
							console.info(that.data.postData.picture.length)
						})
				}
				setTimeout(() => {
					console.log(this.data.postData)
				},2000)
				// if(!["jpg","png"].includes(res.tempFiles[0].path.slice(-3))) {
				// 	wx.showToast({
				// 	  title: '图片只支持jpg和png格式',
				// 	  icon: 'none',
				// 	  duration:2000
				// 	})
				// 	return ;
				// }
				// if(res.tempFiles[0].size > 1024 * 1024 * 3) {
				// 	wx.showToast({
				// 	  title: '单张图片大小不能超过3M',
				// 	  icon: 'none',
				// 	  duration:2000
				// 	})
				// 	return ;
				// }
				
				// imgList.push(res.tempFilePaths)
				// this.setData({
				// 	imgList:imgList
				// })
				// let file = res.tempFilePaths[0]
				// wx.compressImage({
				// 	src: file, // 图片路径
				// 	quality: 10, // 压缩质量
				// 	success:(res) => {
				// 		console.log(file,'test1')
				// 		console.log(res,'test2')
				// 		getImgUrl(res.tempFilePath).then(value => {
				// 			console.log(value,'图片的地址')
				// 		  	that.setData({
				// 			  'postData.picture': value
				// 			})
				// 		})
				// 	}
				// })
			
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

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.data.postData.activityId = options.aid
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