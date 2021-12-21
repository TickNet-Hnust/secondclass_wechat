Component({
  options: {
    addGlobalClass: true, //使全局类作用到当前组件
  },
  properties: {
    // 图片资源
    src: {
      type: String,
      value: "",
    },
    className: {
      type: String,
      value: "",
    },
    // 图片未加载完成时的占位图
    placeholder: {
      type: String,
      value: "../../images/loading.gif",
    },
    // 图片加载失败时的占位图
    error: {
      type: String,
      value: "../../images/error.jpg",
    },
    // 是否执行懒加载
    lazyload: {
      type: Boolean,
      value: true,
    },
    mode: {
      type: String,
      value: "aspectFill",
    },
  },

  data: {
    // 是否加载完成
    loadFinish: false,
  },

  methods: {
    /**
     * 加载成功
     */
    _loadSuccess: function (e) {
      this.setData({
        loadFinish: true,
      });
      // this.triggerEvent('success', e);
    },
    /**
     * 加载失败
     */
    _loadFail: function (e) {
      this.setData({
        loadFinish: true,
        src: this.data.error,
      });
      // this.triggerEvent('fail', e);
    },
  },
});
