/*
 * @Author: atony2099
 * @Date: 2019-01-17 01:47:35
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-27 22:49:04
 */

import Taro from '@tarojs/taro';
import API from '../service/requestList';
import storage from '../util/storage';
import promisify from '../util/promisify';

export default {
  namespace: 'user',
  state: {
    user: {},
    skey: ''
  },

  reducers: {
    saveUser(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *login(
      {
        payload: { encryptedData, iv },
        callBack
      },
      { call, put }
    ) {
      if (callBack) {
        callBack(true);
      }

      let { code } = yield call(promisify(Taro.login));
      let parameter = { code };
      if (encryptedData && iv) {
        parameter = { ...parameter, encryptedData, iv };
      }
      let { user } = yield call(API.login, parameter);
      const { skey } = user;
      yield call(storage.setSkey.bind(storage), skey);
      yield put({ type: 'saveUser', payload: { user, skey } });
      if (callBack) {
        callBack(false);
      }
    },
    *getUserInfo(
      {
        payload: { skey }
      },
      { call, put }
    ) {
      let parameter = { skey };
      let { user } = yield call(API.getUserInfo, parameter);
      yield put({ type: 'saveUser', payload: { user, skey } });
    },
    *initLaunch({}, { call, put }) {
      const skey = yield call(storage.getSkey.bind(storage));
      if (!skey) {
        return;
      }
      try {
        yield call(promisify(Taro.checkSession));
        yield put({ type: 'getUserInfo', payload: { skey } });
      } catch (error) {
        yield put({ type: 'login', payload: {} });
      }
    },
    *refreshUser() {}
  }
};
