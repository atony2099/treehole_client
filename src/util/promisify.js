/*
 * @Author: atony2099
 * @Date: 2018-12-25 12:23:20
 * @Last Modified by: atony2099
 * @Last Modified time: 2019-01-17 20:34:31
 */

export default originFunc => opt =>
  new Promise((resolve, reject) => {
    const parameter = {
      ...opt,
      success: resolve,
      fail: reject
    };
    originFunc(parameter);
  });
