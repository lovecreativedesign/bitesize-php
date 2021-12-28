(function($) {

	$(document).ready(function(){

		///var bitesize = bitesize || {};

		bitesize.debug.log('livereload is on', bitesize_data_object);		
		
		/*var observer = new MutationObserver(function(mutations) {
			///bitesize.debug.log(mutations);
		    mutations.forEach(function(mutationRecord) {
		        bitesize.debug.log('style changed!');
		        bitesize.debug.log(mutationRecord.type);
		        //// Send request to livereload.php
		        
		        source.forceReload = true;
		    });  
		});
		
		//var target = document.querySelector('body');
		var target = document.body;
		///
		var observerConfig = {
			  attributes: true,
			  attributeFilter : ['style'],
			  subtree: true,
			  childList: false,
			  ///characterData: true,
			  ///attributeOldValue: true,
		};
		observer.observe(target, observerConfig);
		*/
	
		if (!!window.EventSource) {
			var source = new EventSource(bitesize_data_object.get_template_directory_uri+'/inc/framework/debug/livereload.php');
			source.old_livereload = null;
			source.js = [bitesize_data_object.get_stylesheet_directory_uri+'/js/scripts-dev.min.js?ver='+bitesize_data_object.bitesize_theme_js_version];
			source.forceReload = false;
		} else {
			// Result to xhr polling :(
		}

		source.addEventListener('message', function(e) {
		  
			var livereload = e.data;
			
			bitesize.debug.log('source.forceReload: ' + source.forceReload);
			bitesize.debug.log(source.old_livereload + ' <==> ' + livereload);


			if((source.old_livereload !== null && livereload !== source.old_livereload) || source.forceReload) {
				bitesize.debug.log('changed - Reload');
				
				///location.reload();
				//bitesize.debug.log($(document).find('head').find('link#bitesizetheme-style-css').attr( 'href'));
				//bitesize.debug.log($(document).find('head').find('link#bitesizetheme-child-style-css').attr( 'href'));
				/**
				 * Reload the stylesheets
				 
				$(document).find('head').find('link#bitesizetheme-style-css').attr('href').replace( $(document).find('head').find('link#bitesizetheme-style-css').attr('href') );
				$(document).find('head').find('link#bitesize-child-style-css').attr('href').replace( $(document).find('head').find('link#bitesize-child-style-css').attr('href') );
				*/
				reloadStylesheets();

				/**
				 * Reload scripts
				 */
				///reloadStylesheets('http://sja.egbx.uk/wp-content/themes/bitesize-child/style.dev.min.css?ver=1.5.3');
				bitesize.debug.log(source.js);
				$.each(source.js, function(i, src){
					bitesize.debug.log('Reloading script...');
					bitesize.debug.log(i);
					bitesize.debug.log(src);
					source.js[i] = reloadScripts(src);
				});
				source.forceReload = false;
			}


		}, false);

		source.onmessage = function(e) {
			//bitesize.debug.log('opened once!!!!');
			//bitesize.debug.log(e);
			source.old_livereload = e.data;
			//bitesize.debug.log(source.old_livereload);
		  	
		}

		/*source.addEventListener('open', function(e) {
		  // Connection was opened.
		  bitesize.debug.log('opened!!!!');
		  bitesize.debug.log(e);
		  bitesize.debug.log(e.srcElement.old_livereload);
		  source.old_livereload = e.srcElement.old_livereload;
		  
		}, false);*/

		source.addEventListener('error', function(e) {
		  if (e.readyState == EventSource.CLOSED) {
		    // Connection was closed.
		  }
		}, false);

	});

	/**
	 * Forces a reload of all stylesheets by appending a unique query string
	 * to each stylesheet URL.
	 */
	function reloadStylesheets() {

	    var queryString = '?reload=' + new Date().getTime();
	    /// Load them all
    	$('link[rel="stylesheet"]').each(function () {
	        this.href = this.href.replace(/\?.*|$/, queryString);
	    });
	  			    
	}

	/**
	 * Forces a reload of all javascript files by appending a unique query string
	 * to each stylesheet URL.
	 */
	function reloadScripts(src) {

		var queryString = '?reload=' + new Date().getTime();			

		src = $('script[src$="' + src + '"]').attr("src");
		bitesize.debug.log(src);
		$('script[src$="' + src + '"]').remove();
		src = src.replace(/\?.*|$/, queryString);
		bitesize.debug.log(src);

		$('<script/>').attr('src', src ).appendTo('body');

		return src;		

	}
	
})(jQuery);
