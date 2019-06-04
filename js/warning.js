$(function () {
    InitTime();
    getTodayWeather();
    getFutureWeather();
    appendrain(raindata)
    appendriver(riverdata)
    appendarea(areadata)
    changeBg()
    changeareaBg()
    setInterval("changeBg()", 3000); //设定定时切换，单位为毫秒这里是3000 毫秒
    setInterval("changeareaBg()", 3000);
})
// 降雨点数据
var raindata = [{
    num: 0,
    left: "50%",
    top: '25%'
}, {
    num: 1,
    left: "20%",
    top: '45%'
}, {
    num: 70,
    left: "30%",
    top: '60%'
}, {
    num: 50,
    left: "70%",
    top: '55%'
}, {
    num: 150,
    left: "10%",
    top: '90%'
}]

// 切换23背景
var currentIndex = 0;
function changeBg() {
    //定义要切换的背景图片，双引号里面"1.jpg","2.jpg","3.jpg","4.jpg"，可以放任意多个用,隔开
    var bgImgs = ["../img/mappic/地图三厂街道.png",
        "../img/mappic/地图三星镇.png",
        "../img/mappic/地图临江镇.png",
        "../img/mappic/地图余东镇.png",
        "../img/mappic/地图包场镇.png",
        "../img/mappic/地图四甲镇.png",
        "../img/mappic/地图常乐镇.png",];
    if (currentIndex >= bgImgs.length)
        currentIndex = 0;
    // 修复切换背景图时出现的“白色闪屏”现象
    var img = new Image();
    img.src = bgImgs[currentIndex];
    // 确定图片加载完成后再进行背景图片切换
    img.onload = function () {
        $(".two .leftpart").css("background-image", "url(" + img.src + ")");
        $(".three .leftpart").css("background-image", "url(" + img.src + ")");
    }

    currentIndex += 1;
}
// 切换4背景
var currentIndex4 = 0;
function changeareaBg() {
    //定义要切换的背景图片，双引号里面"1.jpg","2.jpg","3.jpg","4.jpg"，可以放任意多个用,隔开
    var bgImgs = ["../img/mappic/海永乡.png",
        "../img/mappic/江心沙农场水系.png",
        "../img/mappic/通吕片区.png",
        "../img/mappic/通启中片水系.png",
        "../img/mappic/通启西片水系.png"];
    if (currentIndex >= bgImgs.length)
        currentIndex = 0;
    // 修复切换背景图时出现的“白色闪屏”现象
    var img = new Image();
    img.src = bgImgs[currentIndex];
    // 确定图片加载完成后再进行背景图片切换
    img.onload = function () {
        $(".four .leftpart").css("background-image", "url(" + img.src + ")");
    }

    currentIndex += 1;
}


// 获取降雨点
function appendrain(data) {

    $.each(data, function (i, v) {
        var vnum;
        if (v.num == 0) {
            vnum = "0";
        } else if (0.1 <= v.num && v.num <= 9.9) {
            vnum = "0.1-9.9";
        }
        else if (10 <= v.num && v.num <= 24.9) {
            vnum = "10-24.9";
        }
        else if (25 <= v.num && v.num <= 49.9) {
            vnum = "25-49.9";
        }
        else if (50 <= v.num && v.num <= 99.9) {
            vnum = "50-99.9";
        }
        else if (100 <= v.num && v.num <= 249.9) {
            vnum = "100-249.9";
        } else if (v.num >= 250) {
            vnum = "250以上";
        }
        var imgurl = './img/mappic/' + vnum + '.png'

        var img = '<img class="append" style="position:absolute;top:' + v.top + ';left:' + v.left + ';" src="' + imgurl + '">'

        $(".two .leftpart").append(img);
    });

}

// 获取警戒点
var riverdata=[{
    type:'green',
    left:'40%',
    top:'50%'
},{
    type:'red',
    left:'50%',
    top:'40%'
}]
function appendriver(data) {

    $.each(data, function (i, v) {
        var imgurl = './img/mappic/' + (v.type=='red'?'超警戒':'超保证') + '.png'

        var img = '<img class="append" style="position:absolute;top:' + v.top + ';left:' + v.left + ';" src="' + imgurl + '">'

        $(".three .leftpart").append(img);
    });

}

// 获取片区境界点
var areadata=[{
    type:'green',
    left:'47%',
    top:'52%'
},{
    type:'red',
    left:'50%',
    top:'45%'
}]
function appendarea(data) {

    $.each(data, function (i, v) {
        var imgurl = './img/mappic/' + (v.type=='red'?'超警戒':'超保证') + '.png'

        var img = '<img class="append" style="position:absolute;top:' + v.top + ';left:' + v.left + ';" src="' + imgurl + '">'

        $(".four .leftpart").append(img);
    });

}
// 格式化时间
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 获取时间
function InitTime() {
    var date = new Date();
    var time = date.Format('hh:mm');
    $('#weather .time').html(time);
    // 农历
    var lunarData = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    var lunarDate = date.Format('yyyy-MM-dd') + '&emsp;' + lunarData.ncWeek + '&emsp;农历' + lunarData.IMonthCn + lunarData.IDayCn;
    $('#weather .date').html(lunarDate);
    setInterval(function () {
        var time = new Date().Format('hh:mm');
        $('#weather .time').html(time);
    }, 1000 * 20);
}
// 获取当前天气
function getTodayWeather() {
    $.ajax({
        type: 'get',
        async: false,
        url: 'http://api.k780.com/?app=weather.today&weaid=海门&appkey=27887&sign=f2dbe52229a7c54add1c3770f8dab8b5&format=json&jsoncallback=data',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'data',
        success: function (data) {
            if (data.success == "1") {
                var result = data.result;
                var div_today = $('#weather .today');
                div_today.find('.temp').html(result.temperature_curr);
                div_today.find('.weaIcon').attr('src', "../img/weather/" + (parseInt(result.weatid) - 1) + ".png");
                div_today.find('.temperature').html(result.temperature);
                div_today.find('.weather').html(result.weather);
                div_today.find('.wind').html(result.wind + result.winp);
            }
        },
        error: function () {
            console.log('获取天气信息出错，请稍后再试！');
        }
    });
}
// 获取未来天气
function getFutureWeather() {
    $.ajax({
        type: 'get',
        async: false,
        url: 'http://api.k780.com/?app=weather.future&weaid=海门&appkey=27887&sign=f2dbe52229a7c54add1c3770f8dab8b5&format=json&jsoncallback=data1',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'data1',
        success: function (data) {
            if (data.success == "1") {
                for (var i = 1; i < 4; i++) {
                    var result = data.result[i];
                    var div = $('#weather .forecast' + i);

                    // 获取后三天日期
                    var date = new Date();
                    date = date.setDate(date.getDate() + i);
                    date = new Date(date);
                    // 农历
                    var lunarData = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
                    var lunarDate = date.Format('yyyy-MM-dd') + '&emsp;' + lunarData.ncWeek + '&emsp;农历' + lunarData.IMonthCn + lunarData.IDayCn;
                    $('#weather .week').html(lunarDate);



                    // div.find('.week').html(result.week);
                    div.find('.weaIcon').attr('src', "../img/weather/" + (parseInt(result.weatid) - 1) + ".png");
                    div.find('.temperature').html(result.temperature);
                    div.find('.weather').html(result.weather);
                    div.find('.wind').html(result.wind + result.winp);

                }
            }

        },
        error: function () {
            console.log('获取天气信息出错，请稍后再试！');
        }
    });
}