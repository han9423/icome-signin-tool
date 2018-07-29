jQuery.extend(jQuery.validator.messages, {
    required: "必选字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: jQuery.validator.format("长度最多是 {0} "),
    minlength: jQuery.validator.format("长度最少是 {0} "),
    rangelength: jQuery.validator.format("长度介于 {0} 和 {1} 之间"),
    range: jQuery.validator.format("介于 {0} 和 {1} 之间"),
    max: jQuery.validator.format("最大为{0} "),
    min: jQuery.validator.format("最小为{0} ")
  });

$("#form").validate({
    rules:{
        username:{
            required:true,
        },
        stu_id:{
            required:true,
            digits:true,
            minlength: 9,
            maxlength:11
        },
        password:{
            required:true,
            minlength: 8,
        }   
        
    },
    messages:{
        username:{
            required:"请输入用户名",
        },
        stu_id:{
            required:"请输入学生号",
            minlength: "学生号为10位"
        },
        password:{
            required:"请输入密码",
            minlength:"密码长度至少8位"
        }

    },
    errorPlacement: function(error, element) {  
        $(element).parent().next().append(error);
    }
})

$.validator.addMethod("nospace",function(value,element,param){   
    return value.match(/\s/g) ? false:true;
},"不能包含空格");

$(".reg_container").validate({
    rules:{
        reg_username: {
            required: true,
            nospace : true,
        },
        reg_password: {
            required: true,
            minlength: 8,
        },
        reg_student:{
            required: true,
            digits:true,
            minlength: 9,
            maxlength:11
        },
        reg_qq:{
            required : true,
            digits:true,
        },
        reg_mobile:{
            required : true,
            digits:true,
        }
    },
    messages:{
        reg_username:{
            required: "请输入用户名",
        },
        reg_password: {
            required: "请输入密码",
            minlength:"密码长度至少8位",
        },
        reg_qq:{
            required: "请输入qq账号",
        }
    },
    errorPlacement: function(error, element) {  
        $(element).parent().next().append(error);
    }
})




