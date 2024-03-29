$(function () {
    InitTime();
    getWeather();
    // getTodayWeather();
    // getFutureWeather();


})

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
var date = new Date();
var time = date.Format('hh:mm');
var DAYS = new Date().Format('yyyy-MM-dd')
var WEEK = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate()).ncWeek;
// 获取时间
function InitTime() {


    $('#weather .time').html(time);
    // 农历
    var lunarData = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    var lunarDate = DAYS + '&emsp;' + lunarData.ncWeek + '&emsp;农历' + lunarData.IMonthCn + lunarData.IDayCn;
    $('#weather .date').html(lunarDate);
    setInterval(function () {
        var time = new Date().Format('hh:mm');
        $('#weather .time').html(time);
    }, 1000 * 20);
}
// 获取当前天气
// function getTodayWeather() {
//     $.ajax({
//         type: 'get',
//         async: false,
//         url: 'http://api.k780.com/?app=weather.today&weaid=海门&appkey=27887&sign=f2dbe52229a7c54add1c3770f8dab8b5&format=json&jsoncallback=data',
//         dataType: 'jsonp',
//         jsonp: 'callback',
//         jsonpCallback: 'data',
//         success: function (data) {
//             if (data.success == "1") {
//                 var result = data.result;
//                 var div_today = $('#weather .today');
//                 div_today.find('.temp').html(result.temperature_curr);
//                 // div_today.find('.weaIcon').attr('src', "./img/weather/" + (parseInt(result.weatid) - 1) + ".png");
//                 div_today.find('.temperature').html(result.temperature);
//                 div_today.find('.weather').html(result.weather);
//                 div_today.find('.wind').html(result.wind + result.winp);
//             }
//         },
//         error: function () {
//             console.log('获取天气信息出错，请稍后再试！');
//         }
//     });
// }
// 获取未来天气
// function getFutureWeather() {
//     $.ajax({
//         type: 'get',
//         async: false,
//         url: 'http://api.k780.com/?app=weather.future&weaid=海门&appkey=27887&sign=f2dbe52229a7c54add1c3770f8dab8b5&format=json&jsoncallback=data1',
//         dataType: 'jsonp',
//         jsonp: 'callback',
//         jsonpCallback: 'data1',
//         success: function (data) {
//             if (data.success == "1") {
//                 for (var i = 1; i < 4; i++) {
//                     var result = data.result[i];
//                     var div = $('#weather .forecast' + i);

//                     // 获取后三天日期
//                     var date = new Date();
//                     date = date.setDate(date.getDate() + i);
//                     date = new Date(date);
//                     // 农历
//                     var lunarData = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
//                     var lunarDate = date.Format('yyyy-MM-dd') + '&emsp;' + lunarData.ncWeek + '&emsp;农历' + lunarData.IMonthCn + lunarData.IDayCn;
//                     $('#weather .week').html(lunarDate);


//                     // 当前天气图标
//                     $('#weather .today .weaIcon').attr('src', "../img/weather/" + (parseInt(data.result[0].weatid) - 1) + ".png");
//                     // div.find('.week').html(result.week);
//                     div.find('.weaIcon').attr('src', "../img/weather/" + (parseInt(result.weatid) - 1) + ".png");
//                     div.find('.temperature').html(result.temperature);
//                     div.find('.weather').html(result.weather);
//                     div.find('.wind').html(result.wind + result.winp);
//                 }
//             }
//         },
//         error: function () {
//             console.log('获取天气信息出错，请稍后再试！');
//         }
//     });
// }

function getWeather() {
    $.post(domain + "/weatherInfoController/getWeatherInfoList", {},
        function (data) {
            // console.log(data.sys)
            // 当日天气
            var result = data.sys[0];
            var div_today = $('#weather .today');
            div_today.find('.temp').html(result.TEMP_CURR);
            div_today.find('.weaIcon').attr('src', "../img/weather/" + (parseInt(result.WEAT_ID) - 1) + ".png");
            div_today.find('.temperature').html(result.TEMPERATURE);
            div_today.find('.weather').html(result.WEATHER);
            div_today.find('.wind').html(result.WIND + result.WINP);

            // 后三天
            for (var i = 1; i < 4; i++) {
                var result = data.sys[i];
                var div = $('#weather .forecast' + i);
                // 获取后三天日期
                var date = new Date();
                date = date.setDate(date.getDate() + i);
                date = new Date(date);
                // 农历
                var lunarData = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
                var lunarDate = date.Format('yyyy-MM-dd') + '&emsp;' + lunarData.ncWeek + '&emsp;农历' + lunarData.IMonthCn + lunarData.IDayCn;
                div.find('.week').html(lunarDate);
                div.find('.weaIcon').attr('src', "../img/weather/" + (parseInt(result.WEAT_ID) - 1) + ".png");
                div.find('.temperature').html(result.TEMPERATURE);
                div.find('.weather').html(result.WEATHER);
                div.find('.wind').html(result.WIND + result.WINP);
            }
        }
    );
}