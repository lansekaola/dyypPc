$(function(){
    //标题头替换颜色
    console.log($("#mynavbars a"))
    $("#mynavbars a").on("click",function(){
        console.log($(this).parent().siblings().children())
        $(this).addClass("click").parent().siblings().children(".click").removeClass("click");
    });
   // ios,android  hover变化
    $(".iosDownload").on("mouseenter",function(){
        $(this).attr("src","img/iOS_hover.png");
    });
    $(".iosDownload").on("mouseleave",function(){
        $(this).attr("src","img/iOS.png");
    });
    $(".androidDownload").on("mouseenter",function(){
        $(this).attr("src","img/Android_hover.png");
    });
    $(".androidDownload").on("mouseleave",function(){
        $(this).attr("src","img/Android.png");
    });
   //  ios,android 点击下载
    $(".iosDownload").on("click",function(){
        //打开新页面
        window.open("https://itunes.apple.com/cn/app/id1296698742?mt=8");
    });
    $(".androidDownload").on("click",function(){
        //打开新页面
        window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.deepbaytech.tao");
    });
    //相机变化
    $(".photo-container").on("mouseenter",function(){
        $(this).children("img").attr("src","img/icon_upload_hover.png");
    });
    $(".photo-container").on("mouseleave",function(){
        $(this).children("img").attr("src","img/icon_upload_default.png");
    });
    //  最新推荐数据
    var html=``;
    for(var i=0;i<productList.length;i++){
        // console.log(productList[i])
        html+=` <div class="col-md-3 col-xs-12 col-sm-12">
                <div class="newHot-product-detaile-list">
                    <!--商品图片-->
                    <div class="row">
                        <div class="col-md-12">
                            <img src="${productList[i].coverImage}" alt="" class="img-responsive newHot-product-detaile-list-img" />
                        </div>
                    </div>
                    <!--商品名称-->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="newHot-product-detaile-list-name">
                                ${productList[i].title}
                            </div>
                        </div>
                    </div>
                    <!--原价 券标志-->
                    <div class="row">
                        <!--原价-->
                        <div class="col-md-7">
                            <div class="newHot-product-detaile-list-price">
                                <span class="newHot-product-detaile-list-price-txt">原价<s>￥${productList[i].price}</s></span>
                            </div>
                        </div>
                        <!--券标志-->
                        <div class="col-md-5">`
                            //判断什么商品displayType  1 优惠券  2 折扣   3 返利  4 普通商品   注：这里没有2：折
                            if(productList[i].displayType==1){
                                <!--券显示-->
                                html+=`<div class="newHot-product-detaile-list-tag">
                                            <img src="img/icon_ticket.png" class="img-responsive" alt="">
                                            <span class="newHot-product-detaile-list-tag-txt">券 ${productList[i].displayContent}</span>
                                       </div>`

                            }else if(productList[i].displayType==3){
                                <!--返显示-->
                                html+=` <div class="newHot-product-detaile-list-tag newHot-product-detaile-list-tag-fan">
                                    返 ${productList[i].displayContent}
                                </div>`
                            }else if(productList[i].displayType==4){//普通
                                html+=` <div class="newHot-product-detaile-list-tag newHot-product-detaile-list-tag-fan" style="background:transparent">
                                </div>`
                            }
                       html+=`</div>
                    </div>
                    <!--券后价 购买按钮-->
                    <div class="row newHot-product-detaile-list-nowPrice-container">
                        <div class="col-md-7">
                            <div class="newHot-product-detaile-list-nowPrice">`;
                            if(productList[i].displayType==4){
                                html+=`<span class="newHot-product-detaile-list-nowPrice-txt">现价<b class="newHot-product-detaile-list-nowPrice-money">￥${productList[i].nowPrice}</b></span>` ;
                            }else{
                                html+=`<span class="newHot-product-detaile-list-nowPrice-txt">券后<b class="newHot-product-detaile-list-nowPrice-money">￥${productList[i].nowPrice}</b></span>` ;
                            }
                            html+=`</div>
                        </div>
                        <div class="col-md-5">
                            <div class="newHot-product-detaile-list-buy">
                                购买
                            </div>
                        </div>
                    </div>
                    <!--佣金-->
                    <div class="row">
                        <div class="col-md-5" style="padding-right:0">`;
                            //判断有没有佣金，没有就不显示
                            if(productList[i].commission!=undefined){
                                html+=`<div class="product-commission">
                                <span class="product-commission-txt">佣金</span>
                                <b class="product-commission-money">${productList[i].commission}</b>
                            </div>`
                            }
                        html+=`</div>
                        <div class="col-md-7" style="padding: 0">
                            <img src="img/icon_share.png" class="img-responsive product-commission-share" alt="">
                        </div>
                    </div>
                    <!--hover时的二维码-->
                    <p class="QC-model">
                        <img src="img/downloadAPPQc.png" class="img-responsive" alt="">
                    </p>
                </div>
            </div>`
    }
    $(".newHot-product-detaile").html(html);
    $(".newHot-product-detaile-list").on("mouseenter",function(){
        $(this).children("p").show();
    });
    $(".newHot-product-detaile-list").on("mouseleave",function(){
        $(this).children("p").hide();
    });
   //功能介绍
    $(".coupon-redemption-rebate").on("mouseenter",function(){
        $(this).css("background","#DA2F25");
        $(this).children("div").css({"border-bottom":"1px solid #fff"});
        $(this).children().children("span").css({"color":"#fff"});
        $(this).children("p").css({"color":"#fff"});
    });
    $(".coupon-redemption-rebate").on("mouseleave",function(){
        $(this).css("background","#fff");
        $(this).children("div").css({"border-bottom":"1px solid #ccc"});
        $(this).children().children("span").css({"color":"#333"});
        $(this).children("p").css({"color":"#666"});
    });
    //四个区块图片变化的函数
    function mouseenter(obj,img,ele,imgURL){
        obj.children().children("img").attr("src",img);
        ele.attr("src",imgURL);
    }
    function mouseleave(obj,img,ele,imgURL){
        obj.children().children("img").attr("src",img);
        ele.attr("src",imgURL);
    }
    //领券返利
    $(".coupon-redemption-rebate-coupon").on("mouseenter",function(){
        mouseenter($(this),"img/icon_ticket_hover.png",$(".APP-ticket"),"img/APP_ticket__hover_UI.png");
    });
    // $(".coupon-redemption-rebate-coupon").on("mouseleave",function(){
    //     mouseleave($(this),"img/icon_ticket_default.png",$(".APP-ticket"),"img/APP_ticket__hover_UI.png")
    // });
    //图片搜索
    $(".coupon-redemption-rebate-search").on("mouseenter",function(){
        mouseenter($(this),"img/icon_ticket_hover copy.png",$(".APP-ticket"),"img/APP_search__hover_UI.png");
    });
    // $(".coupon-redemption-rebate-search").on("mouseleave",function(){
    //     mouseleave($(this),"img/icon_search_default.png",$(".APP-ticket"),"img/APP_ticket__hover_UI.png")
    // });
    //社区
    $(".coupon-redemption-rebate-community").on("mouseenter",function(){
        mouseenter($(this),"img/icon_community_hover.png",$(".APP-ticket"),"img/APP_community__hover_UI.png");
    });
    // $(".coupon-redemption-rebate-community").on("mouseleave",function(){
    //     mouseleave($(this),"img/icon_community_default.png",$(".APP-ticket"),"img/APP_ticket__hover_UI.png")
    // });
    // 一份美好事业图片
    $(".coupon-redemption-rebate-career").on("mouseenter",function(){
        mouseenter($(this),"img/icon_career_hover.png",$(".APP-ticket"),"img/APP_career_hover_UI .png");
    });
    // $(".coupon-redemption-rebate-career").on("mouseleave",function(){
    //     mouseleave($(this),"img/icon_career_default.png",$(".APP-ticket"),"img/APP_ticket__hover_UI.png")
    // });
   // 申请开店鼠标移过变化
    $(".apply-open-shop-process").on("mouseenter",function(){
        $(this).css({"background":"#da2f25"});
        $(this).children().children("span").css({"border":"1px solid #fff","color":"#fff"});
        $(this).children("div").css({"border-bottom":"1px solid #fff"});
        $(this).children("p").css({"color":"#fff"});
        $(this).parent().next().children("div").children("img").attr("src","img/icon_arrow_hover.png");
    });
    $(".apply-open-shop-process").on("mouseleave",function(){
        $(this).css({"background":"#fff"});
        $(this).children().children("span").css({"border":"1px solid #333","color":"#333"});
        $(this).children("div").css({"border-bottom":"1px solid #ccc"});
        $(this).children("p").css({"color":"#666"});
        $(this).parent().next().children("img").attr("src","img/icon_arrow_default.png");
        $(this).parent().next().children("div").children("img").attr("src","img/icon_arrow_default.png");
    });

   //开店礼包商品
    var str=``;
    for(var j=0;j<newProductList.length;j++){
        <!--列表1-->
        str+=`
            <div class="col-md-3">
                <div class="openShop-gift-product-list" data-product="${newProductList[j].productId}">
                    <!--商品名称-->
                    <div class="row">
                        <div class="col-md-12">
                            <img class="img-responsive" src="${newProductList[j].productImage}" alt="">
                        </div>
                    </div>
                    <!--商品名称-->
                    <div class="row">
                        <div class="col-md-12">
                           <div class="openShop-gift-product-name">
                               ${newProductList[j].productName}
                           </div>
                        </div>
                    </div>
                    <!--价格-->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="openShop-gift-product-price">
                                ￥${newProductList[j].price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    }
    $(".gift-product-container").html(str);
   // 开店权益鼠标滑过效果
   $(".user-auto-detaile").on("mouseenter",function(){
       $(this).css({"background":"#da2f25"});
       $(this).children("p").css({"border-bottom":"1px solid #fff","color":"#fff"});
       $(this).children("div").children("p").css({"color":"#fff"});
       $(this).children("div").children("div").css({"color":"#fff"});
   });
    $(".user-auto-detaile").on("mouseleave",function(){
        $(this).css({"background":"#fff"});
        $(this).children("p").css({"border-bottom":"1px solid #ccc","color":"#333"});
        $(this).children("div").children("p").css({"color":"#333"});
        $(this).children("div").children("div").css({"color":"#666"});
    });
    // 文字搜索
   function txtSearch() {
       var val=$(".txt-search").val();
       if(val!=""){
           location.href="textSearch.html?val="+val;
       }else{
           alert("请您填写搜索词")
       }
   }
    $(".txt-search-btn").on("click",function(){
        txtSearch();
    });
    //触发键盘事件
    $(document).keydown(function(event){
        if(event.keyCode == 13) {
            txtSearch();
            return false;//阻止回车之后的页面刷新而使得搜索的事件读不到
        };

    });
    //接收文字搜索和图片搜索页面tab返回的标志跳转到相应页面
    var tag=GetQueryString("tag");
    function scroll(ele) {
        $('html,body').animate({scrollTop:ele.offset().top}, 1000);
    }
    if(tag=="homePage"){
        scroll($('#homePage'));
    }else if(tag=="functionIntroduce"){
        scroll($('#functionIntroduce'));
    }else if(tag=="openShop"){
        scroll($('#openShop'));
    }else if(tag=="companyIntroduce"){
        scroll($('#companyIntroduce'));
    }else if(tag=="contactUs"){
        scroll($('#contactUs'));
    }
})