(function(win,doc){
    $(document).ready(function(){
        verificationCode.getPersonalData();
    });
    var verificationCode={
        getPersonalData:function(){
           var baseurl=urlSearch();
            $.ajax({
                type : "GET",
                url : baseurl + "/system/rest/wxUser",
                data : "",
                contentType : "application/x-www-form-urlencoded",
                dataType : '',
                async : false,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", window.localStorage.token);
                },
                success : function(data) {
                    if(data){
                        $(".phone").html(data.cellPhone);
                        $(".name").html(data.name);
                        $(".cerType").html(data.idType);
                        $(".cerNum").html(data.idNo);
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown) {
                    var errorMsg = XMLHttpRequest.responseText
                }
            });
        }
    }
})(window,document);