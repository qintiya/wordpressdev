<?php get_header(); ?>
<main class="site-main">
	<header class="page-header"><h1 class="entry-title"><?php the_archive_title(); ?></h1><?php the_archive_description( '<div class="entry-content">', '</div>' ); ?></header>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?><article <?php post_class( 'entry' ); ?>><h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><p class="entry-meta"><?php echo esc_html( get_the_date() ); ?></p><?php the_excerpt(); ?></article><?php endwhile; the_posts_pagination(); else : ?><p><?php esc_html_e( 'No content found.', 'wordpressdev-default' ); ?></p><?php endif; ?>
</main>
<?php get_footer(); ?>
