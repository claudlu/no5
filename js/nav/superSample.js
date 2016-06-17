$(function(){
	$("body").prepend("<div id='header'></div>");
	$("body").append("<div id='footer'></div>");
	$("#header").load("/no5/html/common/header.html");
	$("#footer").load("/no5/html/common/footer.html");
	$.getScript("/no5/js/common.js");
})

/*侧边*/
$.ajax({//左侧导航
	type:"get",
	url:"/no5/data/nav/side.json",
	dataType: "json",
	success : function(data){
		var $html = $(".side-nav");
		for(var i=0;i<data.length;i++){
			var $ul = $("<ul class='side-connect'></ul>");
			var title = data[i].sideNav;
			var num = data[i].num;
			var content = data[i].content;
			$html.append("<h3><span class='close'></span>"+title+"<span>(<i>"+num+"</i>)</span></h3>");
			$html.append($ul);
			for(var j=0;j<content.length;j++){
				var connect = content[j].connect;
				var cNum = content[j].cNum;
				$ul.append("<li><a href=''>"+connect+"<span>(<i>"+cNum+"</i>)</a></li>")
			}
			$html.append($ul);
		}
	}
});
$(document).on('click','h3',function(){
	$(this).next().toggle()
});
$.ajax({//左侧一周销量
	type:"get",
	url:"/no5/data/nav/weekSell.json",
	dataType: "json",
	success : function(data){
		var $html = $(".side-ranking");
		for(var i=0;i<data.length;i++){
			var img = data[i].img;
			var intro = data[i].intro.substring(0,22)+"...";
			var price = (data[i].price*(1)).toFixed(2);
			$html.append("<dl><dt><img src='"+img+"'/></dt><dd><p id='rank-intro'>"+intro+"</p><span>￥<b>"+price+"</b></span></dd></dl>")
		}
	}
});
$.ajax({//左侧其他购买
	type:"get",
	url:"/no5/data/nav/othersSee.json",
	dataType: "json",
	success : function(data){
		var $html = $(".side-othersBuy");
		for(var i=0;i<data.length;i++){
			var img = data[i].img;
			var intro = data[i].intro.substring(0,22);
			var price = (data[i].price*(1)).toFixed(2);
			$html.append("<dl><dt><img src='"+img+"'/></dt><dd><p>"+intro+"</p><span>￥<b>"+price+"</b></span></dd></dl>")
		}
	}
});
/*主内容*/
getAllTotal();
$.ajax({
	type: "get",
	url: "/no5/data/nav/superSample/content.json",
	async:true,
	dataType : "json",
	success : function(data){
		var html = "";
		for(var i =0;i<data.length;i++){
			var id = data[i].id;
			var img = data[i].img;
			var intro = data[i].intro;
			var price = (data[i].price* (1)).toFixed(2);
			var discount = data[i].discount;
			html += "<div><img class='tag' src= "+img+"/><p>"+intro+"</p><div>￥<b>"+price+"</b>(<span>"+discount+"</span>折)</div><div><a class='buy' data-id='shop_"+id+"' data-price= '"+price+"' data-img='"+img+"' data-intro='"+intro+"' data-discount='"+discount+"'>加入购物车</a><a>收藏</a></div></div>"
		}
		$(".main-content").html(html);
	}
});

$(document).on("click", ".buy", function () {//记录购物车
    var id = $(this).attr("data-id");
    var price = $(this).attr("data-price");
    var img = $(this).attr("data-img");
    var intro = $(this).attr("data-intro");
    var discount = $(this).attr("data-discount");
    var total = 1;
    var exist = JSON.parse(localStorage.getItem(id));
    if (exist) {
        total = exist.total * (1) + 1;
    }
    var info = {
    		id:id,  
    		price: price, 
    		img: img, 
    		intro: intro, 
    		total: total
    };
    localStorage.setItem(id, JSON.stringify(info));
    getAllTotal()
    var imgTop = $(this).offset().top-200
    var imgLeft = $(this).offset().left
    var newImg = $("<img class='newImg' src= "+img+" style='top:" +imgTop+"px;left: "+imgLeft+"px;position: absolute;'/>")
	$("body").append(newImg)
	var tagLeft = $(".h-l-shopCar").offset().left
	var tagTop = $(".h-l-shopCar").offset().top
    $(".newImg").animate({"left":tagLeft+"px","top":tagTop+"px"},1000)
    setTimeout(function(){
    	$(".newImg").remove()
    },1000)
})

$(document).on("click", ".tag", function (){
	location.href = "/no5/html/nav/detial.html"
})

function getAllTotal(){//刷新购物车
    var total = 0;
    for (var i = 0;i<localStorage.length;i++){ //循环多少条数据
        var key = localStorage.key(i); //找到每一个key
        //然后判断key是否满足条件
        if (key.indexOf("ship_")!=-1){
            var info =JSON.parse(localStorage.getItem(key));
            total+=info.total;
        }
    }
    $("#shoppingCar").html(+total);
}


 

