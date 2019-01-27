/*
 * @Author: atony2099
 * @Date: 2018-11-30 11:41:04
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-27 21:14:42
 */

import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import Avater from '../../component/avater';
import './style.styl';

export default class Comment extends Taro.Component {
  static propTypes = {
    comment: PropTypes.object
  };

  render() {
    const {
      comment: {
        content,
        author: { nickName, avatar_url }
      }
    } = this.props;
    return (
      <View className="comment-wrap">
        <View className="avater-outer-wrap">
          <Avater size="small" src={avatar_url} />
        </View>
        <View className="content-wrap">
          <Text className="author"> {nickName}：</Text>
          <Text className="content">{content}</Text>
        </View>
        <View className="comment-bottom" />
      </View>
    );
  }
}
