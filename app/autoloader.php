<?php
/**
 * Autoloads MyPlugin classes using WordPress convention.
 *
 * @author Andi Lee Davis
 */
namespace App {

	class autoloader {

		/**
		 * Registers MyPlugin_Autoloader as an SPL autoloader.
		 *
		 * @param boolean $prepend
		 */
		public static function register($prepend = false) {

			if (version_compare(phpversion(), '5.3.0', '>=')) {
				spl_autoload_register(array(new self, 'autoload'), true, $prepend);
			} else {
				spl_autoload_register(array(new self, 'autoload'));
			}

		}
	 
		/**
		 * Handles autoloading of MyPlugin classes.
		 *
		 * @param string $class
		 */
		public static function autoload($className)	{
			
			$class = str_replace( '\\', DIRECTORY_SEPARATOR, str_replace( '_', '-', strtolower($className) ) );
			
			error_log($class);

			// create the actual filepath
			$filePath = $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . $class . '.php';

			error_log('filepath : ' . $filePath);
			error_log('file_exists : ' . file_exists($filePath));

			// check if the file exists
			if(file_exists($filePath)) {
				// require once on the file
				require_once $filePath;
			}
						
		}

	}

}
?>