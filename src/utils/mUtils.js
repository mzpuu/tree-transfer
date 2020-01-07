import { Message } from 'element-ui'
/**
* 获取浏览器可视宽高 兼容 +
*/
export const getBrowserInterfaceSize = () => {
  let pageWidth = window.innerWidth
  let pageHeight = window.innerHeight

  if (typeof pageWidth !== 'number') {
    // 在标准模式下面
    if (document.compatMode === 'CSS1Compat') {
      pageWidth = document.documentElement.clientWidth
      pageHeight = document.documentElement.clientHeight
    } else {
      pageWidth = document.body.clientWidth
      pageHeight = document.body.clientHeight
    }
  }
  return {
    pageWidth: pageWidth,
    pageHeight: pageHeight
  }
}
/*
 *获取地址中的参数列表
 */
export const getUrlVars = url => {
  if (!url) {
    url = window.location.href;
  }
  ;
  var vars = [], hash;
  var hashes;
  hashes = url.slice(url.indexOf('?') + 1).split(/[&#]/);
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    try {
      vars[hash[0]] = decodeURIComponent(hash[1]);
    } catch (e) {
    }
  }
  return vars;
}
/*
*获取地址中的指定参数值
*/
export const getUrlParam = (name, url) => {
  return getUrlVars(url)[name];
}
//封装message组件
export const message = (options = {showClose: true,  message: '网络出错啦...', type: 'success', duration: 4000}) => {
  return Message(options)
}