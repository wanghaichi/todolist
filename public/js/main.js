/**
 * Created by hardy on 17-1-5.
 */

var addFunc = function(){
    $("span.glyphicon.glyphicon-star-empty.ab-gd-img").hover(function () {
        $(this).css("color", "#46b8da");
    }, function () {
        $(this).css("color", "#c9c9c9");
    });
    $("#bsubmit").click(function(){
        var val = $("#binput").val().trim();
        if(val.length < 1){

        }
        else{
            $.ajax({
                url: "/add",
                type: "post",
                dataType: "json",
                data: {content: val},
                success: function(){
                    window.location.reload();
                },
                error: function(){

                }
            });
        }
    });
    $("span.glyphicon.glyphicon-star-empty.ab-gd-img").click(function(){
        var tid = $(this).attr('id');
        $.ajax({
            url: "/finished",
            type: "post",
            dataType: "json",
            data: {id: tid},
            success: function(){
                // alert("hhhh");
                window.location.reload();
            },
            error: function(){

            }
        });
    });
};

$(document).ready(function () {
    addFunc();
});
