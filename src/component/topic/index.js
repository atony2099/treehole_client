/*
 * @Author: atony2099 
 * @Date: 2018-11-30 17:27:30 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-11-30 18:53:38
 */



import { Block, View, CoverView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './style.styl'
 
export default class Topic extends Taro.Component {
  static defaultProps = {
    topic: '',
    id: 0,
    inList: true,
    type:'normal'
  }

  pushTopic() {
   
  }
  
  getColor(type){
    let color = '888'
    if (type === 'full_screen') {
      color = 'white'
    }
    return color
  }


  render() {
    const { topic, inList, type } = this.props
    const  color = this.getColor(type)
    return (
      <Block>
        {topic && inList && (
          <View
            className='topicDesc'
            onTouchForceChange={this.pushTopic}
          >
            {'#' + topic}
          </View>
        )}
        {topic && !inList && (
          <CoverView
            className='topicDesc'
            style={'color:' + color}
            onTouchForceChange={this.pushTopic}
          >
            {'#' + topic}
          </CoverView>
        )}
      </Block>
    )
  }
}
