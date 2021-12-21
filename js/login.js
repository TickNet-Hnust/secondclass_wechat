import { baseUrl } from "./http.js";
function reLogin(resolve, reject) {
  wx.getSystemInfo({
    success: (e) => {
      if (e.environment && e.environment == "wxwork") {
        wx.qy.login({
          success: function (res) {
            console.log("登录请求发送成功：", res);
            if (res.code) {
              //发起网络请求
              wx.request({
                url: `${baseUrl}/MpLoginByCode/${res.code}`,
                success: (res) => {
                  console.log("后端换取token请求发送成功：", res);
                  wx.setStorageSync("token", res.data.data.token);
                  resolve();
                },
                fail: (err) => {
                  console.log("后端换取token请求发送失败：", err);
                  reject();
                },
              });
            } else {
              console.log("登录失败！" + res.errMsg);
              reject();
            }
          },
        });
      } else {
        wx.login({
          success: function (res) {
            console.log("登录请求发送成功：", res);
            if (res.code) {
              //发起网络请求
              wx.request({
                url: `${baseUrl}/WxLoginByCode/${res.code}`,
                success: (res) => {
                  console.log("后端换取token请求发送成功：", res);
                  wx.setStorageSync("token", res.data.data.token);
                  resolve();
                },
                fail: (err) => {
                  console.log("后端换取token请求发送失败：", err);
                  reject();
                },
              });
            } else {
              console.log("登录失败！" + res.errMsg);
              reject();
            }
          },
        });
      }
    },
  });
}

module.exports = reLogin;
