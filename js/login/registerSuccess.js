$(function(){
	$("body").prepend("<div id='header'></div>");
	$("body").append("<div id='footer'></div>");
	$("#header").load("/no5/html/common/header.html");
	$("#footer").load("/no5/html/common/footer.html");
	$.getScript("/no5/js/common.js");
})
var href = location.href;
var info = href.split("?")[1].split("&");
var name = info[0].split("=")[1];
var email = info[1].split("=")[1];
var tag = $("#success p span");
tag.eq(0).html(name)
tag.eq(1).html(email)
