// pages/activity-custom/activity-custom.js
import {request} from '../../js/http.js'
import getImgUrl from '../../utils/upload.js'
import {filterGroupClassificationList} from '../../utils/filterGroupClassificationList.js'
import {nullToast} from '../../utils/nullToast'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		title: '创建群组',
		imgList:[],
		searchShow:false,
		multiArray:[],
		multiIndex:[0,0],
		dict_ga_group_join_rule:[],
		index:null,
		CustomBar: app.globalData.CustomBar,
		courseList:[],
		//部门列表
		deptList:[],
		fakeData:{
			deptIdno:null
		},
		postData:{
			deptName:'',
			type: '',
			parentId:'',
			teacher: '',
			joinRule:'',
			recommend:'',
			avatar:'',
			introduce:''
		},
		IntroduceShow:false


	},
	showNotice(e) {
		console.log(123)
		this.setData({
			IntroduceShow:false
		})
	},
	hideNotice(e) {
		console.log(456)
		this.setData({
			IntroduceShow:true
		})
	},
	onClick() {
		wx.showLoading({
		  title: '加载中',
		})
		request({
			url: '/user/util/listByName',
			method: 'get',
			data:{
				name:this.data.searchValue
			}
		}).then(value => {
			console.log(value)
			this.setData({
				'farSearch' :value.data
			})
			if(value.data.length == 0) {
				Toast('没有找到匹配的人')
			}
		})
		console.log(this.data.searchValue)
	},
	onChange(e) {
		this.setData({
			searchValue:e.detail
		})
	},
	//打开远程搜索框
	showSearch(e) {
		this.setData({
			searchShow:true,
			'state.name':e.currentTarget.dataset.name,
			'state.id':e.currentTarget.dataset.id,
		})
		console.log(this.data.state)
	},
	//隐藏远程搜索框
	hideSearch() {
		this.setData({
			searchShow:false
		})
	},
	//选定人
	sureHuman(e) {
		let {name,id} = this.data.state
		console.log(name,id,e,1212)
		this.setData({
			'postData.teacher': e.currentTarget.dataset.name
		})
		this.setData({
			searchShow:false
		})
	},
	change(e) {
		console.log(e)
		this.setData({
			'postData.joinRule' :e.detail.value,
			"index": e.detail.value,
		})
	},
	//弹出
	showModal(e) {
		this.setData({
		  modalName: e.currentTarget.dataset.target
		})
	},
	//隐藏model
	hideModal(e) {
		this.setData({
		  modalName: null
		})
	},
	//确定
	MultiChange(e) {

		this.setData({
			'postData.type':  this.data.typeList[e.detail.value[0]].children[e.detail.value[1]].id
		})
	},
	MultiColumnChange(e) {
		console.log(e)
		//复制数组
		let temp = [...this.data.multiArray]
		let index = [...this.data.multiIndex]
		if(e.detail.column == 0) {
			temp[1] = this.data.typeList[e.detail.value].children.map(item => item.name)
			index[0] = e.detail.value //改变选中的下标
			index[1] = 0
		} else {
			index[1] = e.detail.value
		}
		this.setData({
			multiArray:temp,
			multiIndex:index,
			'postData.type': this.data.typeList[index[0]].children[index[1]].id,
			// 'postData.courseClassificationIdPath': this.data.courseClassificationList[index[0]].id + ',' +this.data.courseClassificationList[index[0]].children[index[1]].id
		})
	},
	ViewImage(e) {
		wx.previewImage({
		  urls: this.data.imgList,
		  current: e.currentTarget.dataset.url
		});
	},
	ViewFile(e) {
		wx.previewImage({
			urls: this.data.imgList,
			current: e.currentTarget.dataset.url
		  });
	},
	ChooseImage() {
		let that =  this
		wx.chooseImage({
		  count: 1, //默认9
		  sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		  sourceType: ['album','camera'], //从相册选择
		  success: (res) => {
			// console.log(res,77,)
			// if(!["jpg"].includes(res.tempFiles[0].path.slice(-3))) {
			// 	wx.showToast({
			// 	  title: '图片只支持jpg格式',
			// 	  icon: 'none',
			// 	  duration:2000
			// 	})
			// 	return ;
			// }
			// if(res.tempFiles[0].size > 1024*1024*2) {
			// 	wx.showToast({
			// 	  title: '图片大小不能超过2M',
			// 	  icon: 'none',
			// 	  duration:2000
			// 	})
			// 	return ;
			// }
			// that.setData({
			// 	imgList: res.tempFilePaths
			// })
			// getImgUrl(res.tempFilePaths[0]).then(value => {
			// 	that.setData({
			// 		'postData.avatar': value //原图
			// 	})
			// }).then(() => {
				that.setData({
					imgList: res.tempFilePaths
				})
				wx.compressImage({
					src: res.tempFilePaths[0], // 图片路径
					quality: 10, // 压缩质量
					success:(val) => {
						getImgUrl(val.tempFilePath).then(value => {
						  that.setData({
							  'postData.avatar': value //压缩图
							})
							
						})
					}
				})
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
	//部门改变
	deptChange(e) {
		this.setData({
			'fakeData.deptIdno': e.detail.value
		})
		this.setData({
			'postData.parentId' : this.data.deptList[e.detail.value].deptId
		})
		
	},
	//群组名改变
	nameChange(e) {
		this.setData({
			'postData.deptName':e.detail.value.trim()
		})
	},
	//介绍改变
	introduceChange(e) {
		console.log(e)
		this.setData({
			'postData.introduce':e.detail.value.trim()
		})
	},
	postGroup() {
		this.data.postData.recommend = 0  //不推荐
		this.data.postData.orderNum = 0
        this.data.postData.ancestors = 0 + ',' + this.data.postData.parentId
        this.data.postData.status = 2 //待审核
		console.log(this.data.postData)
		if(this.data.title == '修改群组信息') {
			request({
				url: '/group',
				method: 'PUT',
				data:this.data.postData
			}).then(value => {
				console.log(value)
				app.globalData.toast = '群组修改成功'
				if(value.code == 200) {
					wx.navigateBack({
						delta: 1,
					})
				}
			})
			return 
		}
		let msg = nullToast(this.data.postData,'group')
		if(msg == 'ok') {
			request({
				url: '/group',
				method: 'post',
				data:this.data.postData
			}).then(value => {
				console.log(value)
				if(value.code == 200) {
					Toast('成功')
					wx.navigateBack({
						delta: 1,
					})
				}
			})
		} else {
			Toast(msg)
		}
		
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.mapCtx = wx.createMapContext('myMap')
		if(options.gid) {
			this.setData({
				title: '修改群组信息'
			})
			request({
				url:`/group/${options.gid}/detail`,
				method: 'GET'
			}).then(value => {
				console.log(value)
				this.setData({
					'postData.deptId':value.data.groupDetail.deptId,
					'postData.deptName': value.data.groupDetail.deptName,
					'postData.status': value.data.groupDetail.status,
					'postData.memberNumber': value.data.groupDetail.memberNumber,
					'postData.parentName': value.data.groupDetail.parentName,
					'postData.teacher': value.data.groupDetail.teacher,
					// 'postData.parentId': value.groupDetail.parentId, //
					'postData.type': value.data.groupDetail.type,
					'postData.introduce': value.data.groupDetail.introduce,
					'postData.avatar': value.data.groupDetail.avatar,
					'postData.flag': value.data.groupDetail.flag,
					'postData.orderNum': 0,
					'postData.joinStatus': value.data.groupDetail.joinStatus, //
					'postData.joinRule': value.data.groupDetail.joinRule, //
					'imgList':[value.data.groupDetail.avatar],
					index: value.data.groupDetail.joinRule,
				})
			})
			console.log(options)
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		request({
			url: '/group/type/list',
			method: 'GET'
		}).then(value => {
			console.log(value)
			this.setData({
				typeList: filterGroupClassificationList(value.data)
			})
			let temp = []
			temp.push(this.data.typeList.map(item => item.name))
			temp.push(this.data.typeList[0]?.children?.map(item =>item.name))
			this.setData({
				multiArray: temp
			})
			// debugger
			this.setData({
				'postData.type': this.data.typeList[0]?.children[0].id
			})
		})
		//获取部门
		request({
			url: '/dept/util/listCollege',
			method: 'GET'
		}).then(value => {
			this.setData({
				deptList: value.data
			})
		})
		this.setData({
			dict_ga_group_join_rule: wx.getStorageSync('dict_ga_group_join_rule')
		})
		
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