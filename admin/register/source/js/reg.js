
var host = "http://47.56.135.195"
var url = {
	//regcode:host+'/Home/user/send_sms',   // 手机验证码 
	regcode: host + '/api/login/sendSecurityCode',   // 手机验证码 
	//regshuju:host+'/Home/user/register'   // 注册数据提交
	regshuju: host + '/api/login/register' ,  // 注册数据提交
	regsxieyi:host + '/api/config/read.htm'  //注册协议接口
};
tjuser 
var Numbererweima = GetQueryString("tjuser");
$('#tjuser').val(Numbererweima);
   if(!Numbererweima){
   	layer.open({
   	  style: 'border:none; background-color:#404040; color:#fff;',
   	  content:"邀请码错误", // 邀请码错误
   	  shadeClose: false,
   	})
   }
var Verification = $('#sub'),
	register = $('#submit'),
	realname = $('input[name="userName"]'),
	PhoneNumber = $('input[name="phone"]'),
	PassWord = $('input[name="pwd"]'),
	ConfirmPW = $('input[name="paw2"]'),
	VerificaNum = $('input[name="code"]');
Verification.bind('click', function () {
	getCode();
});
function getCode() {
	// var Phonexinxin = PhoneNumber.val();
	if (!PhoneNumber.val()) {
		LayerOpen("账号不能为空")
		return
	}
	if (!PhoneCode(PhoneNumber.val())) {
		LayerOpen("手机号格式不正确")
		return
	}
	if (!pwd(PassWord.val())) {
		LayerOpen("密码格式有误"); // 密码格式有误
		return;
	}
	if (ConfirmPW.val() != PassWord.val()) {
		LayerOpen("两次输入的密码不一致，请重新输入"); // 两次输入的密码不一致，请重新输入
		return;
	}
	$.post(url.regcode, {
		phone: PhoneNumber.val(),
		type: "REGISTER"
	}, function (data) {
		LayerOpen(data.msg);
		if (data.code != "0" && data.code != "100 0000 0008") {
			LayerOpen(data.msg);
			return false;
		}

		// LayerOpen("验证码已发送");
		$("#sub").unbind("click");
		var num = 60;

		// console.log(11)
		var time = setInterval(function () {
			num
			$("#sub").html(num-- + "后重新发送"); // 后重新发送
			if (num <= 0) {
				// $("#sub").prop('disabled', false)
				$("#sub").html("重新发送")
				clearTimeout(time);
				$("#sub").bind("click", getCode);
			}

		}, 1000);
	})
}
// 注册
register.click(function () {

	if (!PhoneNumber.val()) {
		LayerOpen("账号不能为空"); // 账号不能为空
		return;
	}
	if (!VerificaNum.val()) {
		LayerOpen("验证码不能为空"); // 验证码不能为空
		return;
	};
	if (!pwd(PassWord.val())) {
		LayerOpen("密码格式有误"); // 密码格式有误
		return;
	}
	if (ConfirmPW.val() != PassWord.val()) {
		LayerOpen("两次输入的密码不一致，请重新输入"); // 两次输入的密码不一致，请重新输入
		return;
	}
	var _data = {
		password: $.md5((PassWord.val())),//密码
		phone: PhoneNumber.val(),  //手机号
		code: VerificaNum.val(),  //验证码
		invitationCode: $('#tjuser').val()   //推荐码
	};
	$.post(url.regshuju, _data, function (data) {
		if (data.code == "0") {
			LayerOpen("注册成功"); // 注册成功
			setTimeout(function () {
				// window.location.href = 'http://'+window.location.host+'/wap/index.html#/Login';
				// window.location.href = 'https://admin.faceke.com/upload/?id=Cf3161894782'; 
				// window.location.href = 'https://www.baidu.com/'  // 测试跳转用
			}, 500)
		} else {
			LayerOpen(data.msg);
			//  LayerOpen("验证码输入错误");
		}
	})
})
//登录密码确认密码眼睛闭合切换
// var count = 0;
// function showhide() {
// 	count++
// 	$('.eyes').toggleClass('close open')
// 	if (count % 2 != 0) {
// 		$('.pwd').prop('type', 'text');
// 	} else {
// 		$('.pwd').prop('type', 'password');
// 	}
// }
// var count2 = 0;
// function showtoggle() {
// 	count2++
// 	$('.saw').toggleClass('nosee see')
// 	if (count2 % 2 != 0) {
// 		$('.pwd2').prop('type', 'text');
// 	} else {
// 		$('.pwd2').prop('type', 'password');
// 	}
// }
function showtoggle(name) {
	var inType = $(name).attr("type");
	if (inType == "password") {
		$(name).attr("type", "text");
		$(name).siblings(".eyes").removeClass("close").addClass("open");
	} else {
		$(name).attr("type", "password");
		$(name).siblings(".eyes").removeClass("open").addClass("close");
	}
}

function LayerOpen(conentta) {
	layer.open({
		style: 'border:none; background-color:#404040; color:#fff;',
		content: conentta,
		time: 2
	})
};
function PhoneCode(num) {
	var reg = /^1[0-9]{10}$/;
	if (!reg.test(num)) {
		return false
	} else {
		return true
	}
	// if(isNaN(num)){
	// 	return "请输入正确的格式"  // 请输入正确的格式  
	// }else{
	// 	if(!reg.test(num)){
	// 		return "手机号格式不对"; // 手机号格式不对
	// 	}
	// 	return true;
	// }
}

function email(em) {
	// var ema = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if (!ema.test(em)) {
		return false;
	} else {
		return true;
	}
}

function pwd(val) {
	// var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;//6-10位数字字母
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
//显示遮罩弹窗
function shows(){
	$(".dislog").css("display","block");
	
	$.post(url.regsxieyi,function (data) {
		var xieyi= document.getElementById("cont_dis")
		if (data.code == "0") {
			xieyi.innerHTML = data.data.agreement
			// $("#cont_dis").html(data.data.agreement)
			// LayerOpen("注册协议获取成功"); 
		} else {
			LayerOpen(data.msg);
		}
	})
}
		//隐藏遮罩弹窗
function nones(){
	$(".dislog").css("display","none");
}
	function submits(){
			window.location="https://blog.csdn.net/qq_35695041";
		}
		//取消
			function cances(){
				$(".dislog").css("display","none");
			}
		
