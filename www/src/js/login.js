var get_data;
var log_btn = $("#log");
$("#log").click(function(e){
    e.preventDefault();
    $.post("http://localhost:3000/user/log",{
        username :  $("#username").val(),
        stu_id : $("#stu_id").val(),
        password : $("#password").val(),
    },function(data){
        get_data = data;
        if(!data.hasOwnProperty("none")){
            $("html").append("<p class='notice' style='position: absolute;left: 315px;top:30px;'>登录成功</p>");
            setTimeout(function(){
                $(".notice").remove();
            },2000)
        }else{
            alert(data.none);
        }
    })
})