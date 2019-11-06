var Public = new Object();

// 盐值
Public.salt = 'c077292f-2dc5-493e-a965-00659318c889';

// to UTF-8
Public.UnicodeToUtf8 = function (unicode) {
    return eval('\'' + encodeURI(unicode).replace(/%/gm, '\\x') + '\'');
}

// 加法
Public.Addition = function (a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
};
// 减法
Public.Subtraction = function (a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
};
// 乘法
Public.Multiplication = function (arg1, arg2) {
    var r1, r2, m, n, q;
    if (parseInt(arg1) == arg1) {
        r1 = 0;
    } else {
        r1 = arg1.toString().split(".")[1].length;
    }
    if (parseInt(arg2) == arg2) {
        r2 = 0;
    } else {
        r2 = arg2.toString().split(".")[1].length;
    }
    m = Math.pow(10, r1);
    n = Math.pow(10, r2);
    q = m * n;
    var sum = (((arg1 * m) * (arg2 * n)) / q);
    return sum;
};
// 除法
Public.Division = function (a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) { }
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) { }
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
};

function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) { }
    try {
        c += e.split(".")[1].length;
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 手机号验证
Public.phone = function (tel) {
    var phone = tel.trim();
    var reg = /^1\d{10}$/;
    return reg.test(phone);
};

// 密码格式
Public.pwds = function (val) {
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
    return reg.test(val)
};

// 邮箱验证
Public.email = function (em) {
    var ema = /^[A-Za-z0-9\u4e00-\u9fa5_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!ema.test(em)) {
        return false
    } else {
        return true
    }
}

Public.isInt = function (value, num) {
    var reg = /^[0-9]+\.?[0-9]*$/;
    var arr = value.toString().split('.');
    if (arr[1]) {
        var len = arr[1].length;
    } else {
        var len = 0;
    }
    if (value == '') {
        return "不能为空";
    } else if (parseFloat(value) < 0) {
        return "不能小于0";
    } else if (len > num) {
        return "超出小数位数限制"
    }
    else if (!reg.test(value)) {
        return "只能是数字";
    }
    return true;
}

// 验证数字
Public.Ints = function (value) {
    var reg = /^[0-9]+\.?[0-9]*$/;
    return reg.test(value);
}

// md5加密5次
Public.fiveMd5 = function (val, _this) {
    return _this.$md5(_this.$md5(_this.$md5(_this.$md5(_this.$md5(val)))))
}

// 日期格式化
Public.formatDate = function (date) {
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

// 时间戳转化
Public.timestampToTime = function (timestamp) {
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var date = "";
    if (String(timestamp).length < 13) {
        date = new Date(timestamp * 1000); 
    } else {
        date = new Date(timestamp); 
    }
    
    var Y, M, D, h, m, s;
    Y = date.getFullYear() + '-';
    M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
};

// 时间戳转化
Public.timestampToTime2 = function (timestamp) {
    //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var date = "";
    date = new Date(String(timestamp).replace(/-/g, '/'));
    
    var Y, M, D, h, m, s;
    Y = date.getFullYear() + '-';
    M = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
};

// 时间格式化
Public.formatTime = function (msec) {
    let secondTime = parseInt(msec / 1000);      // 秒
    let minuteTime = 0;                         // 分
    let hourTime = 0;                           // 小时
    if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
            hourTime = parseInt(minuteTime / 60);
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    secondTime = secondTime < 10 ? '0' + secondTime : secondTime;
    minuteTime = minuteTime < 10 ? '0' + minuteTime : minuteTime;
    hourTime = hourTime < 10 ? '0' + hourTime : hourTime;
    return hourTime + ":" + minuteTime + ":" + secondTime;
}

// 时间格式转时间戳
Public.timetoStamp = function (str) {
    var strArr = str.split(":");
    return (parseInt(strArr[0]) * 3600 + parseInt(strArr[1]) * 60 + parseInt(strArr[2])) * 1000;
}
Public.numberCeil = function (val, index) {
    var aa = Math.pow(10, index);
    var val = Number(val);
    return (parseInt(val * aa) / aa);
}

export default Public;