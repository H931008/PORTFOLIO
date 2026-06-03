$(function(){
var t;
var distance;
$(window).scroll(function() {
t=$(window).scrollTop();
if(t>=$(".section1").offset().top && t<$(".section2").offset().top){
distance=(t-160)/200;
if(distance>0){
$(".video").css({opacity:(1-distance)});
}
cssAnimation("type1");
}else if(t>=$(".section2").offset().top && t<$(".section3").offset().top){
cssAnimation("type2");
}else if(t>=$(".section3").offset().top && t<$(".section4").offset().top){
cssAnimation("type1");
}else if(t>=$(".section4").offset().top && t<$(".section5").offset().top){
cssAnimation("type2");
}else if(t>=$(".section5").offset().top && $("body").height()){
cssAnimation("type1");
}
}) 
    
    
    
function cssAnimation(type) {
if(type=="type1"){
$("body").stop().animate({backgroundColor:"#f1f1f1"},300);
$(".textbox").stop().animate({color:"#555"},300);
$(".textbox .fontcolor").stop().animate({color:"#164778"},300);
$("section").stop().animate({borderBottomColor:"#aaa"},300);
}else{
$("body").stop().animate({backgroundColor:"#555"},300);
$(".textbox").stop().animate({color:"#fff"},300);
$(".textbox .fontcolor").stop().animate({color:"#aaa"},300);
$("section").stop().animate({borderBottomColor:"#000"},300);  
}
}
//$(window).trigger("scroll");
}) // end