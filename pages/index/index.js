// index.js
// 获取应用实例
const app = getApp()
import {request} from '../../js/http.js'
Page({
  data: {
    newList:[],
    recommendList:[],
    cardCur: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  enroll() {
    console.log(123)
  },
  kaifa() {
    wx.showModal({
      title: '提示',
      content:'该功能还在开发中，敬请期待...'
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  jumpSearch() {
    wx.hideKeyboard()
    wx.navigateTo({
      url: '../activity-search/activity-search',
    })
  },
  jumpActivity() {
    console.log(123)
    wx.switchTab({
      url: '../activity/activity',
    })
  },
  jumpNews(e) {
    wx.navigateTo({
      url: `../news/news?path=${e.currentTarget.dataset.path}`,
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
    wx.request({
      url: 'http://49.123.0.28:8000',
      success: (res) => {
        console.log(res.data)
        this.setData({
          newList: res.data.data
        })
      }
    })
    //设置部门
    request({
			url: '/dept/util/listCollege',
			method: 'GET',
		}).then(value => {
      console.log('储存部门')
			wx.setStorage({
        key:'deptList',
        data:value.data
      })
    })
    //活动级别
    request({
			url: '/dict/data/type/sc_train_program_rank',
			method: 'GET',
		}).then(value => {
			console.log('储存部门活动级别')
			wx.setStorage({
        key:'dict_rank',
        data:value.data
      })
    })
    //积分认定状态
    request({
			url: '/dict/data/type/sc_activity_integral',
			method: 'GET',
		}).then(value => {
			console.log('积分认定状态')
			wx.setStorage({
        key:'dict_sc_activity_integral',
        data:value.data
      })
    })
    //活动状态
    request({
			url: '/dict/data/type/sc_activity_status',
			method: 'GET',
		}).then(value => {
			console.log('储存活动状态')
			wx.setStorage({
        key:'dict_sc_activity_status',
        data:value.data
      })
    })
    //报名方式
    request({
			url: '/dict/data/type/sc_activity_admission_way',
			method: 'GET',
		}).then(value => {
			console.log('储存报名方式')
			wx.setStorage({
        key:'dict_admissionWay',
        data:value.data
      })
    })
    //花絮管理
		request({
			url: '/dict/data/type/sc_activity_flower_scheme',
			method: 'GET',
		}).then(value => {
      console.log('储存花絮管理')
			wx.setStorage({
        key:'dict_flower',
        data:value.data
      })
    })
    //积分管理
		request({
			url: '/dict/data/type/sc_activity_integral_scheme',
			method: 'GET',
		}).then(value => {
			console.log('储存积分管理')
			wx.setStorage({
        key:'dict_integral',
        data:value.data
      })
    })
    //积分类型
		request({
			url: '/dict/data/type/sc_integral_type',
			method: 'GET',
		}).then(value => {
			console.log(value.data,'积分类型')
			wx.setStorageSync('dict_integral_type',value.data)
    })
    //评价管理 
		request({
			url: '/dict/data/type/sc_activity_evaluate_scheme',
			method: 'GET',
		}).then(value => {
			console.log('储存评价管理')
			wx.setStorage({
        key:'dict_evaluate_scheme',
        data:value.data
      })
    })
    //群组加入规则 
		request({
			url: '/dict/data/type/ga_group_join_rule',
			method: 'GET',
		}).then(value => {
			console.log('储存群组加入规则')
			wx.setStorage({
        key:'dict_ga_group_join_rule',
        data:value.data
      })
    })
    //群组人员状态
		request({
			url: '/dict/data/type/ga_group_user_status',
			method: 'GET',
		}).then(value => {
			console.log(value.data,'储存群组人员状态')
			wx.setStorage({
        key:'dict_ga_group_user_status',
        data:value.data
      })
    })
    //群组状态
		request({
			url: '/dict/data/type/ga_group_status',
			method: 'GET',
		}).then(value => {
			console.log(value.data,'群组状态')
			wx.setStorage({
        key:'dict_ga_group_status',
        data:value.data
      })
    })

    request({
      url: '/utils/getCourseClassificationUpdateTime',
      method: 'GET',
    }).then(value => {
        if(value.data != wx.getStorageSync('classificationLastTime') || wx.getStorageSync('classificationLastTime') == null) { //时间戳不同
          wx.setStorageSync('classificationLastTime', value.data)
          //所有积分分类
          request({
            url: '/secondClass/courseClassification/list',
            method: 'GET'
          }).then(value => {
            console.log('储存所有分类',value)
            wx.setStorage({
              key: 'courseClassificationList',
              data:value.data
            })
          })
        }
    })

    //所有群组分类
    request({
			url: '/group/type/list',
      method: 'GET',
      data:{
        layer:1
      }
		}).then(value => {
      console.log('储存群组分类',value)
      let groupClassificationMap = {}
      value.data.forEach(item => {
        groupClassificationMap[item.id] = item.name
      })
      console.log(groupClassificationMap )
			wx.setStorage({
        key: 'groupClassificationMap',
        data: groupClassificationMap 
      })
    })
    //当期学年
		request({
			url: '/secondClass/schoolYear/nowYear',
			method: 'GET'
		}).then(value => {
      console.log('储存当前学年')
			wx.setStorageSync('nowYear',Object.keys(value.data)[0])
    })
    //推荐活动
    request({
      url: '/secondClass/activity/list',
      method: 'get',
      data:{
        status: 1,
        recommend: 1,
        pageNum: 1,
        pageSize: 5
      }
    }).then(value => {
      console.error(value)
      this.setData({
        recommendList: value.rows
      })
    })
  },
  jumpActivity(e) {
    wx.navigateTo({
      url: `../activity-detail/activity-detail?aid=${e.currentTarget.dataset.id}`,
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
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    // this.queryData(id)
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
      app.showSuccess()
    },1000)
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  noLimitDialog() {
    wx.showModal({
      title: '温馨提示',
      content: '请在企业微信中打开小程序',
      showCancel: false,
      success: (res) => {
        this.noLimitDialog()
      }
    })
  },
  onShow(option) {
    console.log(wx.getLaunchOptionsSync().scene,'option')
    // if(wx.getLaunchOptionsSync().scene == 1119) {
    //   this.noLimitDialog()
    // }
    // wx.showModal({
    //   content: wx.getLaunchOptionsSync().scene +''
    // })
  },
  fd() {
    // this.data.video.requestFullScreen()
  },
  onReachBottom: function (obj) {
    this.setData({
      isLoading:true
    })
    setTimeout(() => {
      this.setData({
        isLoading:false
      })
    },1000)
    console.log(this.data.isLoading,123)
	},
})
