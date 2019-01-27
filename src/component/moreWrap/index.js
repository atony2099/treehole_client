/*
 * @Author: atony2099
 * @Date: 2019-01-23 21:30:39
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-27 17:42:11
 */

import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import './style.styl';

export default class MoreWrap extends Taro.PureComponent {
  static propTypes = { hasMore: PropTypes.bool };

  render() {
    const { hasMore } = this.props;
    return <View className="more-wrap">{hasMore ? '加载中...' : '没有更多了'}</View>;
  }
}
