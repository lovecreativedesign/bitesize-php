// JavaScript Document
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area on document ready function...
 */
/// Set the initial load date on load
bitesize.startTime = bitesize.date.getTime();

/// set the global debug from php <![CDATA[]]> if we want...
/// bitesize.debug.on = (bitesize_data_object.debug && bitesize_data_object.debug_display) ? true : false;
bitesize.setDebug();

/**
 * Start runtime 0
 */
bitesize.debug.log('Development Website');

///var $body, $window, $sidebar, adminbarOffset, top = false, bottom = false, windowWidth, windowHeight, lastWindowPos = 0, topOffset = 0, bodyHeight, sidebarHeight, resizeTimer;

$( document ).ready( function() {
	
	bitesize.body = $( document.body );

	bitesize.window = $( window );
	bitesize.sidebar = $( '#sidebar' ).first();
	bitesize.adminbarOffset = bitesize.body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

	bitesize.mainMenu = $('#menu-primary-menu');
	bitesize.mainMenuWidth = bitesize.mainMenu.width();

	bitesize.pageContainer = $('#page-container');
	bitesize.pageContainerWidth = bitesize.pageContainer.width();

	bitesize.pageContainerDiff = parseInt(bitesize.window.width()-bitesize.pageContainerWidth);

	///bitesize.screenReaderText = bitesize_data_object.screenReaderText;

	/// Get url hash and parts and history etc
	bitesize.checkHash.init();

	bitesize.window
		.on( 'scroll.bitesizetheme', function(e){
			clearTimeout( bitesize.resizeTimer );
			//#bitesize.debug.log(bitesize.resizeTimer);
			//#bitesize.debug.log('scrolling...');			
			bitesize.resizeTimer = setTimeout( bitesize.resizeAndScroll.scroll(), 500 );
			//#bitesize.debug.log('LAST WINDOW SCROLLn: ' + bitesize.lastWindowPos);
		})
		.on( 'resize.bitesizetheme', function(e) {
			clearTimeout( bitesize.resizeTimer );
			//#bitesize.debug.log(bitesize.resizeTimer);
			//#bitesize.debug.log('resizing...');
			bitesize.resizeTimer = setTimeout( bitesize.resizeAndScroll.resize(), 500 );
			//#bitesize.debug.log(bitesize.orientation);
			//#bitesize.debug.log(bitesize.windowWidth);
		});

	bitesize.sidebar.on( 'click keydown', 'button', bitesize.resizeAndScroll.init() );
	
	bitesize.menuFunctions.init();

	for ( var i = 1; i < 6; i++ ) {
		
		setTimeout( bitesize.resizeAndScroll.init(), 100 * i );
	}

	bitesize.debug.log('bitesize is', bitesize);
	///bitesize.debug.log('bitesize screenReaderText',bitesize_data_object.screenReaderText);

	var options = {
		/// List items here
		items : 
			[{
				item : '.animated-item',
				delayIn : 400,
				delayOut : 600	
			},
			{
				item : '.animated-itemb',
				delayIn : 350,
				delayOut : 650	
			}]
	};

	bitesize.appearObj.init(options);
	///bitesize.appearObj.init();

	/*
	var o = { "key1": "value1", "key2": "value2"};
	for(var prop in o) {
	  console.log(prop,o[prop]);  
	}
	*/

	/**
	 * Below are Google Analytics Examples and how the frmework can handle each type of GA event...
	 */

	/*
	* Example 1 - older ga event...	
	bitesize.ga.settings.ga_type = 'ga';
	bitesize.ga.sendGA('event', {
		hitType: 'event',		
		eventCategory: 'test_cata',
		eventAction: 'testa',
		eventLabel: 'test_labela',
		eventValue: 221
    });
	*/
	/*
	* Example 2 - gtag event...
	bitesize.ga.settings.ga_type = 'gtag';
	bitesize.ga.sendGA('event', {
		event_trigger: 'testb',
		event_action: 'testb',
		event_category: 'test_catb',
		event_label: 'test_labelb',
		value: 222
    });
    */
    /*
	* Example 3 - gtm event...

	/// We can set the data like this...
	bitesize.ga.settings.ga_type = 'gtm';
	
	/// and then send it natively....
	bitesize.ga.sendGA('event', {
		event: 'event',
		gtmEvent: 'tr-click',	
		gtmCategory: 'Tr Click',
		gtmAction: 'Tr Clicked',
		gtmLabel: 'test3 only on /some page.../',
		gtmValue: 55
    });
    */

    $('a.apply').on('click', function(e){
    	/// We can set the data like this...
		bitesize.ga.settings.ga_type = 'gtm';

		var course = $(this).data('course-id');
		
		/// and then send it natively....
		bitesize.ga.sendGA('event', {
			event: 'event',
			gtmEvent: 'apply-now-clicked',	
			gtmCategory: 'Apply Now Clicked',
			gtmAction: 'Apply Now Clicked',
			gtmLabel: 'Course Appied For: ' + course,
			gtmValue: 55
	    });
    });
});