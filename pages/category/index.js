// pages/category/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from "../../request/request.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单列表
    leftMenuList: [],
    // 右侧内容
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop: 0
  },
  Cates: [],

  // 获取分类列表数据
  async getCategoryList () {
    // request({
    //   url: "/categories"
    // }).then(res => {
    //   wx.hideLoading()
    //   this.Cates = res.data.message
    //   //把数据存到本地存储中
    //   wx.setStorageSync("cates", {
    //     time: Date.now(),
    //     data: this.Cates
    //   })
    //   // 构造左侧大菜单数据
    //   let leftMenuList = this.Cates.map(v => v.cat_name)
    //   // 构造右侧的商品数据
    //   let rightContent = this.Cates[this.data.currentIndex].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    const res = await request({url:"/categories"})
    this.Cates = res
      //把数据存到本地存储中
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    })
    // 构造左侧大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name)
    // 构造右侧的商品数据
    let rightContent = this.Cates[this.data.currentIndex].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },

  // 左侧菜单点击事件函数
  handleItemTap: function(e) {
    this.setData({
      currentIndex: e.target.dataset.index
    })
    // 构造左侧大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name)
    // 构造右侧的商品数据
    let rightContent = this.Cates[this.data.currentIndex].children
    this.setData({
      leftMenuList,
      rightContent,
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 判断本地存储中有没有旧数据，如果有旧数据同时旧数据也没有过期就使用本地存储中的旧数据
    // 没有旧数据则直接发送请求
    // 1. 获取本地存储中的数据
    const Cates = wx.getStorageSync("cates")
    if (!Cates) {
      this.getCategoryList()
    } else {
      //定义过期时间
      if (Date.now - Cates.time > 1000 * 10) {
        this.getCategoryList()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 构造右侧的商品数据
        let rightContent = this.Cates[this.data.currentIndex].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  }
})