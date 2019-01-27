/*
 * @Author: atony2099
 * @Date: 2019-01-23 21:30:39
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-24 00:24:11
 */

import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import PropTypes from 'prop-types';
import placeHolder from '../../static/image/placeholder.png';
import './style.styl';

export default class Avater extends Taro.PureComponent {
  static propTypes = {
    src: PropTypes.string,
    size: PropTypes.oneOf(['small', 'normal'])
  };

  static defaultProps = {
    size: 'normal',
    src: placeHolder
  };

  render() {
    console.log(typeof placeHolder, '====placeholder');
    const { src, size } = this.props;
    const styleList = {
      small: '50rpx',
      normal: '100rpx'
    };

    const sizeStyle = { width: styleList[size] || '50rpx', height: styleList[size] || '50rpx' };

    return (
      <View className="avater-wrap" style={sizeStyle}>
        <Image className="image" src={src} />
      </View>
    );
  }
}
