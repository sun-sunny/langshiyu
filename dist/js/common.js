/* ----------------------------------------------------------------
 环境变量
 -----------------------------------------------------------------*/


/* ----------------------------------------------------------------
 UA 判断
 -----------------------------------------------------------------*/
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            qq: u.indexOf('QQ') > -1, //是否QQ
            wechat: u.indexOf('MicroMessenger') > -1, //是否微信
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            lemonIos: u.indexOf('ios_lemonvc') > -1, //lemon ios webview
            aa: u.indexOf('dasdasdaasda') > -1, //lemon ios webview
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
};

/* ----------------------------------------------------------------
 获取URL
 -----------------------------------------------------------------*/

var __url = ( function (n){
    // 获取地址栏的参数数组
    n.getUrlParams = function () {
        var search = window.location.search ;
        // 写入数据字典
        var tmparray = search.substr(1,search.length).split("&");
        var paramsArray = new Array;
        if( tmparray != null)
        {
            for(var i = 0;i<tmparray.length;i++)
            {
                var reg = /[=|^==]/; // 用=进行拆分，但不包括==
                var set1 = tmparray[i].replace(reg,'&');
                var tmpStr2 = set1.split('&');
                var array = new Array ;
                array[tmpStr2[0]] = tmpStr2[1] ;
                paramsArray.push(array);
            }
        }
        // 将参数数组进行返回
        return paramsArray ;
    };
    n.getUrlParam=function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return decodeURIComponent(r[2]);
	        return null;
		}
    // 根据参数名称获取参数值 decode=0直接return 否则转译
    n.getParamValue=function (name,decode) {
        var paramsArray = __url.getUrlParams();
        if(paramsArray != null)
        {
            for(var i = 0 ; i < paramsArray.length ; i ++ )
            {
                for(var j in paramsArray[i] )
                {
                    if( j == name )
                    {
                        if(decode == 0){
                            return paramsArray[i][j];
                        }else{
                            return decodeURIComponent(paramsArray[i][j]) ;
                        }

                    }
                }
            }
        }
        return null ;
    };
    //获取字符串中域名
    n.domain = function (url){
        var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'),
            matches = e.exec(url);
        return matches ? matches[1] : url;
    };
    n.locationUrl = function() {
        var href=location.hostname;
        var url="";
        if(href=="localhost"){
            url="http://landsea-beta.shlogic.com.cn/";
        }else if (href=="m.demo.langshiyu.com"){
            url="http://101.37.127.101";
        }else{
            url=location.origin+"/";
        }
        return url;
    };
    return n;
})(window.__url || {});

(function () {
    localStorage.theme = "mobiscroll"//mbsc默认主题
    localStorage.showTopbar="";
         if(__url.getParamValue("showTopbar")=="-1"||sessionStorage.showTopbar=="-1"){

            sessionStorage.showTopbar="-1";
        }else{
            fillHeader();//增加头部
        }
    fixtop()//固定顶部
    fixbottom()//固定底部
})()

/**cookie */
var _cookie=(function(n){
    //这是有设定过期时间的使用示例：
    //s20是代表20秒
    //h是指小时，如12小时则是：h12
    //d是天数，30天则：d30
     n.getsec=function(str){
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s")
        {
        return str1*1000;
        }
        else if (str2=="h")
        {
        return str1*60*60*1000;
        }
        else if (str2=="d")
        {
        return str1*24*60*60*1000;
        }
    },
    n.setCookie=function(name,value,time){
        var strsec =n.getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec*1);
        document.cookie = name + "="+ decodeURIComponent (value) + ";expires=" + exp.toGMTString();
    },
    n.getCookie=function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return encodeURIComponent(arr[2]);
        else
        return null;
    },
    n.delCookie=function(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=n.getCookie(name);
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
    return n;
})(window._cookie||{})
/* ----------------------------------------------------------------
 通用方法
 -----------------------------------------------------------------*/

