/*
 * @Author: atony2099 
 * @Date: 2018-11-30 11:41:04 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-11-30 19:05:15
 */

import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Avater from '../avater'
import Topic from '../../component/topic'
import Focus from '../../component/focus'
import './style.styl'
import DeviceInfo  from '../../util/device'
import playIcon from '../../static/icon_play.png'
import disLikeIcon from '../../static/icon_home_like_nor.png';
import commentIcon from '../../static/icon_home_comment.png'
import Count from '../../util/count'
import config from '../../config'
// import likeIcn from '../../static/icon_home_like_sel.png'
 
export default class ListCell extends Taro.Component {

  pushDetailPage(){
    
  }

  getCoverHeight(opus) {
    let coverWidth = DeviceInfo.getDeiveWith() - 60
    console.log(coverWidth,"======cover");
    let coverHeight = coverWidth / opus.feed_width_height_rate
    coverHeight = coverHeight + 'rpx'
    return coverHeight
  }

  onFocusUser(){
    
    Taro.showToast({
      title:config.guideTip,
      icon:'none'
    })
  }

  likeOpus(){

    Taro.showToast({
      title:config.guideTip,
      icon:'none'
    })
  }

  pushComment(){
    
    Taro.showToast({
      title:config.guideTip,
      icon:'none'
    })
  }

  render() {
    const {opus:{user,opus_cover,title,like_count,comment_count}, opus } = this.props
    const coverHeight = this.getCoverHeight(opus)
    const likeCount = Count(like_count)
    const commentCount = Count(comment_count)

    const userContainer = (
      <View className='user-contaniner'>
        <View className='avater-container'>
           {(user&&<Avater inList user={user} />)}
        </View>
        <View className='name'>{user.name}</View>
        <View className='focus-container'>
        <Focus user={opus.user} inList  onFocusUser={this.onFocusUser} />
      </View>
      </View>
    )
    const titleWrap =  (title && (
      <View className='title-container'>{opus.title}</View>
    ))

    const coverWrap = (
    <View
      style={'height:' + coverHeight}
      className='cover-container'
      onClick={this.pushDetailPage}
      data-detailinfo={opus}
    >
      <Image
        src={opus_cover}
        className='image'
        mode='aspectFill'
      />
      <Image className='pause-button' src={playIcon} alt />
    </View>
    )

    const commentWrap =    (<View className='comment-container'>
    <View className='topic-container'>
      <Topic topic={opus.topic_name} topicID={opus.topic_id} />
    </View>
    <View className='image-container'>
      <View className='like-container'>
        <View
          className='likeDiv-container'
          onClick={this.likeOpus}
        >
          <Image className='like-image' src={disLikeIcon} />
          <View className='count-font'>{likeCount}</View>
        </View>
      </View>
      <View
        className='comment-count-container'
        onClick={this.pushComment}
      >
        <Image
          className='comment-image'
          src={commentIcon}
        />
        <View className='count-font'>{commentCount}</View>
      </View>
    </View>
  </View>)


    return (
          <View className='list-cell'>
            {userContainer}
            {titleWrap}
            {coverWrap}
            {commentWrap}
          </View>
    )
  }
}
