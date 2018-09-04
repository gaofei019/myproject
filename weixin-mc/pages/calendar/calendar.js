// pages/calendar/calendar.js
var imageUtil = require('./imageUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src:'',
    msg:'',
    img_width:0,
    img_height:0,
    bshow:false
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
            console.log(tempFilePaths);
            self.setData({
              img_src: tempFilePaths[0]
            });
          }
        })
  },
  getBase64Image(img) {  
      var canvas = wx.createCanvasContext('firstCanvas');    
      var ctx = canvas.getContext("2d");  
      ctx.drawImage(img, 0, 0, img.width, img.height);  
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();  
      var dataURL = canvas.toDataURL("image/" + ext);  
      return dataURL;
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
        img_height=this.data['img_height'];
    var ctx = wx.createCanvasContext('firstCanvas');
    ctx.drawImage(this.data['img_src'], 0, 0, img_width, img_height);
    ctx.setStrokeStyle("#00ff00")
    ctx.setLineWidth(5)
    ctx.rect(0, 0, 200, 200)
    ctx.stroke()
    ctx.setStrokeStyle("#ff0000")
    ctx.setLineWidth(2)
    ctx.moveTo(160, 100)
    ctx.arc(100, 100, 60, 0, 2 * Math.PI, true)
    ctx.moveTo(140, 100)
    ctx.arc(100, 100, 40, 0, Math.PI, false)
    ctx.moveTo(85, 80)
    ctx.arc(80, 80, 5, 0, 2 * Math.PI, true)
    ctx.moveTo(125, 80)
    ctx.arc(120, 80, 5, 0, 2 * Math.PI, true)
    ctx.stroke()
    ctx.draw();
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