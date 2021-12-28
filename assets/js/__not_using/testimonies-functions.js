// JavaScript Document
jQuery(document).ready(function($){
	
	"use strict";
	
	var testimoniesObj = {
		data : {
			'stopli' : 'false', 
			'startLi' : 'true',
			'testimonyWraper' : $('.testimony-wrapper'),
			'ul' : $('.testimony-wrapper ul'),
			'liItems' : $('.testimony-wrapper ul').find('li'),
			'imageWidth' : 0,
			'imageNumber' : 0,
			'padding' : 30
		},
		
		start : function (){
			
			testimoniesObj.data.liItems.width(testimoniesObj.data.testimonyWraper.width());
			testimoniesObj.data.imageNumber = testimoniesObj.data.liItems.length;
			testimoniesObj.data.imageWidth = testimoniesObj.data.liItems[0].offsetWidth;		
			
			if(testimoniesObj.data.liItems.length <= 1) {
				return false;	
			}
			
			testimoniesObj.data.ul.scrollLeft(0);
						
			// set ul’s width as the total width of all images in image slider.
			testimoniesObj.data.ul.width(parseInt(testimoniesObj.data.testimonyWraper.width() * testimoniesObj.data.imageNumber + (testimoniesObj.data.imageNumber * testimoniesObj.data.padding) ));	
			
			/// set the hieght value of the tallest list item
			// Get an array of all element heights
			var elementHeights = $(testimoniesObj.data.liItems).map(function() {
				return $(this).height();
			}).get();

			// Math.max takes a variable number of arguments
			// `apply` is equivalent to passing each height as an argument
			var maxHeight = Math.max.apply(null, elementHeights);

			// Set each height to the max height
			testimoniesObj.data.testimonyWraper.height(maxHeight);
			testimoniesObj.data.ul.height(maxHeight);
			testimoniesObj.data.liItems.height(maxHeight);
			
			testimoniesObj.data.liItems.each(function(i, el){
				
				(function(i, el){
					
					testimoniesObj.data.ul.stop(true,true);
					
					setTimeout(function(){
						var newposition = parseInt(testimoniesObj.data.ul.position().left-testimoniesObj.data.imageWidth);
						//
						if(newposition <= -parseInt(testimoniesObj.data.ul.width()-testimoniesObj.data.imageWidth)) {
							$(testimoniesObj.data.ul).animate({
									'left': "0px"
								}, 2400);
							
							return false;	
						}
						
						$(testimoniesObj.data.ul).animate({
								'left': "-="+testimoniesObj.data.imageWidth+"px"
							}, 2400);
						},
					2400 + ( i * 6800 ));
											
				})(i, el);
			});
			
			setTimeout(function(){testimoniesObj.start();},parseInt((testimoniesObj.data.liItems.length+1)*4800));
			
		}, ///  End Testimonies Start Function
		
		change : function(){
			
			testimoniesObj.data.liItems.stop(true,true,true);
			testimoniesObj.data.liItems.width(testimoniesObj.data.testimonyWraper.width());
			testimoniesObj.data.imageNumber = testimoniesObj.data.liItems.length;
			testimoniesObj.data.imageWidth = testimoniesObj.data.liItems[0].offsetWidth;
			
			if(testimoniesObj.data.liItems.length <= 1) {
				return false;	
			}

			// Math.max takes a variable number of arguments
			// `apply` is equivalent to passing each height as an argument
			var maxHeight = Math.max.apply(null, elementHeights);

			// Set each height to the max height
			testimoniesObj.data.testimonyWraper.height(maxHeight);
			testimoniesObj.data.ul.height(maxHeight);
			testimoniesObj.data.liItems.height(maxHeight);
						
			// set ul’s width as the total width of all images in image slider.
			testimoniesObj.data.ul.width(parseInt(testimoniesObj.data.testimonyWraper.width() * testimoniesObj.data.imageNumber + (testimoniesObj.data.imageNumber * testimoniesObj.data.padding) ));			
			
			testimoniesObj.data.ul.css('left','0px');
			
		}
		
	};
	
	/*if(bitesize_data_object.post_name == 'clients' ) {
	setTimeout(testimonies(),4800);		
	}*/
	
	
	$('body').on('click', '.testimony-button', function(e){
		e.preventDefault();
		
		var testimonyWraper = $('.testimony-wrapper');
		var ul = $('.testimony-wrapper ul');	
		var liItems = $('.testimony-wrapper ul').find('li');
		var imageWidth;
		var imageNumber;
		var padding = 30;
		var newposition = 0;
		
		$(liItems).width(testimonyWraper.width());
		
		imageNumber = liItems.length;
		imageWidth = liItems[0].offsetWidth;		
		
		if(liItems.length <= 1) {
			return false;	
		}	
		
		/*
				
		*/			
		/// New position
		if($(this).hasClass('left') && ul.position()) {
			
			newposition = parseInt(ul.position().left+imageWidth);
			if(newposition >= 599) {
				
				return false;	
			}
			$(ul).animate({ "left": "+="+imageWidth+"px" }, "slow" );
		
		} else {
			
			newposition = parseInt(ul.position().left-imageWidth);
			if(newposition <= -parseInt(ul.width()-imageWidth)) {
				
				return false;	
			}
			$(ul).animate({ "left": "-="+imageWidth+"px" }, "slow" );
		}
	
	});
	
	jQuery(function($){
		//if(bitesize_data_object.post_name == 'clients' ) {
			testimoniesObj.start();
		//}
		
	});
	
});