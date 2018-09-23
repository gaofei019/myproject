// pages/calendar/calendar.js
var imageUtil = require('./imageUtil.js');
var upng = require('./upng-js/UPNG.js');
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src:'',
    msg:'',
    img_width:0,
    img_height:0,
    bshow:false,
    fshow:true,
    b64:'',
    emval:'',
    naval:'',
    curdate:'',
    key:'88e70b9ee9e20e610b78ca9eedb378a0',
    dateapi: 'https://v.juhe.cn/calendar/day',
    year:'',
    month:'',
    day:''
  },
  changeEmInputVal(ev) {
    this.setData({
      emval: ev.detail.value
    });
  },
  changeNaInputVal(ev) {
    this.setData({
      naval: ev.detail.value
    });
  },
  choose_img(){
        var self=this;
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            //console.log(tempFilePaths);
            self.setData({
              img_src: tempFilePaths[0]
            });
          }
        })
  },
  make_img(){
      var self = this;
      var img_width = this.data['img_width'],
          img_height = this.data['img_height'];
      var platform = wx.getSystemInfoSync().platform;
      wx.canvasGetImageData({

        canvasId: 'firstCanvas',                                              //参数，canvas标签的id

        x: 0,                                                                      //起始位置，x坐标

        y: 0,

        width: img_width,

        height: img_height,

        success: function (res) {

          //引入upng，将图片转化成utf-8格式

          console.log(res);

          if (platform === 'ios') {
            // 兼容处理：ios获取的图片上下颠倒 
            res = self.reverseImgData(res)
          }
          // 3. png编码
          let pngData = upng.encode([res.data.buffer], res.width, res.height)
          // 4. base64编码
          let base64 = wx.arrayBufferToBase64(pngData)
          console.log('data:image/png;base64,' + base64)
          self.setData({
            b64: 'data:image/png;base64,' + base64,
            bshow: false,
            fshow: false
          });

        }

      })
  }, 
  //ios图片处理 
  reverseImgData(res) {
    var w = res.width
    var h = res.height
    let con = 0
    for (var i = 0; i < h / 2; i++) {
      for (var j = 0; j < w * 4; j++) {
        con = res.data[i * w * 4 + j]
        res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
        res.data[(h - i - 1) * w * 4 + j] = con
      }
    }
    return res
  },
  imageload(e){
    var imageSize = imageUtil.imageUtil(e);
    //获取图片的原始宽度和高度 
    let originalWidth = e.detail.width;
    let originalHeight = e.detail.height;
    //console.log(originalWidth);
    this.setData({
      img_width: imageSize.imageWidth,
      img_height: imageSize.imageHeight
    });
    var img_width=this.data['img_width'],
        img_height=this.data['img_height'],
        em_text = this.data['emval'],
        na_text = this.data['naval'],
        year_text = this.data['year'],month_text = this.data['month'],day_text=this.data['day'];
    var ctx = wx.createCanvasContext('firstCanvas');
    var platform = wx.getSystemInfoSync().platform;
    ctx.drawImage(this.data['img_src'], 0, 0, img_width, img_height);
    ctx.fillStyle = '#173b7b'
    ctx.setFontSize(50)
    ctx.fillText(em_text, 15, 100) 
    ctx.fillText(em_text, 15, 150)
    ctx.fillText(year_text, 15, 200)
    ctx.fillText(month_text, 15, 350)
    ctx.fillText(day_text, 15, 450)
    ctx.draw();
    //console.log(222);
    /*var arr = tempFilePaths[0].split('.');
    var len =arr.length;
    var ext = arr[len-1].toLowerCase();
    //var data_url=ctx.toDataURL("image/" + ext);
    //console.log(data_url);
    console.log(ctx);*/
    this.setData({
      bshow: true
    });
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
    var self = this;
    var curdate = new Date(Date.now()).toLocaleDateString().replace(/\//g, '-');
    var date_arr = [];
    if(!self.data.curdate || self.data.curdate !== curdate){
      self.data.curdate = curdate;
      wx.request({
        url: self.data.dateapi, 
        data: {
          date: curdate,
          key: self.data.key
        },
        dataType:'json',
        success: function (res) {
          date_arr = res.data.result.data.date.split('-');
          self.data.year = date_arr[0];
          self.data.month = date_arr[1];
          self.data.day = date_arr[2];
        }
      })
    }
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