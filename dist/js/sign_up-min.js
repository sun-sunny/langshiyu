!function(t,n){function e(){var i=new Date,t=i.getMonth()+1,n=i.getDate();t>=1&&9>=t&&(t="0"+t),n>=0&&9>=n&&(n="0"+n);var e=i.getFullYear()+t+n;return e}function o(i){for(str="",j=0;j<=3;j++)str+=h.charAt(i>>8*j+4&15)+h.charAt(i>>8*j&15);return str}function r(t){for(nblk=(t.length+8>>6)+1,blks=new Array(16*nblk),i=0;i<16*nblk;i++)blks[i]=0;for(i=0;i<t.length;i++)blks[i>>2]|=t.charCodeAt(i)<<i%4*8;return blks[i>>2]|=128<<i%4*8,blks[16*nblk-2]=8*t.length,blks}function a(i,t){var n=(65535&i)+(65535&t),e=(i>>16)+(t>>16)+(n>>16);return e<<16|65535&n}function s(i,t){return i<<t|i>>>32-t}function u(i,t,n,e,o,r){return a(s(a(a(t,i),a(e,r)),o),n)}function c(i,t,n,e,o,r,a){return u(t&n|~t&e,i,t,o,r,a)}function l(i,t,n,e,o,r,a){return u(t&e|n&~e,i,t,o,r,a)}function f(i,t,n,e,o,r,a){return u(t^n^e,i,t,o,r,a)}function p(i,t,n,e,o,r,a){return u(n^(t|~e),i,t,o,r,a)}function d(t){x=r(t);var n=1732584193,e=-271733879,s=-1732584194,u=271733878;for(i=0;i<x.length;i+=16){var d=n,v=e,m=s,$=u;n=c(n,e,s,u,x[i+0],7,-680876936),u=c(u,n,e,s,x[i+1],12,-389564586),s=c(s,u,n,e,x[i+2],17,606105819),e=c(e,s,u,n,x[i+3],22,-1044525330),n=c(n,e,s,u,x[i+4],7,-176418897),u=c(u,n,e,s,x[i+5],12,1200080426),s=c(s,u,n,e,x[i+6],17,-1473231341),e=c(e,s,u,n,x[i+7],22,-45705983),n=c(n,e,s,u,x[i+8],7,1770035416),u=c(u,n,e,s,x[i+9],12,-1958414417),s=c(s,u,n,e,x[i+10],17,-42063),e=c(e,s,u,n,x[i+11],22,-1990404162),n=c(n,e,s,u,x[i+12],7,1804603682),u=c(u,n,e,s,x[i+13],12,-40341101),s=c(s,u,n,e,x[i+14],17,-1502002290),e=c(e,s,u,n,x[i+15],22,1236535329),n=l(n,e,s,u,x[i+1],5,-165796510),u=l(u,n,e,s,x[i+6],9,-1069501632),s=l(s,u,n,e,x[i+11],14,643717713),e=l(e,s,u,n,x[i+0],20,-373897302),n=l(n,e,s,u,x[i+5],5,-701558691),u=l(u,n,e,s,x[i+10],9,38016083),s=l(s,u,n,e,x[i+15],14,-660478335),e=l(e,s,u,n,x[i+4],20,-405537848),n=l(n,e,s,u,x[i+9],5,568446438),u=l(u,n,e,s,x[i+14],9,-1019803690),s=l(s,u,n,e,x[i+3],14,-187363961),e=l(e,s,u,n,x[i+8],20,1163531501),n=l(n,e,s,u,x[i+13],5,-1444681467),u=l(u,n,e,s,x[i+2],9,-51403784),s=l(s,u,n,e,x[i+7],14,1735328473),e=l(e,s,u,n,x[i+12],20,-1926607734),n=f(n,e,s,u,x[i+5],4,-378558),u=f(u,n,e,s,x[i+8],11,-2022574463),s=f(s,u,n,e,x[i+11],16,1839030562),e=f(e,s,u,n,x[i+14],23,-35309556),n=f(n,e,s,u,x[i+1],4,-1530992060),u=f(u,n,e,s,x[i+4],11,1272893353),s=f(s,u,n,e,x[i+7],16,-155497632),e=f(e,s,u,n,x[i+10],23,-1094730640),n=f(n,e,s,u,x[i+13],4,681279174),u=f(u,n,e,s,x[i+0],11,-358537222),s=f(s,u,n,e,x[i+3],16,-722521979),e=f(e,s,u,n,x[i+6],23,76029189),n=f(n,e,s,u,x[i+9],4,-640364487),u=f(u,n,e,s,x[i+12],11,-421815835),s=f(s,u,n,e,x[i+15],16,530742520),e=f(e,s,u,n,x[i+2],23,-995338651),n=p(n,e,s,u,x[i+0],6,-198630844),u=p(u,n,e,s,x[i+7],10,1126891415),s=p(s,u,n,e,x[i+14],15,-1416354905),e=p(e,s,u,n,x[i+5],21,-57434055),n=p(n,e,s,u,x[i+12],6,1700485571),u=p(u,n,e,s,x[i+3],10,-1894986606),s=p(s,u,n,e,x[i+10],15,-1051523),e=p(e,s,u,n,x[i+1],21,-2054922799),n=p(n,e,s,u,x[i+8],6,1873313359),u=p(u,n,e,s,x[i+15],10,-30611744),s=p(s,u,n,e,x[i+6],15,-1560198380),e=p(e,s,u,n,x[i+13],21,1309151649),n=p(n,e,s,u,x[i+4],6,-145523070),u=p(u,n,e,s,x[i+11],10,-1120210379),s=p(s,u,n,e,x[i+2],15,718787259),e=p(e,s,u,n,x[i+9],21,-343485551),n=a(n,d),e=a(e,v),s=a(s,m),u=a(u,$)}return o(n)+o(e)+o(s)+o(u)}$(document).ready(function(){m()});var v={init:function(){},getCode:function(i){var t=e(),n=$("#phone").val()+t+"register",o=d(n),r={params:"",phone:$("#phone").val(),oper:"register",secretKey:o},a=urlSearch();$.ajax({type:"post",contentType:"application/json",url:a+"/system/rest/sendSms/getVerifyCode",datatype:"json",data:JSON.stringify(r),success:function(t){__form.countCodeSignUp(i)},complete:function(){},error:function(i){"200"!=i[0].status&&new $.flavr({content:"获取验证码失败.",autoclose:!0,buttons:{close:{text:"确定"}},timeout:5e3})}})},registe:function(){var i={loginId:$.trim($("#phone").val()),verifyCode:$.trim($("#vcode").val()),password:d($.trim($("#password").val()))},t=urlSearch();$.ajax({type:"post",contentType:"application/json",url:t+"/system/rest/wxUser/register",datatype:"json",data:JSON.stringify(i),success:function(i){0==i?(new $.flavr({content:"注册成功，请登录.",autoclose:!0,buttons:{close:{text:"确定"}},timeout:5e3}),setTimeout(function(){window.location.href="sign_in.html"},2e3)):new $.flavr({content:i.MSG,autoclose:!0,buttons:{close:{text:"确定"}},timeout:5e3})},complete:function(){},error:function(i){0!=i&&new $.flavr({content:i.MSG,autoclose:!0,buttons:{close:{text:"确定"}},timeout:5e3})}})}},m=function(){$(".timenum").on("click",function(){var i=$(this);__validate.isPhone($("input[name='phone']"))&&v.getCode(i)}),$(".sign_up").on("click",function(){var i=$(this);__validate.isPhone($("input[name='phone']"))&&__validate.isVcode($("input[name='vcode']"))&&__validate.isPassword($("input[name='password']"))&&__validate.isPassword2($("input[name='password2']"))&&__validate.isPasswordSame($("input[name='password']").val(),$("input[name='password2']").val())&&v.registe(i)})},h="0123456789abcdef"}(window,document);