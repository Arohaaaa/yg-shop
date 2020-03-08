// pages/goods_list/index.js
import { request } from "../../request/request.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: [],
  },
  // 接口参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.QueryParams.cid = options.cid||""
    if(options.query){
      this.QueryParams.query = options.query.match(/[\u4e00-\u9fa5]+/)[0] || ""
    }
    this.getGoodsList()
  },
  // 上拉触底
  onReachBottom: function(){
    // 判断是否还有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      wx.showToast({
        title: '没有数据了- -。',
      })
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  //下拉刷新事件
  onPullDownRefresh: function () {
    this.setData({
      goodsList: []
    }),
    this.QueryParams.pagenum = 1,
    this.getGoodsList()
  },



  // 获取商品列表数据
  async getGoodsList () {
    const res = await request({url: '/goods/search',data:this.QueryParams})
    // 获取数据总条数
    const total = res.total
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodsList: this.data.goodsList.concat(res.goods)
    })
    wx.stopPullDownRefresh()
  },

  // 监听事件
  handleTabsItemChange(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  }
})