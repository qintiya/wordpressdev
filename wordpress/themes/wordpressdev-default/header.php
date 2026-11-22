<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
	<div><?php if ( has_custom_logo() ) { the_custom_logo(); } else { ?><p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a></p><?php } ?></div>
	<nav aria-label="<?php esc_attr_e( 'Primary navigation', 'wordpressdev-default' ); ?>">
		<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'fallback_cb' => false ) ); ?>
	</nav>
</header>
