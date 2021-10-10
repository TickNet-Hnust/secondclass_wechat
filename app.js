// app.js
// let http = require('js/http.js')

App({
  onLaunch() {
    // 登录
    
		wx.getSystemInfo({
			success: e => {
        console.log(e)
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
    console.log(49)
    wx.qy.login({
			success: function(res) {
				console.log(res,44)
				if (res.code) {
				  //发起网络请求
				  wx.request({
            url: `https://admin.ticknet.hnust.cn/MpLoginByCode/${res.code}`,
            success:(res) => {
              console.log(res,45)
              wx.setStorageSync('token', res.data.data.token)
            },
            fail:(res) => {
              console.log(res,46)
            }
          })
          
				} else {
				  console.log('登录失败！' + res.errMsg)
				}
      },
      fail:(res) => {
        console.log(50)
      },
      complete:(res) => {
        console.log(50)
      }
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
