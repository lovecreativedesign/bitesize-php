<?php
namespace App\Content;

use \App\Config as Config;
use \App\Fields as Fields;

class Class_Content extends \App\Init\Class_Init {

	public $default_content = NULL;
	public $selected_content = NULL;
	public $sections = NULL;
	public $walked_sections = NULL;
	public $section_content = NULL;

	public function __construct(){

		//// get defaults
		$this->default_content = new \stdClass();
		$this->default_content->assets = Config\Config::$settings['assets'];

		$requested_url = parent::$requested_url;
		$this->selected_content = new \stdClass();
		$this->selected_content->page_template = NULL;
		
		if($requested_url) {
			
			return $this->buildContent($requested_url);

		}

	}

	public function buildContent($requested_url = null){
		
		$requested_content = (is_array($requested_url)) ? array_pop($requested_url) : $requested_url;
		
		/**
		 * Get the form and / or results based on the url.. note our restults methos does the curl call
		 */
		switch($requested_content) {

			/**
			 * TODO: Make the default be selected from the config...
			 * Move/Make this part of a Routes Class
			 */
			 
			case 'index.php' :

				$this->selected_content = $this->getContent('home');
				
				break;

			case 'home' :

				$this->selected_content = $this->getContent($requested_content);
				
				break;

			case 'about' :
				
				$this->selected_content = $this->getContent($requested_content);
				
				break;

			case 'courses' :
				
				$this->selected_content = $this->getContent($requested_content);

				#$this->sections = $this->getSections($requested_url[1]);
				
				break;
			case 'games-design-art-ba' :
				
				$this->selected_content = $this->getContent('courses');
				$this->sections = $this->getSections($requested_content);
				$this->walked_sections = $this->walkSections($this->sections, 'Course');
				$this->section_content = $this->getSectionContent($this->sections, 'Course');
				$this->selected_content->page_template = 'default';

				break;
			case 'results' :
				///$this->selected_content['content']['results'] = self::buildResults();
				break;

			default:

				$this->selected_content = $this->getError('404');
				

		}		

	}

	/**
	 * Get Error from json files
	 */
	protected function getError($requested_content){
		
		$content_to_return = NULL;
		$content = json_decode(Config\Config::getErrors());
		$content_to_return = $content->errors->{$requested_content};
		return $content_to_return;
		
	}

	/**
	 * Get Content from json files
	 */
	protected function getContent($requested_content){
		
		$content_to_return = NULL;
		$content = json_decode(Config\Config::content());
		$content_to_return = $content->pages->{$requested_content};
		return $content_to_return;
		
	}

	/**
	 * Get Content from json files
	 */
	protected function getSections($requested_content){
		
		$sections_to_return = NULL;
		
		/// we already have the content we just need the sections
		$sections_to_return = $this->selected_content->subpages->{$requested_content}->sections;
		return $sections_to_return;
		
	}

	
	protected function walkSections(&$sections = null, $title = null){

		$tab_id = strtolower(str_replace(' ', '-', $title));
		$section_obj = null;
		$start_html = '<nav class="z-50 bg-blue-800 rounded-b overflow-hidden sr lg:pr-6 lg:bg-white" aria-label="'.$tab_id.'">';
		$end_html = '</nav>';
		
		
		if(isset($sections)) {

			foreach($sections as $section => $section_item){

				$section_obj .= '<a class="link active" data-accordion-collapser="" href="#'.$section.'" data-tab-trigger="'.$section.'" data-tab-id="'.$tab_id.'" title="Links to '.$section_item->title.', anchor tag"  >'.$section_item->title.'</a>';
				
			}

		}
		$section_obj = $start_html . $section_obj . $end_html;

		return $section_obj;
		
	}

	protected function getSectionContent(&$sections = null, $title = null){

		$tab_id = strtolower(str_replace(' ', '-', $title));
		$section_obj = null;	
		
		if(isset($sections)) {

			$count = 0;

			foreach($sections as $section => $section_item){

				$active = ($count < 1) ? 'class="active"' : 'class="hidden"';

				$section_obj .= '<section data-tab-target="'.$section.'" data-tab-id="'.$tab_id.'" '.$active.' >';
                $section_obj .= '<h2 class="t-section" id="'.$section.'" tabindex="-1">'.$section_item->title.'</h2>';
				$section_obj .= $section_item->content->html;
				$section_obj .= '</section>';

				$count++;
			}

		}


		return $section_obj;
		
	}


	/**
	 * Builds the form and gets the results
	 * TODO: put these in their own Classes (rename Fields to Forms)
	 */
	public static function buildForm(){

		$form  = NULL;
		$form  = '<form method="POST" name="search-form" action="/results" >';
		/**
		 *	do loop for exiting items...
		 */
		$settingsFields = array_merge(Config\Config::$settingsFields,Config\Config::$customSettingsFields);
		$i = 0;

		foreach($settingsFields as $field => $field_options){

			/// Default to text field... if not set in config
			
			$field = Fields\Class_Fields::getFieldDefault($field, $field_options);
			$field_name = key($field);

			///$field_value = ${$field_name} = ( get_option($field_name) !== false) ? get_option($field_name) : NULL;
			$field_value = ${$field_name} = $field_options['value'];
			$field_options = $field[key($field)];

			$form .= '<div class="wrap" >';
			$form .= '<div class="wrap row" >';
							
			$form .= Fields\Class_Fields::returnField($i, $field_name, $field_value, $field_options);

			$form .= '</div>';
			$form .= '</div>';

			$i++;
		}

		$form .= '<div class="wrap" >';
		$form .= '<div class="wrap row" >';
						
		$form .= '<input type="submit" value="Search" />';

		$form .= '</div>';
		$form .= '</div>';
		$form .= '</form>';

		return $form ;
	}

