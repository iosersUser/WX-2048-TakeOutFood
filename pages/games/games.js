// pages/games/games.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      scoreNum: 0,
      scoreTopNum: 0,
      //起始坐标
      startX: 0,
      startY: 0,
      //结束坐标
      endX: 0,
      endY: 0,
      //方向
      direction:'',
      modalHidden:true,//模态框
      square:[
          [0, 0, 0, 2],
          [0, 0, 0, 0],
          [0, 2, 0, 0],
          [0, 0, 0, 0]
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scoreTopNum = wx.getStorageSync('scoreTopNum')
    if (!scoreTopNum) scoreTopNum = 0;
    this.setData({
        scoreTopNum: scoreTopNum
    })
  },
  setScore(){
      console.log('最高分：', this.data.scoreTopNum, '目前分:', this.data.scoreNum)
    if(this.data.scoreNum > this.data.scoreTopNum){
        this.setData({
            scoreTopNum: this.data.scoreNum
        })
        wx.setStorageSync('scoreTopNum', this.data.scoreTopNum)
    }
  },
  tapStart:function(e){
    this.setData({
        startX: e.touches[0].pageX,
        startY: e.touches[0].pageY
    })
  },
  tapMove:function(e){
      this.setData({
          endX: e.touches[0].pageX,
          endY: e.touches[0].pageY
      })
  },
  tapEnd:function(e){
    var horizontal = this.data.endX ? (this.data.endX-this.data.startX) : 0;
    var vertical = this.data.endY ? (this.data.endY-this.data.startY) : 0;
    console.log(horizontal,vertical)
    if(Math.abs(horizontal) > 0 || Math.abs(vertical) > 0){
        var direction = Math.abs(horizontal) > Math.abs(vertical) ? 
                this.computeDir(true, horizontal) : this.computeDir(false, vertical)
        console.log('方向：',direction)
         this.setData({
        startx:0,
        starty:0,
        endx:0,
        endy:0
      })
      this.mergeAll(direction) 
      this.randInsert();
    }
  },
  //计算方向
  computeDir(flag,num){
      //flag 为true 代表  横向    false代表纵向
    if(flag) return (num > 0) ? 'right' : 'left';
    return (num > 0) ? 'bottom' : 'top';
  },
  mergeAll(dir){
      this.checkGame()
      switch(dir){
          case 'left': this.moveLeft();break;
          case 'right': this.moveRight();break;
          case 'top': this.moveTop();break;
          case 'bottom': this.moveBottom();break;
      }
      
  },
  moveLeft(){
      var flag = false ;
      var arr = this.data.square
      for(var i = 0 ;i < 4;i++){//控制行
        //1、合并
        for(var j = 0;j < 3;j++){//控制列
            if(arr[i][j] == 0) continue;
            for(var k = 1;k< 4-j;k++){//控制右边的列
                if(arr[i][j] != 0 && arr[i][j+k] != 0){//合并操作
                    if (arr[i][j] != arr[i][j + k]) break;//不相同则直接跳过
                    arr[i][j] = arr[i][j]*2
                    arr[i][j+k] = 0
                    flag = true
                    this.setData({
                        scoreNum : this.data.scoreNum + arr[i][j]/2
                    })
                    break;
                }
            }
        }
        //2、左移
        for(var j = 0;j < 3;j++){
            if(arr[i][j] == 0){
                for(var k = 1; k < 4-j;k++){
                    if(arr[i][j+k] != 0){
                        arr[i][j] = arr[i][j+k];
                        arr[i][j+k] = 0;
                        flag = true ; 
                        break;
                    }
                }
            }
        }
      }
      this.setData({
          square : arr
      })
      this.setScore()
      return flag ;
  },
  moveRight(){
      var flag = false ;
    var arr = this.data.square
    for(var i = 0;i<4;i++){
        //合并
        for(var j = 3 ;j > 0;j--){
            if(arr[i][j] == 0) continue;
            for(var k = 1; k <= j;k++){
                if(arr[i][j] != 0 && arr[i][j-k] != 0){
                    if(arr[i][j] != arr[i][j-k]) break;
                    arr[i][j] = arr[i][j]*2
                    arr[i][j-k] = 0;
                    flag = true ;
                    this.setData({
                        scoreNum:this.data.scoreNum + arr[i][j]/2
                    })
                    break ;
                }
            }
        }
        //移动
        for(var j=3;j>0;j--){
           if(arr[i][j] == 0){
               for(var k =1;k<=j;k++){
                   if(arr[i][j-k] != 0){
                       arr[i][j] = arr[i][j - k]
                       arr[i][j - k] = 0
                       flag = true;
                       break;
                   }
               }
           } 
        }
    }
    this.setData({
        square: arr
    })
    this.setScore()
    return flag;
  },
  moveTop(){
      var flag = false;
      var arr = this.data.square
      for (var i = 0; i < 4; i++) {//控制行
          //1、合并
          for (var j = 0; j < 3; j++) {//控制列
              if (arr[j][i] == 0) continue;
              for (var k = 1; k < 4 - j; k++) {//控制右边的列
                  if (arr[j][i] != 0 && arr[j + k][i] != 0) {//合并操作
                      if (arr[j][i] != arr[j + k][i]) break;//不相同则直接跳过
                      arr[j][i] = arr[j][i] * 2
                      arr[j + k][i] = 0
                      flag = true
                      this.setData({
                          scoreNum: this.data.scoreNum + arr[j][i] / 2
                      })
                      break;
                  }
              }
          }
          //2、左移
          for (var j = 0; j < 3; j++) {
              if (arr[j][i] == 0) {
                  for (var k = 1; k < 4 - j; k++) {
                      if (arr[j + k][i] != 0) {
                          arr[j][i] = arr[j + k][i];
                          arr[j + k][i] = 0;
                          flag = true;
                          break;
                      }
                  }
              }
          }
      }
      this.setData({
          square: arr
      })
      this.setScore()
      return flag;
  },
  moveBottom(){
      var flag = false;
      var arr = this.data.square
      for (var i = 0; i < 4; i++) {
          //合并
          for (var j = 3; j > 0; j--) {
              if (arr[j][i] == 0) continue;
              for (var k = 1; k <= j; k++) {
                  if (arr[j][i] != 0 && arr[j - k][i] != 0) {
                      if (arr[j][i] != arr[j - k][i]) break;
                      arr[j][i] = arr[j][i] * 2
                      arr[j - k][i] = 0;
                      flag = true;
                      this.setData({
                          scoreNum: this.data.scoreNum + arr[j][i] / 2
                      })
                      break;
                  }
              }
          }
          //移动
          for (var j = 3; j > 0; j--) {
              if (arr[j][i] == 0) {
                  for (var k = 1; k <= j; k++) {
                      if (arr[j - k][i] != 0) {
                          arr[j][i] = arr[j - k][i]
                          arr[j - k][i] = 0
                          flag = true;
                          break;
                      }
                  }
              }
          }
      }
      this.setData({
          square: arr
      })
      this.setScore()
      return flag;
  },
  //随机插入一个数字
  randInsert(){
      var arr = this.data.square ;
      var num = Math.random() < 0.5 ? 2 : 4 ;
      var k = Math.floor(Math.random(0,4))
      var zeroArr = [];
      for(var i = 0 ;i<4; i++){
          for(var j = 0; j<4;j++){
            if(arr[i][j] == 0){
                zeroArr.push([i,j])
            }
          }
      }
      var position = zeroArr[Math.floor(Math.random()*zeroArr.length)]
      arr[position[0]][position[1]] = num
      this.setData({
          square : arr
      })
      console.log(arr)
  },
  checkGame(flag){
      var arr = this.data.square;
      for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 4; j++) {
              if (arr[i][j] == 0) return;
          }
      }
      for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
              if (arr[i][j] == arr[i + 1][j] || arr[i][j] == arr[i][j + 1]) return;
          }
      }

      for (var j = 0; j < 3; j++) {
          if (arr[3][j] == arr[3][j + 1]) return;
          if (arr[j][3] == arr[j + 1][3]) return;
      }
      this.setData({
          modalHidden: false,
      })
  },
  //模态框确定按钮
  modalChange(){
    //重新开始
    this.setData({
        modalHidden:true,
        scoreNum:0,
        square: [
            [0, 0, 0, 2],
            [0, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    })
  },
  // 模态框取消按钮
    modalCancle (){
        this.setData({
            modalHidden: true
        })
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