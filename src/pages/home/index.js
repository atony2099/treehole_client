/*
 * @Author: atony2099
 * @Date: 2019-01-27 23:15:12
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-28 01:28:45
 */

import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { connect } from '@tarojs/redux';
import Cell from '../../component/cell';
import MoreWrap from '../../component/moreWrap';
import { toDetail, checkLogin } from '../../router';
import './style.styl';

const mapStateToProps = ({ home, user }) => ({
  ...home,
  ...user
});

@connect(mapStateToProps)
export default class Home extends Taro.Component {
  state = {
    current: 0
  };
  onLike = (id, like) => {
    checkLogin().then(hasLogin => {
      console.log('login====', hasLogin);
      if (!hasLogin) {
        return;
      }
      console.log('login====');
      const { dispatch } = this.props;
      dispatch({ type: 'home/likeTopic', payload: { id, like: !like } });
    });
  };

  onDelete = id => {
    const { dispatch } = this.props;
    dispatch({ type: 'home/deleteTopic', payload: { id } });
  };

  onComment = id => {
    toDetail(id);
  };

  getLatest(init) {
    const { dispatch } = this.props;
    dispatch({ type: 'home/getLatest', payload: { init } });
  }

  getHotest() {
    const { dispatch } = this.props;
    dispatch({ type: 'home/getHotest' });
  }

  onReachBottom() {
    const { current } = this.state;
    if (current === 0) {
      this.getLatest(false);
    }
  }

  onPullDownRefresh() {
    const { current } = this.state;
    if (current === 0) {
      this.getLatest(false);
    } else {
      this.getHotest();
    }
  }

  componentDidMount() {
    this.getLatest(true);
  }

  handleClick(e) {
    const { eHandleclickAA: clickIndex } = e.target.dataset;
    const { current } = this.state;
    if (current === clickIndex) {
      return;
    }
    this.setState({ current: clickIndex });
    if (clickIndex == 1) {
      this.getHotest();
    }
  }

  render() {
    const {
      latest: { list, hasMore: lastestMore },
      hotest: { list: hotestList, hasMore: hotestMore },
      user: { id }
    } = this.props;
    console.log(this.props.user, 'this.props.user');

    const tabList = [{ title: '最新' }, { title: '最热' }];
    return (
      <View className="list-wrap">
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            {list.map(topic => {
              console.log(topic, 'authore===');
              return (
                <Cell
                  canDelete={id === topic.author.id}
                  onDelete={this.onDelete.bind(this, topic.id)}
                  onLike={this.onLike.bind(this, topic.id, topic.is_like)}
                  onComment={this.onComment.bind(this, topic.id)}
                  key={topic._id}
                  topic={topic}
                />
              );
            })}
            <MoreWrap hasMore={lastestMore} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {hotestList.map(topic => (
              <Cell
                canDelete={id === topic.author.id}
                onDelete={this.onDelete.bind(this, topic.id)}
                onLike={this.onLike.bind(this, topic._id, topic.is_like)}
                onComment={this.onComment.bind(this, topic.id)}
                key={topic._id}
                topic={topic}
              />
            ))}
            <MoreWrap hasMore={hotestMore} />
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}
