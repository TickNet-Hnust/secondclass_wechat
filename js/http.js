
var flag = false;
var _baseUrl = '';
if (flag) {
	_baseUrl = 'http://127.0.0.1:8080';
} else {
	_baseUrl = 'http://127.0.0.1:8080';
}
var baseUrl = _baseUrl;
var commonParams = {
	url: '',
	data: {},
	method: 'POST',
	header: {
	
	},
	dataType: 'json'
};
export const request = (opt) => {
	let options = Object.assign({}, commonParams, opt)
	let { url, data, method, header, dataType } = options
	header["Authorization"] = wx.getStorageSync("token") || ""
	let _url = baseUrl + url
	wx.showLoading({
		title: '数据加载...',
	})
	return new Promise((resolve, reject) => {
		wx.request({
			url: _url,
			data: data,
			method: method,
			header: header,
			dataType: dataType,
			success: function (res) {
				if (res && res.statusCode == 200 && res.data) {
					if (res.data.code == 403) {
						wx.showToast({
							title: '您尚未登录或登录信息已过期',
							icon: "loading",
							success: () => {
								wx.navigateTo({ url: '/pages/my/my' })
							}
						})
						wx.qy.login({
							success: function(res) {
								console.log(res)
								if (res.code) {
								  //发起网络请求
								  	wx.request({
										url: `http://192.168.124.8:8080/MpLoginByCode/${res.code}`,
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
							}
							})
					} else {
						resolve(res.data)
					}
 
				} else {
					reject(res)
				}
			},
			fail: function (err) {
				wx.showToast({
					title: '请求超时',
					icon: 'none',
					mask: true,
					duration: 2000
				})
 
			},
			complete: function () {
				wx.hideLoading()
			}
		})
	})
}
//并发
export const requestAll = (requests) => {
	let promiseList = [];
	for (let i = 0; i < requests.length; i++) {
		let opt = requests[i];
		promiseList.push(request(opt,true))
	}
	var ret = Promise.all(promiseList);
	ret.then(e => {
		let needLogin = false;
		needLogin = e.some(v => {
			return v.code == 403
		})
		if (needLogin) {
			wx.showToast({
				title: '您尚未登录或登录信息已过期',
				icon: "loading",
				success: function success() {
					wx.navigateTo({
						url: '/pages/login'
					});
				}
			});
		}
	});
	return ret;
}