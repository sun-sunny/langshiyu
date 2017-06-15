/* ----------------------------------------------------------------
 项目页面脚本
 -----------------------------------------------------------------*/
$(function () {
    //定位城市
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,16);

    function myFun(result){
        var cityName = result.name;
        map.setCenter(cityName);
        fillCity(cityName);
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);


    (function () {
        mobiscroll.settings = {
            theme: localStorage.theme,
            lang: 'zh',
            display:"bottom",
            setText: '', //确认按钮名称
            cancelText: '',
            onItemTap: function (event, inst) {
                $('.mbsc-fr-btn0.mbsc-fr-btn-e.mbsc-fr-btn').click();
            }
        };
    })();
})

function fillCity(_nowcity) {
    var urlNow = urlSearch();
    $.ajax({
        type:"get",
        url: urlNow + "/system/rest/projects/getProjectInfoWithArea",
        datatype: "json",
        cache: false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                if (data[i].prjCount !== 0) {
                    if(_nowcity.indexOf(data[i].code_desc_zh)>=0){
                        var _city='<option value="'+data[i].code+'" selected>'+data[i].code_desc_zh+'</option>'
                    }else{
                        var _city='<option value="'+data[i].code+'">'+data[i].code_desc_zh+'</option>'
                    }
                    $("#city").append(_city)
                }
            }
            fillList($("#city").val());
        }   ,
        complete: function(){
            $('#city').mobiscroll().select({
                minWidth: 200,
                onSet: function (event, inst) {
                    $("#lists").empty();
                    fillList($("#city").val());
                }
            });
        },
        error: function(data){
            tip("error",data.message)
        }
    });
}

function fillList(cityid) {
    var urlNow = urlSearch();
    var param = {"areaCode":cityid};
    $.ajax({
        type:"POST",
        contentType: "application/json",
        url: urlNow + "/system/rest/projects/getProjectListForFront",
        datatype: "json",
        cache: false,
        data:JSON.stringify(param),
        beforeSend:function(){
        },
        success:function(data){
            for(var i=0;i<data.projects.length;i++){
                var _lists='<li class="box mb40" id="project'+i+'"  data-id="'+data.projects[i].areaCode + '_' + data.projects[i].prjId+'"><div class="swiper-container swiper-bg"><div class="swiper-wrapper">';
                _lists+='<div class="swiper-slide">'+'<img style="cursor:pointer" src="'+data.projects[i].coverImageSrc+'" />'+'</div></div></div>'
                _lists+='<div class="mes"><span class="fl">¥ '+ (parseInt(data.projects[i].price) === 0 ? '待更新' : data.projects[i].price)+'</span>'
                _lists+='<div class="fr" style="cursor:pointer"><i class="label">More</i></div><span class="clear"></span></div>'
                _lists+='<h3>'+data.projects[i].prjName+'</h3>'
                _lists+='<p><i class="iconfont icon-location"></i><span>'+data.projects[i].addr+'</span></p></li>';
                $("#lists").append(_lists);

                $(".swiper-slide > img").css("height",$(window).width()* 1/2 + 'px');
                $(".swiper-slide > img").css("width",$(window).width() + 'px');
            }
        },
        complete: function(){
        },
        error: function(data){
            tip("error",data.message)
        }
    });
}

//扩大出发条件
$(document).on('click','#location .fr',function () {
    $("#location input").trigger("click");
})

/*项目详情*/
$(document).on("click","#lists li",function () {
    window.location.href="projectDetail.html?id="+$(this).data("id");
    return false;
})
//阻止左右箭头冒泡
$(document).on("click","#lists li .swiper-button-white",function () {
    return false
})

