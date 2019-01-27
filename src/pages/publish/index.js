import { View, Textarea, Button, Form } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import './style.styl';

const mapStateToProps = () => ({});
@connect(mapStateToProps)
export default class Publish extends Taro.Component {
  config = {
    navigationBarTitleText: 'IT吐槽'
  };

  submit = e => {
    const {
      detail: {
        value: { desc }
      }
    } = e;
    if (!desc.length) {
      Taro.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return;
    }

    const { dispatch } = this.props;
    dispatch({
      type: 'publish/create',
      payload: { content: desc },
      callback: start => {
        if (start) {
          Taro.showLoading('发布中');
        } else {
          Taro.hideLoading();
          Taro.showToast({ title: '发布成功' });
        }
      }
    });
  };
  state = {};

  componentDidMount() {}
  render() {
    return (
      <View className="publish-wrap">
        <Form onSubmit={this.submit}>
          <View className="input-wrap">
            <Textarea
              placeholder="有什么不开心的事情呢"
              name="desc"
              className="input border-box"
              autoHeight
              maxlength={-1}
            />
          </View>
          <Button type="primary" className="button" form-type="submit">
            发布
          </Button>
        </Form>
      </View>
    );
  }
}
