/* ----------------------------------------------------------------
 问卷
 -----------------------------------------------------------------*/

$(function () {
    if(!__url.getParamValue("cityCode")||!__url.getParamValue("prjName")||!__url.getParamValue("orderId")){
        window.history.back()
    }
    fillQuestions(__url.getParamValue("cityCode"),__url.getParamValue("prjName"));
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
})

function fillQuestions(city,projectName) {
    var localUrl = urlSearch();
    $.ajax({
        type:"get",
        url: localUrl + "/system/rest/survey/"+city,
        datatype: "json",
        cache: false,
        beforeSend:function(){
        },
        success:function(data){
            console.log(data);
            $("#main").prepend('<div class="box container container-vertical"><h3>朗诗寓项目意向客户问卷</h3><span class="shortline"></span><p>'+data.description.replace(/~/,projectName) +'</p></div>')
            var _form = '';
            for(var i=0;i<data.surveyQuestionDTO.length;i++){
                _form+='<h3 class="container"><b>'+data.surveyQuestionDTO[i].description+'</b></h3>'
                if(data.surveyQuestionDTO[i].questionType=="_WJQT1"){
                    _form+='<div class="container check">';
                    for (var j = 0; j < data.surveyQuestionDTO[i].surveyOptionDTO.length; j++) {
                        _form+='<div style="display:inline-block;width:50%;font-size:14px;">';
                        _form+='<div style="float:left"><label><input type="radio" data-id="'+data.surveyQuestionDTO[i].id+'"'
                             +' name="'+data.surveyQuestionDTO[i].description+'" value="'
                             +data.surveyQuestionDTO[i].surveyOptionDTO[j].id+'"/></label></div>';
                        _form+='<div style="float:left;">'+data.surveyQuestionDTO[i].surveyOptionDTO[j].description+'</div></div>';
                    }
                    _form+='</div>';
                }else if(data.surveyQuestionDTO[i].questionType=="_WJQT2"){
                    _form+='<div class="container check">'
                    for (var j = 0; j < data.surveyQuestionDTO[i].surveyOptionDTO.length; j++) {
                        _form+='<div style="display:inline-block;'+'width:' 
                             + ((data.surveyQuestionDTO[i].id ===  32) ? '100%' : '50%')+';font-size:14px;" >';
                        _form+='<div style="float:left"><label><input type="checkbox" data-id="'+ data.surveyQuestionDTO[i].id +'"'
                             +' name="'+data.surveyQuestionDTO[i].description+'" value="'
                             + data.surveyQuestionDTO[i].surveyOptionDTO[j].id+'"/></label></div>';
                        _form+='<div style="float:left;width:80%">'+data.surveyQuestionDTO[i].surveyOptionDTO[j].description+'</div></div>';
                    }
                    _form+='</div>'
                }                
            }
            _form+='<div class="container"> <div class="btn btn-warning btn-br-no btn-block finish">提交</div> </div>';
            $("#main>form").attr("data-id",data.id);
            $("#main>form").append(_form)
        }   ,
        complete: function(){
            $("select").each(function () {
                if($(this).hasClass("_WJQT2")){
                    $(this).siblings("input").attr("placeholder","此项多选，请点击选择")
                }
            });
            $('select').mobiscroll({
                theme: localStorage.theme,
                lang: 'zh',
                display:"bottom",
                setText: '', //确认按钮名称
                cancelText: '',
                onItemTap: function (event, inst) {
                    $('.mbsc-fr-btn0.mbsc-fr-btn-e.mbsc-fr-btn').click();
                }
            }).select({
                minWidth: 200
            });
        },
        error: function(data){
            tip("error",data.message,"3000")
        }
    });
}

//扩大出发条件
$(document).on('click','.icon-triange-right',function () {
    $(this).siblings("input").trigger("click");
})

//点击提交表单
$(document).on('click','.finish',function () {
    var _data={
        "orderId":parseInt(__url.getParamValue("orderId")),
        "surveyId":parseInt($("form").data("id")),
        "answerDetailDTO":[]
    };
    $('.check').each(function() {
        $this = $(this).children('div').children('div').children('label').children('input');
        for (var i = 0; i < $this.length; i++) {
            if($($this[i]).prop('checked') === true){
                _data.answerDetailDTO.push(
                    {
                        "id":0,
                        "questionId":parseInt($($this[i]).data("id")),
                        "answer":$($this[i]).val()
                    }
                )
            };        
        }
    })
    console.log(_data)
    var localUrl = urlSearch();
    $.ajax({
        type:"post",
        url: localUrl + "/system/rest/answer/createSurveyAnswer",
        datatype: "json",
        contentType:"application/json",
        cache: false,
        data: JSON.stringify(_data),
        success:function(data){
            new $.flavr({
                title : '提交成功!',
                autoclose : true,
                timeout : 500000,
                buttons : {
                    close: {
                        text: '确定'
                    }
                },
                onClose:function () {
                    window.history.go(-2);
                }
            });
        } ,
        error: function(){
            tip("error",data.message,"3000","3000")
        }
    });
})