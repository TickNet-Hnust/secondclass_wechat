// components/delayButton/delay-button.js
Component({
	options:{
		addGlobalClass: true  //使全局类作用到当前组件
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		className: {  //class会冲突，不生效
			type: String
		},
		disabled:{
			type: Boolean
		},
		fuck: {
			type: String
		}
	},
	attached() {
		console.log(this.properties)
	},
	/**
	 * 组件的初始数据
	 */
	data: {
		isUse: true  //是否可以被使用
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		onTap(e) {
			if(this.data.isUse) {
				this.data.isUse = false
				this.triggerEvent('click',e)
				setTimeout(() => {
					this.data.isUse = true
				},4000)
			}
		}
	}
})
