// components/l-select/l-select.js
Component({
    options:{
		addGlobalClass: true  //使全局类作用到当前组件
	},
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        range: Array,
        rangeKey: String,
        valueKey: String,
        value:{
            type: Object,
            optionalTypes: [Number, String]
        }  //实际的Id
    },

    /**
     * 组件的初始数据
     */
    data: {
        no: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        change(e) {
            let res = this.data.range[e.detail.value][this.data.valueKey]

            this.triggerEvent('change',res)
        }
    },
    observers:{
        value(newValue){
            console.log(newValue,'new')
            this.data.range.forEach((item,index) => {
                if(item[this.data.valueKey] == newValue) {
                    this.setData({
                        no : index
                    })
                }
            })
        }
    },
    lifetimes:{
        attached() {
            // this.data.range.forEach((item,index) => {
            //     if(item[this.data.valueKey] == this.data.value) {
            //         this.setData({
            //             no : index
            //         })
            //     }
            // })
        }
    }
})
