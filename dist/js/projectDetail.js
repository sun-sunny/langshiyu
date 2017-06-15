/* ----------------------------------------------------------------
 项目页面脚本
 -----------------------------------------------------------------*/
$(function () {
    fillDetail(getCity_ProjectCode()[0]);
})

function fillDetail(projectid) {
    var urlNow = urlSearch();
    $.ajax({
        type:"get",
        url: urlNow + "/system/rest/projects/getProjectDetailForFront/" + projectid,
        datatype: "json",
        cache: false,
        beforeSend:function(){
        },
        success:function(data){
            console.log(data)
            $("head title").text(data.prjName);
            $("#main").attr("data-id",data.area);
            fillBanner(data.detailImgs)
            fillIntro(data)
            fillAround(data)
            fillConfigure(data)
        }   ,
        complete: function(){
        },
        error: function(data){
            tip("error",data.message,"3000")
        }
    });
}

function fillBanner(_data) {
    var width=$(window).width() + 'px';
    var height=$(window).width()* 1.8/3 + 'px';
    var _banner='<div class="swiper-container  swiper-bg"><div class="swiper-wrapper">';
    for(var i=0;i<_data.length;i++){
        _banner+='<div class="swiper-slide">'
               +'<img style="width:'+width+';height:'+height+';"src="'+ _data[i].fullPath +'" alt="" />'
               +'</div>'
    }
    if(_data.length>1){
        _banner+='</div><div class="swiper-button-prev swiper-button-white"></div><div class="swiper-button-next swiper-button-white"></div></div>'
    }else{
        _banner+='</div></div>'
    }
    $("#main>.banner").append(_banner);
    // $(".swiper-bg .swiper-wrapper").css("height",$(".banner").width()*1/2)
    // $("#banner .swiper-slide > img").css("height",$(window).width()* 1.8/3 + 'px');
    // $("#banner .swiper-slide > img").css("width",$(window).width() + 'px');

    new Swiper('#main>.banner .swiper-container', {
        loop:true,//循环模式
        autoplay: 3000,//可选选项，自动滑动
        effect : 'fade',//切换效果
        preloadImages:false,//默认为true，Swiper会强制加载所有图片。
        lazyLoading : true,//懒加载
        prevButton:'.banner .swiper-button-prev',
        nextButton:'.banner .swiper-button-next',
    })
}
function sleep(numberMillis) {  
    var now = new Date();  
    var exitTime = now.getTime() + numberMillis;  
    while (true) {  
        now = new Date();  
        if (now.getTime() > exitTime)  
            return;  
    }  
}
function fillIntro(_data) {
    var _intro = '';
    _intro+='<div class="mes mb25"><h3 lass="fl">&yen '+( (parseInt(_data.price) === 0 ) ? " 待更新" : _data.price )+'</h3></div>'
    _intro+='<h2 class="mb20">'+_data.prjName+'</h2>';
    _intro+='<p class="mb20"><i class="iconfont icon-location"></i><span>'+_data.addressLine1+'</span></p>';
    _intro+='<p class="mb20">社区简介：</p>';
    _intro+='<article>'+_data.desc+'</article><span class="longline mb40"></span>';
    $("#main>.intro").append(_intro);
}

function fillAround(_data) {
    var _around = '<div class="map" id="allmap"></div>';
    _around += '<h3><i class="iconfont icon-business larger"></i><span>商业配套</span></h3><span class="shortline"></span><article>'+_data.commercialFacility+'</article>';
    _around += '<h3><i class="iconfont icon-traffic larger"></i><span>交通出行</span></h3><span class="shortline"></span><article title="">'
    if ( _data.trafficBus !== null ) {
        _around += '<p><b>地铁：</b>'+ _data.trafficSubway + '</p>'
    }
    if ( _data.trafficSubway !== null ) {
         _around +='<p><b>公交：</b>'+ _data.trafficBus + '</p>'
    }
    _around +='</article>';
    _around += '<span class="longline"></span>';
    $("#main>.around").append(_around)
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(_data.addressLine1, function(point){
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
            map.enableScrollWheelZoom(true);
            map.disableDragging();     //禁止拖拽
        }else{
            alert("您选择地址没有解析到结果!");
        }
    }, "");
}

