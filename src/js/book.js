/* ----------------------------------------------------------------
 预定页面脚本
 -----------------------------------------------------------------*/
$(function () {
    //fillForm();
    //fillStaticForm();
    (function () {
        getCityList(getCity_ProjectCode()[1]);
        mobiscroll.settings = {
            theme: localStorage.theme,
            lang: 'zh',
            display:"bottom",
            dateFormat: 'yy-mm-dd',
            setText: '', //确认按钮名称
            cancelText: '',
            onItemTap: function (event, inst) {
                $('.mbsc-fr-btn0.mbsc-fr-btn-e.mbsc-fr-btn').click();
            }
        };
        $('#project option').remove();
        getProjectList(getCity_ProjectCode()[1],getCity_ProjectCode()[0]);
    })();
})
$(document).on('change','#city', function () {
    $('#project option').remove();      
    getProjectList($('#city option:selected').val(),'choose');
});
function getCityList (_nowcity) {
    var urlNow = urlSearch();
    $.ajax({
        type:"get",
        url: urlNow + "/system/rest/projects/getProjectInfoWithArea",
        datatype: "json",
        cache: false,
        success:function(data){
            for(var i=0;i<data.length;i++){
                if(_nowcity.indexOf(data[i].code)>=0){
                    var _city='<option value="'+data[i].code+'" selected>'+data[i].code_desc_zh+'</option>'
                }else{
                    var _city='<option value="'+data[i].code+'">'+data[i].code_desc_zh+'</option>'
                }
                if (data[i].prjCount !== 0) {
                    $("#city").append(_city)
                }
                $('#city').mobiscroll().select({
                    minWidth: 200
                });
            }
        }   ,
        error: function(data){
            tip("error",data.MSG)
        }
    });
}

function getProjectList (_nowcity, _prjid) {
    var urlNow = urlSearch();
    var areaCode = {"areaCode" :  _nowcity} ;
    $.ajax({
        type:"POST",
        contentType: "application/json",
        url: urlNow + "/system/rest/projects/getProjectListForFront",
        datatype: "json",
        cache: false,
        data: JSON.stringify(areaCode),
        success:function(data){
            var html_pro = '';
            for (var i = 0; i < data.projects.length; i++) {
                if(_prjid.indexOf(data.projects[i].prjId)>=0){
                    var html_pro ='<option value="'+data.projects[i].prjId+'" selected>'+data.projects[i].prjName+'</option>';
                }else{
                    var html_pro ='<option value="'+data.projects[i].prjId+'">'+data.projects[i].prjName+'</option>';
                }
                $('#project').append(html_pro); 
                $('#project').mobiscroll().select({
                    minWidth: 200
                });
            }
        },
        error: function(data){
            tip("error",data.MSG)
        }
    });
}

//发验证码
function getCode(_this) {
    var name = $("#name").val();
    var sex = $("#sex").val();
    var all = name+","+sex;
    var date = this.getNowFormatDate();
    var sec = $("#phone").val() + date + "order";
    var secMd5 = this.MD5(sec);
	//console.log("11131="+$.cookie("access_token"));
    var _data={
        "params": all,
        "phone": $("#phone").val(),
        "oper": "order",
        "secretKey": secMd5
    };
    var localUrl = urlSearch();
    $.ajax({
        type:"post",
        contentType:"application/json",
        url: localUrl + "/system/rest/sendSms/getVerifyCode",  // beta 环境
        datatype: "json",
        data : JSON.stringify(_data),


        success:function(data){
            __form.countCode(_this)

        } , 
        complete: function(){
        },
        error: function(data){
            if(data[0].status != "200")
            {
				new $.flavr({ 
                    content : '获取验证码失败.',
                    autoclose : true,
                    buttons : {
                        close : { text: '确定'}
                    },
                    timeout : 5000 });
            }

        }
    });
}

//扩大出发条件
$(document).on('click','.icon-triange-right',function () {
    $(this).siblings("input").trigger("click");
})

//发送验证码
$(document).on("click","form .btn.code",function () {
    var _this = $(this);
    if(__validate.isPhone($("input[name='phone']")) && __validate.isNull($("input[name='name']")) ){
        getCode(_this);
    }
})

