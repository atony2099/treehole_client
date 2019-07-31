/*
 * @Author: atony2099
 * @Date: 2018-11-29 18:50:54
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-02-12 13:13:47
 */

import Taro from '@tarojs/taro';
import Storage from '../util/storage';
import apiList from './apiPath';

export default async function(url, method = 'GET', parameter = {}) {
  url = apiList.host + url;

  let opt = {
    url,
    method,
    data: parameter,
    dataType: 'json'
  };

  let header = {
    ['WX-HEADER-FLAG']: 'true',
    ['WX-HEADER-SKEY']: ''
  };

  let skey;
  try {
    skey = await Storage.getSkey();
  } catch (e) {}

  if (skey) {
    header['WX-HEADER-SKEY'] = skey;
  }
  opt.header = header;

  return Taro.request(opt).then(res => {
    let { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (data.data && data.error_code === 0) {
        return data.data;
      } else if (data.error_msg) {
        let error = new Error();
        error.code = data.error_code;
        error.message = data.error_msg;
        throw error;
      } else {
        let error = new Error();
        error.code = statusCode;
        error.message = '网络错误';
        throw error;
      }
    }
  });
}
