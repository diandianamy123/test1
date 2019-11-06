var host = "http://www.ioaex.com"
var url = {
	regcode:host+'/home/qbw/send_sms',   //验证嘛
	regshuju:host+'/home/qbw/register'   //注册数据提交
};
//tjuser 
var Numbererweima = GetQueryString("tjuser");
$('#tjuser').val(Numbererweima);
   if(!Numbererweima){
   	layer.open({
   	  style: 'border:none; background-color:#404040; color:#fff;',
   	  content:"邀请码错误",
   	  shadeClose: false,
   	})
   }
var Verification = $('#code'),
	register = $('#submit'),
	PhoneNumber = $('input[name="phone"]'),
	PassWord = $('input[name="pwd"]'),
	ConfirmPW = $('input[name="paw2"]'),
	VerificaNum = $('input[name="code"]');
	Verification.click(function(){
		getCode();
	});

   function getCode(){
		var Phonexinxin = PhoneCode(PhoneNumber.val());
		if(Phonexinxin !== true){
			LayerOpen(Phonexinxin);
			return ;
		}else{
			var Phonexinxin = PhoneCode(PhoneNumber.val());
			if(Phonexinxin !== true){
				LayerOpen(Phonexinxin);
				return ;
			}
	};
	$.post(url.regcode,{
		mobile:PhoneNumber.val(),
		type:1
	},function(data){
		LayerOpen(data.msg);
		if(data.status != "200"){			
			return false;
		}
		$(".code span").css({"background":"#ddd","color":"#444"}).html("60秒重新发送").unbind("click");
		var num=59;
		var time=setInterval(function(){
              $(".code span").html(num-- + "后重新发送");
              if(num<0){
              	clearTimeout(time);
              	$(".code span").css({"background":"#e4393c","color":"#fff"}).html("重新发送");
              	$(".code span").bind("click",getCode);
              }
		},1000);
	});
	
}


register.click(function(){
	if(!PhoneNumber.val()){
		LayerOpen("手机号不能为空");
		return ;
	}else{
		var Phonexinxin = PhoneCode(PhoneNumber.val());
		if(Phonexinxin !== true){
			LayerOpen(Phonexinxin);
			return ;
		}
	};
	if (!VerificaNum.val()) {
		LayerOpen("验证码不能为空");
		return ;
	};
	if (!pwd(PassWord.val())) {
		LayerOpen("密码格式有误");
		return ;
	}
	if (ConfirmPW.val() != PassWord.val()){
		LayerOpen("两次输入的密码不一致，请重新输入");
		return ;
	}

	var _data={
		opwd:   PassWord.val(),//密码
		opwd1: ConfirmPW.val(),  //确认密码 
		mobile: PhoneNumber.val(),  //手机号
		code: VerificaNum.val(),  //验证码
		tjuser: $('#tjuser').val()   //推荐码
	};
	$.post(url.regshuju,_data,function(data){
		if(data.status == "200"){
			LayerOpen("注册成功");
				setTimeout(function(){
					window.location.href = 'https://admin.xjqgsp.com/upload/?id=De3149187481';
				},500)
		}else{
			LayerOpen(data.msg);
		}
	})
})
function LayerOpen(conentta){
	layer.open({
	  style: 'border:none; background-color:#404040; color:#fff;',
	  content:conentta,
	  time:2
	})
};
function PhoneCode(num){
	var reg = /^1[0-9]{10}$/;
	if(isNaN(num)){
		return "请输入正确的格式"
	}else{
		if(!reg.test(num)){
			return "手机号格式不对";
		}
		return true;
	}
}

function pwd ( val ){
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
	return reg.test(val);
}

/*url地址参数获取*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&|)" + name + "=([^&?]*)(&|$|)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
        context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
}