// JavaScript Document
bitesize.appearObj = {
	settings : {
		/// Defaults
		delayIn : 200,
		delayOut : 400,
		/// List items here
		items : 
			[{
				item : '.animated-item',
				delayIn : 300,
				delayOut : 500	
			}]
	},
	init : function (options){
		///var bitesize.appearObj.settings =
		///bitesize.debug.log('options: ');
		///bitesize.debug.log(options);
		///bitesize.debug.log('default ' + bitesize.appearObj.settings.delayIn);

		$.extend(bitesize.appearObj.settings, options || {}); // <- if no / undefined options are passed extend will simply return the defaults
		
		/*if(bitesize.appearObj.settings.init === false) {
			bitesize.debug.log('NOT INIT');
			return false;
		}*/

		if($.isArray(bitesize.appearObj.settings.items)) {
			
			var arrayItems = bitesize.appearObj.settings.items;
			bitesize.debug.log('ITEMS as arrays: ', arrayItems);

			$.each(arrayItems, function(i, el) {
				bitesize.debug.log(el);				
				bitesize.debug.log(i);
				bitesize.debug.log(el.item);

				///bitesize.debug.log(Object.keys(el.item));

				///var item = Object.keys(el.item).toString();
				var item = el.item;
				bitesize.debug.log(el);
				
				if(item === undefined) {
					return false;
				}

				bitesize.debug.log('about to go...', $(item));

				bitesize.debug.log('about to go...', el.delayIn);
				bitesize.debug.log('about to go...', el.delayOut);

				var delayIn = (el.delayIn === undefined) ? bitesize.appearObj.settings.delayIn : el.delayIn;
				var delayOut = (el.delayOut === undefined) ? bitesize.appearObj.settings.delayOut : el.delayOut;

				bitesize.appearObj.iterate(i, item, delayIn, delayOut);

			});
			
		} else {
			
			///bitesize.debug.log('ITEMS as objects: ', bitesize.appearObj.settings.items);
			///bitesize.appearObj.iterate(0, bitesize.appearObj.settings.items);

		}

	},
	iterate : function(i, el, delayIn, delayOut){
		$(el).appear();
		$(el).on('appear', function(e, $all_appeared_elements) {
			
			bitesize.debug.log('To appear: ', $all_appeared_elements);
			
			// this code is executed for each appeared element
			bitesize.appearObj.appear(e, $all_appeared_elements, delayIn);

		});
		$(el).on('disappear', function(e, $all_disappeared_elements) {
			
			bitesize.debug.log('To disappear: ', $all_disappeared_elements);
			
			// this code is executed for each appeared element
			bitesize.appearObj.disappear(e, $all_disappeared_elements, delayOut);

		});
	},
	change : function(){},
	appear : function(event, $all_appeared_elements, delayIn){

		var $that = $all_appeared_elements;
		if($that.hasClass('appeared')) {
			return false;
		}

		bitesize.debug.log('HAS APPEARED: ', $all_appeared_elements);
		bitesize.debug.log('delayIn Now: ',  $all_appeared_elements.delayIn);

		var timeDelay = $(this).data('delayIn');

		if(timeDelay === undefined) {
			timeDelay=delayIn;
		}

		bitesize.debug.log('delayIn Now: ',  timeDelay);

		setTimeout(function (event, $all_appeared_elements) {
			$that.addClass('appeared');
		}, timeDelay);
		/*,{accX: 0, accY: -150}*/
	},
	disappear : function(event, $all_disappeared_elements, delayOut){

		var $that = $all_disappeared_elements;
		if(!$that.hasClass('appeared')) {
			return false;
		}

		bitesize.debug.log('HAS DISAPPEARED: ' , $all_disappeared_elements);
		bitesize.debug.log('delayOut Now: ', $all_disappeared_elements.delayOut);

		var timeDelay = $(this).data('delayOut');
		if(timeDelay === undefined) {
			timeDelay=delayOut;
		}

		bitesize.debug.log('delayOut Now: ', timeDelay);

		setTimeout(function (event, $all_disappeared_elements) {
			$that.removeClass('appeared');
		}, timeDelay);

	}
};
