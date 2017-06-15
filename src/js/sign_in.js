(function(win,doc){
    $(document).ready(function(){
        verificationCode.init();
        clickEvent();
    });
    var verificationCode={
        init:function(){
            var usename=_cookie.getCookie("us");
            var password=_cookie.getCookie("pwd");
            $("#phone").val(usename);
            $("#password").val(password);
        },
        login:function(){
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
                    _cookie.setCookie("us",username,"d7");
                    _cookie.setCookie("pwd",password,"d7");
                    //登陆成，执行code方法
                    // if(resp.user_id != -1){
                    //     getMyOpenId();
                    // }
                    // if(jQuery().getUrlParam("url")){
                    //         jQuery().loadContentPage(jQuery().getUrlParam("url"));
                    // }else{
                    //     jQuery().loadContentPage("index.html");
                    // }
                    window.location.href="index.html";
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    var errorMsg = XMLHttpRequest.responseText
                      new $.flavr({ 
                            content : '您输入的用户名或者密码不正确.',
                            autoclose : true,
                            buttons : {
                                close : { text: '确定'}
                            },
                            timeout : 5000 });
                    // if(errorMsg.indexOf("1000001")>0){
                    //     $("#loginer").css('visibility','visible');
                    // }else{

                    //     $("#passwsder").css('visibility','visible');
                    //     $("#loginer").css('visibility','hidden')
                    // }
                    // if (errorThrown == "Unauthorized") {
                    // }
                }
            });
        }
    }
    /**点击事件 */
    var clickEvent=function(){
        $(".login").on("click",function(){
             var _this = $(this);
            if(__validate.isPhone($("input[name='phone']"))&&__validate.isPassword($("input[name='password']"))){
                verificationCode.login(_this);;
            }
        })
    }
})(window,document);