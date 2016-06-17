$(function(){
	$("body").prepend("<div id='header'></div>");
	$("body").append("<div id='footer'></div>");
	$("#header").load("/no5/html/common/header.html");
	$("#footer").load("/no5/html/common/footer.html");
	$.getScript("/no5/js/common.js");
})
/*放大镜*/
var smallLi = $("#small ul li");
var middle = $("#middle");
var middleImg = $("#middle img");
var contentRight = $("#content-right");
var bigImg = $("#content-right img");
var glass = $("#glass");
//获取放大镜大小
var contentRightWidth =contentRight.width();
var contentRightHeight = contentRight.height();
var middleWidth = contentRight.width();
var middleHeight = contentRight.height();
var glassWidth = contentRightWidth/bigImg.width()*middleWidth;
var glassHeight = contentRightHeight/bigImg.height()*middleHeight;
glassWidth = 200;
glassHeight = 200;
smallLi.each(function(i){
	$(this).mouseover(function(){
		middleImg.attr("src","/no5/img/nav/detail/00"+(i+1)+".jpg")
		bigImg.attr("src","/no5/img/nav/detail/0"+(i+1)+".jpg")
	})
})
middle.mouseover(function(){
	glass.css({"width":glassWidth+"px","height":glassHeight+"px","display":"block"});
	contentRight.css({"display":"block"});
//	glass.css({"display":"block"});
	$(this).mousemove(function(ev){
		var evt = ev||event
		var x = evt.pageX - middle.offset().left - parseInt(glass.css("width"))/2;
		var y = evt.pageY - middle.offset().top - parseInt(glass.css("height"))/2;
		if(x<=0){
			x=0
		}
		if(x>=parseInt(middle.css("width"))-parseInt(glass.css("width"))){
			x = parseInt(middle.css("width"))-parseInt(glass.css("width"))
		}
		if(y<=0){
			y=0
		}
		if(y>=parseInt(middle.css("height"))-parseInt(glass.css("height"))){
			y = parseInt(middle.css("height"))-parseInt(glass.css("height"));
		}
		glass.css({"left":x+"px","top":y+"px"})
		bigImg.css({"left":(-x*middleWidth/glassWidth)+"px","top":(-y*middleHeight/glassHeight)+"px"})
		console.log(contentRightHeight/bigImg.height()*middleHeight);
//		bigImgWidth = bigImg.width()
	})
}).mouseout(function(){
	contentRight.css({"display":"none"});
	glass.css({"display":"none"});
})

