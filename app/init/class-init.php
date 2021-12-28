<?php

/**
 * Builds the app
 * Gets the content according to the url request and finds in the content array for use in the content
 * 
 */

namespace App\Init;

use \App\Config as Config;
use \App\Content as Content;
use \App\Layout as Layout;
use \App\Menu as Menu;

class Class_Init {

	protected static $instance = null;

	protected static $requested_url;
	protected static $content;
	protected static $current_view;
	protected static $output;
	protected static $menu;

	public function __construct(){

		$this->startApp();
	}

	/**
	 * getInstance
	 * If we want to get an instance of this object which is handy.
	 * @return object
	 */
	public static function getInstance(){

		if(!self::$instance){
	      self::$instance = new Class_Init();
	    }
	   
	    return self::$instance;
	}

	/**
	 * Putting it all together
	 * get the requested url
	 * build the content
	 * biuld and display the page templates (view)
	 */

	public function startApp() {
		
		self::$requested_url = (str_replace('/','',$_SERVER['REQUEST_URI']) !== "") ? array_filter(explode('/', $_SERVER['REQUEST_URI'])) : 'home';
		
		self::$menu = new Menu\Class_Menu();
		
		self::$content = new Content\Class_Content();

		self::$output = new Layout\Class_Layout();	
		

	}


}