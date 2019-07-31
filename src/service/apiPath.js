// const host = 'http://api.dongci-test.wmlives.com/'
// const host = 'http://127.0.0.1:7001';
//
const host = 'http://treehole.atony2099.com';

// const host = 'http://127.0.0.1:7001';

const login = '/api/wc_login';
//topic
const createTopic = '/api/topic/create';
const like = '/api/topic/like';
const list = '/api/topic/list';
const hotest = '/api/topic/hotest';
const topic = '/api/topic';

const remove = '/api/topic/delete';

// user
const userInfo = '/api/user/info';

// comment
const createComment = '/api/comment/create';
const commentList = '/api/comment/list';

const apiList = {
  host,
  login,
  topic: {
    topic,
    list,
    hotest,
    like,
    createTopic,
    remove
  },
  user: {
    userInfo
  },
  comment: {
    createComment,
    commentList
  }
};

export default apiList;
