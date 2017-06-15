/* ----------------------------------------------------------------
 项目页面脚本
 -----------------------------------------------------------------*/
$(function () {
    fillDetail(__url.getParamValue("id"));
})

function fillDetail(seriesid) {
    var requestData={"flag":seriesid};
    // var localtionUrl=__url.locationUrl();
    var urlNow = urlSearch();
    var url= urlNow +'/system/rest/productLine/getProductLineForFlag';
    $.ajax({
        type: "POST",
        contentType:"application/json",
        url:url,
        datatype: "json",
        data:JSON.stringify(requestData),
        cache: false,
        beforeSend:function(){
        },
        success:function(data){
            data.content=data.projects[0]
            $("head title").text(data.content.codedesczh);
            $("#main").attr("data-id",data.content.proType);
            fillBanner(data.content.imgs)
            fillIntro(data.content)     
            var feature1={"name":data.content.expand1Title,"lists":[data.content.expand1Attribute]};
            var feature2={"name":data.content.expand2Title,"lists":[data.content.expand2Attribute]};
            var feature3={"name":data.content.expand3Title,"lists":[data.content.expand3Attribute]};
            var feature4={"name":data.content.expand4Title,"lists":[data.content.expand4Attribute]};
            var feature=[feature1,feature2,feature3,feature4];
            data.content.feature=feature
            fillFeature(data.content.feature)
        }   ,
        complete: function(){
        },
        error: function(data){
            tip("error",data.message)
        }
    });
}
function fillBanner(_data) {
    var _banner = '<div class="swiper-container swiper-bg"><div class="swiper-wrapper">';
    for (var i = 0; i < _data.length; i++) {
        _banner += '<div class="swiper-slide" style="background-image:url('+_data[i].fullPath+')"></div>'
    }
    if(_data.length>1){
        _banner += '</div><div class="swiper-button-prev swiper-button-white"></div><div class="swiper-button-next swiper-button-white"></div></div>'
    }else{
        _banner+='</div></div>'
    }
    $("#main>.banner").append(_banner);
    $(".swiper-bg .swiper-wrapper").css("height",$(".banner").width()*1/2)
    new Swiper('#main>.banner .swiper-container', {
        loop: true,//循环模式
        autoplay: 3000,//可选选项，自动滑动
        effect: 'fade',//切换效果
        preloadImages: false,//默认为true，Swiper会强制加载所有图片。
        lazyLoading: true,//懒加载
        prevButton: '#main>.banner .swiper-button-prev',
        nextButton: '#main>.banner .swiper-button-next',
    })
}

function fillIntro(_data) {
    var _intro = '';
    _intro+='<h2 class="mb20">'+_data.codedesczh+'</h2>';
    _intro+='<span class="shortline"></span>';
    _intro+='<article class="mb20">'+_data.description+'</article>';
    $("#main>.intro").append(_intro);
}
function fillFeature(_data) {
    var _icons='';
    var _tit='';
    for(var i=0;i<_data.length;i++){
        if(i==0){
            _icons+='<section data-id="'+_data[i].name+'"><ul class="icons">';
            _tit+='<li class="flex-2 cur" data-href="server" style="font-size:0.5em;">'+_data[i].name+'</li>';
        }else{
            _icons+='<section class="hidden" data-id="'+_data[i].name+'"><ul class="icons">';
             _tit+='<li class="flex-2" data-href="server" style="font-size:0.5em;">'+_data[i].name+'</li>'
        }
        for(var j=0;j<_data[i].lists[0].length;j++){
            _icons+='<li><div class="imgbox"><img src="'+_data[i].lists[0][j].path+'" alt=""></div><span class="name">'+_data[i].lists[0][j].name+'</span></li>'
        }
        _icons+='<span class="clear"></span></ul></section>';
    }
    $("#main>.container ul").html(_tit);
    $("#main>.feature").append(_icons);

}

//nav相关
$(document).on('click','nav li',function () {
    $(this).addClass("cur").siblings().removeClass("cur")
    var _index = $(this).index()*1;
    $(".feature section").eq(_index).removeClass("hidden").siblings("section").addClass("hidden")
})
