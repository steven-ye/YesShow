/*
* YesShow
* Steven Ye
* Email: steven_ye@foxmail.com
* Date: 2015-12-27
* Usage: action: fade||slide||move||default
*        show: 0-4
*        auto: true/false
*        direction(only for move): up||left
*/

;(function($, window, document,undefined) {
    var defaults = {
		width : 300,
        height: 300,
		speed : 800,
		pause : 2000,
		action: 'fade',
		direction:'up',
		auto: true,
		show: 0,
		prev: '<',
		next: '>'
    };
	
    $.fn.YesShow = function(options) {
		var s=$.extend({},defaults,options);
        return this.addClass('YesShow').each(function(){
			var W=s.width?s.width:$(this).width(),
			        H=s.height?s.height:$(this).height(),
				    ul=$(this).find('ul'),
					lis=$('li',ul),
					m=lis.length,i=1,j=0,t;
				
				$(this).css({'width':W,'height':H});
				lis.css({'width':W,'height':H});
				if(s.action=='move'){
					if(s.direction=='left')ul.css('width',W*m);
				}else{
					lis.hide();
					lis.eq(0).show();
				}
				lis.each(function(){
					$(this).hover(_stop,_auto);
				});
				
				if(s.show){
					var p = $('<p>').appendTo($(this));
					for(var n=0,span;n<m;n++){
						span=$('<span>');
						if(s.show==2){
							span.append(n+1);
						}else if(s.show==3||s.show==4){
							span.append(lis.eq(n).find('img').clone());
						}
						p.append(span);
					}
					var spans=$('span',p);
					if(s.show==2){
					    p.addClass('num');
					}else if(s.show==3){
					    p.addClass('thumbs transparent');
					}else if(s.show==4){
						p.addClass('thumbs');
						var div = $('<div>').append(ul).prependTo($(this)),
						    w = spans.eq(0).width();
						div.css({'width':W,'height':H,'overflow':'hidden','border':'1px solid #ccc'});
						p.css('width',(w+8)*m);
						$(this).css({'width':W+2,'height':H+p.height()+2,'border':'none'});
						if(p.width()>W){
							p.css('margin','0 10px');
							var prev = $('<a>').appendTo($(this)).addClass('prev transparent'),
							    next = $('<a>').appendTo($(this)).addClass('next transparent');
							prev.html(s.prev).click(function(){
								var left=parseInt(p.css('left'));
								if(left<-10)
								p.animate({'left':left+(w+8)});
							});
							next.html(s.next).click(function(){
								var left=parseInt(p.css('left'));
								if(left>W-p.width())
								p.animate({'left':left-(w+8)});
							});
						}
					}
					spans.eq(0).addClass('on');
					spans.each(function(k){
						$(this).hover(function(){
							i=k;slide();_stop();
						},_auto);
					});
				}
				_auto();
				function slide(){
					if(i==j)return i++;
					switch(s.action){
					  case('fade'):
					    lis.eq(j).fadeOut(s.speed);
					    lis.eq(i).fadeIn(s.speed);
						break;
					  case('slide'):
					    lis.eq(j).slideUp(s.speed);
					    lis.eq(i).slideDown(s.speed);
						break;
					  case('move'):
						if(s.direction=='left'){
						   ul.animate({'left':W*i*-1},s.speed);
						}else{
						   ul.animate({'top':H*i*-1},s.speed);
						}
						break;
					  default:
					    lis.eq(j).hide();
					    lis.eq(i).show();
					}
					if(spans){
						spans.eq(j).removeClass();
						spans.eq(i).addClass('on');
					}
					j=i;i++;if(i==m)i=0;
				}
				function _auto(){if(s.auto)t = setInterval(slide,s.speed+s.pause);}
				function _stop(){clearInterval(t);}
		});
    };
	$.fn.yesShow = $.fn.YesShow;
})(jQuery, window, document);