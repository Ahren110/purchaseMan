/**
 * Created by Z97 on 2017/6/15.
 */
var ENV = 'prod' // 控制开关,dev 开发环境，release,master环境时改为prod
export default {
  pathUrl: function () {
    var URLS = {
      dev: {
        MJK: '/apis', // 测试2.0地址
        UPLOAD: '/upload', // 测试图片上传地址
        MC: '/mc1', // 测试1.0地址
        WEB_URL: {
          WEB_MIAO: 'http://shw.miningcircle.com'
        }
      },
      prod: {
        MJK: 'http://tradeapi.miningcircle.com', // 2.0地址
        UPLOAD: 'http://www.miningcircle.com', // 图片上传地址
        // UPLOAD: 'http://192.168.1.247', // 图片上传地址
        MC: 'http://memberapi.miningcircle.com', // 1.0地址
        WEB_URL: {
          WEB_MIAO: ''
        }
      },
      test: {
        // MJK: 'http://shw.miningcircle.com:8080', // 2.0地址
        MJK: 'http://zjl.miningcircle.com:8080', // 2.0地址
        // MJK: 'http://jf.miningcircle.com:8080', // 2.0地址
        UPLOAD: 'http://www.miningcircle.com', // 图片上传地址
        // UPLOAD: 'http://192.168.1.247', // 图片上传地址
        MC: 'http://memberapi.miningcircle.com', // 1.0地址
        WEB_URL: {
          WEB_MIAO: ''
        }
      }
    }
    return URLS[ENV]
  }
}
