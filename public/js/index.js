$(function(){
    //标题头替换颜色
    $(".nav-title a").on("click",function(){
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
        html+=` <div class="col-md-3">
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
        $(this).children("p").slideDown();
    });
    $(".newHot-product-detaile-list").on("mouseleave",function(){
        $(this).children("p").slideUp();
    });
})