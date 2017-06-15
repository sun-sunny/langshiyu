/* ----------------------------------------------------------------
产品系列
 -----------------------------------------------------------------*/
$(function () {
    fillDetail();
})

function fillDetail() {
    var requestData={"flag":"PRLI1,PRLI2,PRLI3,PRLI4"};
    var localtionUrl=urlSearch();
    var url=localtionUrl+'/system/rest/productLine/getProductLineForFlag';
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
            data.content=data.proLine;
            for(var i=0;i<data.content.length;i++){
                var _lists='<li class="box mb40" data-id="'+data.content[i].proType+'">';
                _lists+='<img class="mb15" src="'+data.content[i].path+'"/>';
                _lists+='<h3>'+data.content[i].proname+'</h3>'
                _lists+='<p>'+data.content[i].keyword+'</p></li>';
                $("#lists").append(_lists);
            }
            $(".box > img").css("height",$(window).width()* 1/2 + 'px');
            $(".box > img").css("width",$(window).width() + 'px');
        },
        error: function(data){
            tip("error",data.message,"3000")
        }
    });
}

/*系列详情*/
$(document).on("tap","#lists li",function () {
    if($(this).index()!==0){
        window.location.href="seriesDetail.html?id="+$(this).data("id")
    }
})

