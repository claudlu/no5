$(function(){
	$("body").prepend("<div id='header'></div>");
	$("body").append("<div id='footer'></div>");
	$("#header").load("/no5/html/common/header.html");
	$("#footer").load("/no5/html/common/footer.html");
	$.getScript("/no5/js/common.js");
	limitBuy();
	//选项卡
	$(".shop-nav ul li").mouseover(function(){
		$(this).addClass("sBottom").siblings().removeClass("sBottom");
		var i = $(this).index() + 1;
		$(".shop-content img").attr({"src":"/no5/img/index/shop"+i+".jpg"})
	})
})
/*限时抢购*/
function limitBuy(){
	var $lbImg = $(".limitBuy-info h2 img");
	var $lbMain = $(".limitBuy-main");
	var $lbTop = $("limitBuy-top")
	$lbImg.attr("src","img/index/qiang.jpg");
	for(var i =0;i<3;i++){//生成内容
		var $a = $(".limitBuy-main a").html();
		$lbMain.append("<a>"+$a+"</a>") 
	}
	var timer = setInterval(function (){//倒计时
        var $time = $(".limitBuy-top div")
		var date = new Date();
		var hour =23 - parseInt(date.getHours());
		var min = 60 - parseInt(date.getMinutes());
		var sec =(60 - parseInt(date.getSeconds()))+"."+((1000-date.getMilliseconds()).toString().charAt(0));
      	$time.html(" 剩余<b>"+hour+"</b>小时<b>"+min+"</b>分<b>"+sec+"</b>秒");			
	}, 100);
	
	$.ajax({
		type:"get",
		url:"data/index/limitBuy.json",
		dataType : "json",
		success : function(data){
			var $a = $(".limitBuy-main a");
			$a.each(function(i){
				$(this).find("img").attr("src",data[i].imgSrc);
				$(this).find(".limitBuy-top p").html(data[i].intro)
				$(this).find(".limitBuy-bottom span").html(data[i].price)
				$(this).find(".peo span").html(data[i].people)
			})
		}
	});
}
//楼梯导航
$(window).scroll(function(){//超过位置隐藏
	var top = $(".fix-nav").offset().top
	if(top>=8666){
		$(".fix-nav").hide()
	}else{
		$(".fix-nav").show()
	}
})




	

