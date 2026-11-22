import Link from 'next/link';

type WpPost = { id: number; date: string; slug: string; title: { rendered: string }; excerpt: { rendered: string } };
type WpProject = { id: number; title: { rendered: string }; excerpt: { rendered: string } };

const api = (process.env.WORDPRESS_API_URL || 'http://localhost:8080/wp-json/wp/v2').replace(/\/$/, '');
const adminUrl = process.env.NEXT_PUBLIC_WORDPRESS_ADMIN_URL || 'http://localhost:8080';

async function getItems<T>(type: 'posts' | 'projects'): Promise<T[]> {
  try {
    const response = await fetch(`${api}/${type}?_embed&per_page=6`, { cache: 'no-store' });
    if (!response.ok) return [];
    return await response.json() as T[];
  } catch {
    return [];
  }
}

function cleanExcerpt(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&hellip;|&#8230;/g, '…').trim();
}

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getItems<WpPost>('posts'), getItems<WpProject>('projects')]);
  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">WORDPRESSDEV · HEADLESS STARTER</p>
        <h1>One content hub.<br /><span>Any frontend.</span></h1>
        <p className="intro">A clean Next.js front end powered by your WordPress content and REST API.</p>
        <a className="button" href={`${adminUrl.replace(/\/$/, '')}/wp-admin/`}>Open WordPress admin <span aria-hidden="true">↗</span></a>
      </header>
      <section aria-labelledby="projects-title">
        <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2 id="projects-title">Projects</h2></div><code>/wp-json/wp/v2/projects</code></div>
        {projects.length ? <div className="grid">{projects.map((item) => <article className="card" key={item.id}><span className="number">PROJECT / {String(item.id).padStart(3, '0')}</span><h3>{item.title.rendered}</h3><p>{cleanExcerpt(item.excerpt.rendered) || 'Add an excerpt in the WordPress project editor.'}</p></article>)}</div> : <p className="empty">No published projects yet. Add one under <strong>WPDev → Add Project</strong> in WordPress.</p>}
      </section>
      <section aria-labelledby="journal-title">
        <div className="section-heading"><div><p className="eyebrow">FROM THE CMS</p><h2 id="journal-title">Latest posts</h2></div><code>/wp-json/wp/v2/posts</code></div>
        {posts.length ? <div className="post-list">{posts.map((item) => <article className="post" key={item.id}><time dateTime={item.date}>{new Date(item.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })}</time><div><h3><Link href={`/posts/${item.slug}`}>{item.title.rendered}</Link></h3><p>{cleanExcerpt(item.excerpt.rendered)}</p></div><span aria-hidden="true">↗</span></article>)}</div> : <p className="empty">No published posts yet. Create a post in the WordPress dashboard.</p>}
      </section>
      <footer>Content managed in WordPress · Rendered with Next.js</footer>
    </main>
  );
}
