function fillBanner(){var n=urlSearch(),e=n+"/system/rest/activity/getAcctivityForFlag",i={flag:"INFO1"};$.ajax({type:"POST",contentType:"application/json",url:e,datatype:"json",data:JSON.stringify(i),beforeSend:function(n){},success:function(n){n.content=n.projects;for(var e=0;e<n.content.length;e++){for(var i='<div class="swiper-container swiper-bg"><div class="swiper-wrapper">',e=0;e<n.content.length;e++)i+='<div class="swiper-slide" data-url="'+n.content[e].url+'" data-id="'+n.content[e].userId+'"  style="background-image: url('+n.content[e].imgs[0].fullPath+')">',i+='<img src="../img/index_banner_mask.png" class="bannermask"/>',i+='<div class="box container"><h3>'+n.content[e].title+'</h3><span class="shortline"></span><article>'+n.content[e].description+"</article>",i+="</div></div>";i+='</div><div class="swiper-pagination"></div></div>',$(".bannerbox").append(i),$(".swiper-slide").css({width:"100%",height:document.documentElement.clientHeight-$("header").outerHeight()});new Swiper(".swiper-container",{loop:!0,autoplay:5e3,effect:"fade",preloadImages:!1,lazyLoading:!0,pagination:".swiper-pagination",paginationClickable:!0,onAfterResize:function(n){console.log(1),n.init()}})}},complete:function(){},error:function(n){tip("error",n.message,"3000")}})}$(function(){fillBanner()}),$(document).on("click",".bannerbox .swiper-slide",function(){function n(){var n=document.body.clientWidth;1100>n&&""!==$(this).data("url")&&void 0!==$(this).data("url")&&(window.location.href=$(this).data("url"))}""!==$(this).data("url")&&"undefined"!==$(this).data("url")&&(window.location.href=$(this).data("url")),n(),window.onresize=function(){n()}});