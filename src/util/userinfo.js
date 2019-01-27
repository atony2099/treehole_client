/*
 * @Author: atony2099
 * @Date: 2018-11-30 18:30:07
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-18 19:07:18
 */

const TOKEN = 'TOKEN';
const USERID = 'USERID';

const userInfo = {
  login: false,
  token: '',
  userid: '',
  pushUser: function() {},
  hasLogin: function() {},
  resetInfo: function() {
    this.login = false;
    this.token = '';
    this.userid = '';
  },

  saveUserInfo: function(token, userID) {
    this.token = token;
    this.userid = userID;
    this.login = true;
  },

  getToken: function() {
    if (this.hasLogin() && this.token) {
      return this.token;
    }
    return '';
  },

  getUserID: function() {
    if (this.hasLogin() && this.userid) {
      return this.userid;
    }
    return '';
  },
  isMe: function(id) {
    if (id == this.getUserID()) {
      return true;
    }
    return false;
  }
};

export default userInfo;
