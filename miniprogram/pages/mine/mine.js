// miniprogram/pages/mine/mine.wxml.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    avatarUrl: './unlogin.png',//未登录时的头像
    userInfo: {},//用户信息
    logged: false,//登陆状态
    takeSession: false,
    requestResult: '',
    allinfo:false,//用户信息是否完善
    userName: null,
    userSex: null,
    userSchool: null,
    userCollege: null,
    userId: null,
    userTel: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({//获取本地缓存
      key: "idd",
      success: res=>{
        this.setData({
          allinfo:true
        })
        //读取数据库
        const db = wx.cloud.database()
        db.collection('User').where({
          Uid: res.data
        }).get({
          success: res=>{
            this.setData({
              userName: res.data[0].Uname,
              userSex: res.data[0].Usex,
              userSchool: res.data[0].Uschool,
              userCollege: res.data[0].Usubject,
              userId: res.data[0].Ustuid,
              userTel: res.data[0].Utel,
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  //存入用户信息
  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  //向编辑页面发送用户信息
  bindChangeTo: function () {
    var that = this;
    wx.navigateTo({
      url: '../edit/edit',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (userInfo) {
          console.log(userInfo)
        },
        someEvent: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.userInfo})
      }
    })
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