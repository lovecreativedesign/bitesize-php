// JavaScript Document
/**
 * Our initial Variables and Initial Functions are in here.
 */
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
};