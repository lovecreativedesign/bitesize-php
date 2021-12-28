<?php
header("HTTP/1.0 404 Not Found");

/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 *
 */
\App\Layout\Class_Layout::getTemplatePart('header'); ?>
<main class="grid" >
<?php 
    // Include the page content template.
    \App\Layout\Class_Layout::getTemplatePart('content');
    \App\Layout\Class_Layout::getTemplatePart('sidebar');
?>
</main><!-- .site-main -->    
<?php #\App\Layout\Class_Layout::getTemplatePart('banner'); ?>
<?php \App\Layout\Class_Layout::getTemplatePart('footer'); ?>