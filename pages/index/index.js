// index.js
// 获取应用实例
const app = getApp()
import {request} from '../../js/http.js'
Page({
  data: {
    newList:[],
    recommendList:[]
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
  getNews() {
    request({
      url: '/secondClass/home/news',
      method: 'get'
    }).then(res => {
      console.log('获取新闻成功',res.data)
        this.setData({
          newList: res.data.map(item => ({
            ...item,
            link: item.link.replace('tw.hnust.edu.cn','secondclass.ticknet.hnust.cn/new') //绕过小程序webview验证
          }))
        })
    }).catch(e => {
      console.log('获取新闻失败:',e)
    })
  },
  getActivity() {
    //推荐活动
    request({
      url: '/secondClass/activity/list',
      method: 'get',
      data:{
        recommend: 1,
        pageNum: 1,
        pageSize: 5
      }
    }).then(value => {
      this.setData({
        recommendList: value.rows
      })
    })
  },
  async onLoad() {
    await app.getToken()   //等待获取token
    app.getDict()
    
    this.getNews()
    this.getActivity()
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
            console.log('储存积分分类成功',value)
            wx.setStorage({
              key: 'courseClassificationList',
              data:value.data
            })
          })
        } else {
          console.log('积分分类不需要更新',value)
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
      console.log('储存群组分类成功:',value)
      let groupClassificationMap = {}
      value.data.forEach(item => {
        groupClassificationMap[item.id] = item.name
      })
			wx.setStorage({
        key: 'groupClassificationMap',
        data: groupClassificationMap 
      })
      console.log('储存群组分类Map=>Name成功:',value)
    })
    //当期学年
		request({
			url: '/secondClass/schoolYear/nowYear',
			method: 'GET'
		}).then(value => {
      console.log('储存当前学年成功',value)
			wx.setStorageSync('nowYear',Object.keys(value.data)[0])
    })
    
  },
  jumpActivity(e) {
    wx.navigateTo({
      url: `../activity-detail/activity-detail?aid=${e.currentTarget.dataset.id}`,
    })
  },
  onPullDownRefresh: function () {
    Promise.all([
      this.getNews(),
      this.getActivity()
    ]).then(value => {
      wx.stopPullDownRefresh()
      app.showSuccess()
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
    console.log(wx.getLaunchOptionsSync().scene,'场景值')
    if(wx.getLaunchOptionsSync().scene == 1168) {
      this.noLimitDialog()
    }
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
