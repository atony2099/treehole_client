/*
 * @Author: atony2099
 * @Date: 2019-01-27 05:26:41
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-27 05:29:44
 */

import API from '../../service/requestList';

export default {
  namespace: 'publish',
  state: {
    user: {}
  },
  reducers: {
    saveUser(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *create(
      {
        payload: { content },
        callback
      },
      { call }
    ) {
      if (callback) {
        callback(true);
      }
      const parameter = { content };
      yield call(API.create, parameter);
      if (callback) {
        callback(false);
      }
    }
  }
};
