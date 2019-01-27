/*
 * @Author: atony2099
 * @Date: 2018-11-30 11:41:04
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-28 01:04:03
 */

import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import Avater from '../avater';
import './style.styl';

export default class ListCell extends Taro.Component {
  static propTypes = {
    topic: PropTypes.object
  };

  render() {
    const {
      topic: {
        content,
        like_count,
        reply_count,
        is_like,

        author: { nickName, avatar_url }
      },
      canDelete,
      onLike,
      onDelete,
      onComment
    } = this.props;
    const likeStyle = {
      color: is_like ? 'red' : 'black'
    };

    const deleteView = canDelete ? (
      <View className="delete" onClick={onDelete}>
        删除
      </View>
    ) : null;
    const conentWrap = (
      <View className="content">
        <View className="user-wrap">
          <Avater size="small" src={avatar_url} />
          <View className="name">{nickName}</View>
        </View>
        {content}
        {deleteView}
      </View>
    );
    const commentWrap = (
      <View className="bottom-wrap">
        <View className="icon-wrap" onClick={onLike}>
          <View className="iconfont icon-like" style={likeStyle} />
          <View>{like_count}</View>
        </View>
        <View className="icon-wrap" onClick={onComment}>
          <View className="iconfont icon-comment" />
          <View>{reply_count}</View>
        </View>
      </View>
    );
    return (
      <View className="list-cell">
        {conentWrap}
        {commentWrap}
      </View>
    );
  }
}
