/*
 * @Author: atony2099
 * @Date: 2019-01-18 20:51:50
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-27 21:24:26
 */

import API from '../../service/requestList';

export default {
  namespace: 'detail',
  state: {
    topic: null,
    comments: []
  },
  reducers: {
    saveData(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *getTopic(
      {
        payload: { id }
      },
      { call, put }
    ) {
      const parameter = { id };
      let { topic } = yield call(API.getTopic, parameter);
      yield put({ type: 'getCommentList', payload: { id } });
      yield put({ type: 'saveData', payload: { topic } });
    },

    *createComment(
      {
        payload: { comment, topicID },
        callback
      },
      { call, put }
    ) {
      if (callback) {
        callback(true);
      }
      const parameter = { comment, topicID };
      yield call(API.createComment, parameter);
      if (callback) {
        callback(false);
      }

      yield put({ type: 'getCommentList', payload: { id: topicID } });
    },

    *getCommentList(
      {
        payload: { id }
      },
      { call, put }
    ) {
      const parameter = { id };
      const { comments } = yield call(API.getCommentList, parameter);
      yield put({ type: 'saveData', payload: { comments } });
    }
  }
};
