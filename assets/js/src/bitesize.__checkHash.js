// JavaScript Document
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
