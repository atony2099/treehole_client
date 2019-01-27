/*
 * @Author: atony2099
 * @Date: 2019-01-27 23:21:42
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-27 23:51:40
 */
import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import Index from './pages/index/index';
import models from './model';
import dva from './dva';
import './styles/base.styl';
import 'taro-ui/dist/style/index.scss';

// import './styles/iconfont.styl'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e) {
    Taro.hideLoading();
    Taro.showToast({
      title: e.message || '未知错误',
      icon: 'none'
    });
  }
});
const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      'pages/home/index',
      'pages/publish/index',
      'pages/detail/index',
      'pages/person/index',
      'pages/login/index'
    ],
    window: {
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'IT吐槽圈'
    },
    tabBar: {
      color: '#626567',
      selectedColor: '#2A8CE5',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/home/index',
          iconPath: './static/tab/home.png',
          selectedIconPath: './static/tab/home_selected.png'
          // text: '列表'
        },
        {
          pagePath: 'pages/publish/index',
          iconPath: './static/tab/publish.png',
          selectedIconPath: './static/tab/publish_selected.png'
          // text: '首页'
        },
        {
          pagePath: 'pages/person/index',
          iconPath: './static/tab/person.png',
          selectedIconPath: './static/tab/person_selected.png'
        }
      ]
    }
  };
  getUserInfo() {
    const { dispatch } = store;
    dispatch({
      type: 'user/initLaunch'
    });
  }
  componentDidMount() {
    // login
    this.getUserInfo();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
