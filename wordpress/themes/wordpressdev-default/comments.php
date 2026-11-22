<?php if ( post_password_required() ) { return; } ?>
<section id="comments" class="comments-area">
	<?php if ( have_comments() ) : ?><h2><?php esc_html_e( 'Comments', 'wordpressdev-default' ); ?></h2><ol class="comment-list"><?php wp_list_comments( array( 'style' => 'ol', 'short_ping' => true ) ); ?></ol><?php the_comments_navigation(); endif; ?>
	<?php if ( ! comments_open() && get_comments_number() ) : ?><p><?php esc_html_e( 'Comments are closed.', 'wordpressdev-default' ); ?></p><?php endif; ?>
	<?php comment_form(); ?>
</section>
