/*
 * @Author: atony2099 
 * @Date: 2018-11-29 18:50:54 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-11-30 15:28:02
 */


import Taro from '@tarojs/taro'

export default function request(opt) {
  return Taro.request(opt).then((res) => {
    console.log(res,"load=====taro")
    let {statusCode, data} = res;
    if (statusCode >= 200 && statusCode < 300) {
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  }).catch(error => {
    console.log(error,"request====");
  })
}
