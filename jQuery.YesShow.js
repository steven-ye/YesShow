/*
* YesShow v1.1
* Steven Ye
* Email: steven_ye@foxmail.com
* Date: 2015-12-30
* Usage: action: fade||slide||move||default
*        show: 0-4
*        auto: true/false
*        direction: only for move: up/left
*        zoom: true/false (new option vs v1.0)
*/

;(function($, window, document,undefined) {

    $.fn.YesShow = function(options) {
		var s=$.extend({},$.fn.YesShow.defaults,options);
        return this.addClass('YesShow').each(function(){
			var W=s.width?s.width:$(this).width(),
			        H=s.height?s.height:$(this).height(),
				    ul=$(this).find('ul'),
					lis=$('li',ul),
					m=lis.length,i=1,j=0,t,
					div = $('<div>').append(ul).prependTo($(this));
				
				div.css({'width':W,'height':H,'overflow':'hidden',
				         'border':'1px solid #ccc'});
				$(this).css({'border':'none'});
				lis.css({'width':W,'height':H});
				if(s.action=='move'){
					if(s.direction=='left')ul.css('width',W*m);
				}else{
					lis.hide();
					lis.eq(0).show();
				}
				
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
						var P = $('<p>').append(p).appendTo($(this)),
						    w = spans.eq(0).width();
						
						P.css({'width':W,'overflow':'hidden','position':'relative'});
						p.css('width',(w+8)*m);
						$(this).css({'width':W+2,'height':H+p.height()+2,'border':'none','overflow':'visible'});
						if(p.width()>W){
							p.css('margin','0 8px');
							var prev = $('<a>').appendTo($(this)).addClass('prev transparent'),
							    next = $('<a>').appendTo($(this)).addClass('next transparent');
							prev.html(s.prev).click(function(){
								var left=parseInt(p.css('margin-left'));
								if(left<-10)
								p.animate({'margin-left':left+(w+8)});
							});
							next.html(s.next).click(function(){
								var left=parseInt(p.css('margin-left'));
								if(left>W-p.width())
								p.animate({'margin-left':left-(w+8)});
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
				if(s.zoom){
					var zoom=$('<div class="zoom">').hide().appendTo($(this)),
					    img = $('<img>').css({width:s.big_width,height:s.big_height}).appendTo(zoom);
					lis.each(function(){
						$(this).hover(function(){
							img.prop('src',$(this).find('img').prop('src'));
							zoom.html(img).fadeIn('slow');
						},function(){
							zoom.fadeOut('slow',function(){$(this).html();});
						});
						$(this).mousemove(function(e){
							var x=e.screenX-div.offset().left,
							    y=e.screenY-div.offset().top;
							
							x = zoom.width()/2-(x/div.width())*img.width(),
							y = zoom.height()/2-(y/div.height())*img.height();
							x = x<0?x:0;y = y<0?y:0;
							if(x<zoom.width()-img.width())x=zoom.width()-img.width();
							if(y<zoom.height()-img.height())y=zoom.height()-img.width();
							img.css({'margin-left': x,'margin-top':y});
						});
					});
				}
				lis.each(function(){
					$(this).hover(_stop,_auto);
				});
				_auto();
				function slide(){
					if(i==j)return i++;
					switch(s.action){
					  case('fade'):
					    lis.eq(j).hide();
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
	$.fn.YesShow.defaults={
		width : 300,
        height: 300,
		big_width: 900,
		big_height:900,
		speed : 800,
		pause : 2000,
		action: 'fade',
		direction:'up',
		auto: true,
		zoom: false,
		show: 0,
		prev: '<',
		next: '>'
	};
	$.fn.yesShow = $.fn.YesShow;
})(jQuery, window, document);