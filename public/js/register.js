/**
 * Created by hardy on 17-1-6.
 */

var Registerfunc = function () {
    $("#registerSubmit").click(function () {
        var uname = $("#uname").val().trim();
        var upwd = $("#upwd").val().trim();
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/register',
            data: {uname: uname, upwd: upwd},
            success: function (msg) {
                if(msg.code == 200){
                    window.location.href='/index';
                }
                else if(msg.code == 2){
                    $("#lname").attr('style', '{display: block}');
                }
            },
            error: function (msg) {
                alert("未知错误,请重试");
            }
        });
    });
};

$(document).ready(function(){
    Registerfunc();
});