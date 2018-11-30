import { View, Image, CoverView, CoverImage } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './style.styl'

export default class Avater extends Taro.Component {
  static defaultProps = {
    inList: true,
    user:{
      verify:{

      }
    }

  }

  render() {
    const { inList, user} = this.props
    console.log(user,"go======xx",inList);
    const hasVerify =  user.verify.type !== 'normal'
    const avaterUrl = user.cover_url ? user.cover_url :''
    const {icon} = user.verify

    return (
      <View>
        {inList && (
          <View className='avater-wrap' onTouchForceChange={this.pushPerson}>
            <Image src={avaterUrl} className='user-avater' />
            {
              hasVerify && (<Image
                src={icon}
                className='user-verify'
              />)
            }
          </View>
        )}
        {!inList && (
          <CoverView
            className='avater-wrap'
            onTouchForceChange={this.pushPerson}
          >
            <CoverImage src={avaterUrl} className='user-avater' />
            <CoverImage
              vIf={hasVerify}
              src={user.verify.icon}
              className='user-verify'
            />
          </CoverView>
        )}
      </View>
    )
  }
}

