## 请求流程

微信小程序是自己封装的请求，可以查看`js/http.js`

出去弹窗提示，下面是核心的代码

```js
let flag = false;
let _baseUrl = "";
if (flag) {
  _baseUrl = "http://192.168.124.10:8080";
} else {
  _baseUrl = "https://admin.ticknet.hnust.cn";
}
export const baseUrl = _baseUrl;
let commonParams = {
  url: "",
  data: {},
  method: "POST",
  header: {},
  dataType: "json",
};

export const request = (opt) => {
  let options = Object.assign({}, commonParams, opt);
  let { url, data, method, header, dataType } = options;
  header["Authorization"] = wx.getStorageSync("token") || ""; //提取储存的token，放到请求头上面
  let _url = baseUrl + url; //合成url
  showFullScreenLoading();
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      data: data,
      method: method,
      header: header,
      dataType: dataType,
      success: function (res) {
        if (res && res.statusCode == 200 && res.data) {
          if (res.data.code == 401) {       //401token失效重新登录
            reLogin(resolve, reject);
          } else if (res.data.code == 403) {  //403无权限
            wx.showToast({
              title: "无权限操作",
              icon: "loading",
              duration: 1000,
            });
            reject(res);
          } else if (res.data.msg == "不允许重复提交，请稍后再试") {
            wx.showToast({
              title: "不允许频繁操作，请稍后再试",
              icon: "none",
              mask: true,
              duration: 1000,
            });
          } else if (               //500服务端出错
            res.data.code == 500 &&
            res.data.data == null &&
            res.data.msg != "操作失败"
          ) {
            console.log(res, res.data);
            wx.showModal({
              content: "未知错误，请反馈给管理员",
              showCancel: false,
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res);
        }
      }
    });
  });
};
```

上面的看起来很复杂，但其实可以不用管那么多，使用方法很简单：

```js
import { request } from '../../js/http.js'

//get请求
request({
    url: "/secondClass/activity/list", //地址（根据apifox来）
    method: "GET",
    data: {
        name: '123'
    },
}).then((value) => {
    console.log(value) //拿到数据
}

//其他请求的写法可以从pages里面某些页面的`.js`文件里面找
```