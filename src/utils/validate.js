export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证手机号 可以为空*/
export function validateMobil(str) {
  const reg = /^1[\d]{10}$/;
  //if(reg.test(str) == true)
  if (reg.test(str) || str=='') {
    return true
  } else {
    return false
  }
}
/* 验证手机号*/
export function validateMobilNum(str) {
  const reg = /^1[\d]{10}$/;
  if (reg.test(str)) {
    return true
  } else {
    return false
  }
}
//验证身份证号
export function validateidCard(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(str) || str == '') {
    return true
  } else {
    return false
  }
}
//验证手机号格式是否正确
export function checkMobil(rule, value, callback){
  setTimeout(() => {
    if (!!value && validateMobil(value.replace(/(^\s*)|(\s*$)/g,"")) == false) {
      callback(new Error("请输入正确的手机格式"));
    } else {
      callback();
    }
  }, 500);
};
//验证身份证格式是否正确
export function checkIdcard(rule, value, callback){
  setTimeout(() => {
    if (validateidCard(value.replace(/(^\s*)|(\s*$)/g,"")) == false) {
      callback(new Error("请输入正确的身份证格式"));
    } else {
      callback();
    }
  }, 500);
};