$(function () {
    appendarea(areadata)
    $(".four .leftpart").css("background-image", "url(../img/mappic/通启西片水系.png)");

    // 站点滚动
    scrolldiv();

})



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
    timename2 = setInterval("doScroll2()", 50);
}


function doScroll2() {
    if (offset2 == scrollheight2) {
        offset2 = 0;
    }
    marquee2.style.marginTop = "-" + offset2 + "px";
    offset2 += 1;
}


// 获取片区境界点
var areadata = [{
    type: 'green',
    left: '47%',
    top: '52%'
}, {
    type: 'red',
    left: '50%',
    top: '45%'
}]
function appendarea(data) {

    $.each(data, function (i, v) {
        var imgurl = '../img/mappic/' + (v.type == 'red' ? '超警戒' : '低保证') + '.png'

        var img = '<img class="append" style="position:absolute;top:' + v.top + ';left:' + v.left + ';" src="' + imgurl + '">'

        $(".four .leftpart").append(img);
    });

}
