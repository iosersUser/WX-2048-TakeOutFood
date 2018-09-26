// pages/components/dishes/dishes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hidden:false,
      currentItem: 0,
      navItems: [
          {
              id: 1,
              index: 0,
              name:'热销菜品'
          }, {
              id: 2,
              index: 1,
              name: '热菜'
          }, {
              id: 3,
              index: 2,
              name: '凉菜'
          }, {
              id: 4,
              index: 3,
              name: '套餐'
          }
      ],
      dishesList: [
          [
              {
                  name: "红烧肉",
                  price: 38,
                  num: 1,
                  id: 1
              },
              {
                  name: "宫保鸡丁",
                  price: 58,
                  num: 1,
                  id: 29
              },
              {
                  name: "水煮鱼",
                  price: 88,
                  num: 1,
                  id: 2
              }
          ],
          [
              {
                  name: "小炒日本豆腐",
                  price: 18,
                  num: 1,
                  id: 3
              },
              {
                  name: "烤鱼",
                  price: 58,
                  num: 1,
                  id: 4
              }
          ],
          [
              {
                  name: "大拌菜",
                  price: 18,
                  num: 1,
                  id: 5
              },
              {
                  name: "川北凉粉",
                  price: 8,
                  num: 1,
                  id: 6
              }
          ],
          []
      ],
      selectDishId:[],
      cartTotal:0
  },
  showMenu:function(e){
      var id = e.target.dataset.id
      var index = e.target.dataset.index
      this.setData({
          currentItem: index
      })
  },
  selectItem: function(e){
      var dishId = e.currentTarget.dataset.id
      var isSelected = this.data.selectDishId.indexOf(dishId)
      // 没有被选中 则添加
      if (isSelected < 0){
          this.data.selectDishId.push(dishId)
      }else{//已经被选中，则取消
          this.data.selectDishId.splice(isSelected,1)
      }
    this.setData({
        selectDishId: this.data.selectDishId,
        cartTotal: this.data.selectDishId.length
    })
    console.log(this.data.selectDishId)
    this.setStatus(dishId)
  },
  setStatus (dishId){
      this.data.dishesList[this.data.currentItem].forEach(function (x) {
          if (x.id == dishId) {
              if (x.status == true){
                  x.status = false
              }else{
                  x.status = true
              }
          }
      })
      this.setData({
          dishesList: this.data.dishesList
      })
  },
  loadingChange(){
      setTimeout(() => {
        this.setData({
            hidden:true
        })
      },1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.loadingChange()
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