/* ----------------------------------------------------------------
 社区
 -----------------------------------------------------------------*/
$(function () {
    fillCommunity();
})

function fillCommunity() {
    var urlNow = urlSearch();
    var requestData={"flag":"INFO2,INFO3,INFO4"};

    var url= urlNow + '/system/rest/activity/getAcctivityForFlag';
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
            data.content=data.projects;
            var _top='<img src="'+data.content[0].imgs[0].fullPath+'" alt="" class="mb20"><div class="container box"><h2>'+data.content[0].title
                    +'</h2><span class="shortline"></span><article>'+data.content[0].description+'</article><span class="longline"></span></div>';
            $("#toutu").html(_top);
            for(var i=1;i<data.content.length;i++){
                var _lists='<li class="box mb30"  id="community'+i+'" data-id="'+data.content[i].id+'"><h3 class="mb25">'+data.content[i].codedesczh+'</h3>';
                if(data.content[i].imgs.length>0){
                    _lists+='<div class="swiper-container"><div class="swiper-wrapper">';
                    for(var j=0;j<data.content[i].imgs.length;j++){
                        _lists+='<div class="swiper-slide"><img src="'+data.content[i].imgs[j].fullPath+'" alt=""></div>'
                    }
                    if(data.content[i].imgs.length>1){
                        _lists+='</div><div class="swiper-button-prev swiper-button-white"></div><div class="swiper-button-next swiper-button-white"></div></div>'
                    }else{
                        _lists+='</div></div>'
                    }

                }else if(data.content[i].video){
                    _lists+='<div id="mediaplayer" data-src="'+data.content[i].video+'"></div> ';
                }
                _lists+='<h3>'+data.content[i].title+'</h3><span class="shortline"></span>';
                _lists+='<article>'+data.content[i].description+'</article>';
                if(i!==data.content.length-1){
                    _lists+='<span class="longline"></span></li>';
                }else{
                    _lists+='</li>';
                }
                $("#lists").append(_lists);
                if(data.content[i].imgs.length>0){
                    var _index = "#"+$("#lists li:nth-child("+(i*1+1)+")").attr("id");
                    new Swiper('#lists '+_index+' .swiper-container', {
                        loop:true,//循环模式
                        autoplay: 3000,//可选选项，自动滑动
                        effect : 'fade',//切换效果
                        preloadImages:false,//默认为true，Swiper会强制加载所有图片。
                        lazyLoading : true,//懒加载
                        prevButton:_index+' .swiper-button-prev',
                        nextButton:_index+' .swiper-button-next',
                    })
                }
            }
        }   ,
        complete: function(){
           /* jwplayer('mediaplayer').setup({
                'flashplayer': 'lib/jwplayer.flash.swf',
                'image': 'img/example/community/01/community_banner_banner01.png',
                'id': 'playerID',
                'width': '100%',
                'aspectratio':'10:6',
                'file': $("#mediaplayer").data("src")
            });
            $("#mediaplayer").css("marginBottom","20px")*/
        },
        error: function(data){
            tip("error",data.message,"3000")
        }
    });
}
