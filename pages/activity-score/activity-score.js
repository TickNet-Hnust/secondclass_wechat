// pages/activity-score/activity-score.js
import { request } from "../../js/http.js";
import { filterCourseClassificationList2 } from "../../utils/filterCourseClassificationList";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: "", //判断当前的人是否有权限修改
    //0代表默认选中第一个tab
    tabsActive: 0,
    aid: null,
    activityName: "",
    activityRank: null,
    courseClassificationId: null,
    courseClassificationName: "",
    integralScheme: null,
    dict_sc_train_program_rank: [],
    dict_sc_activity_integral_scheme: [],
    dict_sc_integral_type: [],
    integrationRule: [],
    //根据id 当前查找到的课程分类
    currentCourseClassification: [],
    filterCourseClassificationList: [],
    maxLayer: "",
    declareList: [],
    courseClassificationPath: "",
    TabCur: "", //控制当前是哪个tab
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    });
    // this.toggleDelay()
  },
  jumpDeclare() {
    let filterCourseClassificationListString = JSON.stringify(
      this.data.filterCourseClassificationList
    );
    wx.navigateTo({
      //传多个参数时要用&隔开
      url: `../activity-declare/activity-declare?filterCourseClassificationListString=${filterCourseClassificationListString}&aid=${JSON.stringify(
        this.data.aid
      )}&maxLayer=${JSON.stringify(this.data.maxLayer)}`,
    });
  },
  //函数
  tabsOnChange(event) {
    // // console.log( `${event.detail.title}` );
    // //wx.showToast是微信原生 弹出提示框
    // wx.showToast({
    //   // title: `切换到标签 ${event.detail.name}`,
    //   title: `欢迎来到${event.detail.title}模块`,
    //   icon: 'none',
    // });
  },
  getDeclareList(data) {
    request({
      url: "/secondClass/activity/integral/list",
      method: "GET",
      data,
    }).then((value) => {
      console.log(value, "已申报列表");
      this.setData({
        declareList: value.rows,
      });
    });
  },
  statusChange(e) {
    console.log(e, "积分认定状态点击事件");
    this.getDeclareList({
      activityId: this.data.aid,
      status: e.detail.value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从上个页面的jump获取活动id
    console.log(options, "传来的活动id");
    this.setData({
      aid: options.aid,
      flag: options.flag,
      dict_sc_activity_integral: wx.getStorageSync("dict_sc_activity_integral"),
    });

    console.log(this.data.dict_sc_activity_integral, "积分认定状态字典");

    this.getDeclareList({
      activityId: this.data.aid,
    });

    //活动积分概况请求
    request({
      url: `/secondClass/activity/${this.data.aid}/integral`,
      method: "GET",
    }).then((value) => {
      console.log(value, "活动积分概况");
      //微信小程序赋值不能用等号 要用setData！
      this.setData({
        activityName: value.data.activityName,
        activityRank: value.data.activityRank,
        courseClassificationId: value.data.courseClassificationId,
        // courseClassificationId : 87,
        courseClassificationName: value.data.courseClassificationName,
        courseClassificationPath: value.data.courseClassificationPath,
        integralScheme: value.data.integralScheme,
      });
      //获取活动积分规则
      //放在概况请求里面是因为要先通过上面请求拿到courseClassificationId再发请求
      let courseClassificationList = wx.getStorageSync(
        "courseClassificationList"
      );
      let path = this.data.courseClassificationPath;
      let currentClassificationId = path.split("、")[1];
      console.log(courseClassificationList, "课程分类列表");
      console.log(currentClassificationId, "截取的当前积分分类id");
      courseClassificationList.forEach((item) => {
        if (item.id == currentClassificationId) {
          this.setData({
            currentCourseClassification: JSON.parse(JSON.stringify(item)),
          });
          console.log("我查到了！");
        }
      });

      console.log(
        this.data.currentCourseClassification,
        "当前查找到的课程分类id"
      );

      this.setData({
        filterCourseClassificationList: filterCourseClassificationList2(
          courseClassificationList,
          this.data.currentCourseClassification,
          currentClassificationId
        ),
      });

      console.log(this.data.filterCourseClassificationList, "过滤后的数组");

      this.setData({
        maxLayer: this.data.filterCourseClassificationList.maxLayer,
      });

      console.log(this.data.maxLayer, "最大层级");

      // 积分在第三层
      if (this.data.maxLayer == 3) {
        this.setData({
          integrationRule: this.data.filterCourseClassificationList.children,
        });

        console.log(this.data.integrationRule, "积分规则数组1");
      }
      // 积分在第一层
      else if (
        this.data.maxLayer == 1 ||
        (this.data.maxLayer == 2 &&
          this.data.filterCourseClassificationList.children[0].type == 2)
      ) {
        this.setData({
          integrationRule: this.data.filterCourseClassificationList,
        });

        console.log(this.data.integrationRule, "积分规则数组2");
      }
      //积分在第二层
      else {
        this.setData({
          integrationRule: this.data.filterCourseClassificationList,
        });

        console.log(this.data.integrationRule, "积分规则数组3");
      }
    });

    //活动级别
    this.setData({
      dict_sc_train_program_rank: wx
        .getStorageSync("dict_rank")
        .map((item) => ({
          dictValue: item.dictValue,
          dictLabel: item.dictLabel,
        })),
    });
    //活动积分方案
    this.setData({
      dict_sc_activity_integral_scheme: wx
        .getStorageSync("dict_integral")
        .map((item) => ({
          dictValue: item.dictValue,
          dictLabel: item.dictLabel,
        })),
    });
    //活动积分方案
    this.setData({
      dict_sc_integral_type: wx
        .getStorageSync("dict_integral_type")
        .map((item) => ({
          dictValue: item.dictValue,
          dictLabel: item.dictLabel,
        })),
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (1 == this.data.TabCur) {
      console.log("重新请求了申报人数据");
      this.getDeclareList({
        activityId: this.data.aid,
      });
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
