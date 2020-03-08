// pages/goods_detail/index.js
import { request } from "../../request/request.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length-1]
    let options = currentPage.options
    const goods_id = options.goods_id.match(/\d+/)[0]
    this.getGoodsDetail(goods_id)
    
  },

  // 获取商品详情数据
  async getGoodsDetail (goods_id) {
    const res = await request({url: "/goods/detail", data: {goods_id}})
    this.GoodsInfo = res
    let collections = wx.getStorageSync("collections") || []
    let isCollect = collections.some(v => v.goods_id === this.GoodsInfo.goods_id)
    this.setData({
      // 只接收需要的属性
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        // iphone部分手机不识别webp图片格式，在前端方面简单处理
        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: res.pics
      },
      isCollect
    })
  },

  // 点击轮播图 放大预览
  handlePreviewImg(e){
    const current = e.currentTarget.dataset.url
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    wx.previewImage({
      current,
      urls
    })
  },

  // 点击加入购物车
  handleCartAdd(){
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || []
    // 判断当前商品是否存在购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if(index === -1){
      // 不存在 第一次添加
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    }else{
      // 已存在，执行num++
      cart[index].num++
    }    
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  },

  // 收藏
  handleCollectItem(){
    let isCollect = false
    let collections = wx.getStorageSync("collections") || []
    let index = collections.findIndex(v => v.goods_id===this.GoodsInfo.goods_id)
    if(index !== -1){
      collections.splice(index,1)
      isCollect = false
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: true
      })
    }else{
      collections.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync("collections", collections)
    this.setData({
      isCollect
    })
  }
})