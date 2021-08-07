// app.js
let http = require('js/http.js')
App({
  onLaunch() {
    wx.request({
      url: 'http://127.0.0.1:8080/system/dict/data/type/sc_activity_admission_way',
      success:(res) => {
        console.log(res)
      },
      header:{
        'Authorization':'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImFjNGNjNmRlLTU4N2QtNGM1Yy05ZWRlLTRkZGU5YzViMGI4YiJ9.LBL8alNcNDAqkCdbvwxTa3Dn09X17NwlgmO6UVXnkIpptqj478U2RJOfppr67NQIoa2te5HeJpGHbpQ0g10zEA',
        // "User-Agent": "PostmanRuntime/7.26.8",
        "Content-Type": "multipart/form-data; boundary=--------------827246071184144487089220"
      }
    })
	//获取部门
	http.getData('/dept/util/listByType',{type:1},(res) => {
		wx.setStorageSync('dept', res.data)
		console.log(wx.getStorageSync('dept'),res,123)
  })
  //获取报名方式字典
  // http.getData('/system/dict/data/type/sc_activity_admission_way',{type:1},(res) => {
	// 	// wx.setStorageSync('dept', res.data)
	// 	console.log(res,123)
  // })
    // 登录
    wx.qy.login({
			success: function(res) {
				console.log(res)
				// if (res.code) {
				//   //发起网络请求
				//   wx.request({
				// 	url: 'http://127.0.0.1:8080/loginByCode',
				// 	data: {
				// 	  code: res.code
				// 	}
				//   })
				// } else {
				//   console.log('登录失败！' + res.errMsg)
				// }	
			}
		})
		wx.getSystemInfo({
			success: e => {
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
