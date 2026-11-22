<?php get_header(); ?>
<main class="site-main">
	<h1 class="entry-title"><?php printf( esc_html__( 'Search results for: %s', 'wordpressdev-default' ), esc_html( get_search_query() ) ); ?></h1>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?><article <?php post_class( 'entry' ); ?>><h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?></article><?php endwhile; the_posts_pagination(); else : ?><p><?php esc_html_e( 'No results found.', 'wordpressdev-default' ); ?></p><?php get_search_form(); endif; ?>
</main>
<?php get_footer(); ?>
