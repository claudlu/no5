$(function(){
	loginCode();
})
var $login = $(".login-left div input");
$login.eq(0).focus(function(){
	$(this).next().hide()
});
$login.eq(1).focus(function(){
	$(this).next().hide()
});
$login.eq(2).focus(function(){
	$(this).next().next().hide()
}).blur(function(){
	checkLoginCode($(this));
});;


function loginCode(){//生成验证码
	var reg = [0,1,2,3,4,5,6,7,8,9];
	var str = "";
	for(var i=0;i<4;i++){
		var index = parseInt((Math.random())*10);
		str += index;
	}
	$("#logCode").html(str);
}

function loginCheck(){
	return checkLoginCode($login.eq(2))&checkName($login.eq(0))&checkPwd($login.eq(1));
}

function checkLoginCode(tag){//验证码验证
	var value = tag.val();
	if(value == ""){
		tag.next().next().show().html("请您输入验证码！").css({"color":"red"});
		return false;
	}else if(value == tag.next().html()){
		tag.next().next().hide();
		return true;
	}else{
		tag.next().next().show().html("验证码错误，请重新输入！").css({"color":"red"});
		return false;
	}
}

function checkName(tag){
	var value = tag.val();
	if(value == ""){
		tag.next().show().html("请您输入用户名！").css({"color":"red"});
		return false;
	}else if(localStorage.getItem(value)){
		tag.next().hide();
		return true;
	}else{
		tag.next().show().html("用户名不存在").css({"color":"red"});
		return false;
	}
}

function checkPwd(tag){
	var value = tag.val();
	var name = $login.eq(0).val()
	var info;
	var infoPwd;
	if(value == ""){
		tag.next().show().html("请您输入密码！").css({"color":"red"});
		return false;
	}else if(localStorage.getItem(name)){
		info =JSON.parse(localStorage.getItem(name));
		infoPwd = info.pwd;
		if(value == infoPwd){
			tag.next().hide();
			return true;
		}else{
			tag.next().show().html("密码错误").css({"color":"red"});
			return false;
		}
	}else{
		return false;
	}
}

$("#logBtn").click(function(){//登录
	var name = $login.eq(0).val()
	if(loginCheck()){
		var info = JSON.parse(localStorage.getItem(name));
		localStorage.setItem("logIn_"+name,JSON.stringify(info));
		location.href = "/no5/index.html";
	}
})