/*获取URL参数方法*/
function GetQueryString(name) {
    /*定义正则，用于获取相应参数*/
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    /*字符串截取，获取匹配参数值*/
    var r = window.location.search.substr(1).match(reg);
    /*但会参数值*/
    if(r != null) return decodeURI(r[2]);
    return null;
}
//  加载中显示动画
function spinnerShow(){
    Spinner({ color: '#cacaca',length:9,lines:15,radius:17,width:4}).spin(document.getElementById('targetr'));
}
//隐藏加载项
function spinnerHide(){
    $(".wenzi").html("已经到底了！！！");
    $("#targetr").hide();
    setTimeout(function () {
        $(".donghua").slideUp()
    },500)
}