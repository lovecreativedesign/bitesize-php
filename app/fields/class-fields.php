<?php
/**
 * Our Form Fields Builder from an array
 */
namespace App\Fields {

	use \App\Config as Config;

	class Class_Fields {
		
		/**
		 * returns an HTML formatted field with unique row index
		 * @param $index (int) row index itterator
		 * @param $field_name (string) row field key
		 * @param $field_options (array) for the type of field, sub options etc, IE select options (label and value, maybe additional data attributes)
		 * @param $field_value (int) the post_id from the post
		 * @param $new (bool) whether this is a new blank row or an existing row, IE as part of an output from a DB.
		 *
		 */
		public static function returnField($index, $field_name, $field_value, $field_options, $new = true) {
							
			$field_type = $field_options['type'];
			$value = ($field_value !== "") ? $field_value : NULL;
			$field = NULL;
			$field = '<label for="field_' . $field_name . '_' . $index . '" >'.$field_options['label'].'</label>';


			switch($field_type){
				
				case 'checkbox' :

					$checked = ($field_options['checked'] === 'true') ? ' checked="checked" ' : NULL;
					$field .= '<input type="' . $field_type . '" name="' . $field_name . '" class="' . $field_name . '" id="field_' . $field_name . '_' . $index . '" placeholder="' . $field_options['value'] . '" value="'.$field_options['value'].'" ' . $checked . ' />';
					break;
				case 'select' :					
					$field .= '<select name="' . $field_name . '" class="' . $field_name . '" id="field_' . $field_name . '_' . $index . '" >';
					foreach($field_options['options'] as $field_name => $val){
						$selected = ($value == $val['value']) ? ' selected="selected" ' : NULL;
						$field .= '<option value="' . $val['value'] . '" ' . $selected . ' >' . $val['label'] . '</option>';
					}
					$field .= '</select>';
					break;
				case 'textarea' :
					
					$field .= '<textarea name="' . $field_name . '" class="' . $field_name . '" id="field_' . $field_name . '_' . $index . '" placeholder="' . $field_options['value'] . '" rows="' . $field_options['size']['rows'] . '" cols="' . $field_options['size']['cols'] . '" >' . $value . '</textarea>';
					break;
				case 'data':
					$field = NULL;
					break;
				case 'date':
					
					$field .= '<input type="' . $field_type . '" name="' . $field_name . '" class="' . $field_name . ' date-picker" id="field_' . $field_name . '-' . $index . '" placeholder="' . $field_options['value'] . '" value="' . $value . '" size="' . $field_options['size'] . '" />';
					break;
				case 'hidden':
					
					$field .= '<input type="' . $field_type . '" name="' . $field_name . '" class="' . $field_name . '" id="field_' . $field_name . '_' . $index . '" placeholder="' . $field_options['value'] . '" value="' . $value . '" size="' . $field_options['size'] . '" />';
					break;						
				default:	//// As text
					
					///$placeholder = ($new == false) ? $value : $field_options['value'];
					$field .= '<input type="' . $field_type . '" name="' . $field_name . '" class="' . $field_name . '" id="field_' . $field_name . '_' . $index . '" placeholder="' . $field_options['value'] . '" value="' . $value . '" size="' . $field_options['size'] . '" />';
			}
			
			$field .= '<div class="pop_up_' . $field_name . '" ></div>';
			return $field;
			
		}

		public static function getFieldDefault($field, $field_value){

			$return_field = array();
       
			switch(true){
				/// is just text
				case !is_array($field_value):
					$return_field = array($field_value => array_merge(Config\Config::$defaultFieldMap['text'] , array('type'=>'text','value'=>'','size'=>30,'label'=>$field_value,'text-align'=>'left') ) );
					break;
				case is_array($field_value) && empty($field_value):
					$return_field[$field] = array_merge(Config\Config::$defaultFieldMap['text'] , array('type'=>'text','value'=>'','size'=>30,'label'=>$field_value,'text-align'=>'left') );
					break;
				default:
					$type = isset($field_value['type']) ? $field_value['type'] : 'text';					
					$return_field[$field] = array_merge(Config\Config::$defaultFieldMap[$type], $field_value);
					
					///$return_field[$field] = $field_value;
			}
			
			return $return_field;
		}


	}

}
