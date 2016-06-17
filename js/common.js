$(function(){
	myAccount();
	sort();
	getAllTotal(); 
	logIn();
})

/*我的账户*/
function myAccount(){//我的账户下拉
	var $myAccount = $(".head-t-info ul .myAccount");
	$myAccount.mouseover(function(){
		$myAccount.find("ul").css({"display":"block"});
	}).mouseout(function(){
		$myAccount.find("ul").css({"display":"none"});
	})
}
/*全部商品分类*/
function sort(){//商品分类下拉
	$("#allSort").mouseover(function(){
		$("#h-sort").stop().slideDown(100);
	}).mouseleave(function(){
		$("#h-sort").stop().slideUp(100)
	});
	
	
	$("#h-sort .tagSort").mouseover(function(){
		$(this).find(".second").show();
	}).mouseout(function(){
		$(this).find(".second").hide();
	})
}


/*刷新购物车*/
function getAllTotal(){
    var total = 0;
    for (var i = 0;i<localStorage.length;i++){ //循环多少条数据
        var key = localStorage.key(i); //找到每一个key
        //然后判断key是否满足条件
        if (key.indexOf("shop_")!=-1){
            var info =JSON.parse(localStorage.getItem(key));
            total+=info.total*(1);
        }
    }
    $("#shoppingCar").html(total);
}

$(".h-l-shopCar").click(function(){
	window.open("/no5/html/my/shoppingCar.html")
});

/*已登录*/
function logIn(){
	for(var i = 0;i<localStorage.length;i++){
		var key = localStorage.key(i)
		if(key.indexOf("logIn_") != -1){
			var info = JSON.parse(localStorage.getItem(key));
			$(".logIner").css({"display":"block"}).find("span").html(info.userName)
			$(".logRegister").css({"display":"none"})
		}
	}
}

$(".logIner a").click(function(){
	for(var i = 0;i<localStorage.length;i++){
		var key = localStorage.key(i)
		if(key.indexOf("logIn_")!= -1){
			localStorage.removeItem(key);
			$(".logRegister").css({"display":"block"});
			$(".logIner").css({"display":"none"})
		}
	}
})