function fillHeader() {
    var _header = '<header class="container"><img src="../img/logo.png" class="logo" alt=""><i class="iconfont icon-navbar navbar fr"></i></header>';

    $("body").prepend(_header)

    $(document).on('click','.navbar',function () {
        if($(".navmain").length!==0){
            $(".navmain").fadeToggle(500);
        }else{
            var _nav='<ul class="navmain container-vertical container"><li data-page="index">首页</li> <li data-page="project">在线订房</li><li data-page="series">产品系列</li><li data-page="community">社区生活</li><li data-page="about">关于朗诗寓</li><li data-page="personalcenter">个人中心</li></ul>'
            $("body").prepend(_nav);
            if($("body").data("page")){
                var _index = $("body").data("page")
                $(".navmain li[data-page='"+_index+"']").addClass("cur").siblings().removeClass("cur")
            }
        }
    });
    $('section').css('cursor','pointer');
    $('section').off('click touchmove').on('click touchmove',function() {
        if ($('.navmain').css('display') === 'block') {
            $('.navmain').css('display','none');
        }
    });

    $(document).on('click','.navmain li',function () {
        $(this).addClass("cur").siblings().removeClass("cur")
        $(".navbar").trigger("click")
        switch($(this).data("page"))
        {
            case "index":
                setTimeout(function () {window.location.href="index.html"},500)
                break;
            case "project":
                setTimeout(function () {window.location.href="project.html"},500)
                break;
            case "series":
                setTimeout(function () {window.location.href="series.html"},500)
                break;
            case "community":
                setTimeout(function () {window.location.href="community.html"},500)
                break;
            case "about":
                setTimeout(function () {window.location.href="about.html"},500)
                break;
            case "login":
                setTimeout(function () {window.location.href="sign_in.html"},500)
                break;
            case "registe":
                setTimeout(function () {window.location.href="sign_up.html"},500)
                break;
            case "personalcenter":
                var username=_cookie.getCookie("us");
                var password=_cookie.getCookie("pwd");
                if(username&&password&&username.length>0&&password.length>0){
                    window.location.href="personalcenter.html?code=";
                }else{
                     setTimeout(function () {window.location.href="sign_in.html"},500);
                }
                break;
            default:
                setTimeout(function () {window.location.href="index.html"},500)
        }
    })
}

//顶部距离计算
function fixtop() {
    var _height = ($("header").length+$(".fix-top").length)*50
    var _num = $(".fix-top").length
    $("#main").css("paddingTop",_height)
    for(var i=0;i<_num;i++){
        if($("header").length!==0) {
            $(".fix-top").eq(i - 1).css("marginTop", (i + 1) * 50 + 'px')
        }else{
            $(".fix-top").eq(i-1).css("marginTop",(i)*50+'px')
        }
    }
}

//底部有固定定位的情况
function fixbottom() {
    if($(".fix-bottom").length>0){
        var _height =$(".fix-bottom").outerHeight()*1+25+"px";
        $("#main").css("paddingBottom",_height)
    }
}

/* ----------------------------------------------------------------
 提示方法
 -----------------------------------------------------------------*/

//提示方法 type为"success","info","warning","error"四种,mes为提示文本,time为"aways","auto","XXs",三种
function tip(type,mes,time,action) {
    if(!type){type = "info";}
    if(!mes){mes = "没有提示文本";}
    if(!action){action=function () {
        return ;
    }}
    if(!time || time=="auto"){
        time = mes.length * 2000 / 10;
        if (time < 1500) {
            time = 1500
        }
    }
    var data = {type:type,mes:mes,time:time};
    $(".tip:not(.tip-aways)").remove();//重置提示框
    var _tip='';
    if(time == "tip-aways"){
        _tip+='<section class="tip tip-aways tip-'+type+' class="row">'
    }else{
        _tip+='<section class="tip tip-'+type+' class="row">'
    }
    switch(type)
    {
        case "info":
            _tip+='<i class="iconfont icon-info"></i>';
            break;
        case "success":
            _tip+='<i class="iconfont icon-success-fill"></i>';
            break;
        case "warning":
            _tip+='<i class="iconfont icon-warning-fill"></i>';
            break;
        case "error":
            _tip+='<i class="iconfont icon-error-fill"></i>';
            break;
        case "fullscreen":
            _tip+='';
            mes='<image src="'+mes+'"></image>'
            break;
        default:
    }
    _tip+='<div class="content"><p>'+mes+'</p></div></section><span class="mask"></span>'
    $('body').prepend(_tip);
    //定时关闭提示
    if(time&&time!=="aways"){
        setTimeout(function () {
            $(".tip:not(.tip-aways)").remove();
            $(".mask").remove();
            action();
        },time)
    }
    //自关闭事件绑定
    $(document).on("click",".tip,.mask",function () {
        $(".tip").remove();
        $(".mask").remove();
        action();
    })
}

