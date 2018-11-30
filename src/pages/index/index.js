import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.styl'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '推荐122',
    navigationStyle:'custom'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  pushTest(){
    console.log('push====');
    Taro.navigateTo({
      url: '/pages/test/test'
    })

  }

  render () {
    return (
      <View className='index'>
        <View onClick={this.pushTest}><Text>H1111ello, World123sss</Text></View>
      </View>
    )
  }
}

export default Index
