<?php get_header(); ?>
<main class="site-main"><h1 class="entry-title"><?php esc_html_e( 'Page not found', 'wordpressdev-default' ); ?></h1><p><?php esc_html_e( 'The page may have moved or no longer exists.', 'wordpressdev-default' ); ?></p><?php get_search_form(); <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Return home', 'wordpressdev-default' ); ?></a></main>
<?php get_footer(); ?>
