import Link from 'next/link';

const api = (process.env.WORDPRESS_API_URL || 'http://localhost:8080/wp-json/wp/v2').replace(/\\/$/, '');
type Post = { date: string; title: { rendered: string }; content: { rendered: string } };

export default async function PostPage({ params }: { params: { slug: string } }) {
  let post: Post | undefined;
  try {
    const response = await fetch(`${api}/posts?slug=${encodeURIComponent(params.slug)}`, { cache: 'no-store' });
    if (response.ok) post = (await response.json() as Post[])[0];
  } catch { /* WordPress may not be running yet. */ }
  if (!post) return <main className="article-shell"><Link href="/">← Back home</Link><h1>Post not found</h1><p>It may be unpublished or unavailable.</p></main>;
  return <main className="article-shell"><Link href="/">← Back home</Link><article><p className="eyebrow">{new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}</p><h1>{post.title.rendered}</h1><div className="content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} /></article></main>;
}
