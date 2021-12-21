// components/l-time/l-time.js
Component({
  options: {
    addGlobalClass: true, //使全局类作用到当前组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    value: {
      type: String,
      value: "",
    },
    n: String, //n个月
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeFront: "",
    timeEnd: "00:00",
  },
  observers: {
    value(newVal) {
      console.log(newVal, "tete");
      if (!!newVal) {
        let arr = newVal?.split(" ");
        console.log(arr);
        this.setData({
          timeFront: arr[0],
          timeEnd: arr[1].slice(0, 5),
        });
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //未来n个月的时间
    formatDate(n = 0) {
      let temp = +new Date();
      if (n) {
        temp = temp + 2592000000 * n;
      }
      const date = new Date(temp);
      const yy = date.getFullYear();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      return `${yy}-${mm}-${dd}`;
    },
    timeChange(e) {
      this.setData({
        [e.currentTarget.dataset.time]: e.detail.value,
      });
      let res = `${this.data.timeFront} ${this.data.timeEnd}:00`;
      this.triggerEvent("change", res);
    },
  },
  attached() {
    //attached 后于 observe执行
    this.setData({
      timeFront: this.formatDate(+this.data.n),
    });
    let res = `${this.data.timeFront} ${this.data.timeEnd}:00`;
    this.triggerEvent("change", res); //初始化数据
  },
});
