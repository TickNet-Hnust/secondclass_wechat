// app.js
let {requestAll,request} = require('js/http.js')

App({
  async onLaunch() {
    // 登录
    
		wx.getSystemInfo({
			success: e => {
        console.log('系统硬件数据:',e)
			  this.globalData.StatusBar = e.statusBarHeight;
			  let capsule = wx.getMenuButtonBoundingClientRect();
			  if (capsule) {
				   this.globalData.Custom = capsule;
				  this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
			  } else {
				  this.globalData.CustomBar = e.statusBarHeight + 50;
			  }
			}
    })
  },
  getToken() {
    return new Promise((resolve) => {
      wx.qy.login({
        success: function(res) {
          console.log('登录请求发送成功：',res)
          if (res.code) {
            //发起网络请求
            wx.request({
              url: `https://admin.ticknet.hnust.cn/MpLoginByCode/${res.code}`,
              success:(res) => {
                console.log('后端换取token请求发送成功：',res)
                wx.setStorageSync('token', res.data.data.token)
                resolve()
              },
              fail:(res) => {
                console.log('后端换取token请求发送失败：',res)
                
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
            reject()
          }
        },
      })
    })
  },
  getDict() {
    requestAll([
      {url: '/dept/util/listCollege',method: 'GET'},//设置部门
      {url: '/dict/data/type/sc_train_program_rank',method: 'GET'}, //活动/培养方案级别
      {url: '/dict/data/type/sc_activity_integral',method: 'GET'}, //积分认定状态
      {url: '/dict/data/type/sc_activity_status',method: 'GET'},//活动状态
      {url: '/dict/data/type/sc_activity_admission_way',method: 'GET'},//报名方式
      {url: '/dict/data/type/sc_activity_flower_scheme',method: 'GET'},//花絮管理
      {url: '/dict/data/type/sc_activity_integral_scheme',method: 'GET'},//积分管理
      {url: '/dict/data/type/sc_integral_type',method: 'GET'}, //积分类型
      {url: '/dict/data/type/sc_activity_evaluate_scheme',method: 'GET'}, //评价管理
      {url: '/dict/data/type/ga_group_join_rule',method: 'GET'}, //群组加入规则
      {url: '/dict/data/type/ga_group_user_status',method: 'GET'}, //群组人员状态
      {url: '/dict/data/type/ga_group_status',method: 'GET'}, //群组状态
    ]).then(value => {
      console.log('获取所有字典成功：',value)
      wx.setStorage({key:'deptList',data:value[0].data}) //设置部门
      wx.setStorage({key:'dict_rank',data:value[1].data}) //活动/培养方案级别
      wx.setStorage({key:'dict_sc_activity_integral',data:value[2].data}) //积分认定状态
      wx.setStorage({key:'dict_sc_activity_status',data:value[3].data}) //活动状态
      wx.setStorage({key:'dict_admissionWay',data:value[4].data}) //报名方式
      wx.setStorage({key:'dict_flower',data:value[5].data}) //花絮管理
      wx.setStorage({key:'dict_integral',data:value[6].data}) //积分管理
      wx.setStorage({key:'dict_integral_type',data:value[7].data}) //积分类型
      wx.setStorage({key:'dict_evaluate_scheme',data:value[8].data}) //评价管理
      wx.setStorage({key:'dict_ga_group_join_rule',data:value[9].data}) //群组加入规则
      wx.setStorage({key:'dict_ga_group_user_status',data:value[10].data}) //群组人员状态
      wx.setStorage({key:'dict_ga_group_status',data:value[11].data}) //群组状态
    })
  },
  onShow(e) {
    
  },
  goTop() {
		wx.pageScrollTo({
			scrollTop: 0,
			success:(res) => {
				wx.showToast({
					title: '回到顶部',
				  })
			}
		})
	},
  showSuccess() {
    wx.showToast({
      title: '加载成功',
      duration:1000
    })
  },
  globalData: {
    isSwitchMy: false, //是否需要切换到“我的”,
    toast: '', //活动群组修改成功的弹窗
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ]
  }
})
