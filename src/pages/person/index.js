/*
 * @Author: atony2099
 * @Date: 2019-01-17 01:24:47
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-28 02:04:48
 */

import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem, AtButton } from 'taro-ui';
import storage from '../../util/storage';
import { toLogin } from '../../router';
import './style.styl';

const mapStateToProps = ({ user }) => ({
  ...user
});

@connect(mapStateToProps)
export default class Person extends Taro.Component {
  getUserInfo = skey => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getUserInfo',
      payload: {
        skey
      }
    });
  };
  state = {
    isLogin: false
  };

  async checkLogin() {
    let skey = await storage.getSkey();
    if (skey) {
      this.getUserInfo(skey);
    }
    this.setState({ isLogin: !!skey });
    console.log(!!skey, 'islogin=====');
  }

  async componentDidShow() {
    await this.checkLogin();
  }

  pushLogin() {
    toLogin();
  }
  render() {
    const {
      user: { avatar_url, nickName, like_count, topic_count }
    } = this.props;
    const { isLogin } = this.state;
    const loginHeader = (
      <View className="header">
        <Image src={avatar_url} className="avater" /> <View className="desc"> {nickName} </View>
      </View>
    );
    const emptyHeader = (
      <View className="header" onClick={this.pushLogin}>
        <Image className="avater" /> 
        <AtButton size="small" type="secondary" className="desc">
          登录
        </AtButton>
      </View>
    );
    const list = (
      <AtList>
        <AtListItem
          title="我的发布"
          arrow="right"
          extraText={topic_count}
          iconInfo={{
            size: 23,
            color: 'black',
            value: 'iconfont icon-opus'
          }}
        />
        <AtListItem
          title="我的喜欢"
          arrow="right"
          extraText={like_count}
          iconInfo={{
            size: 23,
            color: 'black',
            value: 'iconfont icon-like-hollow'
          }}
        />
      </AtList>
    );

    return (
      <View className="person-wrap">
        {isLogin ? loginHeader : emptyHeader}
        {list}
      </View>
    );
  }
}
