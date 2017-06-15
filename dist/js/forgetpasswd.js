(function(win,doc){
    $(document).ready(function(){
        clickEvent();
    });
    /**验证码功能模块 */
    var verificationCode={
        init:function(){

        },
        getCode:function(_this){
            var self=this;
            var date =getNowFormatDate();
            var sec = $("#phone").val() + date + "updatePsd";
            var secMd5 =MD5(sec);
            var _data={
                "params": "",
                "phone": $("#phone").val(),
                "oper": "updatePsd",
                "secretKey": secMd5
            };
            var localUrl = urlSearch();
            $.ajax({
                type:"post",
                contentType:"application/json",
                url: localUrl + "/system/rest/sendSms/getVerifyCode",
                datatype: "json",
                data : JSON.stringify(_data),
                success:function(data){
                    __form.countCodeSignUp(_this)
                } , 
                complete: function(){
                },
                error: function(data){
                        new $.flavr({ 
                            content : '获取验证码失败.',
                            autoclose : true,
                            buttons : {
                                close : { text: '确定'}
                            },
                            timeout : 5000 });

                }
            });
        },
        registe:function(){
            var _data={
                "loginId": $.trim($("#phone").val()),
                "verifyCode":$.trim($("#vcode").val()),
                "password":MD5($.trim($("#password").val()))
            };
             var localUrl = urlSearch();
             $.ajax({
                type:"post",
                contentType:"application/json",
                url: localUrl + "/system/rest/wxUser/updatePwd",
                datatype: "json",
                data : JSON.stringify(_data),
                success:function(data){
                    if(data.STATUS==0){
                         new $.flavr({ 
                            content : '密码更新成功，请登录.',
                            autoclose : true,
                            buttons : {
                                close : { text: '确定'}
                            },
                            timeout : 5000 });
                         setTimeout(function(){
                            window.location.href="sign_in.html";
                        },2000);
                    }else{
                         new $.flavr({ 
                            content :  data.MSG,
                            autoclose : true,
                            buttons : {
                                close : { text: '确定'}
                            },
                            timeout : 5000 });
                    }
                } , 
                complete: function(){
                },
                error: function(data){
                    if(data!=0)
                    {
                        new $.flavr({ 
                            content : data.MSG,
                            autoclose : true,
                            buttons : {
                                close : { text: '确定'}
                            },
                            timeout : 5000 });
                    }

                }
            });
        }
    }
    /**点击事件 */
    var clickEvent=function(){
        $(".timenum").on("click",function(){
             var _this = $(this);
            if(__validate.isPhone($("input[name='phone']"))){
                verificationCode.getCode(_this);;
            }
        })
        $(".forgetpasswd").on("click",function(){
             var _this = $(this);
            if(__validate.isPhone($("input[name='phone']"))&&__validate.isVcode($("input[name='vcode']"))&&__validate.isPassword($("input[name='password']"))&&__validate.isPassword2($("input[name='password2']"))&&__validate.isPasswordSame($("input[name='password']").val(),$("input[name='password2']").val())){
                verificationCode.registe(_this);;
            }
        })
    }
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
    function rhex(num){
        str = "";
        for(j = 0; j <= 3; j++)
            str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
                hex_chr.charAt((num >> (j * 8)) & 0x0F);
        return str;
    }
    function str2blks_MD5(str){
        nblk = ((str.length + 8) >> 6) + 1;
        blks = new Array(nblk * 16);
        for(i = 0; i < nblk * 16; i++) blks[i] = 0;
        for(i = 0; i < str.length; i++)
            blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
        blks[i >> 2] |= 0x80 << ((i % 4) * 8);
        blks[nblk * 16 - 2] = str.length * 8;
        return blks;
    }
    function add(x, y){
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    function rol(num, cnt){
        return (num << cnt) | (num >>> (32 - cnt));
    }
    function cmn(q, a, b, x, s, t){
        return add(rol(add(add(a, q), add(x, t)), s), b);
    }
    function ff(a, b, c, d, x, s, t){
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function gg(a, b, c, d, x, s, t){
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function hh(a, b, c, d, x, s, t){
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a, b, c, d, x, s, t){
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    //md5加密入口方法
    function MD5(str){
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
})(window,document);