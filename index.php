<?php
require_once 'app/autoloader.php';
use \App\autoloader as autoload;
autoload::register();

#use \App\Config as Config;
use \App\Init as Init;

function app() {
		
	if(class_exists('\App\Init\Class_Init')) {
		$app = Init\Class_Init::getInstance();
		return $app;
	}				
}

$app = app();
#var_dump($app);
#$app = new Init\Class_Init();