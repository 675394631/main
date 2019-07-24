$(function () {
    // appendrain(raindata)
    //changeBg()
    //setInterval("changeBg()", 3000); //设定定时切换，单位为毫秒这里是3000 毫秒

    getRaindata();
    getRainPoint();

})
var rainlist = [];
// 获取降雨点数据点
var raindata = [{
    siteCode: 'HTHZ',
    name: '浒通河闸',
    rainfall: 0,
    left: '10%',
    top: '88%'
}, {
    siteCode: 'JXSZ',
    name: '江心沙站',
    rainfall: 0,
    left: '6%',
    top: '83%'
}, {
    siteCode: 'KFQZ',
    name: '开发区站',
    rainfall: 0,
    left: '15%',
    top: '82%'
}, {
    siteCode: 'SXZ',
    name: '三星站',
    rainfall: 0,
    left: '24%',
    top: '42%'
}, {
    siteCode: 'CLZ',
    name: '常乐站',
    rainfall: 0,
    left: '34%',
    top: '47%'
}, {
    siteCode: 'CQ1',
    name: '城区',
    rainfall: 0,
    left: '28%',
    top: '55%'
}, {
    siteCode: 'CLJZZ',
    name: '常乐节制闸',
    rainfall: 0,
    left: '48%',
    top: '50%'
}, {
    siteCode: 'SCZ',
    name: '三厂站',
    rainfall: 0,
    left: '55%',
    top: '55%'
}, {
    siteCode: 'QLGCZ',
    name: '青龙港船闸',
    rainfall: 0,
    left: '25%',
    top: '75%'
}, {
    siteCode: 'DHXZ',
    name: '大洪新闸',
    rainfall: 0,
    left: '40%',
    top: '66%'
}, {
    siteCode: 'HYZ',
    name: '海永镇',
    rainfall: 0,
    left: '73%',
    top: '89%'
}, {
    siteCode: 'TJXZ',
    name: '汤家新闸',
    rainfall: 0,
    left: '64%',
    top: '64%'
}, {
    siteCode: 'LDXZ',
    name: '灵甸新闸',
    rainfall: 0,
    left: '77%',
    top: '74%'
}, {
    siteCode: 'LJZ',
    name: '临江站',
    rainfall: 0,
    left: '80%',
    top: '65%'
}, {
    siteCode: 'HMGZ',
    name: '海门港闸',
    rainfall: 0,
    left: '87%',
    top: '5%'
}, {
    siteCode: 'DZGZ',
    name: '东灶港闸',
    rainfall: 0,
    left: '81%',
    top: '7%'
}, {
    siteCode: 'WDZ',
    name: '卫东闸',
    rainfall: 0,
    left: '77%',
    top: '24%'
}, {
    siteCode: 'YLZ',
    name: '悦来站',
    rainfall: 0,
    left: '81%',
    top: '42%'
}, {
    siteCode: 'WHZ',
    name: '王浩站',
    rainfall: 0,
    left: '58%',
    top: '19%'
}, {
    siteCode: 'YDZ',
    name: '余东站',
    rainfall: 0,
    left: '66%',
    top: '31%'
}, {
    siteCode: 'SJZ',
    name: '四甲闸',
    rainfall: 0,
    left: '52%',
    top: '39%'
},]



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
    }

    currentIndex += 1;
}
// 右侧数据
function getRaindata() {
    $.post(domain + "/rainProjectApi/getRainDistribution", {},
    function (data) {
        // console.log(data.sys[0])
        var res=data.sys[0]
        $(".heavyRainstorm").html(res.heavyRainstorm)
        $(".heavyDownpour").html(res.heavyDownpour)
        $(".rainstorm").html(res.rainstorm)
        $(".downpour").html(res.downpour)
        $(".rain").html(res.rain)
        $(".smallRain").html(res.smallRain)
        $(".raininfo").html("全市"+res.drpsCount+"个站点发生降雨，最大降雨点在"+res.stnmTop+"，累计降雨量"+res.drpTop+"mm")
    })
    
}

function getRainPoint() {

    $.ajax({
        type: "post",
        url: domain + "/rainProjectApi/getRainInfo",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            timeLength:'1440'
        }),
        success: function (data) {
            var res = data.sys
            // console.log(res)
            $.each(res, function (i, v) {
                // console.log(v.rainData)
                if (v.rainData.length == 1) {
                    var res1 = v.rainData[0]
                    rainlist.push({
                        siteCode: res1.siteCode,
                        name: res1.siteName,
                        cur: res1.z,
                        warn: res1.warnWater,
                        pro: res1.secureWater,
                        type: res1.isOverWarn == "1" ? "red" : (res.isUnderSecure == "1" ? "yellow" : "blue"),
                    })
                } else {
                    $.each(v.rainData, function (j, k) {
                        // console.log(k)
                        rainlist.push({
                            siteCode: k.siteCode,
                            name: k.siteName + '(' + k.deviceName + ')',
                            cur: k.z,
                            warn: k.warnWater,
                            pro: k.secureWater,
                            type: k.isOverWarn == "1" ? "red" : (res.isUnderSecure == "1" ? "yellow" : "blue"),
                        })
                    });
                }
            });
            // console.log(rainlist)
            appendrain(rainlist);
        }, error: function (error) {
            console.log(error);
        }
    });

}
// 左侧点
function appendrain(data) {
    // console.log(data)
    $.each(raindata, function (j, k) {
        $.each(data, function (i, v) {
            if (k.siteCode == v.siteCode) {
                k.rainfall = parseInt(v.timeRainfall==null?0:v.timeRainfall)
            }
        });
        var vnum;
        if (k.rainfall == 0) {
            vnum = "0";
        } else if (0.1 <= k.rainfall && k.rainfall <= 9.9) {
            vnum = "0.1-9.9";
        }
        else if (10 <= k.rainfall && k.rainfall <= 24.9) {
            vnum = "10-24.9";
        }
        else if (25 <= k.rainfall && k.rainfall <= 49.9) {
            vnum = "25-49.9";
        }
        else if (50 <= k.rainfall && k.rainfall <= 99.9) {
            vnum = "50-99.9";
        }
        else if (100 <= k.rainfall && k.rainfall <= 249.9) {
            vnum = "100-249.9";
        } else if (k.rainfall >= 250) {
            vnum = "250以上";
        }
        var imgurl = '../img/mappic/' + vnum + '.png'

        var img = '<img class="append" style="position:absolute;top:' + k.top + ';left:' + k.left + ';" src="' + imgurl + '">'

        $(".two .leftpart").append(img);

    });

}