/* ----------------------------------------------------------------
 验证
 -----------------------------------------------------------------*/

var __validate = ( function (n){
    //检验是否为网址
    n.isURL = function (str) {
        return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
    };
    //验证手机号或者邮箱
    n.isPhoneOrEmail = function (_this,_required) {
        var _val = $.trim(_this.val());
        if(_this.attr('required') == "required"){_required = "required"}//如果标签有required 强制验证非空
        if(_val == ""){
            if(_required == "required"){
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
               // tip("error","手机号或邮箱不能为空!","3000");
               new $.flavr({ content : '手机号或邮箱不能为空!',
                    autoclose : true, 
                    buttons : {
                        close : { text: '确定'}
                    },
                    timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
        else{
            if(!(_val.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)||/^((\+?86)|(\(\+86\)))?1\d{10}$/.test(_val)))
            {
                _this.focus();
                /*$('body,html').animate({ scrollTop: 0 }, 100);*/
                //tip("error","手机号或邮箱格式错误!","3000");
                 new $.flavr({ content : '手机号或邮箱格式错误!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
    };
    //验证手机号
    n.isPhone = function (_this,_required) {
        var _val = $.trim(_this.val());
        if(_this.attr('required') == "required"){_required = "required"}//如果标签有required 强制验证非空
        if(_val == ""){
            if(_required == "required"){
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
                //tip("error","手机号不能为空!","3000");
                new $.flavr({ content : '手机号不能为空!',
                       autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
        else{
            if(!/^((\+?86)|(\(\+86\)))?1\d{10}$/.test(_val))
            {
                _this.focus();
                $('body,html').animate({ scrollTop: 0 }, 100);
                new $.flavr({ content : '手机号格式错误!',
                       autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                //tip("error","手机号格式错误!","3000");
                return false;
            }
            else{
                return true;
            }
        }
    };
    //验证邮箱
    n.isEmail = function (_this,_required) {
        var _val = $.trim(_this.val());
        if(_this.attr('required') == "required"){_required = "required"}//如果标签有required 强制验证非空
        if(_val == ""){
            if(_required == "required"){
                _this.focus();
                /*$('body,html').animate({ scrollTop: 0 }, 100);*/
                //tip("error","邮箱不能为空!","3000");
                new $.flavr({ content : '邮箱不能为空!',
                       autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
        else{
            if(!_val.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/))
            {
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
                //tip("error","邮箱格式错误!","3000");
                 new $.flavr({ content : '邮箱格式错误!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
    };
     //验证验证码
    n.isVcode = function (_this,_required) {
        var _val = $.trim(_this.val());
        if(_this.attr('required') == "required"){_required = "required"}//如果标签有required 强制验证非空
        if(_val == ""){
            if(_required == "required"){
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
                //tip("error","密码不能为空!","3000");
                 new $.flavr({ content : '请输入正确的验证码!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
        else{
            if(_val.length<6)
            {
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
               // tip("error","密码长度不能小于6位!","3000");
                new $.flavr({ content : '验证码错误！',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
    };
    //验证密码
    n.isPassword = function (_this,_required) {
        var _val = $.trim(_this.val());
        if(_this.attr('required') == "required"){_required = "required"}//如果标签有required 强制验证非空
        if(_val == ""){
            if(_required == "required"){
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
                //tip("error","密码不能为空!","3000");
                 new $.flavr({ content : '密码不能为空!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
        else{
            if(_val.length<6)
            {
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
               // tip("error","密码长度不能小于6位!","3000");
                new $.flavr({ content : '密码长度不能小于6位!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
    };
    //验证确认密码
    n.isPassword2 = function (_this,_required) {
        var _val = $.trim(_this.val());
        if(_this.attr('required') == "required"){_required = "required"}//如果标签有required 强制验证非空
        if(_val == ""){
            if(_required == "required"){
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
                //tip("error","密码不能为空!","3000");
                 new $.flavr({ content : '请输入确认密码!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
        else{
            if(_val.length<6)
            {
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
               // tip("error","密码长度不能小于6位!","3000");
                new $.flavr({ content : '密码长度不能小于6位!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
    };
    //普通非空
    n.isNull  = function (_this) {
        var _val = $.trim(_this.val());
        _required = "required"//强制认证非空
        if(_val == ""){
            if(_required == "required"){
                _this.focus();
                /* $('body,html').animate({ scrollTop: 0 }, 100);*/
                //tip("error",_this.attr('placeholder')+",不能为空!","3000");
                new $.flavr({ content : _this.attr('placeholder')+",不能为空!",
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }else{
            return true;
        }
    };
    //验证姓名
    n.isName = function (_this,_required) {
        var _val = $.trim(_this.val());
        if(_this.attr('required') == "required"){_required = "required"}//如果标签有required 强制验证非空
        if(_val == ""){
            if(_required == "required"){
                _this.focus();
                new $.flavr({ content : '姓名不能为空!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
            else{
                return true;
            }
        }
        else{
            var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
            var re = new RegExp(regu);
            if (_val.search(re) != -1)
            {
                return true;
            } else {
                new $.flavr({ content : '姓名只能为汉字或者英文!',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
                return false;
            }
        }
    };
    //是否阅读协议
    n.isReaded = function (_this) {
        if(_this.hasClass("readed")){
            return true;
        }else{
            //tip("error","您没有同意协议条款","3000")
              new $.flavr({ content : '您没有同意协议条款。',
                    autoclose : true, 
                        buttons : {
                            close : { text: '确定',}
                        },
                        timeout : 5000 });
            return false;
        }
    };
    //密码是否一致
    n.isPasswordSame = function(val1,val2){
        val1=$.trim(val1);
        val2=$.trim(val2);
         if(val1&&val2){
             if(val1==val2){
                 return true;
             }else{
                new $.flavr({ content : '输入密码不一致!',
                    autoclose : true, 
                    buttons : {
                        close : { text: '确定',}
                    },
                    timeout : 5000 });
                 return false;
             }
         }
    }
    return n;
    //其他验证
})(window.__validate || {});

/* ----------------------------------------------------------------
 时间转换
 -----------------------------------------------------------------*/

var __times = ( function (n){
    /*格式化时间*/
    n.formatDate =function (now,isshort) {
        var   now = new Date(now*1000);
        var   year=now.getFullYear();
        var   month=now.getMonth()+1;
        if(month<10){month="0"+month}else{month=month}
        var   date=now.getDate();
        if(date<10){date="0"+date}else{date=date}
        var   hour=now.getHours();
        if(hour<10){hour="0"+hour}else{hour=hour}
        var   minute=now.getMinutes();
        if(minute<10){minute="0"+minute}else{minute=minute}
        var   second=now.getSeconds();
        if(second<10){second="0"+second}else{second=second}
        if(isshort.indexOf("/")>0){var _link = "/"}else if(isshort.indexOf("-")>0){var _link = "-"}else if(isshort.indexOf(".")>0){var _link = "."}else{var _link=" "}
        switch(isshort)
        {
            case "mm"+_link+"dd":
                return   month+_link+date;
                break;
            case "mm"+_link+"dd hh:mm":
                return   month+_link+date+"   "+hour+":"+minute;
                break;
            case "mm"+_link+"dd hh:mm:ss":
                return   month+_link+date+"   "+hour+":"+minute+":"+second;
                break;
            case "yy"+_link+"mm"+_link+"dd":
                return   year+_link+month+_link+date;
                break;
            case "yy"+_link+"mm"+_link+"dd hh:mm":
                return   year+_link+month+_link+date+"   "+hour+":"+minute;
                break;
            case "yy"+_link+"mm"+_link+"dd hh:mm:ss":
                return   year+_link+month+_link+date+"   "+hour+":"+minute+":"+second;
                break;
            default:
                return   year+_link+month+_link+date+"   "+hour+":"+minute+":"+second;
        }
    };
    //单个数据处理
    n.formatTime = function (time,isshort) {
        if(time == "" || time == "2556115199" || time == "0"){
            return time = "";
        }else{
            return time = __times.formatDate(time,isshort);
        }
    };
    //单个时间处理成时间戳
    n.timestamp=function (data) {
        var f = data.split(' ', 2);
        var d = (f[0] ? f[0] : '').split('-', 3);
        var t = (f[1] ? f[1] : '').split(':', 3);
        data = (new Date(
                parseInt(d[0], 10) || null,
                (parseInt(d[1], 10) || 1) - 1,
                parseInt(d[2], 10) || null,
                parseInt(t[0], 10) || null,
                parseInt(t[1], 10) || null,
                parseInt(t[2], 10) || null
            )).getTime() / 1000;
        return data;
    }
    return n;
})(window.__times || {});

/* ----------------------------------------------------------------
 表单相关
 -----------------------------------------------------------------*/

var __form = ( function (n){
    /*js过滤（去除）富文本编辑器中的html标签和换行回车等标记的正则表达式*/
    n.getRegexEditorValue=function (text) {
        text = text.replace(/(\n)/g, "");
        text = text.replace(/(\t)/g, "");
        text = text.replace(/(\r)/g, "");
        text = text.replace(/<\/?[^>]*>/g, "");
        text = text.replace(/\s*/g, "");
        return text;
    };
    //发送按钮倒计时
    n.countCode = function (_this) {
        var i = 61;//倒计时时间
        var countTime = setInterval(function () {
            if (i>1){
                i = i -1;
                _this.html("重新发送"+"<br>"+"("+i+")");
                _this.attr("disabled","disabled");
            }
            else{
                _this.html("获取"+"<br>"+"验证码");
                _this.removeAttr("disabled","disabled");
                clearInterval(countTime);
            }
        },1000)
    }
    //注册忘记密码模块倒计时
    n.countCodeSignUp = function (_this) {
        var i = 61;//倒计时时间
        var countTime = setInterval(function () {
            if (i>1){
                i = i -1;
                _this.html("重新发送"+i+"s");
                _this.attr("disabled","disabled");
                _this.css("color","#dcdcdc");
            }
            else{
                _this.html("获取验证码");
                _this.css("color","#000");
                _this.removeAttr("disabled","disabled");
                clearInterval(countTime);
            }
        },1000)
    }
    return n;
})(window.__form || {});

/**自动登录*/
function login(){
     var usename=_cookie.getCookie("us");
     var password=_cookie.getCookie("pwd");
    if(username&&password&&usename.length>0&&password.length>0){
        var username=$.trim($("#phone").val());
        var password=$.trim($("#password").val());
        var loginData={
                username: username,
                password: password,
                grant_type: "password",
                scope: "read+write",
                client_secret: "mySecretOAuthSecret",
                client_id: "authserverapp"
            }
        var baseurl=urlSearch();
            $.ajax({
                type : "post",
                url : baseurl + "/system/oauth/token",
                data : loginData,
                contentType : "application/x-www-form-urlencoded",
                dataType : 'json',
                async : false,
                success : function(resp) {
                    window.localStorage.token =resp.token_type+" "+resp.access_token;
                    window.localStorage.userId = resp.user_id;
                    window.localStorage.userPhone = username;
                }
            });
    }
}

