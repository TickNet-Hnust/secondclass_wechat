// index.js
// 获取应用实例
const app = getApp()
import {request} from '../../js/http.js'
Page({
  data: {
    cardCur: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  jumpActivity() {
    console.log(123)
    wx.switchTab({
      url: '../activity/activity',
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    //设置部门
    request({
			url: '/dept/util/listCollege',
			method: 'GET',
		}).then(value => {
      console.log('储存部门')
			wx.setStorageSync('deptList',value.data)
    })
    //活动级别
    request({
			url: '/dict/data/type/sc_train_program_rank',
			method: 'GET',
		}).then(value => {
			console.log('储存部门活动级别')
			wx.setStorageSync('dict_rank',value.data)
    })
    //报名方式
    request({
			url: '/dict/data/type/sc_activity_admission_way',
			method: 'GET',
		}).then(value => {
			console.log('储存报名方式')
			wx.setStorageSync('dict_admissionWay',value.data)
    })
    //花絮管理
		request({
			url: '/dict/data/type/sc_activity_flower_scheme',
			method: 'GET',
		}).then(value => {
      console.log('储存花絮管理')
			wx.setStorageSync('dict_flower',value.data)
    })
    //积分管理
		request({
			url: '/dict/data/type/sc_activity_integral_scheme',
			method: 'GET',
		}).then(value => {
			console.log('储存积分管理')
			wx.setStorageSync('dict_integral',value.data)
    })
    //评价管理 
		request({
			url: '/dict/data/type/sc_activity_evaluate_scheme',
			method: 'GET',
		}).then(value => {
			console.log('储存评价管理')
			wx.setStorageSync('dict_evaluate_scheme',value.data)
    })
    //所有分类
    request({
			url: '/admins/secondClass/courseClassification/list',
			method: 'GET'
		}).then(value => {
			console.log('储存所有分类')
			wx.setStorageSync('courseClassificationList',value.data)
    })
    //当期学年
		request({
			url: '/secondClass/schoolYear/nowYear',
			method: 'GET'
		}).then(value => {
			console.log('储存当前学年')
			wx.setStorageSync('nowYear',Object.keys(value.data)[0])
		})
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow() {
    
  }
})
