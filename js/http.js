// 配置文件
const config = require('./config.js')
var app = getApp();
const host = config.httpServer; // 服务器baseUrl

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function postData(url, postData, doSuccess, doFail) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    // 这个header根据你的实际改！
    header: {
      'Content-Type': 'application/json',
      'Authorization': config.httpToken,
      // 'Request-Origin': 'app'
    },
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      // if (res.data.result.token) { // 如果有token保存下来，下次请求带着token访问
      //   config.httpToken = res.data.result.token;
      //   console.log("token--> ", config.httpToken)
      // }
      doSuccess(res.data);
    },
    fail: function () {
      doFail && doFail();
    },
  })
}

/**
 * GET请求，
 * URL：接口
 * getData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function getData(url, getData, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      'Content-Type': 'application/json',
      'Authorization': config.httpToken,
      // 'Request-Origin': 'app'
    },
    method: 'GET',
    data: getData,
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
  })
}

/**
 * module.exports用来导出代码
 * js文件中通过var http = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
module.exports.postData = postData;
module.exports.getData = getData;