function fillConfigure(_data) {
    var width=$(window).width() + 'px';
    var height=$(window).width()* 1/2 + 'px';
    if(_data.roomTypeList.length=="1"){
        var _roomconf = '<h3 class="mb25">居住空间</h3>';
    }else{
        var _roomconf = '<h3 class="mb25">居住空间 <span class="fr"><i class="iconfont icon-pageleft prev unable"></i><i class="iconfont icon-pageright next"></i></span></h3>';
    }
    for(var i=0;i<_data.roomTypeList.length;i++){
        _roomconf+='<section class=" mb40" id="type'+i+'">';
        _roomconf+='<div class="swiper-container"><div class="swiper-wrapper">';
        for(var j=0;j<_data.roomTypeList[i].imgs.length;j++){
            _roomconf+='<div class="swiper-slide" style="background: white"><img style="width:'+width+';height:'+height+';"src="'+_data.roomTypeList[i].imgs[j].fullPath+'" alt=""/></div>'
        }
        if(_data.roomTypeList[i].imgs.length>1){
            _roomconf+='</div><div class="swiper-button-prev swiper-button-white"></div><div class="swiper-button-next swiper-button-white"></div>'
        }
        _roomconf+='</div><p class="mb25">房间户型：</p><h3>'+_data.roomTypeList[i].title+'</h3><p class="mb25" style="color:#c58d5d">¥ '
                  +(( parseInt(_data.roomTypeList[i].roomType.price) === 0 ) ? " 待更新 " : _data.roomTypeList[i].roomType.price )
                  +'</p><p class="mb25">房间设施：</p><ul class="icons">';
        for(var j=0;j<_data.roomTypeList[i].facilities.length;j++){
            if (_data.roomTypeList[i].facilities[j] !== null) {
                if(j>3){
                    _roomconf+='<li class="hidden" data-id="'+_data.roomTypeList[i].facilities[j].keyName+'"><div class="imgbox"><img src="'+_data.roomTypeList[i].facilities[j].value+'" alt=""></div><span class="name">'+_data.roomTypeList[i].facilities[j].description+'</span></li>'
                }else{
                    _roomconf+='<li data-id="'+_data.roomTypeList[i].facilities[j].keyName+'"><div class="imgbox"><img src="'+_data.roomTypeList[i].facilities[j].value+'" alt=""></div><span class="name">'+_data.roomTypeList[i].facilities[j].description+'</span></li>'
                }
            }
        }
        if(_data.roomTypeList[i].facilities.length>4){
            _roomconf+='<p class="formore">查看更多</p>';
        }
        _roomconf+='<span class="clear"></span></ul>';
        _roomconf+='</section>';
    }

    // $("#roomconfigure .swiper-slide > img").css("height",$(window).width()* 1/2 + 'px');
    // $("#roomconfigure .swiper-slide > img").css("width",$(window).width() + 'px');
    _roomconf+='<span class="longline"></span>';
    $("#main>.roomconfigure").append(_roomconf)
    $(".roomconfigure section").each(function () {
        new Swiper('#'+$(this).attr("id")+' .swiper-container', {
            loop:true,//循环模式
            effect : 'fade',//切换效果
            preloadImages:true,//默认为true，Swiper会强制加载所有图片。
            lazyLoading : false,//懒加载
            prevButton:'#'+$(this).attr("id")+' .swiper-button-prev',
            nextButton:'#'+$(this).attr("id")+' .swiper-button-next',
        });    
        if($(this).index()!==1){
            $(this).addClass("hidden")
        }
        sleep(300);
    }) 

    var _publicconf='<h3 class="mb25">公区配置</h3>';
    _publicconf+='<div class="swiper-container"><div class="swiper-wrapper">';
    for(var i=0;i<_data.publicImgs.length;i++){
        _publicconf+='<div class="swiper-slide" style="background: white"><img src="'+_data.publicImgs[i].fullPath+'" alt=""/></div>'
    }
    _publicconf+='</div><i class="iconfont icon-fullscreen fullscreen"></i>'
    if(_data.publicImgs.length>1){
        _publicconf+='<div class="swiper-button-prev swiper-button-white"></div><div class="swiper-button-next swiper-button-white"></div>'
    }
    _publicconf+='</div><p class="mb25">公区设施：</p><ul class="icons">';
    for(var j=0;j<_data.facilities.length;j++){
        if (_data.facilities[j] !== null) {
            if(j>3){
                _publicconf+='<li class="hidden" data-id="'+_data.facilities[j].keyName+'"><div class="imgbox"><img src="'+_data.facilities[j].value+'" alt=""></div><span class="name">'+_data.facilities[j].description+'</span></li>'
            }else{
                _publicconf+='<li data-id="'+ _data.facilities[j].keyName +'"><div class="imgbox"><img src="'+_data.facilities[j].value+'" alt=""></div><span class="name">'+_data.facilities[j].description+'</span></li>'
            }
        }
    }
    if(_data.facilities.length>4){
        _publicconf+='<p class="formore">查看更多</p>';
    }
    _publicconf+='<span class="clear"></span></ul>';
    
    $("#main>.publicconfigure").append(_publicconf);

    $("#publicconfigure .swiper-slide > img").css("height",$(window).width()* 1/2 + 'px');
    $("#publicconfigure .swiper-slide > img").css("width",$(window).width() + 'px');

    new Swiper('.publicconfigure .swiper-container', {
        loop:true,//循环模式
        autoplay: 3000,//可选选项，自动滑动
        effect : 'fade',//切换效果
        preloadImages:false,//默认为true，Swiper会强制加载所有图片。
        lazyLoading : true,//懒加载
        prevButton:'.publicconfigure .swiper-button-prev',
        nextButton:'.publicconfigure .swiper-button-next',
    })
}

