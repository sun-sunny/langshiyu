function fillDetail(e){var n={flag:e},t=urlSearch(),i=t+"/system/rest/productLine/getProductLineForFlag";$.ajax({type:"POST",contentType:"application/json",url:i,datatype:"json",data:JSON.stringify(n),cache:!1,beforeSend:function(){},success:function(e){e.content=e.projects[0],$("head title").text(e.content.codedesczh),$("#main").attr("data-id",e.content.proType),fillBanner(e.content.imgs),fillIntro(e.content);var n={name:e.content.expand1Title,lists:[e.content.expand1Attribute]},t={name:e.content.expand2Title,lists:[e.content.expand2Attribute]},i={name:e.content.expand3Title,lists:[e.content.expand3Attribute]},a={name:e.content.expand4Title,lists:[e.content.expand4Attribute]},s=[n,t,i,a];e.content.feature=s,fillFeature(e.content.feature)},complete:function(){},error:function(e){tip("error",e.message)}})}function fillBanner(e){for(var n='<div class="swiper-container swiper-bg"><div class="swiper-wrapper">',t=0;t<e.length;t++)n+='<div class="swiper-slide" style="background-image:url('+e[t].fullPath+')"></div>';n+=e.length>1?'</div><div class="swiper-button-prev swiper-button-white"></div><div class="swiper-button-next swiper-button-white"></div></div>':"</div></div>",$("#main>.banner").append(n),$(".swiper-bg .swiper-wrapper").css("height",1*$(".banner").width()/2),new Swiper("#main>.banner .swiper-container",{loop:!0,autoplay:3e3,effect:"fade",preloadImages:!1,lazyLoading:!0,prevButton:"#main>.banner .swiper-button-prev",nextButton:"#main>.banner .swiper-button-next"})}function fillIntro(e){var n="";n+='<h2 class="mb20">'+e.codedesczh+"</h2>",n+='<span class="shortline"></span>',n+='<article class="mb20">'+e.description+"</article>",$("#main>.intro").append(n)}function fillFeature(e){for(var n="",t="",i=0;i<e.length;i++){0==i?(n+='<section data-id="'+e[i].name+'"><ul class="icons">',t+='<li class="flex-2 cur" data-href="server" style="font-size:0.5em;">'+e[i].name+"</li>"):(n+='<section class="hidden" data-id="'+e[i].name+'"><ul class="icons">',t+='<li class="flex-2" data-href="server" style="font-size:0.5em;">'+e[i].name+"</li>");for(var a=0;a<e[i].lists[0].length;a++)n+='<li><div class="imgbox"><img src="'+e[i].lists[0][a].path+'" alt=""></div><span class="name">'+e[i].lists[0][a].name+"</span></li>";n+='<span class="clear"></span></ul></section>'}$("#main>.container ul").html(t),$("#main>.feature").append(n)}$(function(){fillDetail(__url.getParamValue("id"))}),$(document).on("click","nav li",function(){$(this).addClass("cur").siblings().removeClass("cur");var e=1*$(this).index();$(".feature section").eq(e).removeClass("hidden").siblings("section").addClass("hidden")});