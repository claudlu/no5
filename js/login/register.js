$(function(){
	$("body").prepend("<div id='header'></div>");
	$("body").append("<div id='footer'></div>");
	$("#header").load("/no5/html/common/header.html");
	$("#footer").load("/no5/html/common/footer.html");
	$.getScript("/no5/js/common.js");
	checkCode();
	checkIn();
})
var $tag = $(".regist-info div input");
var flag = false;
var mark = 0;
function checkCode(){//生成验证码
	var reg = [0,1,2,3,4,5,6,7,8,9];
	var str = "";
	for(var i=0;i<4;i++){
		var index = parseInt((Math.random())*10);
		str += index;
	}
	$("#code").html(str);
}

function check(){//验证
	mark = 0;
	useName($tag.eq(0));
	pasword($tag.eq(1));
	paswordAgain($tag.eq(2));
	email($tag.eq(3));
	cheCode($tag.eq(4));
	agree();
	return flag = (!mark)?true : false ;
}

function checkIn(){//失焦判断
	$tag.eq(0).focus(function(){//用户名
		$(this).next().next().show().html("3~30位，由汉字，字母，数字，点，减号，下划线及“@”组成").css({"color":"#000"});
	}).blur(function(){
		useName($(this));
	});
	$tag.eq(1).focus(function(){//密码
		$(this).next().next().show().html("6~16位，建议使用字母，数字，特殊字母组合").css({"color":"#000"});
	}).blur(function(){
		pasword($(this));
	});
	$tag.eq(2).blur(function(){//再次输入密码
		paswordAgain($(this));
	});
	$tag.eq(3).blur(function(){//邮箱
		email($(this));
	});
	$tag.eq(4).blur(function(){//验证码
		cheCode($(this));
	});
}

function useName(tag){//用户名验证
	var value = tag.val();
	var reg = /^[a-z0-9_-]{3,30}$/;
	if(localStorage.getItem(value)){
		tag.next().css({"display":"none"}).next().show().html("用户名已存在！").css({"color":"red"});
		mark--;
		return flag = false;
	}else if(reg.test(value)){
		tag.next().css({"display":"block"}).next().hide();
		return flag = true;
	}
	else{
		tag.next().css({"display":"none"}).next().show().html("用户名的长度应为3～30个字符之间(汉字占两个字符)！").css({"color":"red"});
		mark--;
		return flag = false;
	}
}

function pasword(tag){//密码验证
	var value = tag.val();
	var reg = /^[a-z0-9_-]{6,16}$/;
	if(reg.test(value)){
		tag.next().css({"display":"block"}).next().hide();
		return flag = true;
	}else{
		tag.next().css({"display":"none"}).next().show().html("密码的长度应该为6～16个字符之间！").css({"color":"red"});
		mark--;
		return flag = false;
	}
}

function paswordAgain(tag){//再次输入密码验证
	var value = tag.val();
	if(value == ""){
		tag.next().css({"display":"none"}).next().show().html("请您再输入一次密码").css({"color":"red"});
		mark--;
		return flag = false;
	}else if(value == $tag.eq(1).val()){
		tag.next().css({"display":"block"}).next().hide();
		return flag = true;
	}else{
		tag.next().css({"display":"none"}).next().show().html("两次输入的密码不一致，请重新输入！").css({"color":"red"});
		mark--;
		return flag = false;
	}
}

function email(tag){//邮箱验证
	var value = tag.val();
	var reg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
	if(value == ""){
		tag.next().css({"display":"none"}).next().show().html("请您输入邮件地址！").css({"color":"red"});
		mark--;
		return flag = false;
	}else if(reg.test(value)){
		tag.next().css({"display":"block"}).next().hide();
		return flag = true;
	}else{
		tag.next().css({"display":"none"}).next().show().html("邮件地址的格式不正确，请您重新输入！").css({"color":"red"});
		mark--;
		return flag = false;
	}
}

function cheCode(tag){//验证码验证
	var value = tag.val();
	if(value == ""){
		tag.next().next().css({"display":"none"}).next().show().html("请您输入验证码！").css({"color":"red"});
		mark--;
		return flag = false;
	}else if(value == tag.next().html()){
		tag.next().next().css({"display":"block"}).next().hide();
		return flag = true;
	}else{
		tag.next().next().css({"display":"none"}).next().show().html("验证码错误，请重新输入！").css({"color":"red"});
		mark--;
		return flag = false;
	}
}

function agree(){
	var tag = $(".agree input");
	if(tag.is(':checked')){
		tag.next().next().hide();
		flag = true;
	}else{
		tag.next().next().show().html("请接受服务条款！").css({"color":"red"});
		mark--;
		return flag = false;
	}
}

$("#regBtn").click(function(){//注册
	if(check()){
        var userName = $tag.eq(0).val();
        var pwd = $tag.eq(1).val();
        var email = $tag.eq(3).val();
		var info =  {
			"userName" : userName,
			"pwd" : pwd,
			"email" : email
		}
        localStorage.setItem(userName,JSON.stringify(info));
        location.href = "/no5/html/login/registerSuccess.html?userName="+userName+"&email="+email;
	}
})