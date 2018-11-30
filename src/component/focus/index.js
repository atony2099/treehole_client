/*
 * @Author: atony2099 
 * @Date: 2018-11-30 18:17:55 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-11-30 19:15:23
 */


import { Block, View, CoverView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import userInfo from '../../util/userinfo'
import './style.styl'

export default  class Focus extends Taro.Component  {
    static defaultProps = {
      inList: true,
      type:'normal'
    }
    checkShouldShow(user) {
      if (userInfo.isMe(user.id)) {
        return false
      }
      return true
    }
    getFollowDesc(user) {
      if (this.isFollow(user)) {
        return '已关注'
      } else {
        return '关注'
      }
    }
    getFocusColor(type) {
      if (type !== 'full_screen') {
        return '#888'
      }
      return 'white'
    }

    isFollow(user) {
      let { relation } = user
      let isFollow = false
      if (relation) {
        isFollow = relation.is_follow
      }
      console.log(isFollow,"isfollow")
      return isFollow
    }

    getBorderWidth(user){
      return this.isFollow(user) ? '' :'2rpx'
    }


  

  render() {
    const { user, inList=true, type,onFocusUser} = this.props
    console.log(inList,"xxxxxxxxx====ppppp")
    const  shouldShowfocus   = this.checkShouldShow(user);
    const followDesc = this.getFollowDesc(user);
    const focusColor = this.getFocusColor(type);
    const borderWidth = this.getBorderWidth(user) 
    const focusStyle = {
      color:focusColor,
    }
    console.log(borderWidth,"borderWidth")
    if (borderWidth) {
      focusStyle['borderWidth'] = borderWidth
      console.log(focusStyle,"focusStyle")
    }


    return (
      <Block>
        {shouldShowfocus && inList && (
          <View
            className='focus'
            onClick={onFocusUser}
            style={focusStyle}
          >
            {followDesc}
          </View>
        )}
        {shouldShowfocus && !inList && (
          <CoverView
            className='focus'
            onTouchForceChange={onFocusUser}
            style={focusColor}
           
          >
          {followDesc}
          </CoverView>
        )}
      </Block>
    )
  }
}

