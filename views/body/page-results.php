<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 *
 */
\App\Layout\Class_Layout::getTemplatePart('header'); ?>
<?php ///\App\Layout\Get::sidebar('content', $layout); ?>
<main class="grid" >
<?php 
    // Include the page content template.
    \App\Layout\Class_Layout::getTemplatePart('content', 'results');
?>
</main><!-- .site-main -->
<?php #\App\Layout\Class_Layout::getTemplatePart('banner'); ?>
<?php \App\Layout\Class_Layout::getTemplatePart('footer'); ?>