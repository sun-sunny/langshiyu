/* ----------------------------------------------------------------
 关于页面
 -----------------------------------------------------------------*/
$(function () {
    fillRichText();
})

function fillRichText() {
    var requestData={"flag":"INFO6,INFO7"};
    var localtionUrl=urlSearch();
    var url=localtionUrl+'/system/rest/activity/getAcctivityForFlag';
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
            var object= {
            "id":"3",
            "imgs":[{"fullPath":""}],
            "title":"联系我们",
            "description":"<p><i class='iconfont icon-location'></i><span>上海市国康路100号上海国际设计中心11楼</span></p><p><i class='iconfont icon-phone'></i><span><a href='tel:021-65961111'>021-65961111</a></span></p>"
            };
            data.content.push(object);
            for(var i=0;i<data.content.length;i++){
                var _richtext='<li class="box mb40" data-id="'+data.content[i].id+'"><img class="mb20" src="'+data.content[i].imgs[0].fullPath+'" alt="">';
                _richtext+='<h3>'+data.content[i].title+'</h3><span class="shortline"></span>';
                _richtext+='<article>'+data.content[i].description+'</article>';
                $("#lists").append(_richtext)
                //$("#lists li[data-id='3']").prepend("<div id='allmap' class='map'></div>")
            }
        }   ,
        complete: function(){
            // 百度地图API功能
            // var map = new BMap.Map("allmap");
            // map.centerAndZoom(new BMap.Point(118.910685,32.087431),15);
            // var new_point = new BMap.Point(118.910685,32.087431);
            // var marker = new BMap.Marker(new_point);  // 创建标注
            // map.addOverlay(marker);              // 将标注添加到地图中
            // map.centerAndZoom(new_point, 17);
            // var opts = {
            //     width : 200,     // 信息窗口宽度
            //     height: 50,     // 信息窗口高度
            //     title : "朗诗寓总部" , // 信息窗口标题
            //     enableMessage:false,//设置允许信息窗发送短息
            // }
            // var infoWindow = new BMap.InfoWindow("地址：南京市栖霞区紫东路9号钟山绿郡办公楼1号楼", opts);  // 创建信息窗口对象
            // marker.addEventListener("click", function(){
            //     map.openInfoWindow(infoWindow,new_point); //开启信息窗口
            // });
        },
        error: function(data){
            tip("error",data.message,"3000")
        }
    });
}

$(document).on('click','#richtexts li[data-id="3"] img',function () {
    //todo 缺少百度地图API秘钥等，无法真实打开对应位置
    window.location.href="https://map.baidu.com/mobile/webapp/index/index/#index/index/foo=bar/vt=map";
})