// JavaScript Document
bitesize.menuFunctions = {
	
	init : function(){
		///alert('menu works');
		bitesize.debug.log("menu working.");
		bitesize.menuFunctions.menu();

	},

	menu : function(){

		// Add dropdown toggle that display child menu items.
		///$( '.main-navigation .page_item_has_children > a, .main-navigation .menu-item-has-children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">' + bitesize.screenReaderText.expand + '</button>' );
		$( '.main-navigation .page_item_has_children > a, .main-navigation .menu-item-has-children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">expand item</button>' );

		// Enable menu toggle for small screens.
		var secondary = $( '#secondary' ), button, menu, widgets, social;

		button = bitesize.body.find( '.menu-toggle' );

		console.log(button);

		if ( ! button ) {
			return;
		}

		// Hide button if there are no widgets and the menus are missing or empty.
		menu    = secondary.find( '.nav-menu' );
		widgets = secondary.find( '#widget-area' );
		social  = secondary.find( '#social-navigation' );
		if ( ! widgets.length && ! social.length && ( ! menu || ! menu.children().length ) ) {
		/// -> This is not correct to fix this section -> button.hide();
		///return;
		}

		button.on( 'click', function() {
			bitesize.debug.log('click 1.1');
			if ( button ) {
				button.removeAttr('style');
			}

			/// Fixes mobile menu issue cause by parent theme not having a sidebar...
			/// Need to fix this perminently
			///if(secondary.length === 0 ){
				if(!$( this ).hasClass('toggled-on')) {

					secondary.addClass( 'toggled-on' );
					secondary.trigger( 'resize' );
					bitesize.body.addClass( 'toggled-on' );
					$(this).addClass( 'toggled-on' );
					$('ul.sub-menu').removeClass('toggled-on');
					$('.dropdown-toggle').removeClass('toggled-on');

				} else {

					secondary.removeClass( 'toggled-on' );
					secondary.trigger( 'resize' );
					bitesize.body.removeClass( 'toggled-on' );
					$(this).removeClass( 'toggled-on' );
					$('ul.sub-menu').removeClass('toggled-on');
					$('.dropdown-toggle').removeClass('toggled-on');

				}
			///}

		});

		$('body').find( '#menu-primary-menu' ).on('click touchend', '.dropdown-toggle', function( e ) {
			bitesize.debug.log('click 2.2.2');
			var _this = $( this );
			e.preventDefault();

			bitesize.debug.log(_this.parent('li').siblings().find('.dropdown-toggle.toggled-on')); ///.find('.dropdown-toggle.toggled-on')

			_this.parent('li').siblings().find('.dropdown-toggle.toggled-on').removeClass('toggled-on');
			_this.parent('li').siblings().find('.children').removeClass('toggled-on');
			_this.parent('li').siblings().find('.sub-menu.toggled-on').removeClass('toggled-on');

			_this.toggleClass( 'toggled-on' );		
			_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );
			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			_this.html( _this.html() === bitesize.screenReaderText.expand ? bitesize.screenReaderText.collapse : bitesize.screenReaderText.expand );
		});

	}

};