import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './test.styl'


class Index extends Component {

    config = {
    navigationBarTitleText: '首页2'
  }


  constructor(props) {
    super(props);
    let date = new Date()
    this.state = {
      date
    }
  }
  


  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }
  

  tick() {

    this.setState({
      date: new Date()
    });
 

  }

  render () {
    return (
      <View>
        <Text>Hello, 123</Text>
        <Text>现在的时间是 11{this.state.date.toLocaleTimeString()}.</Text>
        

      </View>
    )
  }
}

export default Index

