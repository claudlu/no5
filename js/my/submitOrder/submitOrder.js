$(function(){
	$("body").prepend("<div id='header'></div>");
	$("body").append("<div id='footer'></div>");
	$("#header").load("/no5/html/common/header.html");
	$("#footer").load("/no5/html/common/footer.html");
	$.getScript("/no5/js/common.js");
	email($("#email"));
	getData();
})

$("#orderInfomation").click(function(){//订单人信息
	if($(this).is(':checked')){
		$(this).next().next().show()
	}else{
		$(this).next().next().hide()
	}
})

$(".save a").click(function(){//保存收货人
	if(check()){
		$(".main-info input").attr({"disabled":"disabled"})
	}
})

function check(){
	var a =name($("#useName"));
	var b =phone($("#phone"));
	return (a&&b)?true:false
}

function name(tag){//用户名
	if(tag.val()==""){
		tag.next().html("请输入收货人姓名");
		return false
	}
	tag.next().html("");
	return true
}

function phone(tag){//电话
	var reg =  /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
	if(tag.val()==""){
		tag.next().html("请输入手机号");
		return false
	}else if(!reg.test(tag.val())){
		tag.next().html("手机号格式错误");
		return false
	}
	tag.next().html("");
	return true
}

function email(tag){//邮箱
	for(var i =0;i<localStorage.length;i++){
		var key = localStorage.key(i);
		if(key.indexOf("logIn_")!=-1){
			var info = JSON.parse(localStorage.getItem(key))
			var email = info.email;
//			alert(info)
		}
	}
	tag.val(email)
}

/*三级联动*/
$(function (){
	initComplexArea('seachprov', 'seachcity', 'seachdistrict', area_array, sub_array, '44', '0', '0');
});

//得到地区码
function getAreaID(){
	var area = 0;          
	if($("#seachdistrict").val() != "0"){
		area = $("#seachdistrict").val();                
	}else if ($("#seachcity").val() != "0"){
		area = $("#seachcity").val();
	}else{
		area = $("#seachprov").val();
	}
	return area;
}

//根据地区码查询地区名
function getAreaNamebyID(areaID){
	var areaName = "";
	if(areaID.length == 2){
		areaName = area_array[areaID];
	}else if(areaID.length == 4){
		var index1 = areaID.substring(0, 2);
		areaName = area_array[index1] + " " + sub_array[index1][areaID];
	}else if(areaID.length == 6){
		var index1 = areaID.substring(0, 2);
		var index2 = areaID.substring(0, 4);
		areaName = area_array[index1] + " " + sub_array[index1][index2] + " " + sub_arr[index2][areaID];
	}
	return areaName;
}

/*订单数据*/
function getData() {  //查询购物车数据
    var html = "";
    var id = 0;
    var total = 0;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);//找到每一个key
        if (key.indexOf("shop") != -1) {  //找到满足条件的key
        	id++;
            var info = JSON.parse(localStorage.getItem(key)); // 找到满足条件的对象
            html = $('<ul><li><a href="">'+info.intro+'</a></li><li>75ml</li><li>60</li><li>No5</li><li>'+info.total+'</li><li>'+info.total*info.price+'</li></ul>')
            $(".buyCar-main").append(html);
            total += info.total*info.price;
        }
    }
    $(".buyCar-total span").html(total);
}

$("#subOrder").click(function(){//提交订单
	var id = "";
	for(var i=0;i<8;i++){
		id += parseInt(Math.random()*10)
	}
	var price = $(".buyCar-total span").html();
	location.href = "/no5/html/my/buySuccess.html?id="+id+"&price="+price;
})
