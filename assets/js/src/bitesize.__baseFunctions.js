// JavaScript Document
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

	// Returns if a value is a string
	isString: function (value) {
		return typeof value === 'string' || value instanceof String;
	},
	// Returns if a value is really a number
	isNumber: function (value) {
		return typeof value === 'number' && isFinite(value);
	},
	// Returns if a value is an array
	isArray: function (value) {
		return value && typeof value === 'object' && value.constructor === Array;
	},
	// Returns if a value is a function
	isFunction: function (value) {
		return typeof value === 'function';
	},
	// Returns if a value is an object
	isObject: function (value) {
		return value && typeof value === 'object' && value.constructor === Object;
	},
	// Returns if a value is null
	isNull: function (value) {
		return value === null;
	},
	// Returns if a value is undefined
	isUndefined: function (value) {
		return typeof value === 'undefined';
	},
	// Returns if a value is a boolean
	isBoolean: function (value) {
		return typeof value === 'boolean';
	},
	// Returns if value is an error object
	isError: function (value) {
		return value instanceof Error && typeof value.message !== 'undefined';
	},
	// Returns if value is a date object
	isDate: function (value) {
		return value instanceof Date;
	},
	// Returns if a Symbol
	isSymbol: function (value) {
		return typeof value === 'symbol';
	},
	/// shortcut function to test all of these
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

///bitesize.debug.log = function (message, data, level){
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


/**
 * Gives us a more complete output although with the runtime and the log the message when clicked on will point to this function..
 * @param  {[type]} message [description]
 * @param  {[type]} data    [description]
 * @param  {[type]} level   [description]
 * @return {[type]}         [description]
 */
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
