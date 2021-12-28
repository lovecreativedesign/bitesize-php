// JavaScript Document

bitesize.ga = {
	settings : {
		/// List items here
		ga_type : '',
		to_function : 'rnFunction',
	},

	sendGA : function(to_function, data){
		
		to_function = (to_function !== undefined) ? to_function : bitesize.ga.settings.to_function;
		console.log(bitesize_data_object);
		console.log(bitesize_data_object.debug);
		console.log(bitesize.debug);

		if(bitesize.debug === true){
			bitesize.debug.log('debug is on (GA data will not be sent on staging sites):', to_function);
			bitesize.debug.log('debug is on (GA data will not be sent on staging sites):', data);
			return false;
		}

		bitesize.ga[to_function](data);	
		
	},

	/// blank rn function
	rnFunction : function(data){
		return false;
	},
	
	gaEvent : function(data){
		
		bitesize.debug.log('GA gaEvent Data sending:', data);

		/// Send to Analytics
		//ga('send', data);
		///gtag('send', data);

	},
};


/**
 * GTAG
 */
bitesize.gtag = {
	settings : {
		/// List items here
		ga_type : '',
		to_function : 'rnFunction',
	},

	sendGA : function(to_function, data){
		
		to_function = (to_function !== undefined) ? to_function : bitesize.gtag.settings.to_function;
		console.log(bitesize_data_object);
		console.log(bitesize_data_object.debug);
		console.log(bitesize.debug);

		if(bitesize.debug === true){
			bitesize.debug.log('debug is on (GA data will not be sent on staging sites):', to_function);
			bitesize.debug.log('debug is on (GA data will not be sent on staging sites):', data);
			return false;
		}

		bitesize.gtag[to_function](data);	
		
	},

	/// blank rn function
	rnFunction : function(data){
		return false;
	},
	
	gaEvent : function(data){
		
		bitesize.debug.log('gtag gaEvent Data sending:', data);

		/// Send to Analytics
		//ga('send', data);
		gtag('event', data);

	},
};

/**
 * Google Tag Manager Functions
 * @type {Object}
 */
bitesize.gtm = {
	settings : {
		/// List items here
		ga_type : '',
		to_function : 'rnFunction',
	},
	data : {
		gtmEvent : '',
		gtmCategory : '',
		gtmAction : '',
		gtmLabel : '',
		gtmValue: '',
		////nonInteraction: {'nonInteraction': 1}
	},
	/*
	init : function(){

		$('.tr').on('click', function(event){
			bitesize.ga.data.gtmEvent = 'tr-click';
			bitesize.ga.data.gtmCategory = 'Tr Click';
			
			/// determin our action
			bitesize.ga.data.gtmAction = 'Tr Clicked';
			bitesize.ga.data.gtmLabel = $(this).data('tr');
			////gtmLabel = '', ////' on /' + bitesize_helper_data_object.post_name + '/',
			bitesize.ga.data.gtmValue = 55;

			bitesize.ga.sendGA('gaEvent', bitesize.ga.data);

		});


	},
	*/

	sendGA : function(to_function, data){
		
		to_function = (to_function !== undefined) ? to_function : bitesize.gtm.settings.to_function;

		console.log(to_function);
		console.log(data);
		bitesize.gtm[to_function](data);	
		
	},

	/// blank rn function
	rnFunction : function(data){
		return false;
	},
	
	gaEvent : function(data){
		
		bitesize.debug.log('GTM Data sending:', data);

		if(bitesize.debug === true){

			/// Send data
			var data_to_send = data;
			bitesize.debug.log('OUR DATA REQUEST IN DISPLAY HANDLER HASH:', data_to_send);
			bitesize.debug.log('OUR DATA REQUEST IN DISPLAY HANDLER HASH:', bitesize.gtm.data);		  
			return false;
		}

		/// Send to Analytics
		///ga('event', data);
		///ga('send', 'event', 'Story Opened', VMP.GA.story.data('ga-category'), VMP.GA.storyLabel, {'nonInteraction': 1});
		/// Now ping event to google analytics		
		window.dataLayer = window.dataLayer || [];
		dataLayer.push({
			'event'					: bitesize.gtm.data.gtmEvent,
			'gtmCategory'			: bitesize.gtm.data.gtmCategory,
			'gtmAction'				: bitesize.gtm.data.gtmAction,
			'gtmLabel'				: bitesize.gtm.data.gtmLabel,
			'gtmValue'				: bitesize.gtm.data.gtmValue
		});
	}

};