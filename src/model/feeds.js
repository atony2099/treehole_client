import Taro from '@tarojs/taro'
import API from "../service/requestList";
 
export default {
  namespace: 'feeds',

  state: {
    opusList: [],
    offset:0,
    hasMore:true
  },
  reducers: {

    save(state,{payload}) {
      return {...state, ...payload};
    },
  },

  effects: {
    *load({payload:{init=false},callback}, {call, put,select}) {
      // console.log("xxx====1",action)
      let {offset:originOffset,opusList:originOpusList,hasMore:orignHasMore}  = yield select(state=>state.feeds)
      console.log("xxx====HASMORE",orignHasMore)
      if (!orignHasMore) {
        return
      }

      if (init) {
        originOffset = 0;
      }
 
      const payload = {offset:originOffset}
      let {recommend_opus_list:opusList,offset,has_more:hasMore} = yield call(API.loadRecomond,payload);

      if (callback) {
        callback()
      }
      
      if (originOffset !== 0 || init === false) {
        opusList = originOpusList.concat(opusList)
      }
      yield put({type:"save",payload:{opusList,offset,hasMore}})
    }
  },

};
