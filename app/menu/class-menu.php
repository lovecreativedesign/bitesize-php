<?php
namespace App\Menu;

use \App\Config as Config;
use \App\Fields as Fields;

class Class_Menu extends \App\Init\Class_Init {

	public $menus = NULL;
	public $walked_menus = NULL;

	public function __construct(){
		
		return $this->buildMenu();
		
		/*
		$requested_url = parent::$requested_url;
				
		if($requested_url) {
			
			$requested_url = str_replace('/','',$requested_url);

			

		}
		*/

	}

	public function buildMenu(){
		
		#$this->requested_url = $requested_url;
		
		#$requested_content = ("" !== $this->requested_url) ? $this->requested_url : '404';

		/**
		 * Get the form and / or results based on the url.. note our restults methos does the curl call
		 */
		$this->menus = self::getMenus();

		/// Create the Walker Menu
		/* we are passing by reference as we may need to go more than one level deep */
		$this->walked_menus = $this->walkMenu($this->menus);
		
	}

	/**
	 * Get Content from json files
	 */
	private static function getMenus(){
		
		$menu_to_return = array();
		$menu = json_decode(Config\Config::menu());
		$menu_to_return = $menu; ///$menu->{$requested_content};
		
		return $menu_to_return;
		
	}

	/**
	 * Builds an html structured menu
	 * @param  [object] &$menus the menu to be parsed, we could go deeper 
	 * @return [array] returns an array of formatted strings
	 */
	protected function walkMenu(&$menus = null){

		$menu_rn = array();

		if(isset($menus)) {
			
			$the_requested_url = (!is_array(parent::$requested_url) && parent::$requested_url === 'home') ? '/' : '/' . parent::$requested_url[1];

			foreach($menus as $menu => $menu_items){

				$classes = ($menu === 'primary_menu') ? 'primary block':  'secondary block';

				$menu_rn[$menu] = '<ul class="nav-menu '.$classes.'" >';

				foreach($menu_items as $menu_item) {

					$selected_class = ($menu_item->link === $the_requested_url) ? 'class="selected-menu-item"' : null;

					$menu_rn[$menu] .= '<li '.$selected_class.'><a href="'.$menu_item->link.'" data-link-text="'.$menu_item->name.'" title="'.$menu_item->alt_text.'" target="'.$menu_item->target.'" >'.$menu_item->name.'</a></li>';

				}

				$menu_rn[$menu] .= '</ul>';
			}

		}

		return $menu_rn;
		
	}

}