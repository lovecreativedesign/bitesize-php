// JavaScript Document
jQuery(document).ready(function($){
	"use strict";

	function initialize() {

		var image = bitesize_data_object.get_template_directory_uri + '/img/icons/map-pin.png';
		var styles = bitesize_google_object.styles;
		var lng = bitesize_google_object.longitude;
		var lat = bitesize_google_object.latitude;
		var isDraggable = $(document).width() > 480 ? true : false; // If document (your website) is wider than 480px, isDraggable = true, else isDraggable = false

		var mapOptions = {
			zoom: 15,
			center: new google.maps.LatLng(lat,lng),
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: styles,
			draggable: isDraggable
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

		var myLatLng = new google.maps.LatLng(lat,lng);
		var homeMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image,
			streetViewControl: true
		});

		///map.checkResize();
		map.setZoom( map.getZoom(map) );
		google.maps.event.addListenerOnce(map, 'idle', function(){
			google.maps.event.trigger(map, 'resize');
			map.setCenter(myLatLng);
		});
	}

	google.maps.event.addDomListener(window, 'load', initialize);

});