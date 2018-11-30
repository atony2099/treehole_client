/*
 * @Author: atony2099 
 * @Date: 2018-11-30 12:37:20 
 * @Last Modified by: atony2099
 * @Last Modified time: 2018-11-30 12:37:45
 */



const Count = count => {
  if (!count) {
    return '0'
  }
  if (count < 1000) {
    return count.toString()
  }
  return (count / 1000).toFixed(1) + 'k'
}
export default Count