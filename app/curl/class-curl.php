<?php
namespace App\Curl;

use \App\Config as Config;

class Class_Curl {

	public $response;

	private $response_a;	
	private $data_to_send = array();
	private $url = null;

	///protected $test_data = '{"version":"1.3","checkDailyPointsCost":"true","corporateId":"","stay":{"travelAgencyId":"99801505","dateRange":{"start":"2019-07-30","end":"2019-07-31"},"rateCode":"6CBARC","children":0,"adults":1,"rooms":1},"radius":30,"radiusUnit":"MI","bulkAvailability":true,"marketingRates":"","location":{"lng":138.5969172,"lat":-34.9228656,"location":"30 Blyth St, Adelaide SA 5000, Australia"}}';

	protected $test_data = '{"version":"1.3","checkDailyPointsCost":"true","corporateId":"","stay":{"travelAgencyId":"99801505","dateRange":{"start":"2019-07-30","end":"2019-07-31"},"rateCode":"6CBARC","children":"0","adults":"1","rooms":"1"},"radius":"30","radiusUnit":"MI","bulkAvailability":true,"marketingRates":"","location":{"lng":"138.5969172","lat":"-34.9228656","location":"30 Blyth St, Adelaide SA 5000, Australia"}}';


	/**
     * Property: method
     * The HTTP method this request was made in, either GET, POST, PUT or DELETE
     */
    protected $method = '';
    /**
     * Property: endpoint
     * The Model requested in the URI. eg: /files
     */
    protected $endpoint = '';
    /**
     * Property: verb
     * An optional additional descriptor about the endpoint, used for things that can
     * not be handled by the basic methods. eg: /files/process
     */
    protected $verb = '';
    /**
     * Property: args
     * Any additional URI components after the endpoint and verb have been removed, in our
     * case, an integer ID for the resource. eg: /<endpoint>/<verb>/<arg0>/<arg1>
     * or /<endpoint>/<arg0>
     */
    protected $args = Array();

	/**
	 * Property: file
	 * Stores the input of the PUT request
	 */
	protected $file = Null;

	public function __construct($request, $type = 'POST'){
		
     	/// Map our data
		$this->mapData($request['data']);
		$this->url = $request['url'];

        //// include any required files and resources here
		switch($request['post']){
			case 'results' :
				/*$request['data']*/
				$this->response = $this->curl($type);///json_decode($request['data'], true);

				#var_dump($this->response);
			 	#echo 			
				#return $this->response;
			 break;
		}
		
		#exit();
		
	}

	protected function mapData($data_to_send){
		
		
		$replace_text = array(
			'{{version}}'		=> Config\Config::$settings['version'],
		);

		/// Go through all our other posted data and str replace our JSON maps
		foreach($data_to_send as $k => $v){
			$k = '{{'.$k.'}}';
			$replace_text[$k] = $v;
		}

		$json = NULL;
		ob_start();
		include_once($_SERVER['DOCUMENT_ROOT'] . '/app/json/searchLight.json');	
        $json .= ob_get_clean();
        
        /// You could then str_replace...
		$this->data_to_send = strtr($json, $replace_text);

	}
	
	/**
	 * Curl
	 */
	protected function curl($type){
		
		$this->headers = array(
		    "accept: application/json",
		    "content-type: application/json",
		    "IHG-Language: en-US",
		    "X-IHG-API-KEY: " . Config\Config::$settings['API_KEY'],
		    "X-IHG-MWS-API-Token: " . Config\Config::$settings['API_TOKEN']
		);

		///$data = json_encode($data);
				
		// PHP cURL for https connection with auth
		$ch = curl_init();
		
		curl_setopt($ch, CURLOPT_URL, $this->url);
		
		if($type==='POST') {
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
			##curl_setopt($ch, CURLOPT_ENCODING, ''""'');
			#---curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
			#---curl_setopt($ch, CURLOPT_TIMEOUT, 30);
			#---curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
			#---curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
			curl_setopt($ch, CURLOPT_VERBOSE, 0);
			#---curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

			curl_setopt($ch, CURLOPT_POSTFIELDS, $this->data_to_send); // the request
			curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);
		
		} else {

			// Disable SSL verification
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			// Will return the response, if false it print the response
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			
			curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);

		}
		
		// Get the data
		$response = curl_exec($ch);
		$err = curl_error($ch);
		curl_close($ch);

		if ($err) {
		
		 	return "cURL Error #:" . $err;
		
		} else {
		 
			// Will dump a beauty json :3
			return json_encode(array('result'=>'success', 'data' => $response));
			

		}

	}	
	
}