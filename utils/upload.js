/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-08-04 16:54:39
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-04 17:24:25
 */
import { getPolicy, upload, getOssFileUrl } from './ossImage.js'
export default async function getImgUrl(file) {
	// console.log(file)
	let ossFileUrl
	await getPolicy() // 获取签名
	.then(res => {
			// console.log(res,777)
			if (res.code === 200) {
				return Promise.resolve(res.data)
			} else if (res.code === 10012) {
				this.msgError('上传次数受限')
				return Promise.reject('上传次数受限')
			}
		})
		.then(ossData => {
			// 上传
			ossFileUrl = getOssFileUrl(ossData, file)
			// console.log(ossFileUrl, 777)
			// fileObj.status = 'uploading' // 设置为上传中
			return upload(ossData, file, ossFileUrl)
		})
		.then(res => {
			// if (res.status === 200) {
				// 上传成功
				// fileObj.status = 'done'
				// if (this.imgUrls.length) {
				// this.imgUrls += ';' + ossFileUrl
				// } else {
				// this.imgUrls += ossFileUrl
				// }
				// console.log(this.imgUrls,555)
			// }
		})
	return Promise.resolve(ossFileUrl)
}
    