	private static function buildResults(){

		///$content_to_return = '<ul class="hotel-results" >';
		$content_to_return = array();

		// Build data and send to curl...
		$data_to_send = array('post' => parent::$requested_url);

		///https://apis.ihg.com/guest-api/v1/ihg/us/en/searchLight
		$data_to_send['url'] = Config\Config::$settings['init_search']['base_url'] . Config\Config::$settings['init_search']['lang'] . Config\Config::$settings['init_search']['endpoint'];

		foreach($_POST as $k => $v){
			$data_to_send['data'][$k] = $v;

		}

		/// Get some data for later IE how many nights between dates..
		/**
		 * Send for a post for our initial search
		 * @var [type]
		 */
		# CURL 1 - GET HOTELS
		$results = new \App\Curl\Class_Curl($data_to_send);

		$current_results = json_decode($results->response);

		//// Now we submit the hotel code and get our next query for each hotel...
		if($current_results->result === 'success'){

			$data = json_decode($current_results->data);
			
			foreach($data->hotels as $hotelK => $hotel){

				$rate = ($hotel->rateRange->high > 0) ? $hotel->rateRange->high : $hotel->rateRange->low;

				$arr = array(
					'CurrencyCode' => $hotel->lowestPointsCurrencyCode,
					'NightlyRate' => number_format($rate, 2, '.', ','),
				);


				$data_to_send['url'] = Config\Config::$settings['details_search']['base_url'] . $hotel->hotelCode . '/' . Config\Config::$settings['details_search']['endpoint'];

				# CURL 2 : Get details on hotel based on its code...
				$results = new \App\Curl\Class_Curl($data_to_send, 'GET');
				$the_hotel = json_decode($results->response);
				$the_hotel_data = json_decode($the_hotel->data);

				###var_dump($the_hotel_data->hotelInfo->tax->total->items[0]->amount);

				$tax 							= $the_hotel_data->hotelInfo->tax->total->items[0]->amount->fee;
				$tax_basis						= $the_hotel_data->hotelInfo->tax->total->items[0]->amount->basis;
				$tax_included_in_rate			= $the_hotel_data->hotelInfo->tax->total->items[0]->amount->includedInRate;

				$individual_fee					= $the_hotel_data->hotelInfo->tax->individual->items[0]->amount->fee;
				$individual_basis				= $the_hotel_data->hotelInfo->tax->individual->items[0]->amount->basis;
				$individual_included_in_rate	= $the_hotel_data->hotelInfo->tax->individual->items[0]->amount->includedInRate;

				$service_charge 				= $the_hotel_data->hotelInfo->tax->serviceCharge->percentage;
				
				/**
				 * work out when P that is a percentage indicator
				 * we could cascade calculations here
				 */
				switch(true){

					case ($tax_included_in_rate) :
						/// No Calculation
						$tax = 1;
						break;

					case ($tax_basis === 'P') :
						$tax = intval('1.'.$tax);
						break;
					default :
						$tax = floatval($tax);
						break;
				}

				switch(true){

					case ($individual_included_in_rate) :
						/// No Calculation
						$individual_fee = 1;
						break;

					case ($individual_basis === 'P') :
						$individual_fee = intval('1.'.$individual_fee);
						break;
					default :
						$individual_fee = floatval($individual_fee);
						break;
				}

				$nights 					= self::calcDays($data_to_send['data']['start'], $data_to_send['data']['end']);
				$arr['nights'] 				= $nights;



				$total_costs_before_tax	 	= number_format( ( $rate * $individual_fee * $nights ) , 2, '.', ',');
				$total_costs_after_tax 		= number_format( ( $total_costs_before_tax * $tax ) , 2, '.', ',');

				$policies			= 'check In Time: ' . $the_hotel_data->hotelInfo->policies->checkinTime . '<br />';
				$policies			.= 'check Out Time: ' . $the_hotel_data->hotelInfo->policies->checkoutTime. '<br />';
				$policies			.= 'Service Charge Details: ' . $the_hotel_data->hotelInfo->policies->serviceChargeDetail->description . '<br />';
				
				$arr['RoomName'] = $the_hotel_data->hotelInfo->brandInfo->brandName;
				$arr['TotalBeforeTax'] = $total_costs_before_tax;
				$arr['TotalAfterTax'] = $total_costs_after_tax;
				$arr['CancellationTerms'] = $policies;

				$content_to_return['Rooms'][] = $arr;

			}
			
			
		}

		return '<textarea cols="50" rows="20" >' . json_encode($content_to_return) . '</textarea>';

	}

	/**
	 * Gets Date Calculation...
	 * TODO: put in own class
	 */
	//public static function ($order_id, $order_date, $return_date_format){
	public static function calcDays($booking_date_from, $booking_date_to, $return_date_format = '%d'){

		//// Fix error on order date error where does not accept / as contradicts Americans.
		$booking_date_from 	= str_replace('/', '-', $booking_date_from);
		$booking_date_to 	= str_replace('/', '-', $booking_date_to);

		$booking_date_from	=	date_create($booking_date_from);
		$booking_date_to	=	date_create($booking_date_to);
		$booking_date_diff	=	date_diff($booking_date_from,$booking_date_to);					
		
		return $booking_date_diff->format($return_date_format);

	} /// end collectionDate Method

}
