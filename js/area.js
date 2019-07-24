$(function () {
    getBackImg();
    getAreadata();

})
// 获取页面id
// 001通吕
// 002通启西
// 003通启中
// 004江心沙
// 005海永乡

var id = getQueryVariable("id") ? getQueryVariable("id") : '001'
function getBackImg(){
    switch (id) {
        case "001":
            $(".leftpart").css("background-image","url(../img/mappic/通吕片区.png)")
            break;
        case "002":
            $(".leftpart").css("background-image","url(../img/mappic/通启西片水系.png)")
            break;
        case "003":
            $(".leftpart").css("background-image","url(../img/mappic/通启中片水系.png)")
            break;
        case "004":
            $(".leftpart").css("background-image","url(../img/mappic/江心沙农场水系.png)")
            break;
        case "005":
            $(".leftpart").css("background-image","url(../img/mappic/海永乡.png)")
            break;
        default:
            break;
    }
}
var arealist = [];

var marquee2 = document.getElementById("marquee2");
var offset2 = 0;
var scrollheight2 = marquee2.offsetHeight;
var length2 = marquee2.children.length;
function scrolldiv() {
    // 不可见处增加同等数量的li元素，模拟无缝连接（实际应该最上面li元素
    // 滚动到不可见之后，删除最上面li元素，再给div末尾添加删除的li元素）
    for (var j = 0; j < length2 - 1; j++) {
        var node2 = marquee2.children[j].cloneNode(true);
        marquee2.appendChild(node2);
    }
    // 执行滚动，利用margin-top
    timename2 = setInterval("doScroll2()", 80);
}
function doScroll2() {
    if (offset2 == scrollheight2) {
        offset2 = 0;
    }
    marquee2.style.marginTop = "-" + offset2 + "px";
    offset2 += 1;
}


// 获取片区境界点
// 005海永乡点
var areadata5 = [{
    siteCode: 'HYZ',
    name: '海永镇',
    type: 'blue',
    left: '50%',
    top: '60%'
}]
// 004江心沙
var areadata4 = [{
    siteCode: 'JXSZ',
    name: '江心沙站',
    type: 'blue',
    left: '60%',
    top: '30%',
}]
// 001通吕
var areadata1 = [{
    siteCode: 'HMGZ',
    name: '海门港闸',
    type: 'blue',
    left: '90%',
    top: '35%',
}, {
    siteCode: 'DZGZ',
    name: '东灶港闸',
    type: 'blue',
    left: '75%',
    top: '32%',
}, {
    siteCode: 'WDZ',
    name: '卫东闸',
    type: 'blue',
    left: '71%',
    top: '47%',
}]
// 002 通启西
var areadata2 = [{
    siteCode: 'SXZ',
    name: '三星站',
    type: 'blue',
    left: '25%',
    top: '17%',
}, {
    siteCode: 'CQ1',
    name: '城区1',
    type: 'blue',
    left: '39%',
    top: '50%',
}, {
    siteCode: 'CQ2',
    name: '城区2',
    type: 'blue',
    left: '48%',
    top: '64%',
}, {
    siteCode: 'CLJZZ',
    name: '常乐节制闸',
    type: 'blue',
    left: '52%',
    top: '52%'
}, {
    siteCode: 'SCZ',
    name: '三厂站',
    type: 'blue',
    left: '56%',
    top: '63%'
}, {
    siteCode: 'HTHZ',
    name: '浒通河闸',
    type: 'blue',
    left: '33%',
    top: '92%'
}, {
    siteCode: 'KFQZ',
    name: '开发区站',
    type: 'blue',
    left: '38%',
    top: '87%'
}, {
    siteCode: 'QLGCZ',
    name: '青龙港船闸',
    type: 'blue',
    left: '48%',
    top: '75%'
}, {
    siteCode: 'DHXZ',
    name: '大洪新闸',
    type: 'blue',
    left: '60%',
    top: '69%'
},]
// 003 通启中
var areadata3 = [{
    siteCode: 'SJZ',
    name: '四甲闸',
    type: 'blue',
    left: '18%',
    top: '22%',
}, {
    siteCode: 'YDZ',
    name: '余东站',
    type: 'blue',
    left: '42%',
    top: '20%',
}, {
    siteCode: 'YLZ',
    name: '悦来站',
    type: 'blue',
    left: '70%',
    top: '30%',
}, {
    siteCode: 'LJZ',
    name: '临江站',
    type: 'blue',
    left: '70%',
    top: '75%'
}, {
    siteCode: 'LDXZ',
    name: '灵甸新闸',
    type: 'blue',
    left: '55%',
    top: '83%'
}, {
    siteCode: 'TJXZ',
    name: '汤家新闸',
    type: 'blue',
    left: '40%',
    top: '73%'
}]
// 左侧点

function appendarea(data) {
    switch (id) {
        case "001":
            areadata = areadata1
            break;
        case "002":
            areadata = areadata2
            break;
        case "003":
            areadata = areadata3
            break;
        case "004":
            areadata = areadata4
            break;
        case "005":
            areadata = areadata5
            break;
        default:
            break;
    }
    console.log(areadata,id)
    $.each(areadata, function (j, k) {
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
        $(".four .leftpart").append(img);

    });

}

function getQueryVariable(variable) { //接收带参的处理
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return ('');
}

function getAreadata() {
    $.ajax({
        type: "post",
        url: domain + "/waterProject/getWaterListBySite",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            partAreaCode: id
        }),
        success: function (data) {
            $(".rightparttitle").html("片区范围内超警戒水位："+data.sys.warnCount+"个 低保证水位"+data.sys.secureCount+"个")
            var res = data.sys.rows
            // console.log(res)
            $.each(res, function (i, v) {
                // console.log(v.waterData)
                if (v.waterData.length == 1) {
                    var res1 = v.waterData[0]
                    arealist.push({
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
                        arealist.push({
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
            appendarea(arealist);
            appendstation(arealist);
        }, error: function (error) {
            console.log(error);
        }
    });

}
// 右侧站点
function appendstation(data) {
    // console.log(data)
    $.each(data, function (i, v) {
        var dom = '<li><p><span class="circle"></span> ' + v.name +
            '</p><p>' + (v.cur==null?'':v.cur) + '</p><p>' + (v.warn==null?'':v.warn) + '</p><p>' + (v.pro==null?'':v.pro) + '</p></li>'
        $(".four #marquee2").append(dom);
    });
    if ($(".four #marquee2>li").length > 10) {
        // 站点滚动
        scrolldiv();
    }
}