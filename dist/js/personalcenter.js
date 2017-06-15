(function(win,doc){
    $(document).ready(function(){
        clickEvent();
        verificationCode.getOpenCode();
    });
    var verificationCode={
        getOpenCode:function(){
           var codeId=__url.getUrlParam("code");
           var baseurl=urlSearch();
           if(codeId&&codeId.length>0){
                $.ajax({
                    type : "GET",
                    url : baseurl + "/system/rest/wxUser/myOpenId/"+codeId,
                    data : "",
                    contentType : "application/x-www-form-urlencoded",
                    dataType : '',
                    async : false,
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", window.localStorage.token);
                    },
                    success : function(data) {
                        var str='<img src="../img/toux.png">';
                        if(data&&data.imgUrl&&data.openId){
                            str='<img src="'+data.imgUrl+'">';
                            _cookie.setCookie("openId",openId,"d7");
                            _cookie.setCookie("imgUrl",imgUrl,"d7");
                        }
                        $(".pic").html(str);
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        var errorMsg = XMLHttpRequest.responseText
                    }
                });
           }else{
               var str='<img src="../img/toux.png">';
                $(".pic").html(str);
           }
        }
    }
    /**点击事件 */
    var clickEvent=function(){
        // $(".content .group ").each(function(index,item){
        //     $(item).on("click",function(){
        //         var username=_cookie.getCookie("us");
        //         var password=_cookie.getCookie("pwd");
        //         if(username&&password&&username.length>0&&password.length>0){
        //             window.location.href="personaldata.html";
        //         }else{
        //             window.location.href="sign_in.html";
        //         }
        //     })
        // })
        $(".content .persondata").on("click",function(){
                var username=_cookie.getCookie("us");
                var password=_cookie.getCookie("pwd");
                if(username&&password&&username.length>0&&password.length>0){
                    window.location.href="personaldata.html";
                }else{
                    window.location.href="sign_in.html";
                }
        })
    }
})(window,document);