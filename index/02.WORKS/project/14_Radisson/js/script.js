$(document).ready(function() {
    $('#bg').animate({'scale':'3'},1000)
    $('#bg').animate({'scale':'1','opacity':'1'},2000)
    $('header').animate({'top':'0'},700,function(){
    $('footer').animate({'bottom':'0'},800,function(){
    $('#main_title').animate({'top':'200px','opacity':'1'},900,function(){
    $('#main_text').animate({'top':'270px','opacity':'1'},900)
    })
    })
    })
    
    $('#gallery_bt').click(function(){
    $('#main_title').animate({'top':'150px'},400)
    $('#main_text').animate({'top':'220px'},400)
    $('#gallery').animate({'bottom':'30px'},600,function(){
    $('#gallery ul').animate({'width':'2000px'},400)
    })
    })
    
    $('header,#main_title,#main_text,#bg').click(function(){
    $('#gallery ul').animate({'width':'10px'},400,function(){
    $('#gallery').animate({'bottom':'-100px'},400)
    $('#main_title').animate({'top':'250px'},400)
    $('#main_text').animate({'top':'320px'},400)
    })
    })
    
    $('#gallery ul li').click(function(){
    imgsrc=$(this).children('img').attr('src');
    var opacity=$(this).attr("title");
    $(this).css({'opacity':'1'}).siblings().css({'opacity':'0.5'})
    $('#bg').css({'background-image':'url('+imgsrc+')'})
    })
    $('#gallery_bt h4').animate({'top':'12px'},400,function call(){
    $('#gallery_bt h4').animate({'top':'5px'},400)
    $('#gallery_bt h4').animate({'top':'12px'},400,call)
    })
 }) // end