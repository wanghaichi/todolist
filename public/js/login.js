/**
 * Created by hardy on 17-1-6.
 */

var Loginfunc = function () {
    $("#LoginSubmit").click(function () {
        var uname = $("#uname").val().trim();
        var upwd = $("#upwd").val().trim();
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/login',
            data: {uname: uname, upwd: upwd},
            success: function (msg) {
                if(msg.code == 200){
                    window.location.href='/index';
                }
                else if(msg.code == 2){
                    alert("用户名或密码错误");
                }
            },
            error: function (msg) {
                alert("未知错误,请重试");
            }
        });
    });
};

$(document).ready(function(){
    Loginfunc();
});