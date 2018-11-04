//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    bshow: false,
    arr:['apple','banana','orange'],
    arrData:[
      {name:'apple',age:10},
      {name:'apple',age:40},
      {name:'apple',age:20}
    ],
    inputVal:'',
    msgData: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    date:''
  },
  changeInputVal(ev){
    this.setData({
        inputVal:ev.detail.value
    });
  },
  addMsg(){
    var list=this.data.msgData;
    list.push({
      msg:this.data.inputVal
    });
    //更新
    this.setData({
      msgData:list,
      inputVal:''
    });
    wx.setStorage({
      key: "message",
      data: list
    });
  },
  delMsg(ev){
    var n=ev.target.dataset.index;

    var list=this.data.msgData;
    list.splice(n,1);

    this.setData({
      msgData:list
    });
    wx.setStorage({
      key: "message",
      data: list
    });
  },
  aaa(){
    wx.navigateTo({
      url: '../news/news',
    })
  },
  change(){
    this.setData({
      bshow:!this.data.bshow
    })
  },
  changeMotto(){
    this.setData({
      motto:'aaa'+Date.now()
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.videoContext = wx.createVideoContext('myVideo');
    var curdate = new Date(Date.now());
    this.setData({
      date:curdate
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //读取本地数据
    var self=this;
    wx.getStorage({
      key: 'message',
      success: function (res) {
        self.setData({
          msgData: res.data
        });
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
