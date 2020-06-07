// miniprogram/pages/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男','女'],
    index:0,
    userName:null,
    userSex:null,
    userSchool:null,
    userCollege:null,
    userId:null,
    userTel:null,
  },
  name1:function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  school1: function (e) {
    this.setData({
      userSchool: e.detail.value
    })
  },
  college1: function (e) {
    this.setData({
      userCollege: e.detail.value
    })
  },
  id1: function (e) {
    this.setData({
      userId: e.detail.value
    })
  },
  tel1: function (e) {
    this.setData({
      userTel: e.detail.value
    })
  },
  onGetUserInfo:function(){
    wx.setStorage({
      key: 'idd',
      data: this.data.userName + this.data.userId
    })
    app.globalData.flag_info = true;
    const db = wx.cloud.database()
    console.log(this.data)
    db.collection('User').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        // description: "learn cloud database",
        Uid: this.data.userName + this.data.userId,
        Uname: this.data.userName,
        Uschool: this.data.userSchool,
        Usex:this.data.array[this.data.index],
        Ustuid:this.data.userId,
        Usubject:this.data.userCollege,
        // Utel:this.date.userTel,
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收上一页面的数据
    var that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });
    eventChannel.emit('someEvent', { data: 'test' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data.data)
      that.setData({
        logged: true,
        avatarUrl: data.data.avatarUrl,
        userInfo: data.data.nickName
      })
    })
  },
  //查询数据库
  onQuery: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('School').where({
      // school: this.data.openid
    }).get({
      success: res => {
        var leng = res.data.length;
        for(var i=0;i<leng;i++){
          this.setData({
            province: JSON.stringify(res.data[i].province, null, 2),
            sname: JSON.stringify(res.data[i].sname, null, 2),
            cname: JSON.stringify(res.data[i].cname, null, 2)
          })
        }
        this.setData({
          ress: JSON.stringify(res.data, null, 2),
          // multiArray:[this.data.province,this.data.sname,this.data.cname]
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  //性别选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
    // console.log(this.data)
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