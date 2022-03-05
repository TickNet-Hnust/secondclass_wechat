<!--
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 15:12:49
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 16:27:09
-->
## 本地安装

1. gitlab私有仓库：[https://gitlab.com/peterroe/second_class_front_weapp/-/tree/master](https://gitlab.com/peterroe/second_class_front_weapp/-/tree/master)

2. 确保自己是这个私有仓库的成员，如若没有，找管理员添加（林舒恒）

3. 然后，本地克隆该仓库的 **master分支**

```shell
$ git clone -b master git@gitlab.com:peterroe/second_class_front_weapp.git
```

4. 你将会得到如下目录结构

## 目录结构

```shell {}
├─ colorui      # colorUI的css文件
├─ component    # 开发者封装的组件文件夹
├─ config       # 腾讯位置服务示例
├─ docs         # 此文档的仓库
├─ font         # icon图标
├─ images       # 图片文件夹
├─ js           # 封装的登录和请求的脚本文件
├─ pages        # 页面文件夹
├─ utils        # 封装的js工具脚本
├─ .gitignore           # git提交时忽略提交的文件
├─ .prettierignore      # 不用管
├─ app.js               # 微信小程序相关全局脚本
├─ app.json             # 微信小程序相关全局配置
├─ app.wxss             # 微信小程序相关全局样式
├─ fide.project.config.json        # 不用管
├─ package-lock.json    # 不用管
├─ package.json         # 不用管
├─ project.config.json  # 可以不用管
├─ README.md            # readme文档
├─ sitemap.json        # 打包时候的配置
```

## 安装

*用微信开发者工具进行开发*

采用 **npm** 安装，对版本无需求，这里我使用的是`8.3.1`

执行：

```shell
$ npm i
```

安装完成后可能会产生一些过期警告，但是没报错就行

然后执行下图的操作，构建`npm`:

![img](https://img-blog.csdnimg.cn/701600821bc741d6ac0af2ba48f9d639.png)

待构建完成之后，可以看到小程序成功运行，如果加载失败，可以像下图那样点击右上角的按钮，弹出预览窗口(可能解决这个问题)：

![img](https://img-blog.csdnimg.cn/36ae57ef1d1c46e0ab957d153a3e4989.png)

## 其他情况

如果遇到了某些问题你可能需要进行这些操作：

* 确认微信开发者工具已经登录，并且在小程序后台把你加入了开发者
* 确认基础库版本
* 以及下面相关的配置（可以和我的保持一致）

![img](https://img-blog.csdnimg.cn/d38deb7da47146b98a80101d109e1c4e.png)

更多问题请联系原开发者