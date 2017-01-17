
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
var iconIndex=0;
var timer;
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */
  sjbUrl:['../../resources/st.png','../../resources/jd.png','../../resources/bu.png'],
  data: {
    autoChange:true,
    aiChoice:null,
    myChoice:'../../resources/st.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    timer = setInterval(this.flashData,100)
  },
  flashData(){
    if(iconIndex>2){
      iconIndex = 0;
    }
    iconIndex++;
    this.setData({aiChoice:this.sjbUrl[iconIndex]})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    // app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },
  cquan(e){
    if(!this.data.autoChange){
      return;
    }
    var cid = e.currentTarget.id.substring(1)
    for(var i in this.sjbUrl){
      if(this.sjbUrl[i].indexOf(cid)!=-1){
        this.setData({myChoice:this.sjbUrl[i]})
        clearInterval(timer)
        //判断成绩
        //判断是否获胜
        console.log(this.data.aiChoice);
        console.log(this.data.myChoice)
      if( this.data.aiChoice == "../../resources/st.png" && this.data.myChoice == "../../resources/jd.png"){
         this.setData({choiceRes:"赢啦"});
         console.log('i win')
      };
      if(this.data.aiChoice == "../../resources/jd.png" && this.data.myChoice == "../../resources/bu.png"){
        this.setData({choiceRes:"赢啦"});
         console.log('i win')
      };
      if(this.data.aiChoice== "../../resources/bu.png" && this.data.myChoice == "../../resources/jd.png"){
        this.setData({choiceRes:"赢啦"});
         console.log('i win')
      };
        this.data.autoChange = false;
        return;
      }
    }
  },

  //以下为自定义点击事件
  replay(){
    timer = setInterval(this.flashData,100)
    this.data.autoChange = true
  },
})

