<?php
/** Theme setup and assets. */
if ( ! defined( 'ABSPATH' ) ) { exit; }
function wordpressdev_default_setup() {
	load_theme_textdomain( 'wordpressdev-default', get_template_directory() . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array( 'height' => 80, 'width' => 240, 'flex-height' => true, 'flex-width' => true ) );
	register_nav_menus( array( 'primary' => __( 'Primary Menu', 'wordpressdev-default' ) ) );
}
add_action( 'after_setup_theme', 'wordpressdev_default_setup' );
function wordpressdev_default_assets() {
	wp_enqueue_style( 'wordpressdev-default', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
}
add_action( 'wp_enqueue_scripts', 'wordpressdev_default_assets' );
function wordpressdev_default_widgets() {
	register_sidebar( array( 'name' => __( 'Sidebar', 'wordpressdev-default' ), 'id' => 'sidebar-1', 'description' => __( 'Widgets shown beside content.', 'wordpressdev-default' ), 'before_widget' => '<section id="%1$s" class="widget %2$s">', 'after_widget' => '</section>', 'before_title' => '<h2 class="widget-title">', 'after_title' => '</h2>' ) );
}
add_action( 'widgets_init', 'wordpressdev_default_widgets' );

/** Add Google verification and monetization tags to pages using this theme. */
function wordpressdev_default_google_meta() {
	echo '<meta name="google-site-verification" content="gbPa2MRABFiJSWv4hIj24aNn2MTRfi7W96fncHPziHI">' . "\n";
	echo '<meta name="google-adsense-account" content="ca-pub-5407249785989200">' . "\n";
}
add_action( 'wp_head', 'wordpressdev_default_google_meta', 1 );

function wordpressdev_default_google_scripts() {
	wp_enqueue_script( 'wordpressdev-adsense', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5407249785989200', array(), null, false );
	wp_script_add_data( 'wordpressdev-adsense', 'async', true );
	wp_script_add_data( 'wordpressdev-adsense', 'crossorigin', 'anonymous' );
	wp_enqueue_script( 'wordpressdev-gtm', 'https://www.googletagmanager.com/gtm.js?id=GTM-PMLF34B9', array(), null, false );
	wp_script_add_data( 'wordpressdev-gtm', 'async', true );
}
add_action( 'wp_enqueue_scripts', 'wordpressdev_default_google_scripts', 20 );

function wordpressdev_default_gtm_noscript() {
	echo '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PMLF34B9" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>' . "\n";
}
add_action( 'wp_body_open', 'wordpressdev_default_gtm_noscript', 1 );