//左右切换房屋类型
$(document).on('tap','.roomconfigure .iconfont',function () {
    var _index;
    if($(this).hasClass("unable")){
        return false;
    }
    if($(this).hasClass("prev")){
       _index=$(".roomconfigure section:not(.hidden)").index()-1;
       if(_index>=1){
           $(".roomconfigure section").eq(_index-1).removeClass("hidden").siblings("section").addClass("hidden")
       }
    }else if($(this).hasClass("next")){
        _index=$(".roomconfigure section:not(.hidden)").index()+1;
        if(_index<=$(".roomconfigure section").length){
            $(".roomconfigure .next").removeClass("unable")
            $(".roomconfigure section").eq(_index*1-1).removeClass("hidden").siblings("section").addClass("hidden")
        }
    }
    if(_index==1){
        $(".roomconfigure .prev").addClass("unable")
    }else{
        $(".roomconfigure .prev").removeClass("unable")
    }
    if(_index==$(".roomconfigure section").length){
        $(".roomconfigure .next").addClass("unable")
    }else{
        $(".roomconfigure .next").removeClass("unable")
    }
    new Swiper($(".roomconfigure .box:visible").attr("id")+' .swiper-container', {
        loop:true,//循环模式
        autoplay: 3000,//可选选项，自动滑动
        effect : 'fade',//切换效果
        preloadImages:false,//默认为true，Swiper会强制加载所有图片。
        lazyLoading : true,//懒加载
        prevButton:$(".roomconfigure .box:visible").attr("id")+' .swiper-button-prev',
        nextButton:$(".roomconfigure .box:visible").attr("id")+' .swiper-button-next',
    })
})

//查看更多的icons
$(document).on('click','.icons .formore',function () {
    $(this).siblings(".hidden").removeClass("hidden")
    $(this).remove()
})

/*//全屏查看图片
$(document).on('click','.fullscreen',function () {
   var _src = $(this).parents(".swiper-container").find(".swiper-slide-active img").attr("src");
    tip("fullscreen",_src,"tip-aways")
})*/

//nav相关
$('nav ul li').click(function(e){
    e.preventDefault();
    var index = ($('nav ul li')).index($(this));
    var goTo = $('.section').eq(index).offset().top;
    $("html, body").animate({
        scrollTop: goTo
    }, 500);
});

//鼠标滚动切换
$(window).scroll(function () {
    if ($(document).scrollTop()>$("#main>.banner").outerHeight()){
        var _height = ($("header").length+$(".fix-top").length)*50
        $("nav").css({
            "position":"fixed",
            "top":_height,
            "width":"100%"
        });
        
        var arr = [];
        $('.section').each(function(i){
            arr.push($('.section').eq(i).offset().top-300);
        });
        for(var i = 0;i<arr.length;i++){
            if($(document).scrollTop() > arr[i]){
                $('nav ul li').removeClass('cur').eq(i).addClass('cur');
            }
        }
    }else{
        $("nav").css({
            "position":"static",
            "top":"",
            "width":""
        });
    }
})

/*立即预定*/
$(document).on('click','.btn.booking',function () {
    window.location.href="book.html?id="+ getCity_ProjectCode()[1] + '_' + getCity_ProjectCode()[0];
    return false;
})