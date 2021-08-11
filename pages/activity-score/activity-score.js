// pages/activity-score/activity-score.js
import {request} from '../../js/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0代表默认选中第一个tab
    tabsActive:0,
    aid:null,
    activityName:'',
    activityRank:null,
    courseClassificationId:null,
    courseClassificationName:'',
    integralScheme:null,
    dict_sc_train_program_rank:[],
    dict_sc_activity_integral_scheme:[],
    dict_sc_integral_type:[],
    integrationRule:[],

  },
  
  //函数
  tabsOnChange(event){
    // // console.log( `${event.detail.title}` );
    // //wx.showToast是微信原生 弹出提示框
    // wx.showToast({
    //   // title: `切换到标签 ${event.detail.name}`,
    //   title: `欢迎来到${event.detail.title}模块`,
    //   icon: 'none',
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从上个页面的jump获取活动id
    console.log(options.aid,'传来的活动id')
    this.setData({
      aid:options.aid,
    })
    //活动积分概况请求
    request({
			url:`/secondClass/activity/${this.data.aid}/integral`,
      method: 'GET',
		}).then(value => {
      console.log(value,'活动积分概况')
      //微信小程序赋值不能用等号 要用setData！
      this.setData({
            activityName : value.data.activityName,
            activityRank : value.data.activityRank,
  courseClassificationId : value.data.courseClassificationId,
courseClassificationName : value.data.courseClassificationName,
          integralScheme : value.data.integralScheme,
      })
          //获取活动积分规则 
          //放在概况请求里面是因为要先通过上面请求拿到courseClassificationId再发请求
          request({
            url:`/admins/secondClass/courseClassification/sort/list/${this.data.courseClassificationId}`,
            method:'GET',
          }).then(value=>{
            this.setData({
              integrationRule:value.data,
            })
            console.log(this.data.integrationRule,'活动积分规则')
          })
    })
    //获取活动级别字典
    request({
      url:'/system/dict/data/type/' + 'sc_train_program_rank',
      method:'GET',
    }).then(value=>{

      this.setData({
        dict_sc_train_program_rank : value.data,
      })
      
      console.log(this.data.dict_sc_train_program_rank,'活动级别字典')

    })
    //获取积分方案字典
    request({
      url:'/system/dict/data/type/' + 'sc_activity_integral_scheme',
      method:'GET',
    }).then(value=>{

      this.setData({
        dict_sc_activity_integral_scheme : value.data,
      })
      
      console.log(this.data.dict_sc_activity_integral_scheme,'积分方案字典')
    })
    //获取积分类型字典
    request({
      url:'/system/dict/data/type/' + 'sc_integral_type',
      method:'GET',
    }).then(value=>{

      this.setData({
        dict_sc_integral_type : value.data,
      })
      
      console.log(this.data.dict_sc_integral_type,'积分类型字典')
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