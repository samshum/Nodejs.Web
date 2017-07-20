var log4js = require('log4js');
log4js.configure('./log4.json');

var logger = log4js.getLogger('log_date');
var write = function (logType, logMessage) {
    //debugger;
    switch (logType) {
        case 'info':
            logger.info(logMessage);
            break;
        case 'debug':
            logger.debug(logMessage);
            break;
        case 'warn':
            logger.warn(logMessage);
            break;
        case 'error':
            logger.error(logMessage);
            break;
        case 'fatal':
            logger.fatal(logMessage);
            break
        default:
            logger.trace(logMessage);
    }
};

module.exports = {
    // 通过arguments参数实现3重重载
    write : function () {
        if (arguments.length == 0) return null;

        var jsonStr = arguments[0];
        if (jsonStr != null && (typeof jsonStr) == 'object') {
            jsonStr = JSON.stringify(jsonStr);
        }

        if (arguments.length == 1) {
            write('trace', jsonStr);
        }
        //function (logmsg, logtype)
        else if (arguments.length == 2) { 
            write(arguments[1], jsonStr);
        }
        //function (logmsg, logtype, req)
        else if (arguments.length == 3) { 
            //debugger;
            if (arguments[2] != null && arguments[2].url != null) {
                jsonStr = '【' + arguments[2].method + '】' + arguments[2].url + ',    ' + jsonStr;
            }
            write(arguments[1], jsonStr);
        }
    }
};