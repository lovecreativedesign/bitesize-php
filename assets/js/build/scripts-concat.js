
(function ($) {
  var selectors = [];

  var checkBinded = false;
  var checkLock = false;
  var defaults = {
    interval: 250,
    force_process: false
  };
  var $window = $(window);

  var $priorAppeared = [];

  function isAppeared() {
    return $(this).is(':appeared');
  }

  function isNotTriggered() {
    return !$(this).data('_appear_triggered');
  }

  function process() {
    checkLock = false;

    for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
      var $appeared = $(selectors[index]).filter(isAppeared);

      $appeared
        .filter(isNotTriggered)
        .data('_appear_triggered', true)
        .trigger('appear', [$appeared]);

      if ($priorAppeared[index]) {
        var $disappeared = $priorAppeared[index].not($appeared);
        $disappeared
          .data('_appear_triggered', false)
          .trigger('disappear', [$disappeared]);
      }
      $priorAppeared[index] = $appeared;
    }
  }

  function addSelector(selector) {
    selectors.push(selector);
    $priorAppeared.push();
  }
  $.expr.pseudos.appeared = $.expr.createPseudo(function (_arg) {
    return function (element) {
      var $element = $(element);

      if (!$element.is(':visible')) {
        return false;
      }

      var windowLeft = $window.scrollLeft();
      var windowTop = $window.scrollTop();
      var offset = $element.offset();
      var left = offset.left;
      var top = offset.top;

      if (top + $element.height() >= windowTop &&
          top - ($element.data('appear-top-offset') || 0) <= windowTop + $window.height() &&
          left + $element.width() >= windowLeft &&
          left - ($element.data('appear-left-offset') || 0) <= windowLeft + $window.width()) {
        return true;
      }
      return false;
    };
  });

  $.fn.extend({
    appear: function (selector, options) {
      $.appear(this, options);
      return this;
    }
  });

  $.extend({
    appear: function (selector, options) {
      var opts = $.extend({}, defaults, options || {});

      if (!checkBinded) {
        var onCheck = function () {
          if (checkLock) {
            return;
          }
          checkLock = true;

          setTimeout(process, opts.interval);
        };

        $(window).scroll(onCheck).resize(onCheck);
        checkBinded = true;
      }

      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }

      addSelector(selector);
    },
    force_appear: function () {
      if (checkBinded) {
        process();
        return true;
      }
      return false;
    }
  });


})(jQuery);;/**
 * Makes "skip to content" link work correctly in IE9, Chrome, and Opera
 * for better accessibility.
 *
 * @link http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
 */

