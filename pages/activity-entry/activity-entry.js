// pages/activity-entry/activity-entry.js
import {request} from '../../js/http'
import Toast from '@vant/weapp/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        aid: '',
        memberList:[]
    },
    pass(e) {
        request({
            url: '/secondClass/activity/enroll',
            method: 'put',
            data:{
                userId: e.currentTarget.dataset.id,
                activityId: this.data.aid
            }
        }).then(value => {
            Toast.success('操作成功');
            this.getData()
        })
    },
    getData() {
        request({
            url:`/secondClass/activity/enroll/getEnrollList`,
            method: 'get',
            data:{
                activityId: this.data.aid
            }
        }).then(value => {
            console.log(value)
            this.setData({
                memberList: value.rows
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.data.aid = options.aid
        this.getData()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})