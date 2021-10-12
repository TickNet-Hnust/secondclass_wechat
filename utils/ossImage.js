import {request} from '../js/http.js'

// 获取上传签名
export function getPolicy() {
    return request({
        url: '/oss/secondClass/getCertificate',
        method: 'GET'
    })
}

function getUUID() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
}
// "ossData": {
//   "accessid": "LTAI4GBuAcXuvfaoqa9HgA6S",
//     "policy": "eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0xOVQwODowNjozNi41MzVaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCIyMDIwLTEyLTE5Il1dfQ==",
//     "signature": "w1p5M/Y9W4s4ukVbG+BFlXRYRfc=",
//     "dir": "2020-12-19",
//     "host": "https://ticknet-swzl.oss-cn-hangzhou.aliyuncs.com",
//     "expire": "1608365196"
// }
/**
 * 通过getOssFileUrl获取上传到oss后的完整路径
 * 再通过upload上传图片
/*
  获取图片路径
  */
export function getOssFileUrl(ossData, file) {
    // const url = 'https://ticknet-swzl.oss-cn-hangzhou.aliyuncs.com'
    const host = ossData.host
    // const photoName = file.file.name // 原图片的名称 abc.jpg
    const photoName = file;
    const catalogue = ossData.dir // Todo .replace('-', '/')
    const randName = getUUID() + photoName.substring(photoName.lastIndexOf('.')) // sdfsdfssadfe.jpg
    // console.log(randName,'randname')
    const key = catalogue + '/' + randName // 存储到oss的图片名称 自己定，必须确保唯一性，不然会覆盖oss中原有的文件
    
    return host + `/${key}`
}
/*
 上传图片,status: 0成功，data为上传成功时的文件url
 */
export function upload(ossData, file, ossFileUrl) {
    // console.log(ossData, file, ossFileUrl,11)
    const photoName = file; // 原图片的名称 abc.jpg
    const policy = ossData.policy // 服务器端同事调oss的API，通过接口返回给前端的 policy
    const OSSAccessKeyId = ossData.accessid
        // const callback = "callback"  // 服务器端同事调oss的API，通过接口返回给前端的 callback。这个是需要 oss 触发这个回调来通知服务器操作结果。
    const signature = ossData.signature
    const host = ossData.host
    const key = ossFileUrl.substring(host.length + 1)
    
    // wx.uploadFile({
    //     url: 'http://localhost:8080/utils/imgSecCheck',  //内容安全审查接口
    //     header : {
    //         Authorization: wx.getStorageSync('token')
    //     },
    //     filePath: file,
    //     name: 'file',
    //     success:(e)=> {
    //         e.data = JSON.parse(e.data)
    //         console.log(e)
    //         if(e.data.data.errcode == 0) {
                wx.uploadFile({
                    url: host, //仅为示例，非真实的接口地址
                    filePath: file,
                    name: 'file',
                    formData:{
                        // 'name':`${photoName}`,
                        'key': `${key}`,
                        'policy': `${policy}`,
                        'OSSAccessKeyId': `${OSSAccessKeyId}`,
                        'Signature': `${signature}`,
                        'success_action_status': 200,
                        // 'file':file
                    },
                    success: function(res){
                    var data = res.data
                    
                    //do something
                    }
                })
    //         } else {
    //             wx.showToast({
    //               title: JSON.stringify(e.data.data),
    //               icon: 'none'
    //             })
    //         }
            
    //     }
    // })
    
		// return request({
		// 	url: host,
		// 	method: 'POST',
		// 	data:param
		// }).then(res => {
		// 	return Promise.resolve(res)
		// })
		// .catch(err => {
        //     return Promise.reject(err)
        // })
    // return axios
    //     .post(host, param)
    //     .then(res => {
    //         return Promise.resolve(res)
    //     })
    //     .catch(err => {
    //         return Promise.reject(err)
    //     })
        // })
}