//提交表单
$(document).on('click','.booking',function () {
    $(".booking").attr("disabled", "true");
    if(__validate.isName($("input[name='name']"))){
    	//获得项目id和名称
        var myselect=document.getElementById("project");
        var index=myselect.selectedIndex ;
        var valInd = myselect.options[index].value;
        var texInd = myselect.options[index].text;
        //获取城市名称
    	var  myselCit=document.getElementById("city");
        var indexCit=myselCit.selectedIndex ;
        var texIndCit = myselCit.options[indexCit].value;

        var texIndCit_WJ = "_WJ2";
        //转换城市code
    	if("AREA1" == texIndCit ){//上海
    		texIndCit_WJ = "_WJ2";
    	}
    	if("AREA2" == texIndCit ){//南京
    		texIndCit_WJ = "_WJ3";
    	}
    	if("AREA3" == texIndCit ){//杭州
    		texIndCit_WJ = "_WJ1";
    	}
    	
    	var time = $('#time').val();
    	var timeStr = time.toString();

        if ( texIndCit === "AREA0" ) {
            new $.flavr({ 
                        content : '请选择城市', 
                        autoclose : true, 
                        buttons : {
                            close : { text: '确定'}
                        },
                        timeout : 5000 });
        } else if ( texInd === "请选择" ) {
            new $.flavr({ 
                        content : '请选择项目', 
                        autoclose : true, 
                        buttons : {
                            close : { text: '确定'}
                        },
                        timeout : 5000 });
        } else if(__validate.isPhone($("input[name='phone']")) && __validate.isNull($("input[name='name']")) && __validate.isNull($("input[name='code']"))){
            var _data={
                "orderPersonName":$("#name").val(),
                "orderPersonSex":$("#sex").val(),
                "orderPersonTel":$("#phone").val(),
                "orderTime":timeStr,
    			"address": texIndCit,
                "prjId":valInd,
                "prjName":texInd,
                "roomTypeCode": "_LRD1",
                "roomTypeName": "一室一厅",
                "verificationCode":$("#code").val()
            }
            var localUrl = urlSearch();
            $.ajax({
                type:"post",
                contentType:"application/json",
                url: localUrl + "/system/rest/order/createOrder",  // beta 环境
                datatype: "json",
                data : JSON.stringify(_data),

                beforeSend:function(){
                }
                ,
                success:function(data){
    				var orderDa = data.id;
                    if(data.id != null)
                    {
                       new $.flavr({
                            animateEntrance : "fadeInDown",
                            animateClosing : "fadeOutDown",
                            content : '<span>预约成功<br />您的意见很重要，是否填写问卷？</span>',
                            buttons : {
                                close : { text: '残忍拒绝', style: 'grey', action:function(){
                                       window.history.back(); 
                                    } 
                                },
                                think : { 
                                    text: '填写', action: function(){
                                        window.location.href='questionnaire.html?cityCode='+texIndCit_WJ+'&orderId='+orderDa+'&prjName='+texInd+'&prjId='+valInd //进入问卷
                                    }
                                },
                            }
                        });
                    }
                    else
                    {
                        $(".booking").removeAttr("disabled");
    					new $.flavr({ content : data.MSG,
                            autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                    }
                } ,
                complete: function(){
                },
                error: function(){
                    //tip("error",data.message)
                }
            });
        }
    }
})

//跳转到问卷页面

//获得系统时间
function getNowFormatDate() {
    var date = new Date();
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + month + strDate;
    return currentdate;
}

//md5加密
var hex_chr = "0123456789abcdef";
function rhex(num)
{
    str = "";
    for(j = 0; j <= 3; j++)
        str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
            hex_chr.charAt((num >> (j * 8)) & 0x0F);
    return str;
}
function str2blks_MD5(str)
{
    nblk = ((str.length + 8) >> 6) + 1;
    blks = new Array(nblk * 16);
    for(i = 0; i < nblk * 16; i++) blks[i] = 0;
    for(i = 0; i < str.length; i++)
        blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    blks[i >> 2] |= 0x80 << ((i % 4) * 8);
    blks[nblk * 16 - 2] = str.length * 8;
    return blks;
}
function add(x, y)
{
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}
function rol(num, cnt)
{
    return (num << cnt) | (num >>> (32 - cnt));
}
function cmn(q, a, b, x, s, t)
{
    return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
    return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
    return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
    return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
    return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

//md5加密入口方法
function MD5(str)
{
    x = str2blks_MD5(str);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for(i = 0; i < x.length; i += 16)
    {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = ff(c, d, a, b, x[i+ 2], 17, 606105819);
        b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = ff(d, a, b, c, x[i+ 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = ff(a, b, c, d, x[i+ 8], 7 , 1770035416);
        d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i+10], 17, -42063);
        b = ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = ff(a, b, c, d, x[i+12], 7 , 1804603682);
        d = ff(d, a, b, c, x[i+13], 12, -40341101);
        c = ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = ff(b, c, d, a, x[i+15], 22, 1236535329);
        a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = gg(c, d, a, b, x[i+11], 14, 643717713);
        b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = gg(d, a, b, c, x[i+10], 9 , 38016083);
        c = gg(c, d, a, b, x[i+15], 14, -660478335);
        b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = gg(a, b, c, d, x[i+ 9], 5 , 568446438);
        d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = gg(b, c, d, a, x[i+ 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = gg(c, d, a, b, x[i+ 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i+12], 20, -1926607734);
        a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i+11], 16, 1839030562);
        b = hh(b, c, d, a, x[i+14], 23, -35309556);
        a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = hh(d, a, b, c, x[i+ 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = hh(a, b, c, d, x[i+13], 4 , 681279174);
        d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = hh(b, c, d, a, x[i+ 6], 23, 76029189);
        a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = hh(d, a, b, c, x[i+12], 11, -421815835);
        c = hh(c, d, a, b, x[i+15], 16, 530742520);
        b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
        a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = ii(d, a, b, c, x[i+ 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = ii(a, b, c, d, x[i+12], 6 , 1700485571);
        d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i+10], 15, -1051523);
        b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i+ 8], 6 , 1873313359);
        d = ii(d, a, b, c, x[i+15], 10, -30611744);
        c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i+13], 21, 1309151649);
        a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = ii(c, d, a, b, x[i+ 2], 15, 718787259);
        b = ii(b, c, d, a, x[i+ 9], 21, -343485551);
        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
    }
    return rhex(a) + rhex(b) + rhex(c) + rhex(d);
} 
