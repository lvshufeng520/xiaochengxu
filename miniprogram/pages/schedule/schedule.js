// pages/schedule/schedule.js
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    inProgress: true,
    newsList:[
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "done" },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "done" },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "done" },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "done" },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "doing" },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "later" },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "later"  },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "later"  },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "later"  },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "later" },
      { time: "2020/4/17 8:30", content: "男子甲组100米  预赛", state: "later" }
    ],
    tab:0,
    tabLeft: wx.getSystemInfoSync().windowWidth*0.11,
    tabWidth: wx.getSystemInfoSync().windowWidth * 0.26
  },

  trigger:function(event) {
    let currentX = event.touches[0].pageX;
    let currentLen = currentX - this.data.tabLeft;
    let moveLen;

    if (currentLen > this.data.tabWidth*2 && currentLen <= this.data.tabWidth*3) {
      moveLen = this.data.tabWidth * 2;
    }else if(currentLen > this.data.tabWidth && currentLen <= this.data.tabWidth*2){
      moveLen = this.data.tabWidth;
    }else{
      moveLen = 0;
    }

    let option = {
      duration: 300, // 动画执行时间
      timingFunction: 'ease-in' // 动画执行效果
    };
    var animation = wx.createAnimation(option); // 创建动画
    animation.translateX(0);
    animation.translateX(moveLen).step();
    this.setData({
      animate: animation.export(),// 开始执行动画
      tab: event.currentTarget.dataset['tab']
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