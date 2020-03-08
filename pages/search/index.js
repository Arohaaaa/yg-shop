// pages/search/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus:false,
    inputValue: ""
  },
  TimeId: -1,
  // 输入框响应
  handleInput(e){
    const {value} = e.detail
    if(!value.trim()){
      this.setData({
        goods: [],
        isFocus: false
      })
      return 
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.TimeId)
    this.TimeId=setTimeout(() => {
      this.qsearch(value)
    }, 1000)
    
  },

  // 取消输入 
  handleCancle(){
    this.setData({
      goods: [],
      isFocus: false,
      inputValue: ""
    })
  },

  async qsearch(query){
    const res = await request({ url: "/goods/qsearch", data: { query }})
    this.setData({
      goods: res
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