$(function(){
var n=0; //위치를 지정하는 n변수 
var t=0; //윈도우의 높이값을 지정하는 변수
var moving=false; //부울함수로 움직이고 있는 상황인지 아닌지를 알려주는 불린형식의 변수

    
    
    
//--- 오른쪽 버튼 설정 ---//
$(".controller li").eq(n).find("a").addClass("on");     //첫화면에서 흰동그라미
    
$(".controller li a").click(function(e){
e.preventDefault(); //a링크 방지
n=$(this).parent().index(); //li의 인덱스 번호 추출
    
if(n>0){   //n이 0보다 크다면
t=$(".sub").eq(n-1).offset().top;   
//t는 위치가 0,1,2, 이렇게 얻어지게 해당위치를 찾아가는 변수선언
}else{
t=0;  //아니면 0이된다
}
//console.log("t:"+t)
$("html,body").stop().animate({scrollTop:t},800,function(){
$(".controller li").find("a").removeClass("on");
$(".controller li").eq(n).find("a").addClass("on");
})//scrollTop animate end
}) //버튼클릭 end

    
    
    
//--- 메인화면 ---//
$("header>nav>ul>li").on("mouseenter focusin",function(){
$(".smn").show();       //smn 보이기
$("#bg").show();        //bg 보이기
$("this").siblings().removeClass("on"); //선택한 li의 형제 removeClass 제거
$("this").addClass("on");               //선택한 li만 addClass 추가
$("#inimg>p").hide();                   //inimg p 숨기기
var index=$(this).index();              //li의 순서값 저장
$("#inimg>p").eq(index).show();         //li의 순서에 해당하는 inimg>p만 보이기
});

//서브메뉴에 마우스 올렸을 때
$(".smn").on("mouseenter focusin",function(){//smn 범위에 들어갔을 때
$("header>nav>ul>li").removeClass("on");     //모든 li의 removeClass 제거
$(this).parent().addClass("on");             //선택된 li의 부모(ul)만 addClass 추가
    
var n=0;
$("header>nav>ul>li").each(function(){
n=n+1;
if($("nav>ul>li.menu"+n+"").hasClass("on")){ //menu1,2,3,4,5,6이 on클래스를 가지고 있으면
$("#inimg").find("navimg"+n+"").show();      //navimg1,2,3,4,5,6을 찾아서 보여준다
}
});
}); //mouseenter focusin end
    
//bg에서 마우스가 벗어났을 때 
$("#bg").on("mouseleave", function(){   //bg에서 마우스가 벗어났을 때
    $("nav>ul>li").removeClass("on");   //nav ul li의 removeClass 제거
    $(".smn").hide();                   //smn 숨기기
    $("#bg").hide();                    //bg 숨기기
});
    
//smn에서 마우스가 벗어났을 때
$(".smn").on("mouseleave", function(){  //bg에서 마우스가 벗어났을 때
    $(this).parent().removeClass("on"); //smn의 부모(li) removeClass 제거
});

//nav에서 마우스가 벗어났을 때
$("header>nav").on("mouseleave", function(){  //nav에서 마우스가 벗어났을 때
    $(".smn").parent().removeClass("on");     //smn의 부모(li) removeClass 제거
});
    
//focusout a에 마우스가 들어왔을 때
$(".focusout a").on("focusin", function(){   //focusout a에 마우스가 들어왔을 때
    $("header>nav>ul>li").removeClass("on"); //nav ul li의 removeClass 제거
    $(".smn").hide();   //smn 숨기기
    $("#bg").hide();    //bg 숨기기
});

//동그라미 이미지 클릭 시 내려가기
$("#h_art ul li:eq(0) dl dt a").click(function(){
    $("body,html").animate({scrollTop:"1000"},800)
});
$("#h_art ul li:eq(1) dl dt a").click(function(){
    $("body,html").animate({scrollTop:"2000"},800)
});
$("#h_art ul li:eq(2) dl dt a").click(function(){
    $("body,html").animate({scrollTop:"3000"},800)
});
$("#h_art ul li:eq(3) dl dt a").click(function(){
    $("body,html").animate({scrollTop:"4000"},800)
});




//--- MOUSEWHEEL ---//
$(".container").mousewheel(function(e,delta){
if(!moving){
if(delta>0){
if(n>0){    //위로 올라가면 하나씩 빼준다
n=n-1;
}
}else{
if(n<5){    //아래로 내리면 하나씩 커진다
n=n+1;
}
}//else문 end
//0,1,2,3,4,5,4,3,2,1

if(n>0){
t=$(".sub").eq(n-1).offset().top;
}else{
t=0;
}
moving=true;    //마우스를 휠하면 true
$("html,body").stop().animate({scrollTop:t},800,function(){
moving=false;  //동작이 완료되면 false
$(".controller li").find("a").removeClass("on");
$(".controller li").eq(n).find("a").addClass("on");
})//scrollTop end  
}//moving end
})//mousewheel end

    
    
    
//--- 리사이즈 ---//
$(window).resize(function(){
var h=$(this).height();
$(".main_area").css({height:h+"px"});
})//resize end
$(window).trigger("resize"); //화면 로드 되면 리사이즈 화면부터 먼저 나오기
 
    
    
    
//--- SCROLL 했을 때 나타나기 ---//   
$(window).scroll(function(){    
var area=$("body,html").scrollTop();
//area1
if(area>750){
    $(".area1wrap ul li").eq(1).animate({top:0,opacity:"1"},1000)
    $(".area1wrap ul li").delay(150).eq(0).animate({top:0,opacity:"1"},1000)
    $(".area1wrap ul li").delay(300).eq(2).animate({top:0,opacity:"1"},1000)
}
//area2
if(area>1750){
    $(".area2wrap ul li").eq(0).animate({top:0,opacity:"1"},1000)
    $(".area2wrap ul li").delay(150).eq(1).animate({top:0,opacity:"1"},1000)
    $(".area2wrap ul li").delay(300).eq(2).animate({top:0,opacity:"1"},1000)
}
//area3
if(area>2700){
    $(".area3wrap ul li").eq(0).animate({top:0,opacity:"1"},700)
    $(".area3wrap ul li").delay(100).eq(1).animate({top:0,opacity:"1"},700)
    $(".area3wrap ul li").delay(200).eq(2).animate({top:0,opacity:"1"},700)
    $(".area3wrap ul li").delay(300).eq(3).animate({top:0,opacity:"1"},700)
    $(".area3wrap ul li").delay(400).eq(4).animate({top:0,opacity:"1"},700)
    $(".area3wrap ul li").delay(500).eq(5).animate({top:0,opacity:"1"},700)
}
})//scroll end
    
    
    
    
//--- 푸터 CLICK, MOUSELEAVE ---//
$(".fam").click(function(){         //fam 클릭 시
$("#fam2").css({display:"block"});  //fam2 block으로 나타내기
$("#fam2").mouseleave(function(){   //fam2 범위에서 벗어나면
$("#fam2").css({display:"none"});   //fam2 none으로 감추기
});
});
 
    
})//end