( function() {
	var ua = navigator.userAgent.toLowerCase();

	if ( ( ua.indexOf( 'webkit' ) > -1 || ua.indexOf( 'opera' ) > -1 || ua.indexOf( 'msie' ) > -1 ) &&
		document.getElementById && window.addEventListener ) {

		window.addEventListener( 'hashchange', function() {
			var element = document.getElementById( location.hash.substring( 1 ) );

			if ( element ) {
				if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.nodeName ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
} )();
;/**
 * Bitesize Theme keyboard support for image navigation.
 */

( function( $ ) {
	$( document ).on( 'keydown.bitesizetheme', function( e ) {
		var url = false;
		if ( e.which === 37 ) {
			url = $( '.nav-previous a' ).attr( 'href' );
		} else if ( e.which === 39 ) {
			url = $( '.nav-next a' ).attr( 'href' );
		}

		if ( url && ( ! $( 'textarea, input' ).is( ':focus' ) ) ) {
			window.location = url;
		}
	} );
} )( jQuery );
;/// Define our object
var bitesize = {};
(function($) {
    "use strict";
    ;// JavaScript Document
bitesize = {
	body : null,
	window : null,
	windowWidth : 0,
	windowHeight : 0,
	lastWindowPos : 0,
	device : '',
	orientation : '',
	topOffset : 0,
	urlHash : null,
	urlParts : null,
	host : null,
	hostname : null,
	href : null,
	pathname : null,
	port : null,
	protocol : null,
	search : null,
	bodyHeight : 0,
	resizeTimer : 0,
	sidebar : null,
	sidebarHeight : 0,
	top : false,
	bottom : false,
	adminbarOffset : null,
	pageContainer : null,
	pageContainerWidth: 0,
	pageContainerDiff: 0,
	mainMenu : null,
	mainMenuWidth : 0,
	mobileOn : false,
	screenReaderText : null,
	debug : {
		on: true,
		log: window.console.log.bind(window.console, '%s: %s'),
		error: window.console.error.bind(window.console, 'error: %s'),
		info: window.console.info.bind(window.console, 'info: %s'),
		warn: window.console.warn.bind(window.console, 'warn: %s')
	},
	startTime : 0
};;// JavaScript Document
bitesize.appearObj = {
	settings : {
		delayIn : 200,
		delayOut : 400,
		items : 
			[{
				item : '.animated-item',
				delayIn : 300,
				delayOut : 500	
			}]
	},
	init : function (options){

		$.extend(bitesize.appearObj.settings, options || {}); // <- if no / undefined options are passed extend will simply return the defaults

		if($.isArray(bitesize.appearObj.settings.items)) {
			
			var arrayItems = bitesize.appearObj.settings.items;
			bitesize.debug.log('ITEMS as arrays: ', arrayItems);

			$.each(arrayItems, function(i, el) {
				bitesize.debug.log(el);				
				bitesize.debug.log(i);
				bitesize.debug.log(el.item);
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

		}

	},
	iterate : function(i, el, delayIn, delayOut){
		$(el).appear();
		$(el).on('appear', function(e, $all_appeared_elements) {
			
			bitesize.debug.log('To appear: ', $all_appeared_elements);
			bitesize.appearObj.appear(e, $all_appeared_elements, delayIn);

		});
		$(el).on('disappear', function(e, $all_disappeared_elements) {
			
			bitesize.debug.log('To disappear: ', $all_disappeared_elements);
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
;// JavaScript Document
bitesize.date = {
	settings : {
	},	
	getTime: function (){
		var d = new Date();
	    return d.getTime();
	},

	getRunTime: function (){
		return (bitesize.date.getTime() - bitesize.startTime)/1000;
	}

};

bitesize.dataTypes = {
	isString: function (value) {
		return typeof value === 'string' || value instanceof String;
	},
	isNumber: function (value) {
		return typeof value === 'number' && isFinite(value);
	},
	isArray: function (value) {
		return value && typeof value === 'object' && value.constructor === Array;
	},
	isFunction: function (value) {
		return typeof value === 'function';
	},
	isObject: function (value) {
		return value && typeof value === 'object' && value.constructor === Object;
	},
	isNull: function (value) {
		return value === null;
	},
	isUndefined: function (value) {
		return typeof value === 'undefined';
	},
	isBoolean: function (value) {
		return typeof value === 'boolean';
	},
	isError: function (value) {
		return value instanceof Error && typeof value.message !== 'undefined';
	},
	isDate: function (value) {
		return value instanceof Date;
	},
	isSymbol: function (value) {
		return typeof value === 'symbol';
	},
	messageIsData: function(message_to_test){
		var $rn = false;
		switch(true){
			case (bitesize.dataTypes.isArray(message_to_test)):
				$rn = true;
				break;
			case (bitesize.dataTypes.isDate(message_to_test)):
				$rn = true;
				break;
			case (bitesize.dataTypes.isFunction(message_to_test)):
				$rn = true;
				break;
			case (bitesize.dataTypes.isObject(message_to_test)):
				$rn = true;
				break;
			case (bitesize.dataTypes.isSymbol(message_to_test)):
				$rn = true;
				break;
		}
		return $rn;
	}
};
bitesize.setDebug = function (){

	if(window.console && console.log){
        var old = console.log;
        console.log = function(){
            Array.prototype.unshift.call(arguments, bitesize.date.getRunTime());
            old.apply(this, arguments);
        };
    }

	if(!bitesize.debug.on){
		var __no_op = function() {};
	    bitesize.debug = {
	      log: __no_op,
	      error: __no_op,
	      warn: __no_op,
	      info: __no_op
	    };

	} else {

		bitesize.debug = {
	      log: window.console.log.bind(window.console),
	      error: window.console.error.bind(window.console, 'error: %s'),
	      info: window.console.info.bind(window.console, 'info: %s'),
	      warn: window.console.warn.bind(window.console, 'warn: %s')
	    };
		
	}
};
bitesize.debugInfo = function (message, data, level) {
	
	var output = {
		'RunTime' : bitesize.date.getRunTime(),
		'message' : message
	};

	if(level === undefined) {
		level = 'log';
	}

	if(data === undefined) {

		if(bitesize.dataTypes.messageIsData(message)) {
			output.data = JSON.stringify(message, null, 4);
		} else {
			output.data = message;
		}

		bitesize.debug[level](output.RunTime, output.data);
		
	} else {

		output.data = data;
		bitesize.debug[level](output.RunTime + ' - ' + output.message, output.data);
	}

	console.log(output);

};
;// JavaScript Document
bitesize.checkHash = {
	
	init : function(){
			
		bitesize.checkHash.checkUrl();	

	},
	isHash : function(url){
		if(url) {
			return true;
		}
		return false;
	},
	hasParts : function(url){
		if(url.split('/')) {
			return true;
		}
		return false;
	},
	removeBlankPieces : function(parts, hash){
		return parts.filter(function(e){
			if(e !== hash) {
				return e;
			}
		});
	},
	checkUrl : function(url){

		if(bitesize.checkHash.isHash(window.location.hash)){
			bitesize.urlHash = window.location.hash.replace('#','');
		}

		if(bitesize.checkHash.hasParts(window.location.href)){
			bitesize.urlParts = bitesize.checkHash.removeBlankPieces(window.location.href.split('/'), window.location.hash);
		}

		bitesize.host = window.location.host;
		bitesize.hostname = window.location.hostname;
		bitesize.href = window.location.href;
		bitesize.pathname = window.location.pathname;
		bitesize.port = window.location.port;
		bitesize.protocol = window.location.protocol;
		bitesize.search = window.location.search;

	}
	
};
;// JavaScript Document
bitesize.cookie = {
    createCookie : function (name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+value+expires+"; path=/";
    },
    readCookie : function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    },
    eraseCookie : function (name) {
        bitesize.cookie.createCookie(name,"",-1);
    }
};
;/**
 * Google Analytics Manager Functions
 * @type {Object}
 */
bitesize.ga = {
	
	settings : {
		ga_type : 'gtag',
		to_function : 'rnFunction',
	},

	sendGA : function(to_function, data){
		
		to_function = (to_function !== undefined) ? to_function : bitesize.ga.settings.to_function;
		bitesize.ga[to_function](data);	
		
	},
	rnFunction : function(data){
		return false;
	},
	
	event : function(data){
		
		bitesize.debug.log('GA Data sending:', data);
		bitesize.debug.log('GA type', bitesize.ga.settings.ga_type);

		if(bitesize.debug === true){
			var data_to_send = data;
			bitesize.debug.log('Debug On: OUR DATA REQUEST: data is not sent to GA', data_to_send);		  
			return false;
		}
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

			gtag('event', data.event_trigger,  data);

		} else if(bitesize.ga.settings.ga_type === 'ga') {

			ga('send', data);

		}
	}

};;// JavaScript Document
bitesize.menuFunctions = {
	
	init : function(){
		bitesize.debug.log("menu working.");
		bitesize.menuFunctions.menu();

	},

	menu : function(){
		$( '.main-navigation .page_item_has_children > a, .main-navigation .menu-item-has-children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">expand item</button>' );
		var secondary = $( '#secondary' ), button, menu, widgets, social;

		button = bitesize.body.find( '.menu-toggle' );

		console.log(button);

		if ( ! button ) {
			return;
		}
		menu    = secondary.find( '.nav-menu' );
		widgets = secondary.find( '#widget-area' );
		social  = secondary.find( '#social-navigation' );
		if ( ! widgets.length && ! social.length && ( ! menu || ! menu.children().length ) ) {
		}

		button.on( 'click', function() {
			bitesize.debug.log('click 1.1');
			if ( button ) {
				button.removeAttr('style');
			}
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

};;// JavaScript Document
bitesize.resizeAndScroll = {
	
	init : function(){
		
		bitesize.resizeAndScroll.resize();
		bitesize.resizeAndScroll.scroll();
		bitesize.resizeAndScroll.checkOrientation();
		bitesize.resizeAndScroll.checkIsDevice();

	},

	checkOrientation : function() {
		var orientation	= screen.orientation || screen.mozOrientation || screen.msOrientation;
		orientation = (orientation === undefined) ? Math.abs(window.orientation) : Math.abs(orientation.angle);
		orientation = (bitesize.resizeAndScroll.checkIsDevice() === 'Desktop' || orientation === 90 ||  orientation === 270) ? 'Landscape' : 'Portrait';
		bitesize.orientation = orientation;

	},

	checkIsDevice : function() {
		var device = (window.orientation === undefined) ? 'Desktop' : 'Device';
		bitesize.device = device;
	},
	resize : function () {
		if(parseInt(bitesize.window.width()-bitesize.pageContainerDiff) <= parseInt(bitesize.mainMenuWidth+10)) {
			bitesize.mobileOn = true;
		}
		if(parseInt(bitesize.window.width()-bitesize.pageContainerDiff) > parseInt(bitesize.mainMenuWidth+10)) {	
			bitesize.mobileOn = false;
		}
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

		bitesize.lastWindowPos = windowPos;
		
		bitesize.debug.log('LAST WINDOW SCROLL: ' + bitesize.lastWindowPos);

	}

};

;// JavaScript Document
bitesize.startTime = bitesize.date.getTime();
bitesize.setDebug();
bitesize.debug.log('Development Website');

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
	bitesize.checkHash.init();

	bitesize.window
		.on( 'scroll.bitesizetheme', function(e){
			clearTimeout( bitesize.resizeTimer );
			bitesize.resizeTimer = setTimeout( bitesize.resizeAndScroll.scroll(), 500 );
		})
		.on( 'resize.bitesizetheme', function(e) {
			clearTimeout( bitesize.resizeTimer );
			bitesize.resizeTimer = setTimeout( bitesize.resizeAndScroll.resize(), 500 );
		});

	bitesize.sidebar.on( 'click keydown', 'button', bitesize.resizeAndScroll.init() );
	
	bitesize.menuFunctions.init();

	for ( var i = 1; i < 6; i++ ) {
		
		setTimeout( bitesize.resizeAndScroll.init(), 100 * i );
	}

	bitesize.debug.log('bitesize is', bitesize);

	var options = {
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

    $('a.apply').on('click', function(e){
		bitesize.ga.settings.ga_type = 'gtm';

		var course = $(this).data('course-id');
		bitesize.ga.sendGA('event', {
			event: 'event',
			gtmEvent: 'apply-now-clicked',	
			gtmCategory: 'Apply Now Clicked',
			gtmAction: 'Apply Now Clicked',
			gtmLabel: 'Course Appied For: ' + course,
			gtmValue: 55
	    });
    });
});;// JavaScript Document
})( jQuery);
