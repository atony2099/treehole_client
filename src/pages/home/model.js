/*
 * @Author: atony2099
 * @Date: 2018-12-16 10:41:53
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-28 01:29:16
 */

import API from '../../service/requestList';

export default {
  namespace: 'home',
  state: {
    latest: {
      currentPage: 0,
      list: [],
      hasMore: true,
      totalCount: 0
    },
    hotest: {
      currentPage: 0,
      list: [],
      hasMore: true,
      totalCount: 0
    }
  },
  reducers: {
    saveList(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *getLatest(
      {
        payload: { init = false }
      },
      { call, select, put }
    ) {
      let {
        latest: { currentPage, hasMore, list }
      } = yield select(state => state.home);
      if (init) {
        currentPage = 0;
        hasMore = true;
      }
      if (!hasMore) {
        return;
      }
      const parameter = { currentPage };
      let {
        list: listNew = [],
        pagination: { currentPage: currentPageNew, hasMore: hasMoreNew, totalCount }
      } = yield call(API.list, parameter);

      if (init) {
        list = listNew;
      } else {
        list = list.concat(listNew);
      }
      yield put({
        type: 'saveList',
        payload: {
          latest: { list, currentPage: currentPageNew, hasMore: hasMoreNew, totalCount }
        }
      });
    },

    *getHotest({}, { call, put }) {
      let { list, pagination } = yield call(API.getHotest);
      yield put({ type: 'saveList', payload: { hotest: { list, ...pagination } } });
    },

    *likeTopic(
      {
        payload: { id, like }
      },
      { call, select, put }
    ) {
      const parameter = { id, like };
      let {
        like_info: { topic }
      } = yield call(API.like, parameter);

      const { latest, hotest } = yield select(state => state.home);
      const latestList = latest.list.map(item => {
        if (item.id === topic.id) {
          item = { ...item, is_like: topic.is_like, like_count: topic.like_count };
        }
        return item;
      });
      const hotestList = hotest.list.map(item => {
        if (item.id === topic.id) {
          item = { ...item, is_like: topic.is_like, like_count: topic.like_count };
        }
        return item;
      });

      yield put({
        type: 'saveList',
        payload: {
          latest: { ...latest, list: latestList },
          hotest: { ...hotest, list: hotestList }
        }
      });
    },

    *deleteTopic(
      {
        payload: { id }
      },
      { call, select, put }
    ) {
      const parameter = { id };
      yield call(API.deleteTopic, parameter);
      const { latest, hotest } = yield select(state => state.home);
      console.log(latest.list, hotest.list, 'list=====');
      const latestList = latest.list.filter(item => item.id !== id);
      const hotestList = hotest.list.filter(item => item.id !== id);

      yield put({
        type: 'saveList',
        payload: {
          latest: { ...latest, list: latestList },
          hotest: { ...hotest, list: hotestList }
        }
      });
    }
  }
};
