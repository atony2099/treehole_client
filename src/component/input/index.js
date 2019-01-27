/*
 * @Author: atony2099
 * @Date: 2019-01-24 18:08:22
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-27 21:16:04
 */

import { View, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './style.styl';

export default class Input extends Taro.PureComponent {
  render() {
    const { value, onInput, onConfirm } = this.props;

    console.log(value, 'getvalue');
    return (
      <View className="input-wrap">
        <Textarea
          autoHeight
          className="input"
          placeholder="说点什么吧"
          onInput={onInput}
          onConfirm={onConfirm}
          value={value}
        />
        <View onClick={onConfirm} className="comment-button">
          评论
        </View>
      </View>
    );
  }
}
