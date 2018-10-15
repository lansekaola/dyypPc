$(function(){
    //清除上页的文字搜索内容
    $(".clear-txt-mark").on("click",function(){
        $(this).parent().remove();
        $(".txt-search").attr("placeholder","查找全网商品");
    });
    //点击搜索框区域跳回首页
    $(".txt-search-result").on("click",function(){
        window.open("index.html?r="+new Date().getTime());
    });
    $(".photo-container").on("click",function(){
        window.open("index.html?r="+new Date().getTime());
    });
    $(".txt-search-btn").on("click",function(){
        window.open("index.html?r="+new Date().getTime());
    });
    //回显图片样式
    $(".clear-picture-bg").on("mouseenter",function(){
        $(this).css({"border":"1px solid #da2f25","background":"#FFDCDA"});
        $(this).children("b").css({"color":"#da2f25"});
    });
    $(".clear-picture-bg").on("mouseleave",function(){
        $(this).css({"border":"1px solid #ccc","background":"#fff"});
        $(this).children("b").css({"color":"#ccc"});
    });
    //相机变化
    $(".photo-container").on("mouseenter",function(){
        $(this).children("img").attr("src","img/icon_upload_hover.png");
    });
    $(".photo-container").on("mouseleave",function(){
        $(this).children("img").attr("src","img/icon_upload_default.png");
    });
    //搜索分类的点击事件样式变化，以及请求数据（后续请求）
    $(".resultCategory-container-item").on("click",function(){
        $(this).addClass("active").siblings(".active").removeClass("active");
    });
    //搜索数据
    $(".newHot-product-detaile-list").on("mouseenter",function(){
        $(this).children("p").show();
    });
    $(".newHot-product-detaile-list").on("mouseleave",function(){
        $(this).children("p").hide();
    });

})