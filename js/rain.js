$(function () {
    appendrain(raindata)
    changeBg()
    setInterval("changeBg()", 3000); //设定定时切换，单位为毫秒这里是3000 毫秒



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
// 获取降雨点


function appendrain(data) {
    // 获取降雨点
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
        var imgurl = '../img/mappic/' + vnum + '.png'

        var img = '<img class="append" style="position:absolute;top:' + v.top + ';left:' + v.left + ';" src="' + imgurl + '">'

        $(".two .leftpart").append(img);
    });

}

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
