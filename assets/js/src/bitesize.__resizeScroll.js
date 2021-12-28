// JavaScript Document
bitesize.resizeAndScroll = {
	
	init : function(){
		
		bitesize.resizeAndScroll.resize();
		bitesize.resizeAndScroll.scroll();
		bitesize.resizeAndScroll.checkOrientation();
		bitesize.resizeAndScroll.checkIsDevice();
		/*windowWidth   = bitesize.window.width();
		windowHeight  = bitesize.window.height();
		bodyHeight    = bitesize.body.height();
		sidebarHeight = bitesize.sidebar.height(); */

	},

	checkOrientation : function() {
		var orientation	= screen.orientation || screen.mozOrientation || screen.msOrientation;
		orientation = (orientation === undefined) ? Math.abs(window.orientation) : Math.abs(orientation.angle);
		orientation = (bitesize.resizeAndScroll.checkIsDevice() === 'Desktop' || orientation === 90 ||  orientation === 270) ? 'Landscape' : 'Portrait';
		bitesize.orientation = orientation;
		///return orientation;

	},

	checkIsDevice : function() {
		var device = (window.orientation === undefined) ? 'Desktop' : 'Device';
		bitesize.device = device;
		///return device;
	},

	// Sidebar scrolling.
	resize : function () {

		// heloo World!

		/*if ( 955 > bitesize.window.width() ) {
			top = bottom = false;
			bitesize.sidebar.removeAttr( 'style' );
		}

		bitesize.mainMenu = $('#menu-primary-menu');
		bitesize.mainMenuWidth = bitesize.mainMenu.width();

		bitesize.pageContainer = $('#page-container');
		bitesize.pageContainerWidth = bitesize.pageContainer.width();
		*/
	
		///#bitesize.debug.log(bitesize.window.width());
		///#bitesize.debug.log(bitesize.mainMenu.width());
		///#bitesize.debug.log(bitesize.mainMenu);
		///#bitesize.debug.log(bitesize.pageContainerDiff);
		///#bitesize.debug.log(bitesize.window.width() + '<=' + parseInt(bitesize.mainMenuWidth+10) );
		
		/*
		TODO: rewrite the menu container calculation....
		 */
		if(parseInt(bitesize.window.width()-bitesize.pageContainerDiff) <= parseInt(bitesize.mainMenuWidth+10)) {
			bitesize.mobileOn = true;
		}
		if(parseInt(bitesize.window.width()-bitesize.pageContainerDiff) > parseInt(bitesize.mainMenuWidth+10)) {	
			bitesize.mobileOn = false;
		}

		///alert(bitesize.mobileOn);
		if(bitesize.mobileOn){
			bitesize.body.addClass('egg-mobile');
		} else {
			bitesize.body.removeClass('egg-mobile');
		}

		bitesize.windowWidth = bitesize.window.width();
		bitesize.windowHeight = bitesize.window.height();
		
	},

	scroll : function () {

		var windowPos = bitesize.window.scrollTop();

		/**if ( 955 > bitesize.window.width() ) {
			return;///
		}

		if ( bitesize.sidebar.height() + bitesize.adminbarOffset > bitesize.window.height() ) {
			if ( windowPos > lastWindowPos ) {
				if ( top ) {
					top = false;
					topOffset = ( bitesize.sidebar.offset().top > 0 ) ? bitesize.sidebar.offset().top - bitesize.adminbarOffset : 0;
					bitesize.sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
				} else if ( ! bottom && windowPos + bitesize.window.height() > bitesize.sidebar.height() + bitesize.sidebar.offset().top && bitesize.sidebar.height() + bitesize.adminbarOffset < bitesize.body.height() ) {
					bottom = true;
					bitesize.sidebar.attr( 'style', 'position: fixed; bottom: 0;' );
				}
			} else if ( windowPos < lastWindowPos ) {
				if ( bottom ) {
					bottom = false;
					topOffset = ( bitesize.sidebar.offset().top > 0 ) ? bitesize.sidebar.offset().top - bitesize.adminbarOffset : 0;
					bitesize.sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
				} else if ( ! top && windowPos + bitesize.adminbarOffset < bitesize.sidebar.offset().top ) {
					top = true;
					bitesize.sidebar.attr( 'style', 'position: fixed;' );
				}
			} else {
				top = bottom = false;
				topOffset = ( bitesize.sidebar.offset().top > 0 ) ? bitesize.sidebar.offset().top - bitesize.adminbarOffset : 0;
				bitesize.sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
			}
		} else if ( ! top ) {
			top = true;
			bitesize.sidebar.attr( 'style', 'position: fixed;' );
		}*/

		bitesize.lastWindowPos = windowPos;
		
		bitesize.debug.log('LAST WINDOW SCROLL: ' + bitesize.lastWindowPos);
		///
		/// Check Animations Classes
		////#bitesize.animationsObj.init();

	}

};

