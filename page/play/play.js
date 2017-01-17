
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
var iconIndex=0;
var timer;
var count=0;
var max = 0;
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
    myChoice:'../../resources/wh.png',
    choiceRes:'VS',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    clearTimeout(timer)
    timer = setInterval(this.flashData,100)
    count = wx.getStorageSync('count')
    console.log(count)
    if(null==count||''==count){
      count = 0;
    }
    max = wx.getStorageSync('max')
    if(null==max||''==max){
      max = 0;
    }
    this.setData({count:count,max:max})
  },
  flashData(){
    iconIndex++;
    if(iconIndex>2){
      iconIndex = 0;
    }
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
    var cid = e.currentTarget.id.substring(1);
    for(var i in this.sjbUrl){
      if(this.sjbUrl[i].indexOf(cid)!=-1){
        this.setData({myChoice:this.sjbUrl[i]})
        clearInterval(timer)
        //判断成绩
        //判断是否获胜
        if( this.data.aiChoice == "../../resources/st.png" && this.data.myChoice == "../../resources/bu.png"){
          count = count +1;
          if(count>max){
            max = count;
            wx.setStorageSync('max', count);
          }
          this.setData({choiceRes:"赢啦!",count:count,max:max});
        }else if(this.data.aiChoice == "../../resources/jd.png" && this.data.myChoice == "../../resources/st.png"){
          count = count +1;
          if(count>max){
            max = count;
            wx.setStorageSync('max', count);
          }
          this.setData({choiceRes:"赢啦!",count:count,max:max});
        }else if(this.data.aiChoice== "../../resources/bu.png" && this.data.myChoice == "../../resources/jd.png"){
          count = count +1;
          if(count>max){
            max = count;
            wx.setStorageSync('max', count);
          }
          this.setData({choiceRes:"赢啦!",count:count,max:max});
        }else if(this.data.aiChoice == this.data.myChoice){
          this.setData({choiceRes:"平啦!"});
        }else {
          count = count -1;
          this.setData({choiceRes:"输啦!",count:count,max:max});
        }
        wx.setStorageSync('count', this.data.count)
        this.data.autoChange = false;
      }
    }
  },
  //以下为自定义点击事件
  replay(){
    timer = setInterval(this.flashData,100)
    this.setData({choiceRes:"VS",myChoice:'../../resources/wh.png'});
    this.data.autoChange = true
  },
})

