// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import { getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    // 获取缓存中的地址信息
    const address = wx.getStorageSync("address")
    // 获取缓存中的购物数据
    const cart = wx.getStorageSync("cart")||[]
    this.setData({
      address
    })
    this.setCart(cart)
  },

  // 收货地址按钮点击事件
  async handleChooseAddress() {
    try{
      // 首先要获取用户对小程序所授予获取地址的权限状态
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      if (scopeAddress === false) {
        await openSetting()
      }
      const address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName +                                     address.detailInfo 
      wx.setStorageSync("address", address)
    }catch(error){
      console.log(error)
    }    
  },

  // 商品的选中
  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v => v.goods_id===goods_id)
    cart[index].checked =! cart[index].checked
    this.setCart(cart)
  },

  // 全选按钮事件
  handleAllChange(e){
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(v => v.checked=allChecked)
    this.setCart(cart)
  },

  // 商品数量编辑
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v => v.goods_id===id)
    if(cart[index].num === 1 && operation === -1){
      const res = await showModal({content:'是否移除该商品'})
      if(res.confirm) {
        cart.splice(index,1)
        this.setCart(cart)
      } 
    }else{
      cart[index].num += operation
    }
    
    this.setCart(cart)
  },

  // 点击结算
  async handlePay(){
    
    const {address, totalNum} = this.data
    // 判断收货地址
    if(!address.userName){
      await showToast({title: "您还没有选择收货地址"})
      return
    }
    //判断是否选购商品
    if(totalNum ===0){
      await showToast({title: "您还没有选购商品"})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  },
  
  // 设置购物车状态并且重新计算底部工具栏的数据
  setCart(cart){
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart)
  }
})