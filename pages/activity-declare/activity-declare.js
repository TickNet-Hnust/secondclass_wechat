// pages/activity-declare/activity-declare.js
import { request } from "../../js/http";
import getImgUrl from "../../utils/upload.js";
import Toast from "@vant/weapp/toast/toast";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aid: "",
    CustomBar: app.globalData.CustomBar,
    result1: [],
    result2: [],
    //过滤后的课程分类
    filterCourseClassificationList: [],
    //签到人列表
    registerList: [],
    //申报人列表
    declareList: [],
    //活动级别数组
    rankList: [],
    //申报理由数组
    reasonList: [],
    //图片列表
    imgList: [],
    postData1: {
      activityId: "",
      //申请积分
      userId: "",
      applyIntegral: "",
      //申报理由
      reason: "",
      status: "0",
      applyWay: "0",
    },
    postData2: {
      activityId: "",
      //申请积分
      userId: "",
      applyIntegral: "",
      //申报理由
      reason: "",
      status: "0",
      applyWay: "0",
      material: "",
    },
    restore1: true,
    restore2: true,
    TabCur: "", //决定是哪个弹出框
    rankName: "",
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    });
    // this.toggleDelay()
  },

  //重置页面数据
  reset() {
    this.setData({
      restore1: false,
      restore2: false,
    });
    setTimeout(() => {
      this.setData({
        restore1: true,
        restore2: true,
      });
    });
    (this.data.postData1 = {
      activityId: this.data.aid,
      //申请积分
      userId: "",
      applyIntegral: "",
      //申报理由
      reason: "",
      status: 0,
      applyWay: 0,
    }),
      (this.data.postData2 = {
        activityId: this.data.aid,
        //申请积分
        userId: "",
        applyIntegral: "",
        //申报理由
        reason: "",
        status: 0,
        applyWay: 0,
        material: "",
      });
    this.setData({
      postData1: this.data.postData1,
      postData2: this.data.postData2,
      result1: [],
      result2: [],
    });
  },
  //签到人列表选择改变事件
  onChange1(event) {
    console.log(event, "签到人选择事件");
    this.setData({
      result1: event.detail,
    });
    console.log(this.data.result1, "当前选中的签到人");
  },
  //申报列表选择改变事件
  onChange2(event) {
    console.log(event, "签到人选择事件");
    this.setData({
      result2: event.detail,
    });
    console.log(this.data.result2, "当前选中的签到人");
  },
  //活动级别单选事件
  radioRankChange(event) {
    console.log(event.detail.value, "传来的数组index");
    let index = event.detail.value;
    this.setData({
      reasonList: this.data.rankList[index].children,
      rankName: this.data.rankList[index].name,
      restore2: false,
    });
    setTimeout(() => {
      this.setData({
        restore2: true,
        "postData1.applyIntegral": "",
        "postData2.applyIntegral": "",
      });
    });
  },
  //申报理由单选事件
  radioReasonChange(event) {
    if (this.data.TabCur == 0) {
      this.setData({
        "postData1.applyIntegral": event.detail.value.split(",")[0],
        "postData1.reason": event.detail.value.split(",")[1],
      });
    }
    if (this.data.TabCur == 1) {
      this.setData({
        "postData2.applyIntegral": event.detail.value.split(",")[0],
        "postData2.reason": event.detail.value.split(",")[1],
      });
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    });
  },
  //全选
  //微信的js里面可以用箭头函数，但是wxml里面不能用
  selectAll1() {
    console.log(this.data.registerList, "签到人列表");

    this.data.registerList.forEach((item) => {
      //注意includes和indexOf的区别
      if (!this.data.result1.includes("" + item.userId)) {
        this.data.result1.push("" + item.userId);
      }
    });

    this.setData({
      result1: this.data.result1,
    });
  },
  selectAll2() {
    console.log(this.data.declareList, "申报人列表");

    this.data.declareList.forEach((item) => {
      //注意includes和indexOf的区别
      if (!this.data.result2.includes("" + item.userId)) {
        this.data.result2.push("" + item.userId);
      }
    });
    this.setData({
      result2: this.data.result2,
    });
  },
  //取消全选
  selectCancel1() {
    this.setData({
      result1: [],
    });
  },
  //取消全选
  selectCancel2() {
    this.setData({
      result2: [],
    });
  },
  submit() {
    if (this.data.TabCur == 0) {
      let postDataR = [];
      console.log(this.data.result1, "申报人userid数组");
      this.data.result1.forEach((item) => {
        let postData1Back = JSON.parse(JSON.stringify(this.data.postData1));

        postData1Back.userId = item;

        postDataR.push(postData1Back);
      });
      console.log(postDataR, "签到要发送请求的数据postDataR");
      if (
        postDataR.length == 0 ||
        postDataR[0].applyIntegral == "" ||
        postDataR[0].reason == ""
      ) {
        Toast("请填写完全");
      } else {
        request({
          url: "/secondClass/activity/integral",
          method: "POST",
          data: postDataR,
        }).then((value) => {
          console.log(value, "签到提交申报积分接口返回值");
          Toast("提交成功");
          this.reset();
        });
      }
    }

    if (this.data.TabCur == 1) {
      let postDataD = [];
      console.log(this.data.result2, "申报人userid数组");
      this.data.result2.forEach((item) => {
        let postData2Back = JSON.parse(JSON.stringify(this.data.postData2));

        postData2Back.userId = item;

        postDataD.push(postData2Back);
      });
      console.log(postDataD, "申报要发送请求的数据postDataD");
      //method要搞清，要发POST而不是GET
      if(postDataD[0].material == "") {
        Toast("请上传图片材料");
        return
      }
      if (
        postDataD.length == 0 ||
        postDataD[0].applyIntegral == "" ||
        postDataD[0].reason == ""  
      ) {
        Toast("请填写完全");
        return 
      }
        request({
          url: "/secondClass/activity/integral",
          method: "POST",
          data: postDataD,
        }).then((value) => {
          console.log(value, "申报提交申报积分接口返回值");
          Toast("提交成功");
          this.reset();
          this.setData({
            imgList: [],
          });
        });
      
    }
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url,
    });
  },
  ChooseImage() {
    let that = this;
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], //从相册选择
      success: (res) => {
        // if (!["jpg"].includes(res.tempFiles[0].path.slice(-3))) {
        //   Toast("图片只支持jpg");
        //   return;
        // }
        if (res.tempFiles[0].size > 1024 * 1024 * 2) {
          Toast("图片大小不能超过2M");
          return;
        }
        that.setData({
          imgList: res.tempFilePaths,
        });
        let file = res.tempFilePaths[0];
        wx.compressImage({
          src: file, // 图片路径
          quality: 10, // 压缩质量
          success: (res) => {
            console.log(file, "test1");
            console.log(res, "test2");
            getImgUrl(res.tempFilePath).then((value) => {
              console.log(value, "图片的地址");
              that.setData({
                "postData2.material": value,
              });
            });
          },
        });
      },
    });
  },
  DelImg(e) {
    wx.showModal({
      title: "提示框",
      content: "确定要移除这张图片吗？",
      cancelText: "取消",
      confirmText: "确定",
      success: (res) => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList,
          });
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      filterCourseClassificationList: JSON.parse(
        options.filterCourseClassificationListString
      ),
      aid: JSON.parse(options.aid),
      maxLayer: JSON.parse(options.maxLayer),
      "postData1.activityId": JSON.parse(options.aid),
      "postData2.activityId": JSON.parse(options.aid),
    });
    console.log(
      this.data.filterCourseClassificationList,
      "接受到的过滤后的课程分类"
    );
    console.log(this.data.aid, "活动id");
    console.log(this.data.maxLayer, "最大层级");

    // 积分在第三层
    if (this.data.maxLayer == 3) {
      this.data.filterCourseClassificationList.children.forEach((item1) => {
        if (item1.type == 0) {
          this.data.rankList.push(item1);
        }
        if (item1.type == 1 || (item1.type == 2 && item1.integrationRange)) {
          this.data.filterCourseClassificationList.children.forEach((item2) => {
            if (item2.children) {
              item2.children.push(item1);
            }
          });
        }
      });

      this.setData({
        rankList: this.data.rankList,
      });
      console.log(this.data.filterCourseClassificationList, "积分标准分类");
      console.log(this.data.rankList, "活动级别列表");
    }
    // 积分在第一层
    else if (
      this.data.maxLayer == 1 ||
      (this.data.maxLayer == 2 &&
        this.data.filterCourseClassificationList.children[0].type == 2)
    ) {
      this.data.reasonList.push(this.data.filterCourseClassificationList);
      if (this.data.filterCourseClassificationList.children) {
        this.data.filterCourseClassificationList.children.forEach((item) => {
          if (item.type == 2 && item.integrationRange) {
            this.data.reasonList.push(item);
          }
        });
      }

      this.setData({
        reasonList: this.data.reasonList,
      });
      console.log(this.data.reasonList, "我是理由列表");
    }
    //积分在第二层
    else {
      this.setData({
        reasonList: this.data.filterCourseClassificationList.children,
      });
    }
    //获取签到人列表
    request({
      url: "/secondClass/activity/registe/list",
      method: "GET",
      data: {
        activityId: this.data.aid,
      },
    }).then((value) => {
      this.setData({
        registerList: value.rows,
      });
      console.log(this.data.registerList, "签到人列表");
    });
    //获取申报人列表
    request({
      url: "/secondClass/activity/enroll/list",
      method: "GET",
      data: {
        activityId: this.data.aid,
      },
    }).then((value) => {
      this.setData({
        declareList: value.rows,
      });
      console.log(this.data.declareList, "申报人列表");
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
