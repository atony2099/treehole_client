import apiPath from './apiPath';
import request from './fetch';

const GET = 'GET';
const POST = 'POST';

const API = {
  login(parameter) {
    return request(apiPath.login, POST, parameter);
  },
  create(parameter) {
    return request(apiPath.topic.createTopic, POST, parameter);
  },

  list(parameter) {
    return request(apiPath.topic.list, GET, parameter);
  },

  getTopic(parameter) {
    return request(apiPath.topic.topic, GET, parameter);
  },

  like(parameter) {
    return request(apiPath.topic.like, POST, parameter);
  },
  deleteTopic(parameter) {
    return request(apiPath.topic.remove, POST, parameter);
  },
  getUserInfo(parameter) {
    return request(apiPath.user.userInfo, GET, parameter);
  },

  createComment(parameter) {
    return request(apiPath.comment.createComment, POST, parameter);
  },
  getCommentList(parameter) {
    return request(apiPath.comment.commentList, GET, parameter);
  },
  getHotest(paramter) {
    return request(apiPath.topic.hotest, paramter);
  }
};

export default API;
