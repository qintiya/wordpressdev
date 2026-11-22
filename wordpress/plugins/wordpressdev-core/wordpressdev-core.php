<?php
/**
 * Plugin Name: WordPressDev Core
 * Description: Headless-ready Projects content type, REST API support, and a small custom admin dashboard.
 * Version: 1.0.0
 * Requires at least: 6.4
 * Requires PHP: 8.0
 * Author: WordPressDev
 * License: GPL-3.0-or-later
 * Text Domain: wordpressdev-core
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Register a public portfolio content type and expose it in the REST API. */
function wordpressdev_register_project_post_type() {
	$labels = array(
		'name'               => __( 'Projects', 'wordpressdev-core' ),
		'singular_name'      => __( 'Project', 'wordpressdev-core' ),
		'add_new_item'       => __( 'Add New Project', 'wordpressdev-core' ),
		'edit_item'          => __( 'Edit Project', 'wordpressdev-core' ),
		'new_item'           => __( 'New Project', 'wordpressdev-core' ),
		'view_item'          => __( 'View Project', 'wordpressdev-core' ),
		'search_items'       => __( 'Search Projects', 'wordpressdev-core' ),
		'not_found'          => __( 'No projects found.', 'wordpressdev-core' ),
		' 메뉴_name'         => __( 'Projects', 'wordpressdev-core' ),
	);

	register_post_type(
		'project',
		array(
			'labels'        => $labels,
			'public'        => true,
			'show_in_rest'  => true,
			'rest_base'     => 'projects',
			'has_archive'   => true,
			'menu_icon'     => 'dashicons-portfolio',
			'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ),
			'rewrite'       => array( 'slug' => 'projects' ),
		)
	);
}
add_action( 'init', 'wordpressdev_register_project_post_type' );

/** Add a quick admin landing page with links to content and REST endpoints. */
function wordpressdev_add_admin_page() {
	add_menu_page(
		__( 'WordPressDev', 'wordpressdev-core' ),
		__( 'WPDev', 'wordpressdev-core' ),
		'edit_posts',
		'wordpressdev',
		'wordpressdev_render_admin_page',
		'dashicons-admin-site-alt3',
		3
	);
}
add_action( 'admin_menu', 'wordpressdev_add_admin_page' );

function wordpressdev_render_admin_page() {
	if ( ! current_user_can( 'edit_posts' ) ) {
		return;
	}
	$posts_endpoint    = esc_url( rest_url( 'wp/v2/posts' ) );
	$projects_endpoint = esc_url( rest_url( 'wp/v2/projects' ) );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'WordPressDev Headless Dashboard', 'wordpressdev-core' ); ?></h1>
		<p><?php esc_html_e( 'Manage content here; the frontend consumes published content through the WordPress REST API.', 'wordpressdev-core' ); ?></p>
		<p><a class="button button-primary" href="<?php echo esc_url( admin_url( 'edit.php?post_type=project' ) ); ?>"><?php esc_html_e( 'Manage Projects', 'wordpressdev-core' ); ?></a>
		<a class="button" href="<?php echo esc_url( admin_url( 'post-new.php?post_type=project' ) ); ?>"><?php esc_html_e( 'Add Project', 'wordpressdev-core' ); ?></a></p>
		<h2><?php esc_html_e( 'Public REST endpoints', 'wordpressdev-core' ); ?></h2>
		<ul>
			<li><a href="<?php echo $posts_endpoint; ?>"><code><?php echo $posts_endpoint; ?></code></a></li>
			<li><a href="<?php echo $projects_endpoint; ?>"><code><?php echo $projects_endpoint; ?></code></a></li>
		</ul>
	</div>
	<?php
}
