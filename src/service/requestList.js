import config from './config.js'
import request from './fetch'

const  API = {
  // 1.加载推荐
  loadRecomond(data) {
    console.log("recommond===",data,config.host +  config.recomond);
    return request({
      url:config.host +  config.recomond,
      method:'GET',
      dataType:'json',
      data,
      header: {
        'device_id': 'baidu',
        'os_platform': 'baidu-mini-program'
      },
    })
  }, 
  // 2.作品详情
  loadDetail(data) {
    return request({
      url:config.host +  config.loadRecomond,
      method:'GET',
      dataType:'json',
      data,
      header: {
        'device_id': 'baidu',
        'os_platform': 'baidu-mini-program'
      },
    })
  },
}

export default API
