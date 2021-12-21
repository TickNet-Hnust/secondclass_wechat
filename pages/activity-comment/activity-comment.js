// pages/activity-comment/activity-comment.js
import { request } from "../../js/http";
import Toast from "@vant/weapp/toast/toast";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postData: {
      activityId: "",
      content: "",
      score: "",
    },
  },
  onChange(e) {
    this.setData({
      "postData.score": e.detail,
    });
  },
  contentChange(e) {
    this.setData({
      "postData.content": e.detail.value,
    });
  },
  sure() {
    if (this.data.postData.content == "") {
      Toast("文字内容不能为空");
      return;
    }
    if (this.data.postData.score == "") {
      Toast("请先评分再提交");
      return;
    }
    request({
      url: "/utils/msgSecCheck",
      method: "get",
      data: {
        text: this.data.postData.content,
      },
    })
      .then((value) => {
        if (value.data.errcode == 87014) {
          Toast(JSON.stringify(value.data));
        } else {
          return request({
            url: "/secondClass/activity/evaluation",
            method: "POST",
            data: this.data.postData,
          });
        }
      })
      .then((value) => {
        console.log(value);
        if (value.code == 200) {
          app.globalData.evaluateToast = true;
        }
        wx.navigateBack();
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.postData.activityId = options.aid;
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
