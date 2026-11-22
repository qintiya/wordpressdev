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
