/**
 * Google Analytics Manager Functions
 * @type {Object}
 */
bitesize.ga = {
	
	settings : {
		/// List items here
		ga_type : 'gtag',
		to_function : 'rnFunction',
	},

	sendGA : function(to_function, data){
		
		to_function = (to_function !== undefined) ? to_function : bitesize.ga.settings.to_function;
		bitesize.ga[to_function](data);	
		
	},

	/// blank rn function
	rnFunction : function(data){
		return false;
	},
	
	event : function(data){
		
		bitesize.debug.log('GA Data sending:', data);
		bitesize.debug.log('GA type', bitesize.ga.settings.ga_type);

		if(bitesize.debug === true){

			/// Send data
			var data_to_send = data;
			bitesize.debug.log('Debug On: OUR DATA REQUEST: data is not sent to GA', data_to_send);		  
			return false;
		}

		/// Send to Analytics
		if(bitesize.ga.settings.ga_type === 'gtm') {

			bitesize.debug.log('called gtm');

			window.dataLayer = window.dataLayer || [];
			
			dataLayer.push({
				'event'					: data.gtmEvent,
				'gtmCategory'			: data.gtmCategory,
				'gtmAction'				: data.gtmAction,
				'gtmLabel'				: data.gtmLabel,
				'gtmValue'				: data.gtmValue
			});

		} else if(bitesize.ga.settings.ga_type === 'gtag') {
			
			bitesize.debug.log('called gtag');
			
			/*
			* Example
			 gtag('event', 'test', {
			  'event_category': 'test_catcl',
			  'event_label': 'test_labelcl',
			  'value': 333
			});
			*/

			gtag('event', data.event_trigger,  data);

		} else if(bitesize.ga.settings.ga_type === 'ga') {

			/*
			* Example
			
			 ga('send', 'event', 'Videos', 'play', 'Fall Campaign');

			or

			ga('send', {
			  hitType: 'event',
			  eventCategory: 'Videos',
			  eventAction: 'play',
			  eventLabel: 'Fall Campaign'
			});
			*/

			ga('send', data);

		}
	}

};