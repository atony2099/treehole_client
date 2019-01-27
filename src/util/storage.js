/*
 * @Author: atony2099
 * @Date: 2018-12-13 10:56:02
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-28 00:10:05
 */

import Taro from '@tarojs/taro';

const SKEY = 'SKEY';

const TOKEN = '';

const Storage = {
  async getSkey() {
    return this.get(SKEY);
  },
  async setSkey(data) {
    return this.set(SKEY, data);
  },

  async get(key) {
    if (TOKEN) {
      return;
    }
    let data;
    try {
      let result = await Taro.getStorage({ key });
      data = result.data;
    } catch (error) {}
    TOKEN = data;
    return data;
  },

  async set(key, data) {
    try {
      Taro.setStorage({ key, data });
    } catch (e) {
      console.log(e, 'set---error');
    }
  },

  async removeKey(key) {
    try {
      Taro.removeStorage({ key });
    } catch (e) {}
  }
};

export default Storage;
