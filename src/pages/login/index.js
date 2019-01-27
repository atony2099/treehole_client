import { View, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import config from '../../config';
import './style.styl';

const mapStateToProps = ({ user }) => ({
  ...user
});

@connect(mapStateToProps)
export default class Login extends Taro.Component {
  refreshUser = e => {
    const { detail } = e;
    const { dispatch } = this.props;
    const { encryptedData, iv } = detail;
    dispatch({
      type: 'user/login',
      payload: {
        encryptedData,
        iv
      },
      callBack: start => {
        if (start) {
          Taro.showLoading({ title: '登录中...' });
        } else {
          Taro.hideLoading();
          Taro.navigateBack();
        }
      }
    });
  };
  state = {};

  render() {
    return (
      <View className="login-container">
        <View className="top-container _p">
          <Image className="_img" src={require('../../static/image/app.png')} alt />
          <View className>{config.appName}</View>
        </View>
        <View className="bottom-desc-container _p">
          <View>该程序获得以下授权</View>
          <View className="desc">获得您的公开信息(昵称和头像等)</View>
        </View>
        <Button
          className="_button save-btn"
          type="primary"
          openType="getUserInfo"
          onGetUserInfo={this.refreshUser}
        >
          确认授权
        </Button>
      </View>
    );
  }
}
