// JavaScript Document
bitesize.animationsObj = {
	settings : {
		/// List items here
		items : '.animated-item',
		delay : 200,
		fadeIn : {
			duration : 100,
		},
		fadeInUp : {
			duration : 100,
		},
		fadeInLeft : {
			duration : 100,
		},
		fadeInRight : {
			duration : 100,
		},
		fadeInDown : {
			duration : 100,
		},
		init : false
	},
	init : function (options){

		///bitesize.debug.log(options); 
		///bitesize.debug.log(bitesize.animationsObj.settings);

		$.extend(bitesize.animationsObj.settings, (options || {})); // <- if no / undefined options are passed extend will simply return the defaults
		
		///bitesize.debug.log(bitesize.animationsObj.settings);
		/*if(bitesize.animationsObj.settings.init === false) {
			bitesize.debug.log('NOT INIT');
			return false;
		}*/

		if($.isArray(bitesize.animationsObj.settings.items)) {
			var arrayItems = bitesize.animationsObj.settings.items;
			///bitesize.debug.log('ANIM ITEMS as arrays: ');
			///bitesize.debug.log(arrayItems);
			$.each(arrayItems, function(i, el) {
				///bitesize.debug.log(el);
				if($(el).hasClass('appeared')){
					bitesize.animationsObj.onAppear(el);
				}
				
			});
			
		} else {
			///bitesize.debug.log('ANIM ITEMS as objects: ');
			///bitesize.debug.log(bitesize.animationsObj.settings.items);
			if($(bitesize.animationsObj.settings.items).hasClass('appeared')){
				bitesize.animationsObj.onAppear(bitesize.animationsObj.settings.items);
			}
		}

	},
	change : function(){},
	onAppear : function(all_appeared_elements){

		var $that = $(all_appeared_elements);
		if($that.hasClass('animated')) {
			return false;
		}

		///bitesize.debug.log('ANIM HAS APPEARED: ');
		///bitesize.debug.log($that);
		///bitesize.debug.log('delay Now ' + bitesize.animationsObj.settings.delay);

		var timeDelay = $(this).data('delay');
		if(timeDelay === undefined) {
			timeDelay=bitesize.animationsObj.settings.delay;
		}
		setTimeout(function (event, $all_appeared_elements) {
			$that.addClass('animated');
		}, timeDelay);
		/*,{accX: 0, accY: -150}*/
	},
	onDisappear : function(all_disappeared_elements){

		var $that = $(all_disappeared_elements);
		if(!$that.hasClass('animated')) {
			return false;
		}

		///bitesize.debug.log('ANIM HAS DISAPPEARED: ');
		///bitesize.debug.log($that);
		///bitesize.debug.log('delay Now ' + bitesize.animationsObj.settings.delay);
		
		var timeDelay = $(this).data('delay');
		if(timeDelay === undefined) {
			timeDelay=bitesize.animationsObj.settings.delay;
		}
		setTimeout(function (event, $all_disappeared_elements) {
			$that.removeClass('animated');
		}, timeDelay);

	}
};
