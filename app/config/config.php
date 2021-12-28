<?php
namespace App\Config;
/**
*
*
* Config file for this helper app, all settings go in here...
*
*
*/
class Config {

	const APP_NAME = 'Bitesize PHP App';
	const APP_VERSION = '1.0';
	const JS_VERSION = '1.0';	

	public static $dependencies = NULL;
	public static $default_tags = NULL;
	public static $debug = false;

	public static $assets = 'assets';
	public static $images = 'img';
	public static $css = 'css';
	public static $js = 'js';

	public static function test(){
		echo 'config loaded';
	}
	
	public static $settings = array (
		'init_search' => array(
			'base_url' 	=> 'https://apis.ihg.com/guest-api/v1/ihg/',
			'lang'		=> 'us/en/',
			'endpoint'	=> 'searchLight'
		),
		'details_search' => array(
			'base_url' 	=> 'https://apis.ihg.com/hotels/v1/profiles/',
			'endpoint'	=> 'details'
		),
		'version' => '1.3',
		'API_KEY' => 'se9ym5iAzaW8pxfBjkmgbuGjJcr3Pj6Y',
		'API_TOKEN' => '58ce5a89-485a-40c8-abf4-cb70dba4229b',
		'assets' => array(
			'images' => 'img',
			'css' => 'css',
			'js' => 'js',
		),

	);

	/**
	 * We can use this to build form fields... the below is just for example
	 * See Our Fields Classes
	 * @var array
	 */
	public static $settingsFields = array(

		/// Register Defaults for options examples below, leave as is for default text field
		
		///'_logo',

		//// Default email texts
		/*'_base_url' => array(
			'type'=> 'text',
			'value'=> 'https://apis.ihg.com/guest-api/v1/ihg/',
			'default'=> 'https://apis.ihg.com/guest-api/v1/ihg/',
			'label' => 'BaseUrl',
		),
		'_lang' => array(
			'type'=> 'text',
			'value'=> 'us/en/',
			'label' => 'Language',
		),
		'_endpoint' => array(
			'type'=> 'text',
			'value'=> 'searchLight',
			'label' => 'Endpoint',
		),*/

		'start' => array(
			'type'=> 'text',
			'value'=> '2019-09-20',
			'label' => 'Stay From',
		),
		'end' => array(
			'type'=> 'text',
			'value'=> '2019-09-22',
			'label' => 'Stay To',
		),
		'location' => array(
			'type'=> 'text',
			'value'=> '30 Blyth St, Adelaide SA 5000, Australia',
			'label' => 'Location',
		),
		'adults' => array(
			'type'=> 'text',
			'value'=> '2',
			'label' => 'Adults',
		),
		'children' => array(
			'type'=> 'text',
			'value'=> '0',
			'label' => 'Children',
		),
		'rooms' => array(
			'type'=> 'text',
			'value'=> '1',
			'label' => 'Rooms',
		),

		/// Other Defaults
		'checkDailyPointsCost' => array(
			'type'=> 'checkbox',
			'value'=> 'true',
			'default'=> 'true',
			'checked' => 'true',
			'label' => 'checkDailyPointsCost',
		),
		'corporateId' => array(
			'type'=> 'text',
			'value'=> '',
			'default'=> '',
			'label' => 'corporateId',
		),
		'travelAgencyId' => array(
			'type'=> 'text',
			'value'=> '99801505',
			'default'=> '99801505',
			'label' => 'travelAgencyId',
		),
		'rateCode' => array(
			'type'=> 'text',
			'value'=> '6CBARC',
			'default'=> '6CBARC',
			'label' => 'rateCode',
		),
		'radius' => array(
			'type'=> 'text',
			'value'=> '30',
			'default'=> '30',
			'label' => 'radius',
		),
		'radiusUnit' => array(
			'type'=> 'text',
			'value'=> 'MI',
			'default'=> 'MI',
			'label' => 'radiusUnit',
		),
		'bulkAvailability' => array(
			'type'=> 'checkbox',
			'value'=> 'true',
			'default'=> 'true',
			'checked' => 'true',
			'label' => 'bulkAvailability',
		),
		'marketingRates' => array(
			'type'=> 'text',
			'value'=> '',
			'default'=> '',
			'label' => 'marketingRates',
		),
		'lng' => array(
			'type'=> 'text',
			'value'=> '138.5969172',
			'default'=> '138.5969172',
			'label' => 'lng',
		),
		'lat' => array(
			'type'=> 'text',
			'value'=> '-34.9228656',
			'default'=> '-34.9228656',
			'label' => 'lat',
		),

		/// Register endpoints to be able to change them
		/*
		'_endpoint_user_login' => array(
			'type'=> 'text',
			'value'=> 'user-login',
			'label' => 'User Login Endpoint',
		),
		'_endpoint_user_logout' => array(
			'type'=> 'text',
			'value'=> 'logout',
			'label' => 'User Logout Endpoint',
		),
		'_endpoint_user_forgot_password' => array(
			'type'=> 'text',
			'value'=> 'forgot-password', 
			'label' => 'User Forgot Password Endpoint',
		),
		'_endpoint_user_registration' => array(
			'type'=> 'text',
			'value'=> 'user-registration', 
			'label' => 'User Registration Endpoint',
		),
		'_endpoint_user_approval' => array(
			'type'=> 'text',
			'value'=> 'approve-user',
			'label' => 'User Approval Endpoint',
		),
		'_endpoint_user_unapproval' => array(
			'type'=> 'text',
			'value'=> 'unapprove-user',
			'label' => 'User Unapprove Endpoint',
		),
		'_endpoint_user_deactivation' => array(
			'type'=> 'text',
			'value'=> 'deactivate-user',
			'label' => 'User Deactivation Endpoint',
		),
		'_endpoint_user_deactivate_user_account' => array(
			'type'=> 'text',
			'value'=> 'deactivate-user-account',
			'label' => 'User Deactivate User Account Endpoint',
		),
		

		'_debug' => array(
			'type'=>'checkbox',
			'label' => 'Enable Debug Mode',
			///'value'=> '1', Leave off to be off by default
			'size' => 3
		),*/
		/*
		'_print_type' => array('type'=>'select', 'options'=>array(
				// Item, Materials, Daily, Hourly, Weekly, Project
				array('label'=>'Select', 'value'=>'','selected'=>true),
				array('label'=>'GMG Contone', 'value'=>'GMG Contone','selected'=>false),
				array('label'=>'GMG Halftone', 'value'=>'GMG Halftone','selected'=>false),
				
			),'size'=>20,'label'=>'Print Types','text-align'=>'left', 'required'=>true ),
		 'number_of_copies'			=>	array('type'=>'number','value'=>1,'size'=>2, 'label'=>'Number of Copies', 'required'=>true),
				'price'			=>	array('type'=>'price','value'=>NULL,'size'=>4, 'label'=>'Price'),
				//'bitesize_sbe_qty'					=>	array('type'=>'text','value'=>'1','size'=>2,'label-text'=>'Qty'),
				//'bitesize_sbe_hours'					=>	array('type'=>'text','value'=>'0','size'=>2,'label-text'=>'Hrs'),
		 */

	);

