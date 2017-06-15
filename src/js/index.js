/* ----------------------------------------------------------------
 首页
 -----------------------------------------------------------------*/

$(function () {
    fillBanner();
})

function fillBanner() {
    var localtionUrl = urlSearch();
    var url = localtionUrl + "/system/rest/activity/getAcctivityForFlag";
    var requestData={"flag":"INFO1"};
    $.ajax({
         type: "POST",
        contentType:"application/json",
        url:url,
        datatype: "json",
        data:JSON.stringify(requestData),
        beforeSend:function(xhr){
            
        },
        success:function(data){
            data.content=data.projects;
            for(var i=0;i<data.content.length;i++){
               var _banner='<div class="swiper-container swiper-bg"><div class="swiper-wrapper">';
               for(var i=0;i<data.content.length;i++){
                   _banner+='<div class="swiper-slide" data-url="'+data.content[i].url+'" data-id="'+data.content[i].userId+'"  style="background-image: url('+data.content[i].imgs[0].fullPath+')">';
                   _banner+='<img src="../img/index_banner_mask.png" class="bannermask"/>';
                   _banner+='<div class="box container"><h3>'+data.content[i].title+'</h3><span class="shortline"></span><article>'+data.content[i].description+'</article>';
                   _banner+='</div></div>';
               }
                _banner+='</div><div class="swiper-pagination"></div></div>';
                $(".bannerbox").append(_banner);
                $(".swiper-slide").css({
                    "width":"100%",
                    "height":document.documentElement.clientHeight-$("header").outerHeight()
                })
                var mySwiper= new Swiper('.swiper-container', {
                    loop:true,//循环模式
                    autoplay: 5000,//可选选项，自动滑动
                    effect : 'fade',//切换效果
                    preloadImages:false,//默认为true，Swiper会强制加载所有图片。
                    lazyLoading : true,//懒加载
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    onAfterResize: function(swiper){
                        console.log(1)
                            swiper.init();
                    }
                })
            }
        }   ,
        complete: function(){
        },
        error: function(data){
            tip("error",data.message,"3000")
        }
    });
}

$(document).on('click','.bannerbox .swiper-slide',function () {
    if($(this).data("url") !== "" &&  $(this).data("url") !== "undefined"){
        window.location.href=$(this).data("url")
    }
    //加载页面时执行一次
    changeMargin();
    //监听浏览器宽度的改变
    window.onresize = function(){
        changeMargin();
    };
    function changeMargin(){
        var docWidth = document.body.clientWidth;
        if(docWidth <1100){
            if($(this).data("url") !== "" && $(this).data("url") !== undefined){
                window.location.href=$(this).data("url")
            }
        }
    }
})

