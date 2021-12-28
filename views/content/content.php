<?php
/**
 * The default template for displaying content
 *
 */
?>
<!--[if lt IE 9]>
	<div class="entry-header" >
<![endif]-->
<header class="entry-header">
	<h1>{{title}}</h1>
</header><!-- .entry-header -->
<!--[if lt IE 9]>
    </div>
<![endif]-->

<!--[if lt IE 9]>
    <div id="article">
<![endif]-->
<article class="entry-content">
	{{content}}
	{{sections}}
</article><!-- #post-## -->
<!--[if lt IE 9]>
    </div>
<![endif]-->
<!-- this fixes a known bug in IE6,7 & 8 with dissapearing elements that are apsolutely positioned -->
<!--[if lt IE 9]>
    <div></div>
<![endif]-->

<!--[if lt IE 9]>
	<div class="entry-footer" >
<![endif]-->
<footer class="entry-footer">
	
</footer><!-- .entry-footer -->
<!--[if lt IE 9]>
	</div>
<![endif]-->
