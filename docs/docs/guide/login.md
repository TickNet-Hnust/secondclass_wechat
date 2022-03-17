## 原生微信/企业微信

小程序可以同时运行在**微信**上和**企业微信**上，但是这两个平台对小程序调用的`API`支持度是不一样的（tip：原生微信小程序支持所有，企业微信小程序支持部分）

[https://developer.work.weixin.qq.com/document/path/91503](https://developer.work.weixin.qq.com/document/path/91503)

例如：

![img](https://img-blog.csdnimg.cn/e812dfcd6a844db8b510baaffa001c48.png)

简而言之就是如果你想要的你的小程序同时能够在两个环境运行，只能采用它们都支持的`API`，而我们这个小程序也是这么做的

## 登录的不同

运行在不一样的环境，自然也是有不同的登录流程，下面解释小程序的登录流程调用：

1. 先在`app.js`中注册login函数

```js
let login = require("./js/login.js"); //login来自该文件

App({
  getToken() {
    return new Promise((resolve, reject) => {
      login(resolve, reject);
    });
  },
```

然后在`pages/index/index.js`中就可以调用：

```js
const app = getApp();

//...
async onLoad() {
    await app.getToken(); //等待获取token
}
```

上面的代码就是调用函数，真正的核心还是在`/js/login.js`文件，我们来看看：

```js
import { baseUrl } from "./http.js";
function reLogin(resolve, reject) {
  wx.getSystemInfo({        //获取系统信息
    success: (e) => {
      if (e.environment && e.environment == "wxwork") {
        //企业微信环境下进行的操作
      } else {
        //普通微信环境下进行的操作
      }
    },
  });
}

module.exports = reLogin;
```

先来看看企业微信环境下进行的操作的代码，原生微信环境下同理：

```js
if (e.environment && e.environment == "wxwork") {
    wx.qy.login({   //调用企业微信登录API
        success: function (res) {
        console.log("登录请求发送成功：", res);
        if (res.code) {
            //发起网络请求
            wx.request({
                url: `${baseUrl}/MpLoginByCode/${res.code}`,
                success: (res) => {
                    console.log("后端换取token请求发送成功：", res);
                    res.data.data && wx.setStorageSync("token", res.data.data.token); //存储Token
                    resolve();
                },
                fail: (err) => {    //学校有一台DNS服务器有问题，某些用户可能会导致错误
                    wx.showModal({
                        content: '获取运营商服务失败，请尝试连接校园网后重启！',
                    })
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
```