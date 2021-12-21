import { request } from "../../js/http.js";
import Toast from "@vant/weapp/toast/toast";
const app = getApp();
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    animationData: {},
    TimeOut: null,
    angle: 0, //感应角度
    isLogin: false,
    nickName: "",
    avatarUrl: "",
    activityCount: 0,
    groupCount: 0,
    integral: 0,
  },
  login() {
    let isLogin = wx.getStorageSync("isLogin");
    if (isLogin) {
      return;
    }
    wx.getUserProfile({
      desc: "获取的信息用于展示",
      success: (res) => {
        console.log(res);
        request({
          url: "/user/util/avatar",
          method: "put",
          data: {
            avatar: res.userInfo.avatarUrl,
          },
        }).then((value) => {
          console.log(value);
        });
        let content = this.data.isLogin ? "同步成功" : "登录成功";
        Toast(content);
        this.setData({
          isLogin: true,
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        });
        wx.setStorage({
          key: "isLogin",
          data: true,
        });
        wx.setStorage({
          key: "nickName",
          data: res.userInfo.nickName,
        });
        wx.setStorage({
          key: "avatarUrl",
          data: res.userInfo.avatarUrl,
        });
      },
    });
  },
  logout() {
    if (this.data.isLogin == false) {
      wx.showToast({
        title: "您还未登录",
        icon: "none",
      });
      return;
    }
    wx.showModal({
      title: "提示",
      content: "确定退出登录吗",
      success: (res) => {
        if (res.confirm) {
          this.setData({
            isLogin: false,
            nickName: "",
            avatarUrl: "",
          });
          wx.setStorageSync("isLogin", false);
          wx.setStorageSync("nickName", "");
          wx.setStorageSync("avatarUrl", "");
          wx.showToast({
            title: "退出登录",
          });
        }
      },
    });
  },
  onShow() {
    request({
      url: "/user/util/personalInfo",
      method: "get",
    }).then((value) => {
      console.log(value);
      this.setData({
        activityCount: value.data.activityCount,
        groupCount: value.data.groupCount,
        integral: value.data.integral,
      });
    });
    this.setData({
      isLogin: wx.getStorageSync("isLogin"),
      nickName: wx.getStorageSync("nickName"),
      avatarUrl: wx.getStorageSync("avatarUrl"),
    });
    wx.startDeviceMotionListening()
    wx.onDeviceMotionChange(this.getTimer())
    this.getTimer()
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    })
    this.data.animation = animation
    this.setData({
      animationData:this.data.animation.export()
    })
  },
  getTimer() {
    let time = true
    return (e) => {
      if(time) {
        time = false
        setTimeout(() => {
          
          this.data.animation.rotate(e.gamma / 9 * 1.7).step()
          this.setData({
            animationData:this.data.animation.export()
          })
          time = true
        },200)
      }
    }
  },
  onHide() {
    wx.stopDeviceMotionListening()
  },
  onLoad() {
  },
  jumpActivity() {
    app.globalData.isSwitchActivityMy = true;
    wx.switchTab({
      url: "../activity/activity",
    });
  },
  jumpGroup() {
    app.globalData.isSwitchGroupMy = true;
    wx.switchTab({
      url: "../group/group",
    });
  },
  jumpIntegral(e) {
    wx.navigateTo({
      url: "../integralDetail/integralDetail",
    });
  },
  onTabItemTap: function (item) {
    this.login()
  },
});
