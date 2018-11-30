import Taro from '@tarojs/taro'
import {View } from '@tarojs/components'
import {connect} from '@tarojs/redux'
import ListCell from '../../component/listCell'
import './index.styl'


const mapStateToProps = ({feeds}) =>  ({
    list: feeds.opusList
})

@connect(mapStateToProps)
export default class Recommend extends Taro.Component {

  config = {
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "智能小程序接口功能演示",
    "backgroundColor": "#eeeeee",
    "backgroundTextStyle": "light"
  }


  loadRecommond = (init=false) => {
    this.props.dispatch({
      type:'feeds/load',
      payload:{init},
      callback:()=> {
        if (init) {
          Taro.stopPullDownRefresh()
        }
      }
    })
  }

  componentDidMount() {
    this.loadRecommond(true)
  }

  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {
    this.loadRecommond(true)
  }
  onReachBottom = () => {
    this.loadRecommond(false)
  }
  onShareAppMessage = () => {}
  config = {
    enablePullDownRefresh: true
  }

  render() {
    const { list } = this.props
    return (
        <View className='recomond'>
        {list.map(opus => <ListCell key={opus.id} opus={opus} /> )}
        </View>
    )
  }
}
