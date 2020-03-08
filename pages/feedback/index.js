// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品/商家投诉",
        isActive: false
      }
    ],
    chooseImgs:[],
    // 文本域内容
    textVal: ""
  },
  UpLoadImgs: [],

  handleTabsItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },

  handleUploadImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','copressed'],
      sourceType: ['album','camera'],
      success: res => {
        this.setData({
          chooseImgs: this.data.chooseImgs.concat(res.tempFilePaths)
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  handleRemoveImg(e){
    const {index} = e.currentTarget.dataset
    let {chooseImgs} = this.data
    chooseImgs.splice(index,1)
    this.setData({
      chooseImgs
    })
  },

  handleTextInput(e){
    this.setData({
      textVal: e.detail.value
    })
  },

  handleSubmit(){
    const {textVal,chooseImgs} = this.data
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask:true
      })
      return 
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true
    }),
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '上传成功',
        success: res => {
          wx.navigateBack({
            delta: 1
          })
        }
      })
      
    }, 2000) 
}
  //   chooseImgs.forEach((v,i) => {
  //     wx.uploadFile({
  //       url: `https://images.ac.cn/api/upload?image=img&apiType=this`,
  //       filePath: v,
  //       name: 'file',
  //       formData: {},
  //       success: res => {
  //         let url = JSON.parse(res.data)
  //         this.UpLoadImgs.push(url)
  //         if(i===chooseImgs.length-1){
  //           console.log("把文本的内容和外网的图片数组提交到后台中")
  //           this.setData({
  //             textVal: "",
  //             chooseImgs: []
  //           })
  //           wx.navigateBack({
  //             delta: 1
  //           })
  //         }
  //       },

  //     })
  //   })
    

  // },

})