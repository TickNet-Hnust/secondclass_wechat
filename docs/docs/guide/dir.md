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
├─ .git         # git文件夹
├─ bin          # 可执行文件，没啥用
├─ docs         # 此文档的仓库
├─ out          # 不用管
├─ public       # 配合webpack打包的静态目录
├─ src          # 开发根目录
├─ tests        # 不用管
├─ .editorconfig        # 不用管
├─ .env.development     # 不用管
├─ .env.production      # 不用管
├─ .env.staging         # 不用管
├─ .eslintignore        # 不用管
├─ .eslintrc.js         # 不用管
├─ .gitignore           # git提交时忽略提交的文件
├─ .prettierignore      # 不用管
├─ .prettierrc.js       # 不用管
├─ babel.config.js      # 不用管
├─ deploy.config.js     # 自动化部署相关
├─ docs-loader.js       # 不用管
├─ jest.config.js       # 不用管
├─ jsdoc-vue.js         # 不用管
├─ jsdoc.config.js      # 不用管
├─ package-lock.json    # 不用管
├─ package.json         # 不用管
├─ README.md            # readme文档
├─ vue.config.js        # 打包时候的配置
└─ yarn.lock            # 不用管
```

## 安装

采用 **npm** 安装，而且必须使用 **6** 开头的版本

查看 npm 版本:

```shell
$ npm -v
6.14.15
```

如果不是，升级或降级到6版本

```shell
$ npm install -g npm@6
```

确保使用6开头的npm之后，执行：

```shell
$ npm install
```

安装完成后可能会产生一些过期警告，但是没报错就行

现在的目录结构：

```shell {4}
├─ .git         # git文件夹
├─ bin          # 可执行文件，没啥用
├─ docs         # 此文档的仓库
├─ node_modules # 懂得都懂
├─ out          # 不用管
├─ public       # 配合webpack打包的静态目录
├─ src          # 开发根目录
├─ tests        # 不用管
├─ .editorconfig        # 不用管
├─ .env.development     # 不用管
├─ .env.production      # 不用管
├─ .env.staging         # 不用管
├─ .eslintignore        # 不用管
├─ .eslintrc.js         # 不用管
├─ .gitignore           # git提交时忽略提交的文件
├─ .prettierignore      # 不用管
├─ .prettierrc.js       # 不用管
├─ babel.config.js      # 不用管
├─ deploy.config.js     # 自动化部署相关
├─ docs-loader.js       # 不用管
├─ jest.config.js       # 不用管
├─ jsdoc-vue.js         # 不用管
├─ jsdoc.config.js      # 不用管
├─ package-lock.json    # 不用管
├─ package.json         # 不用管
├─ README.md            # readme文档
├─ vue.config.js        # 打包时候的配置
└─ yarn.lock            # 不用管
```

## 启动

```shell
$ npm run dev
```

打开 [http://localhost:80](http://localhost:80)

![img](https://img-blog.csdnimg.cn/c16324d980eb4673bc57174c0a76f066.png)