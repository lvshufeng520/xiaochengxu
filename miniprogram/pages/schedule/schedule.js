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
    progress:{},//显示的正在进行项目和下一项
    trackPro:{},//径赛显示
    fieldPro:{},//田赛显示
    checkPro:{},//消息显示
    nowProgress:'',
    nextProgress:'',
    newsList:[],//页面显示项目数据
    trackList:[],//径赛项目列表
    fieldList:[],//田赛项目
    checkList:[],//检录信息
    tab:0,
    tabLeft: wx.getSystemInfoSync().windowWidth*0.11,
    tabWidth: wx.getSystemInfoSync().windowWidth * 0.26
  },

  trigger:function(event) {
    let currentX = event.touches[0].pageX;
    let currentLen = currentX - this.data.tabLeft;
    let moveLen;

    if (currentLen > this.data.tabWidth*2 && currentLen <= this.data.tabWidth*3) {//点击消息
      moveLen = this.data.tabWidth * 2;
      this.setData({
        newsList: this.data.checkList
      })
    }else if(currentLen > this.data.tabWidth && currentLen <= this.data.tabWidth*2){//点击田赛
      moveLen = this.data.tabWidth;
      this.setData({
        newsList: this.data.fieldList,
        progress: this.data.fieldPro
      })
    }else{//点击径赛
      moveLen = 0;
      this.setData({
        newsList: this.data.trackList,
        progress: this.data.trackPro
      })
    }
    //滑块移动
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
    var nowTime = new Date('2020/4/17 10:30').getTime();//获取当前时间的时间戳
    // console.log(nowTime);
    var trackPro = {};
    var fieldPro = {};
    var track = [//获取径赛数据信息
      { time: "2020/4/17 8:30", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 9:00", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 9:30", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 10:00", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 10:30", content: "男子甲组3000米  决赛" },
      { time: "2020/4/17 11:00", content: "男子乙组3000米  决赛" },
      { time: "2020/4/17 11:30", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 14:30", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 15:00", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 15:30", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 16:00", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 16:30", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 17:00", content: "男子甲组100米  决赛" }
    ];
    for (var i = 0; i < track.length; i++) {  //最后一项？？？
      if (nowTime >= new Date(track[i].time).getTime() && nowTime < new Date(track[i+1].time).getTime()) {
        track[i].state = 'doing';
        trackPro.now = track[i].content;
        trackPro.next = track[i+1].content;
        continue;
      } else if (nowTime > new Date(track[i].time).getTime()) {
        track[i].state = 'done';
      } else {
        track[i].state = 'later';
      }
    }

    var field = [//获取田赛项目信息
      { time: "2020/4/17 8:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 9:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 9:20", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 9:40", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 10:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 10:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 11:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 11:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 14:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 15:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 15:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 16:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 16:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 17:00", content: "男子三级跳远  决赛" }
    ];
    for (var i = 0; i < field.length; i++) {
      if (nowTime >= new Date(field[i].time).getTime() && nowTime < new Date(field[i + 1].time).getTime()) {
        field[i].state = 'doing';
        fieldPro.now = field[i].content;
        fieldPro.next = field[i+1].content;
        continue;
      } else if (nowTime > new Date(field[i].time).getTime()) {
        field[i].state = 'done';
      } else {
        field[i].state = 'later';
      }
    }

    var check = [//检录项目
      { time: "2020/4/17 8:00", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 8:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 8:30", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 8:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 8:50", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 8:00", content: "男子甲组100米  决赛" },
      { time: "2020/4/17 9:10", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 9:30", content: "男子甲组3000米  决赛" },
      { time: "2020/4/17 10:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 10:30", content: "男子乙组3000米  决赛" },
      { time: "2020/4/17 10:30", content: "女子三级跳远  决赛" },
      { time: "2020/4/17 11:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 14:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 14:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 15:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 15:30", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 16:00", content: "男子三级跳远  决赛" },
      { time: "2020/4/17 16:30", content: "男子三级跳远  决赛" }
    ];
    for (var i = 0; i < check.length; i++) {
      if (check[i].time == nowTime) {
        check[i].state = 'doing';
      } else if (check[i].time < nowTime) {
        check[i].state = 'done';
      } else {
        check[i].state = 'later';
      }
    }
    
    this.setData({
      progress: trackPro,
      trackPro: trackPro,
      fieldPro: fieldPro,
      newsList: track,
      trackList: track,
      fieldList: field,
      checkList: check
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var timestamp4 = new Date(1472048779952);
    // console.log(timestamp4);
    // console.log(timestamp4.toLocaleDateString().replace(/\//g, "/") + " " + timestamp4.toTimeString().substr(0, 5));
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