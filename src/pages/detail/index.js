/*
 * @Author: atony2099
 * @Date: 2019-01-18 20:45:49
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-27 21:21:27
 */

import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import Comment from '../../component/comment';
import InputWrap from '../../component/input';
import './style.styl';

const mapStateToProps = ({ detail }) => ({
  ...detail
});

@connect(mapStateToProps)
export default class Detail extends Taro.Component {
  config = {
    navigationBarTitleText: 'IT吐槽'
  };
  state = { value: '' };

  componentDidMount() {
    const { id } = this.$router.params;
    this.getTopicDetail(id);
  }

  getTopicDetail(id) {
    this.props.dispatch({ type: 'detail/getTopic', payload: { id } });
  }

  handleChange(e) {
    const { value } = e.detail;
    this.setState({
      value
    });
  }

  handleConfirm() {
    const { value } = this.state;
    const { id } = this.$router.params;
    const { dispatch } = this.props;
    dispatch({
      type: 'detail/createComment',
      payload: { comment: value, topicID: id },
      callback: show => {
        if (show) {
          Taro.showLoading({
            title: '发布中'
          });
        } else {
          Taro.hideLoading();
        }
      }
    });
  }

  render() {
    const { value } = this.state;
    const {
      comments,
      topic: { content }
    } = this.props;

    const contentWrap = <View className="content-wrap">{content}</View>;
    return (
      <View className="detail-wrap container">
        {contentWrap}
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
        <View className="input-out-wrap">
          <InputWrap
            onConfirm={this.handleConfirm.bind(this)}
            onInput={this.handleChange.bind(this)}
            value={value}
          />
        </View>
      </View>
    );
  }
}
