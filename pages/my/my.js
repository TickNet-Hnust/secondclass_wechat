Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    isLogin:false,
    nickName: '',
    avatarUrl:'',
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  login() {
    wx.getUserProfile({
      desc: '获取的信息用于展示',
      success:(res) => {
        console.log(res)
        this.setData({
          isLogin:true,
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
        wx.setStorage({
          key:'isLogin',
          data:true
        })
        wx.setStorage({
          key:'nickName', 
          data:res.userInfo.nickName
        })
        wx.setStorage({
          key:'avatarUrl', 
          data:res.userInfo.avatarUrl
        })
        wx.showToast({
          title: '登录成功',
        })
      }
    })
  },
  logout() {
    if(this.data.isLogin == false) {
      wx.showToast({
        title: '您还未登录',
        icon:'none'
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '确定退出登录吗',
      success:(res) => {
        if (res.confirm) {
          this.setData({
            isLogin:false,
            nickName: '',
            avatarUrl: ''
          })
          wx.setStorageSync('isLogin', false)
          wx.setStorageSync('nickName', '')
          wx.setStorageSync('avatarUrl', '')
          wx.showToast({
            title: '退出登录'
          })
        }
      }
    })
    
  },
  onLoad() {
    this.setData({
      isLogin: wx.getStorageSync('isLogin'),
      nickName:wx.getStorageSync('nickName'),
      avatarUrl:wx.getStorageSync('avatarUrl')
    })
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },
  
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    //切换主题色
    switchColor() {
      wx.showModal({
        title: '提示',
        content:'该功能还在开发中，敬请期待...'
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  
})