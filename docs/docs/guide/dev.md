<!--
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 15:55:21
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 16:22:56
-->

## 注意

首先，确保自己加入了apifox的第二课堂成绩单项目：

![img](https://img-blog.csdnimg.cn/c5886f25666b41ab875347ca2c3a0901.png)


## 修改开发环境

找到`js/http.js`文件:

```js
let flag = false;  //flag的值控制环境
let _baseUrl = "";
if (flag) {
  _baseUrl = "http://49.123.0.26:8090";   //测试数据库
} else {
  _baseUrl = "https://admin.ticknet.hnust.cn";  //线上数据库
}
```

