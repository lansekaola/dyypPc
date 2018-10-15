$(function(){
    //清除上页的文字搜索内容
    $(".clear-txt-mark").on("click",function(){
        $(this).parent().remove();
        $(".txt-search").attr("placeholder","查找全网商品");
    });
    //相机变化
    $(".photo-container").on("mouseenter",function(){
        $(this).children("img").attr("src","img/icon_upload_hover.png");
    });
    $(".photo-container").on("mouseleave",function(){
        $(this).children("img").attr("src","img/icon_upload_default.png");
    });

    //点击”大鱼搜索“请求数据
    var val;
    $(".txt-search-btn").on("click",function(){
         val=$(".txt-search").val();
        if(val!=""){//调用获取数据接口
            $(".newHot-product-detaile").empty();
            pageId=1;
            groupSearchText();
        }else{
            alert("请您填写搜索词")
        }
    });
   // 初始进入的搜索词
   val=GetQueryString("val");
    $(".clear-txt-bg").show();
    $(".clear-txt").html(val);

    var bool = true;
    var QC = true;
    var pageId = 1;
    var type=0;
    var sortId=0;
    var timer = null;
    var pageTotal;
    spinnerShow();
    function groupSearchText() {
        bool = false;
        $.ajax({
            type: "post",
            url:"http://api.deepbaytech.com/mobile/api/v1.0.0/group-search-text?text="+val+"&type="+type+"&pageId="+pageId+"&sortId="+sortId,
            async: true,
            success: function(result) {
                console.log(result);
                if(result.state == 0 ){
                    //商品展示
                    var items=result.data.items;
                    var html=``;
                    for(var i=0;i<items.length;i++){
                        html+=`<div class="col-md-3">
                <div class="newHot-product-detaile-list">
                    <!--商品图片-->
                    <div class="row">
                        <div class="col-md-12">
                            <img src="${items[i].coverImage}" alt="" class="img-responsive newHot-product-detaile-list-img" />
                        </div>
                    </div>
                    <!--商品名称-->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="newHot-product-detaile-list-name">
                                ${items[i].title}
                            </div>
                        </div>
                    </div>
                    <!--原价 券标志-->
                    <div class="row">
                        <!--原价-->
                        <div class="col-md-7">`;
                        if(items[i].displayType==4){//普通商品不显示原价
                            html+=`<div class="newHot-product-detaile-list-price">
                                <span class="newHot-product-detaile-list-price-txt"><s></s></span>
                            </div>`
                        }else{
                            html+=`<div class="newHot-product-detaile-list-price">
                                <span class="newHot-product-detaile-list-price-txt">原价<s>￥${items[i].price}</s></span>
                            </div>`
                        }

                        html+=`</div>`;
                        //1. 优惠券 2. 打折 3. 返利  4. 普通
                        <!--券标志-->
                        if(items[i].displayType==1){
                            html+=`<div class="col-md-5">
                            <!--券显示-->
                            <div class="newHot-product-detaile-list-tag">
                                <img src="img/icon_ticket.png" class="img-responsive" alt="" style="width:100%;" />
                                <span class="newHot-product-detaile-list-tag-txt">券&nbsp;${items[i].displayContent}</span>
                            </div>
                        </div>
                            </div>
                            <!--券后价 购买按钮-->
                            <div class="row newHot-product-detaile-list-nowPrice-container">
                                <div class="col-md-7">
                                    <div class="newHot-product-detaile-list-nowPrice">
                                        <span class="newHot-product-detaile-list-nowPrice-txt">券后<b class="newHot-product-detaile-list-nowPrice-money">￥${items[i].nowPrice}</b></span>
                                    </div>
                                </div>` ;
                        }else if(items[i].displayType==2){
                            html+=`<div class="col-md-5">
                            <!--折-->
                             <div class="newHot-product-detaile-list-tag newHot-product-detaile-list-tag-fan newHot-product-detaile-list-tag-zhe">
                                ${items[i].displayContent}&nbsp;折
                            </div>
                        </div>
                            </div>
                            <!--券后价 购买按钮-->
                            <div class="row newHot-product-detaile-list-nowPrice-container">
                                <div class="col-md-7">
                                    <div class="newHot-product-detaile-list-nowPrice">
                                        <span class="newHot-product-detaile-list-nowPrice-txt">折后<b class="newHot-product-detaile-list-nowPrice-money">￥${items[i].nowPrice}</b></span>
                                    </div>
                                </div>` ;
                        }else if(items[i].displayType==3){
                            html+=`<div class="col-md-5">
                            <!--返显示-->
                            <div class="newHot-product-detaile-list-tag newHot-product-detaile-list-tag-fan">
                                返&nbsp;${items[i].displayContent}
                            </div>
                        </div>
                    </div>
                    <!--券后价 购买按钮-->
                    <div class="row newHot-product-detaile-list-nowPrice-container">
                        <div class="col-md-7">
                            <div class="newHot-product-detaile-list-nowPrice">
                                <span class="newHot-product-detaile-list-nowPrice-txt">返后<b class="newHot-product-detaile-list-nowPrice-money">￥${items[i].nowPrice}</b></span>
                            </div>
                        </div>` ;
                        }else if(items[i].displayType==4){
                            html+=`<div class="col-md-5">                        
                             <div class="newHot-product-detaile-list-tag newHot-product-detaile-list-tag-fan" style="background:#fff;">
                        </div>
                    </div>
                    <!--券后价 购买按钮-->
                    <div class="row newHot-product-detaile-list-nowPrice-container">
                        <div class="col-md-7">
                            <div class="newHot-product-detaile-list-nowPrice">
                                <span class="newHot-product-detaile-list-nowPrice-txt">现价<b class="newHot-product-detaile-list-nowPrice-money">￥${items[i].nowPrice}</b></span>
                            </div>
                        </div>` ;
                        }
                        html+=`<div class="col-md-5">
                            <div class="newHot-product-detaile-list-buy">
                                购买
                            </div>
                        </div>
                    </div>
                    <!--佣金-->
                    <div class="row">`;
                        if(items[i].commission!=undefined){
                            html+=`<div class="col-md-5" style="padding-right:0">
                            <div class="product-commission">
                                <span class="product-commission-txt">佣金</span>
                                <b class="product-commission-money">￥${items[i].commission}</b>
                            </div>
                        </div>`;
                        }else{
                            html+=`<div class="col-md-5" style="padding-right:0">
                        </div>`;
                        }
                        html+=`<div class="col-md-7" style="padding: 0">
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
                    $(".newHot-product-detaile").append(html);
                    //搜索数据
                    $(".newHot-product-detaile-list").on("mouseenter",function(){
                        $(this).children("p").show();
                    });
                    $(".newHot-product-detaile-list").on("mouseleave",function(){
                        $(this).children("p").hide();
                    });

                    //	加页
                    pageTotal=result.data.pageTotal;
                    pageId = result.data.pageId;
                    pageId++;
                }else{

                }
            },
            complete: function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    bool = true;
                }, 200);
            },
        });
    }


    //搜索分类的点击事件样式变化，以及请求数据（后续请求）
    $(".resultCategory-item").on("click",function(){
        $(this).addClass("active").parent().siblings().children(".active").removeClass("active");
        type=$(this).attr("data-type");
        // alert(type);
        if(type==0){
            $(".newHot-product-detaile").empty();
            pageId=1;
            QC=true;
            groupSearchText();
        }else if(type==1){
            $(".newHot-product-detaile").empty();
            pageId=1;
            QC=true;
            groupSearchText();
        }else if(type==2){
            $(".newHot-product-detaile").empty();
            pageId=1;
            QC=true;
            groupSearchText();
        }
    });

    function start() {
        groupSearchText();
        $(window).on('scroll', function() {
            var maxHeight = Math.ceil($(window).scrollTop()+10);
            if(maxHeight >= $(document).height() - $(window).height()) {
                if(bool==true){
                    if(pageTotal>=pageId) {
                        groupSearchText();
                        console.log(new Date());
                    }else{
                        spinnerHide();
                        if(QC == true){
                            var str=` <div class="col-md-3">
                                            <div class="newHot-product-detaile-list" style="box-shadow: 0 0 8px 0 rgba(0,0,0,0.08);padding-bottom:17px;">
                                                <img src="img/productShowQC.png" alt="" class="img-responsive"/>
                                            </div>
                                        </div>`;
                            console.log(str);
                            $(".newHot-product-detaile").append(str);
                            QC = false;
                        }
                    }
                }
            }

        })
    }
    start();







})