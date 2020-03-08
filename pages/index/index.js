//Page Object
// 引入用来发送请求的方法
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: [],
    swiperListUrls: [],
    floorListUrls: []
  },

  // 获取轮播图数据
   getSwiperList: function () {
    let that = this
    request({
      url: '/home/swiperdata'
    }).then(function (result) {
      let urls = []
      result.forEach(v => { 
        urls.push(v.navigator_url.replace("main", "index"))
      })
      that.setData({
        swiperList: result,
        swiperListUrls: urls
      })
    }).catch(err => {
      console.error(err)
    })
  },

  // 获取分类导航数据
  getCateList: function () {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        catesList: result
      })
    }).catch(err => {
      console.error(err)
    })
  },

  //获取楼层数据
  async getFloorList() {
    let that = this
    const res = await request({url: '/home/floordata'})
    res.forEach(v => {
      v.product_list.forEach(v1 => {
        v1.navigator_url = v1.navigator_url.replace(/\?/, "/index?")        
      })
    })
    that.setData({
      floorList: res
    })
  
  },

  onLoad: function(options){
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()    
  }
});