/*
 * @Author: atony2099
 * @Date: 2019-01-18 19:22:34
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-28 00:08:10
 */
import Taro from '@tarojs/taro';
import storage from './util/storage';

export const routerPath = {
  login: '/pages/login/index',
  list: '/pages/list/index',
  publish: '/pages/publish/index',
  person: '/pages/person/index',
  detail: '/pages/detail/index'
};

export const toLogin = () => {
  Taro.navigateTo({ url: routerPath.login });
};

export const checkLogin = () => {
  return storage
    .getSkey()
    .then(skey => {
      if (!skey) {
        toLogin();
        return Promise.resolve(false);
      } else {
        return Promise.resolve(true);
      }
    })
    .catch(() => Promise.resolve(false));
};

export const toDetail = id => {
  console.log(routerPath.detail, 'routerpath========');
  Taro.navigateTo({ url: `${routerPath.detail}?id=${id}` });
};
