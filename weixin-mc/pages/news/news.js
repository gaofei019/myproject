// pages/news/news.js
var app=getApp();
var com = require("../../utils/common");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'默认数据'
  },
  fnUserState(){
    this.setData({
      msg:com.echoHello('Strive')
    });
  },
  fnUserState2(){
    this.setData({
      msg:com.echoBye('blue')
    })  
  },
  change(){
    this.setData({
      msg:app.a
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(com)
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