<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">

      <title>{{seo-title}}</title>
      <meta name="description" content="{{seo-description}}">

      <meta name="viewport" content="width=device-width initial-scale=1 viewport-fit=cover">

      <meta http-equiv="X-UA-Compatible" content="IE=edge">

      <link rel="shortcut icon" sizes="16x16 32x32 48x48" href="/{{assets:images}}/favicon.png" type="image/x-icon">   
      
      <link href="https://fonts.googleapis.com/css?family=Montserrat|Roboto&display=swap" rel="stylesheet">

      <!-- Note: Including in core styles and scripts for this... this is going to dynamically change when we use PHP and the environement variables set in the server to switch between staging and production server -->
      <link type="text/css" href="/{{assets:css}}/style.dev.min.css" rel="stylesheet">

      <!-- JQuery Library -->
      <script src="https://code.jquery.com/jquery-3.4.1.min.js" type="text/javascript" ></script>
      <script src="/{{assets:js}}/scripts-dev.min.js" type="text/javascript" ></script>
      <!-- <script src="/{{assets:js}}/scripts-all.min.js" type="text/javascript" ></script> -->

   </head>
   <body>
    <div class="wp grid" > 
      <?php 
         // Include the page content template.
         \App\Layout\Class_Layout::getTemplatePart('header', 'banner');