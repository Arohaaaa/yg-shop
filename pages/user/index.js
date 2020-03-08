// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    //被收藏的商品的数量
    collectNums: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo")
    const collectNums = wx.getStorageSync("collections").length
    this.setData({ userInfo,collectNums })
  }
})