	/**
	 * Add your own additional fields here...
	 */
	public static $customSettingsFields = array();

	/**
	 * Create a map of fields so if left blank will default
	 * @var array
	 */
	public static $defaultFieldMap = array(
		'text'	=> array(
			'label' => '',
			'value'=>'', 
			'size' => 30,
			'required' => false,
			'text-align'=>'left',
		),
		'textarea'	=> array( 
			'label' => '',
			'value'=>'', 
			'size' => array('rows' => 10, 'cols' => 50),
			'required' => false,
			'text-align'=>'left'
		),
		'select'	=> array( 
			'label' => '',
			'options'=>array(array('label'=>'Select', 'value'=>'','selected'=>true)), 
			'size' => 30,
			'required' => false,
			'text-align'=>'left'
		),
		'checkbox'	=> array( 
			'label' => '',
			'value'=>'1',
			'size' => 3,
			'required' => false,
			'text-align'=>'left'
		),
	);

	public static function getErrors(){

		ob_start();
		include_once($_SERVER['DOCUMENT_ROOT'] . '/app/data/errors.json');
		$obj = ob_get_clean();
		return $obj;
		
	}

	public static function content(){

		ob_start();
		include_once($_SERVER['DOCUMENT_ROOT'] . '/app/data/content.json');
		$obj = ob_get_clean();
		return $obj;
		
	}

	public static function menu(){
		
		ob_start();
		include_once($_SERVER['DOCUMENT_ROOT'] . '/app/data/menu.json');
		$obj = ob_get_clean();
		return $obj;
		
	}


	/**
	 * We use this for checking things like plugin dependencies so we can return true and compare... 
	 * This prevents a plugin being activated without the required plugins being activated if we are developing an extended plugin
	 * IE Woocommerce, Ninja Forms etc
	 * @return JSON Encoded Array/Object
	 */
	public static function getDependancyList(){
		$dependencies = json_encode(array());
		return $dependencies;
	}

}
