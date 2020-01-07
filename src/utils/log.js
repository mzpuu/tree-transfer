import { getUrlParam } from './mUtils'
/**
 * console 重写
 */
(function (console) {
    let getMsg = (msg) => {
        let _date = new Date();
        msg = "[ms " + _date.getTime() + " , tims:" + _date.getHours() + ":" + _date.getMinutes() + ":" + _date.getSeconds() + "." + _date.getMilliseconds() + "]-----" + msg;
        return msg;
    }

    console.log = (function (oriLogFunc) {
        return function (str) {
            if (process.env.ENV_CONFIG !== "prod" || getUrlParam('debugger'))
                oriLogFunc.call(console, getMsg(str));
        }
    })(console.log)
})(console)