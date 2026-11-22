<?php get_header(); ?>
<main class="site-main">
	<?php while ( have_posts() ) : the_post(); ?>
		<article <?php post_class( 'entry' ); ?> id="post-<?php the_ID(); ?>">
			<p class="entry-meta"><?php echo esc_html( get_the_date() ); ?> · <?php the_author(); ?></p>
			<h1 class="entry-title"><?php the_title(); ?></h1>
			<?php if ( has_post_thumbnail() ) { the_post_thumbnail( 'large' ); } ?>
			<div class="entry-content"><?php the_content(); ?></div>
			<?php wp_link_pages(); ?>
		</article>
		<?php if ( comments_open() || get_comments_number() ) { comments_template(); } ?>
	<?php endwhile; ?>
</main>
<?php get_footer(); ?>
