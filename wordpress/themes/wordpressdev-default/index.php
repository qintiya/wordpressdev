<?php get_header(); ?>
<main class="site-main">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<article <?php post_class( 'entry' ); ?> id="post-<?php the_ID(); ?>">
			<h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			<p class="entry-meta"><?php echo esc_html( get_the_date() ); ?> · <?php the_author(); ?></p>
			<div class="entry-content"><?php the_excerpt(); ?></div>
		</article>
	<?php endwhile; the_posts_pagination(); else : ?>
		<p><?php esc_html_e( 'No content found.', 'wordpressdev-default' ); ?></p>
	<?php endif; ?>
</main>
<?php get_footer(); ?>
