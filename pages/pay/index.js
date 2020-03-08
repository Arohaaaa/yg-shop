// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    dialogShow: false,
    oneButton: [{ text: '确定' }]
  },

  onShow: function () {
    // 获取缓存中的地址信息
    const address = wx.getStorageSync("address")
    // 获取缓存中的购物数据
    let cart = wx.getStorageSync("cart") || []
    cart = cart.filter(v => v.checked)

    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  // 点击支付
  handlePay() {
    this.setData({
      dialogShow: true
    })
  },

  tapDialogButton(e) {
    this.setData({
      dialogShow: false
    })
  }
})