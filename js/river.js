$(function () {
    appendriver(riverdata)
    changeBg()
    setInterval("changeBg()", 3000); //设定定时切换，单位为毫秒这里是3000 毫秒

   
    // 站点滚动
    scrolldiv();

})

// 获取警戒点
var riverdata = [{
    type: 'green',
    left: '40%',
    top: '50%'
}, {
    type: 'red',
    left: '50%',
    top: '40%'
}]
function appendriver(data) {

    $.each(data, function (i, v) {
        var imgurl = '../img/mappic/' + (v.type == 'red' ? '超警戒' : '低保证') + '.png'

        var img = '<img class="append" style="position:absolute;top:' + v.top + ';left:' + v.left + ';" src="' + imgurl + '">'

        $(".three .leftpart").append(img);
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
    timename1 = setInterval("doScroll1()", 50);
}


function doScroll1() {
    if (offset1 == scrollheight1) {
        offset1 = 0;
    }
    marquee1.style.marginTop = "-" + offset1 + "px";
    offset1 += 1;
}
