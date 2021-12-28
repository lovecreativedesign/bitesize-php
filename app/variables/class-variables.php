<?php

/////////////////////////////////////////////////////////////////////////
/////////////////////* For Custom Actions *///////////////////
/////////////////////////////////////////////////////////////////////////
namespace App\Variables {

	use \App\Config as Config;

        /**
         * Example class and protected SQL String.
         * Work in progress... 
         * Need a way to do a string replace for the placeholders... this SQL gets our publications ont Doctors of the world website
         */
        
	class Class_Variables {

		protected $publications_sql = "SELECT {$wpdb->prefix}posts.ID, {$wpdb->prefix}posts.post_title, {$wpdb->prefix}posts.post_name, {$wpdb->prefix}postmeta.meta_key, {$wpdb->prefix}postmeta.meta_value,
                file_ids.meta_value AS attachment_id,
                file_ids.meta_key AS attachment_meta_key,
                file_alt_dates.post_id AS file_alt_date_id,
                file_alt_dates.meta_value AS file_alt_date,
                file_descriptions.meta_value AS file_description,
                file_descriptions.meta_key AS file_description_meta_key

                FROM {$wpdb->prefix}postmeta 
                INNER JOIN {$wpdb->prefix}posts ON {$wpdb->prefix}postmeta.post_id = {$wpdb->prefix}posts.ID
                
                LEFT OUTER JOIN (
                SELECT f_post_meta.meta_key, f_post_meta.meta_value, f_post_meta.post_id
                FROM {$wpdb->prefix}postmeta AS f_post_meta
                WHERE f_post_meta.meta_key LIKE 'document_group_details_attached_documents_%_file'
                GROUP BY f_post_meta.meta_value
                
                ) file_ids
                
                ON (
                file_ids.post_id = {$wpdb->prefix}postmeta.post_id
                AND file_ids.meta_key = REPLACE({$wpdb->prefix}postmeta.meta_key,'_name','')
                )
                
                LEFT OUTER JOIN (
                SELECT alt_post_meta.meta_key, alt_post_meta.meta_value, alt_post_meta.post_id
                FROM {$wpdb->prefix}postmeta AS alt_post_meta
                WHERE alt_post_meta.meta_key LIKE 'document_group_details_attached_documents_%_alt_date'
                GROUP BY alt_post_meta.meta_value
                
                ) file_alt_dates
                
                ON (
                file_alt_dates.post_id = {$wpdb->prefix}postmeta.post_id
                AND file_alt_dates.meta_key = REPLACE({$wpdb->prefix}postmeta.meta_key,'_file_name','_alt_date')
                )

                LEFT OUTER JOIN (
                SELECT desc_post_meta.meta_key, desc_post_meta.meta_value, desc_post_meta.post_id
                FROM {$wpdb->prefix}postmeta AS desc_post_meta
                WHERE desc_post_meta.meta_key LIKE 'document_group_details_attached_documents_%_description'
                GROUP BY desc_post_meta.meta_value
                
                ) file_descriptions
                
                ON (
                file_descriptions.post_id = {$wpdb->prefix}postmeta.post_id
                AND file_descriptions.meta_key = REPLACE({$wpdb->prefix}postmeta.meta_key,'_file_name','_description')
                )
                
                WHERE 
                (
                
                {$wpdb->prefix}postmeta.meta_key LIKE 'document_group_details_attached_documents_%_file_name'
                
                {$where}

                )
                
                AND {$wpdb->prefix}posts.post_type = 'publications'
                AND {$wpdb->prefix}posts.post_status = 'publish'
                ORDER BY file_alt_dates.meta_value ASC
		";




	} /// end class	
}
