##jQuery.YesShow

Options:
   width: 300px,
   height:300px,
   speed :800,
   pause :2000,
   auto : true/false,
   action: fade||slide||move||default
   show: 0-4
   auto: true/false
   direction(only for move): up||left,
   prev: '<',
   next: '>'

####Usage:
    $('#YesShow').YesShow();
	$('#YesShow').YesShow({action:'slide',show:1,width:400,height:500});
	$('#YesShow').YesShow({action:'move',direction:'left',show:2});
	$('#YesShow').YesShow({action:'move',show:3});
	$('.Yes').YesShow({action:'fade',show:4});   
	
2015.12.28

New option:
   zoom : true/false
   
2015.12.31
