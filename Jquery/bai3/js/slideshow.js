$(document).ready(function(){
	var stt = 0;
	startImg = parseInt($("img:first").attr("stt")); // get start img
	endImg = parseInt($("img:last").attr("stt")); // get end img
	$("img").each(function(){
		if($(this).is(':visible')){
			stt = parseInt(($(this).attr("stt")));
		}
	});
	
	function hideImg(){
		$("img").hide();
		$("img").eq(stt).show();
		$("li").removeClass('active');
		$("li").eq(stt).addClass('active');
	}
	// next image
	$("#next").click(function(){	
		next = ++stt;
		if(next == endImg){
			stt = (startImg-1);
		}
		$("img").hide();
		$("img").eq(next).show();
		$("li").removeClass('active');
		$("li").eq(next).addClass('active');
	});
	// prev image
	$("#prev").click(function(){
		prev = --stt;
		if(prev == -5){
			stt = (endImg+1);
		}
		$("img").hide();
		$("img").eq(prev).show();	
		$("li").removeClass('active');
		$("li").eq(prev).addClass('active');
	});
	// click id image
	$("#img_1").click(function(){
		prev = --stt;
		if(prev == -5){
			stt = (endImg+1);
		}
		stt= startImg;
		hideImg();
  });
  	$("#img_2").click(function(){
		stt= startImg+1;
		hideImg();
  });
  	$("#img_3").click(function(){
		stt= startImg+2;
		hideImg();
  });
  	$("#img_4").click(function(){
		stt= startImg+3;
		hideImg();
  });
  	$("#img_5").click(function(){
		if(	stt= endImg)       // if stt =4, next stt =0
			stt = (startImg-1);
		hideImg();
  });
  // auto motion image
	setInterval(function(){
		$("#next").click();
	},8000); // set time motion
});
