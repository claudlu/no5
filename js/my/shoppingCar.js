$(function(){
	getData();
//	localStorage.clear()
})
function getData() {  //查询购物车数据
    var html = "";
    var id = 0;
    var total = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);//找到每一个key
        if (key.indexOf("shop") != -1) {  //找到满足条件的key
        	id++;
            var info = JSON.parse(localStorage.getItem(key)); // 找到满足条件的对象
            html = $('<ul><li>'+id+'</li><li><a href="">'+info.intro+'</a></li><li>75ml</li><li>60</li><li>No5</li><li><input type="text" class="num" data-id='+info.id+' value="'+info.total+'" /></li><li>'+info.total*info.price+'</li><li><a href="">转入收藏夹</a></li><li><a class="delete" data-id='+info.id+'>删除</a></li></ul>')
            $(".main").append(html);
            total += info.total*info.price;
        }
    }
    $("#total").html(total);
}
$(document).on("click",".delete",function(){//删除操作
    $(this).parent().parent().remove();
    var key = $(this).attr("data-id");
    var id = 0;
    var total = 0;
    localStorage.removeItem(key);
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);//找到每一个key
        if (key.indexOf("shop") != -1) {  //找到满足条件的key
        	id++;
            var info = JSON.parse(localStorage.getItem(key)); // 找到满足条件的对象
            total += info.total*info.price;
        }
    }
	$("#total").html(total);
});
$(document).on("blur",".num",function(){
	var num = $(this).val();
	var beforNum = 0;
	var total = $("#total").html()*(1);
	var id = $(this).attr("data-id");
	var info = JSON.parse(localStorage.getItem(id));
	beforNum = info.total;
	info.total = num;
	$(this).parent().next().html(num*info.price)
	localStorage.setItem(id,JSON.stringify(info));
	total = total - beforNum*info.price + info.price*num;
	$("#total").html(total);
})

$("#go").click(function(){//下订单
	location.href = chec()?"/no5/html/my/submitOrder.html":"/no5/html/login/login.html"
})

function chec(){
	for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);//找到每一个key
        var content = 0
        if (key.indexOf("logIn_") != -1) {  //找到满足条件的key
        	content++
        	return true;
        }
    }
	if(content==0){
		return false;
	}
}
