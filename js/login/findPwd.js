$(function(){
	$("body").prepend("<div id='header'></div>");
	$("body").append("<div id='footer'></div>");
	$("#header").load("/no5/html/common/header.html");
	$("#footer").load("/no5/html/common/footer.html");
	$.getScript("/no5/js/common.js");
	Creatcode();
})

function Creatcode(){//生成验证码
	var reg = [0,1,2,3,4,5,6,7,8,9];
	var str = "";
	for(var i=0;i<4;i++){
		var index = parseInt((Math.random())*10);
		str += index;
	}
	$(".code span").html(str);
}

$("#next").click(function(){
	var $useName = $("#useName").val();
	var $code = $("#code").val();
	var info = JSON.parse(localStorage.getItem($useName));
	if($useName==""){
		return alert("请输入用户名")
	}else if($code == ""){
		return alert("请输入校验码")
	}else if(!info){
		return alert("用户名不正确")
	}else if($code != $("#code").next().html()){
		return alert("校验码错误")
	}else{
		var pwd = info.pwd;
		$("#main").css({"display":"none"});
		$("#pwd").css({"display":"block"}).children().html("您的密码为"+pwd);
	}
})