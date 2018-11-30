/*
 * @Author: atony2099 
 * @Date: 2018-11-30 14:44:37 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-11-30 15:47:30
 */

import Taro from '@tarojs/taro'


export default {
  deviceWith: 0,
  deviceHeight: 0,
  isIphoneX: -1,
  isAndroid: false,
  statusBarHeight: 20,
  titleContainerH: 44,
  hasGotDevice: false,
  marginBottom: 0,

  getMarginBottom: function() {
    if (this.hasGotDevice === false) {
      this.syncGetDevice()
    }
    return this.marginBottom
  },
  getTitleContainerH: function() {
    if (this.hasGotDevice === false) {
      this.syncGetDevice()
    }
    console.log(this.titleContainerH, 'kkkkk--pp')
    return this.titleContainerH
  },
  getStatusBarH: function() {
    if (this.hasGotDevice === false) {
      this.syncGetDevice()
    }
    return this.statusBarHeight
  },

  getDeiveWith: function() {
    if (this.hasGotDevice === false) {
      this.syncGetDevice()
    }
    return this.deviceWith
  },

  getDeviceHeight: function() {
    if (this.hasGotDevice === false) {
      this.syncGetDevice()
    }
    return this.deviceHeight
  },

  getIsIphonex: function() {
    if (this.hasGotDevice === false) {
      this.syncGetDevice()
    }
    return this.isIphoneX
  },

  getMarignTop: function() {
    if (this.hasGotDevice === false) {
      this.syncGetDevice()
    }
    return this.statusBarHeight + this.titleContainerH
  },

  judgeIphoneX: function(model, statusBarHeight) {
    if (model.indexOf('iPhone X') != -1) return true
    if (statusBarHeight >= 44 && model.indexOf('iPhone') != -1) return true
    return false
  },

  syncGetDevice: function() {
    var res = Taro.getSystemInfoSync()
    this.hasGotDevice = true
    const {
      windowWidth: width,
      windowHeight: height,
      model,
      system,
      statusBarHeight
    } = res
    this.deviceWith = width * 2
    this.deviceHeight = height * 2
    this.statusBarHeight = statusBarHeight
    console.log(statusBarHeight, 'qqq')
    this.isIphoneX = this.judgeIphoneX(model, statusBarHeight)
    console.log(model,typeof(model), "model======")
    this.isAndroid = model.indexOf('iPhone') === -1
    console.log(
      this.isAndroid,
      this.isIphoneX,
      model,
      width,
      height,
      'bbb'
    )
    this.titleContainerH = this.isAndroid ? 48 : 44
    this.marginBottom = this.isIphoneX ? 34 : 0
  }
}
