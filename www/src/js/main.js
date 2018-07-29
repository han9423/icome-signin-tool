(function(){
    class IndexHtml{
        constructor() { 
            this.element = {
                menu: `<div id="menu" class="menu"><div class="header"><div class="user_data"><div class="user_logo"><img src=''/></div><div class="user_name" login="false">未登录</div><div id="status">状态: <span>跑路了</span></div></div></div><div class="main"><ul><li class="comeCount">签到次数:<span>0<span></li><li class="selfShow">算法练习</li><li class="study_rate">项目进度</li><li class="github">github</li><li class="coder">码农老司机</li><li class="demo">其他</li></ul></div></div>`,
                menu_btn: `<ul class="overlapping"><li></li><li></li> </ul>`,
                li: `<li></li><li></li><li></li>`
            };
        }
        dumpOut() {
            $(".menu").show();
            $(".menu_btn").animate({right: "350px"}, 300, function () {
                $(this).empty().append(indexHtml.element.menu_btn);
            });
            $(".cover").addClass("cover_main");
        }
        dumpIn() {
            $(".menu").hide();
            $(".menu_btn").animate({right: "0px"}, 100, function () {
                $(this).empty().append(indexHtml.element.li);
            });
            $(".cover").removeClass("cover_main");
        }
        init(){

            $("body").append(indexHtml.element.menu);
            $(".menu_btn").click(function () {
                $(".menu").is(":visible") ? indexHtml.dumpIn() : indexHtml.dumpOut();
                $(".wrapper_iframe").hide();
            })
            $(".user_name").click(function () {
                if (!$(".wrapper_iframe iframe").attr("src")) {
                    $(".wrapper_iframe iframe").attr("src", "./src/build/iframe.html");
                }
                $(".wrapper_iframe").show();
                indexHtml.dumpIn();
                if($("#one_iframe").is(":visible")){
                    setTimeout(function(){
                        $("#one_iframe")[0].contentWindow.log_btn.click(function(){
                            var promise = new Promise(function(reslove,reject){
                                var iframe_data = $("#one_iframe")[0].contentWindow.get_data;
                                if(!iframe_data){
                                    var timer = setInterval(function(){
                                        iframe_data = $("#one_iframe")[0].contentWindow.get_data;
                                        if(iframe_data){
                                            clearInterval(timer);
                                            reslove(iframe_data);
                                        }
                                        reject(iframe_data);
                                    },200)
                                };
                            })
                            promise.catch((err)=>{}).then((value)=>{
                                $(".user_logo img").attr("src",value.my_header);
                                $(".user_name").text(value.username);
                                $(".signed h3").text(value.username);
                                $(".comeCount span").text(value.countNum);
                                if(!value.hasOwnProperty("none")){
                                    $("#status span").text("在线");
                                }
                                $(".signed h3").after(`<div class='signed_count'>${value.countNum}</div>`)
                            }).then(()=>{
                                $(".signed div").click(function(){
                                    var localCount = parseInt($(this).text());
                                    $(this).text(`${++localCount}`);
                                    $(".comeCount span").text(localCount);
                                    $(this).unbind("click");
                                    $.post("http://localhost:3000/user/reg",{local_count:localCount,username:$(".user_name").text().trim()})
                                })
                            })
                        })
                    },100);
                }
            })
            $(".wrapper_iframe .close_iframe").click(function () {
                $(this).parent().hide();
                $(".wrapper_iframe iframe").removeAttr("src");
            })
            $("#arrange").click(function () {
                location.href = "./src/build/arrange.html";
            })
        }
    }
    let indexHtml = new IndexHtml();
    indexHtml.init();
}())    

