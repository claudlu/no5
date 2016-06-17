$(function(){
	$("body").prepend("<div id='header'></div>");
	$("body").append("<div id='footer'></div>");
	$("#header").load("/no5/html/common/header.html");
	$("#footer").load("/no5/html/common/footer.html");
	$.getScript("/no5/js/common.js");
})
var $useName = $("#useName");
var $oldPwd = $("#oldPwd");
var $newPwd = $("#newPwd");
var $aNewPwd = $("#aNewPwd");
$("#change").click(function(){
	if(checkOldPwd()&checkNewPwd()&checkANewPwd()&checkUseName()){
		var info =JSON.parse(localStorage.getItem($useName.val()));
		if(info){
			info.pwd = $newPwd.val();
			localStorage.setItem($useName.val(),JSON.stringify(info));
			$(".changePwd").css({"display":"none"});
			$(".changeSuccess").css({"display":"block"})
		}
	}
})
function checkUseName(){
	$useName.next().html("");
	if($useName.val()==""){
		$useName.next().html("请您输入用户名");
		return false
	}else if(localStorage.getItem($useName.val())){
		return true
	}else{
		$useName.next().html("用户不存在");
		return false
	}
}
function checkOldPwd(){
	$oldPwd.next().html("");
	if($oldPwd.val()==""){
		$oldPwd.next().html("请您输入原密码");
		return false
	}else if(checkUseName()){
		var info =JSON.parse(localStorage.getItem($useName.val()));
		var lodPwd = info.pwd;
		if($oldPwd.val() != lodPwd){
			$oldPwd.next().html("原密码错误")
			return false
		}
		return true
	}else{
		return false;
	}
}
function checkNewPwd(){
	$newPwd.next().html("")
	var req = /^[a-z0-9_-]{6,16}$/;
	if(req.test($newPwd.val())){
		return true
	}else{
		$newPwd.next().html("新密码不符合规则，6～16位，建议使用字母、数字、特殊字符组合")
		return false
	}
}
function checkANewPwd(){
	$aNewPwd.next().html("")
	if($aNewPwd.val() != $newPwd.val()){
		$aNewPwd.next().html("两次输入的密码不一致");
		return false
	}
	return true
}
