//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      background: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          ],
      indicatorDots: true,
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500,
      navItems: [
          {
              name: '堂食',
              url: 'dishes'
          },
          {
              name: '外卖',
              url: 'take',
              isSplot: true
          },
          {
              name: '外带',
              url: 'out'
          },
          {
              name: '订单',
              url: 'bill'
          },
          {
              name: '帐单',
              url: 'bill',
              isSplot: true
          },
          {
              name: '报表',
              url: 'bill'
          }
      ]
  },
  onLoad: function () {
    
  }
})
