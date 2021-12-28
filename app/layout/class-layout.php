<?php

namespace App\Layout;

use \App\Config as Config;
use \App\Content as Content;

class Class_Layout extends \App\Init\Class_Init {

	///public $current_view = array();

	protected static $layouts = array(

		'header' => array('template' => 'header',),
		'footer' => array('template' => 'footer',),
		/*'pages' => array(
			'index' => array(
				'template' => 'page',
				
			),

			'test' => array(
				'template' => 'page',
			),

			'results' => array(
				'template' => 'page-results',
			),
		)*/
		'page' => array()

	);

	public function __construct(){

		self::$layouts['page'] = parent::$content->selected_content;
		//return $this->buildLayout();
		$this->buildLayout();
		$this->createView();


	}

	protected function buildLayout() {
		
		parent::$current_view = self::$layouts;
		parent::$current_view['view'] = parent::$content->selected_content->page_template;
		
		#return $current_view;

	}

	public function createView(){
		
		if(parent::$current_view['view']) {
			require_once($_SERVER['DOCUMENT_ROOT'] . '/views/body/' . parent::$current_view['view'] . '.php');
		}

	}

	/**
	 * Is a call from the views to get the templates or partial templates, defaults back to the folder name.
	 * Then gets the content from the url structure and replaces the placeholders
	 * @param  string $template      Is the template and the folder
	 * @param  string $template_part is the additional string template part ie -results.php
	 * @return string output html
	 */
	public static function getTemplatePart($template, $template_part = null) {

		/// Defaults
		$assets = parent::$content->default_content->assets;

		$file = ($template_part) ? $template . '-' . $template_part . '.php' : $template . '.php';
		
		////var_dump(parent::$menu->walked_menus['primary_menu']);
		////var_dump(parent::$content->selected_content->content->html);
		///var_dump(parent::$content->walked_sections);
	
		$replace_text = array(
			'{{assets:images}}' => 'assets/' . $assets['images'],
			'{{assets:css}}' => 'assets/' . $assets['css'],
			'{{assets:js}}' => 'assets/' . $assets['js'],

			'{{seo-title}}' => parent::$content->selected_content->content->meta_data->title,
			'{{seo-description}}' => parent::$content->selected_content->content->meta_data->description,
			'{{title}}'		=> parent::$content->selected_content->title,
			'{{content}}'	=> parent::$content->selected_content->content->html,
			///'{{form}}'		=> parent::$content->content['content']['form'],
			////'{{results}}'	=> parent::$content->content['content']['results'],
			'{{primary_menu}}' => parent::$menu->walked_menus['primary_menu'],
			'{{secondary_menu}}' => parent::$menu->walked_menus['secondary_menu'],
			'{{sections_menu}}' => parent::$content->walked_sections,
			'{{sections}}' =>  parent::$content->section_content,
		);
				
		$html ='';
		ob_start();
		include_once($_SERVER['DOCUMENT_ROOT'] . '/views/' . $template . '/' . $file);	
        $html .= ob_get_clean();
        
        /// You could then str_replace...
		$html = strtr($html, $replace_text);

		echo $html;

	}

	

	

}

