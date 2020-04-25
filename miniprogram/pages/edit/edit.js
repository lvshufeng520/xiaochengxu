// miniprogram/pages/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['男','女'],
    index:0,
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