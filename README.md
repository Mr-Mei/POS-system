# vue实战----点餐收银系统

## 项目效果图

![image](https://github.com/Mr-Mei/POS-system/blob/master/public/project.gif)

## 项目分析

>核心的逻辑部分：
这个项目主要是实现在线的用户点餐、对点餐列表商品的增删改查和查看营业额订单等功能；首先建议使用mockplus工具画出草图，便于提高开发效率。

>实现的功能：
>1.点击常用商品，还有下面的有图标的各类商品，会在左侧的点餐页面中出现，并且还会计算相应的数量和金额。
2.当我们对点餐页面进行操作，进行删除和增加可以改变点餐页面中的数量以及金额，当我们点击删除的时候，点餐页面一切清空。
3.当我们点击结账页面，我们通过模拟结账，会弹出一个成功的提示或者失败的提示。
4.点击“挂单”按钮，可以到挂单页面对商品进行删除和模拟结账操作。
5.点击“店铺”，进入店铺页面，我们能够查看营业额和对应的订单量。

## 用到的技术栈

>Vue + vuex + Element + Axios + vueRouter + webpack
>具体分析：
1.使用vue-cli4.x搭建的开发环境；
2.使用vue-router做路由转换；
3.使用element-ui做界面美化；
4.使用axios做跨域请求接口数据；
5.使用icofont在线图标管理；
6.使用vuex进行相关状态管理；
7.使用vue2.x语法和es6语法；
8.使用配置webpack进行打包

## 项目下载

>1.前提是要有node.js、npm、vue-cli环境（最好有Git，会方便很多）；
>2.下载项目（git clone最好，也可以下载zip包）；
>3.打开终端切换到该项目名称下，依次执行以下命令行：
>npm install
>ps：install dependencies 安装开发环境的依赖，因为不是直接打包上传的项目
>npm run serve
>ps：serve with hot reload at localhost:8080 运行项目基本没问题

## 说明

>1.项目数据使用easyMock模拟，由于easyMock官网经常打不开，我这里用我本地搭建的easyMock接口，模拟的数据已保存在public/mock/data.json文件；
>2.项目中仍有许多需要完善之处，本人能力有限，不足之处望多多包涵！！！欢迎大神下载项目，并进行二次开发。
（项目地址：https://github.com/Mr-Mei/POS-system）
