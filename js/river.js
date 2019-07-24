$(function () {
    getRiverdata();


    //changeBg()
    //setInterval("changeBg()", 3000); //设定定时切换，单位为毫秒这里是3000 毫秒




})
var riverlist = [];
// 获取警戒点
var riverdata = [{
    siteCode: 'HTHZ',
    name: '浒通河闸',
    type: 'blue',
    left: '10%',
    top: '88%'
}, {
    siteCode: 'JXSZ',
    name: '江心沙站',
    type: 'blue',
    left: '6%',
    top: '83%'
}, {
    siteCode: 'KFQZ',
    name: '开发区站',
    type: 'blue',
    left: '15%',
    top: '82%'
}, {
    siteCode: 'SXZ',
    name: '三星站',
    type: 'blue',
    left: '24%',
    top: '42%'
}, {
    siteCode: 'CLZ',
    name: '常乐站',
    type: 'blue',
    left: '34%',
    top: '47%'
}, {
    siteCode: 'CQ1',
    name: '城区',
    type: 'blue',
    left: '28%',
    top: '55%'
}, {
    siteCode: 'CLJZZ',
    name: '常乐节制闸',
    type: 'blue',
    left: '48%',
    top: '50%'
}, {
    siteCode: 'SCZ',
    name: '三厂站',
    type: 'blue',
    left: '55%',
    top: '55%'
}, {
    siteCode: 'QLGCZ',
    name: '青龙港船闸',
    type: 'blue',
    left: '25%',
    top: '75%'
}, {
    siteCode: 'DHXZ',
    name: '大洪新闸',
    type: 'blue',
    left: '40%',
    top: '66%'
}, {
    siteCode: 'HYZ',
    name: '海永镇',
    type: 'blue',
    left: '73%',
    top: '89%'
}, {
    siteCode: 'TJXZ',
    name: '汤家新闸',
    type: 'blue',
    left: '64%',
    top: '64%'
}, {
    siteCode: 'LDXZ',
    name: '灵甸新闸',
    type: 'blue',
    left: '77%',
    top: '74%'
}, {
    siteCode: 'LJZ',
    name: '临江站',
    type: 'blue',
    left: '80%',
    top: '65%'
}, {
    siteCode: 'HMGZ',
    name: '海门港闸',
    type: 'blue',
    left: '87%',
    top: '5%'
}, {
    siteCode: 'DZGZ',
    name: '东灶港闸',
    type: 'blue',
    left: '81%',
    top: '7%'
}, {
    siteCode: 'WDZ',
    name: '卫东闸',
    type: 'blue',
    left: '77%',
    top: '24%'
}, {
    siteCode: 'YLZ',
    name: '悦来站',
    type: 'blue',
    left: '81%',
    top: '42%'
}, {
    siteCode: 'WHZ',
    name: '王浩站',
    type: 'blue',
    left: '58%',
    top: '19%'
}, {
    siteCode: 'YDZ',
    name: '余东站',
    type: 'blue',
    left: '66%',
    top: '31%'
}, {
    siteCode: 'SJZ',
    name: '四甲闸',
    type: 'blue',
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
        $(".three .leftpart").css("background-image", "url(" + img.src + ")");
    }

    currentIndex += 1;
}


var marquee1 = document.getElementById("marquee1");
var offset1 = 0;
var scrollheight1 = marquee1.offsetHeight;
var length1 = marquee1.children.length;
function scrolldiv() {
    // 不可见处增加同等数量的li元素，模拟无缝连接（实际应该最上面li元素
    // 滚动到不可见之后，删除最上面li元素，再给div末尾添加删除的li元素）
    for (var i = 0; i < length1 - 1; i++) {
        var node1 = marquee1.children[i].cloneNode(true);
        marquee1.appendChild(node1);
    }
    // 执行滚动，利用margin-top
    timename1 = setInterval("doScroll1()", 80);
}


function doScroll1() {
    if (offset1 == scrollheight1) {
        offset1 = 0;
    }
    marquee1.style.marginTop = "-" + offset1 + "px";
    offset1 += 1;
}

function shine() {
    var index_e = 0;
    setInterval(function () {
        if (index_e == $('.leftpart>.station').length) {
            index_e = 0
        }
        $('.leftpart>.station').hide()
        $('.leftpart>.station').eq(index_e++).show().fadeOut(400).fadeIn(1000).fadeOut(400).fadeIn(1000);
    }, 3000);


    // clearInterval(interval);
    // var css = { opacity: '1' };
    // interval = setInterval(function () {
    //     $(dom).animate(css, 300, rowBack);
    // }, 300);
    // function rowBack() {
    //     if (css.opacity === '0')
    //         css.opacity = '1';
    //     else if (css.opacity === '1')
    //         css.opacity = '0';
    // }
}
function getRiverdata() {

    $.ajax({
        type: "post",
        url: domain + "/waterProject/getWaterListBySite",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: "{}",
        success: function (data) {
            $(".rightparttitle").html("全市范围内超警戒水位："+data.sys.warnCount+"个 低保证水位"+data.sys.secureCount+"个")
            var res = data.sys.rows
            // console.log(res)
            $.each(res, function (i, v) {
                // console.log(v.waterData)
                if (v.waterData.length == 1) {
                    var res1 = v.waterData[0]
                    riverlist.push({
                        siteCode: res1.siteCode,
                        name: res1.siteName,
                        cur: res1.z,
                        warn: res1.warnWater,
                        pro: res1.secureWater,
                        type: res1.isOverWarn == "1" ? "red" : (res.isUnderSecure == "1" ? "yellow" : "blue"),
                    })
                } else {
                    $.each(v.waterData, function (j, k) {
                        // console.log(k)
                        riverlist.push({
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
            // console.log(riverlist)
            // 处理左侧数据
            appendriver(riverlist);
            // 点闪烁
            shine();
            // 添加右侧站点
            appendstation(riverlist);
            // 站点滚动
            scrolldiv();

        }, error: function (error) {
            console.log(error);
        }
    });

}
// 左侧点
function appendriver(data) {
    // console.log(data)
    $.each(riverdata, function (j, k) {
        //  console.log(k.siteCode)
        $.each(data, function (i, v) {
            //   console.log(v.siteCode)
            if (k.siteCode == v.siteCode) {
                // console.log(j,i)
                k.type = v.type
            }
        });
        var imgurl = '../img/mappic/' + k.type + '.png'
        var img = '<div class="station"><img class="append" style="position:absolute;top:' + k.top + ';left:' + k.left + ';" src="' + imgurl + '">' +
            '<span style="font-size:3.5vh;color:white;position:absolute;top:' + (parseInt(k.top) - 5) + '%;left:' + (parseInt(k.left) - 3) + '%">' + k.name + '</span></div>'
        $(".three .leftpart").append(img);

    });

}
// 右侧站点
function appendstation(data) {
    // console.log(data)
    $.each(data, function (i, v) {
        var dom = '<li><p><span class="circle"></span> ' + v.name +
            '</p><p>' + (v.cur == null ? '' : v.cur) + '</p><p>' + (v.warn == null ? '' : v.warn) + '</p><p>' + (v.pro == null ? '' : v.pro) + '</p></li>'
        $(".three #marquee1").append(dom);
    });
}

