'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'admin' | 'member';

const services = [
  { name: 'WordPress REST API', provider: 'Content source', status: 'Demo status: not connected' },
  { name: 'Firebase', provider: 'Auth / app hosting', status: 'Demo status: not connected' },
  { name: 'Amazon Web Services', provider: 'Cloud infrastructure', status: 'Demo status: not connected' },
  { name: 'Cloudflare', provider: 'DNS / edge hosting', status: 'Demo status: not connected' },
  { name: 'Netlify', provider: 'Frontend hosting', status: 'Demo status: not connected' },
];

export default function CloudDashboard({ role }: { role: Role }) {
  const router = useRouter();

  useEffect(() => {
    const currentRole = sessionStorage.getItem('wordpressdev-demo-role');
    if (currentRole !== role) router.replace('/');
  }, [role, router]);

  function signOut() {
    sessionStorage.removeItem('wordpressdev-demo-role');
    router.replace('/');
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-topbar">
        <a className="portal-brand" href="/">WordPressDev <span>Cloud</span></a>
        <button className="signout-button" onClick={signOut}>Exit demo</button>
      </header>
      <section className="dashboard-hero">
        <p className="eyebrow">{role === 'admin' ? 'ADMIN WORKSPACE' : 'MEMBER WORKSPACE'}</p>
        <h1>{role === 'admin' ? 'Cloud Admin' : 'Cloud Member'}</h1>
        <p className="portal-copy">{role === 'admin' ? 'A demo overview of hosting and content integrations.' : 'Your demo overview for content and connected services.'}</p>
        <span className="demo-badge">Preview mode · no cloud account connected</span>
      </section>
      {role === 'admin' && <section className="dashboard-section">
        <div className="section-heading"><div><p className="eyebrow">OVERVIEW</p><h2>Cloud services</h2></div><code>DEMO DATA</code></div>
        <div className="service-grid">{services.map((service) => <article className="service-card" key={service.name}><span className="service-dot" aria-hidden="true"/><h3>{service.name}</h3><p>{service.provider}</p><small>{service.status}</small></article>)}</div>
      </section>}
      {role === 'member' && <section className="dashboard-section">
        <div className="section-heading"><div><p className="eyebrow">MEMBER AREA</p><h2>Your workspace</h2></div><code>DEMO DATA</code></div>
        <div className="service-grid">
          <article className="service-card"><span className="service-icon" aria-hidden="true">▤</span><h3>Published content</h3><p>Read public WordPress posts and project updates.</p><a className="card-link" href="/posts">Browse posts →</a></article>
          <article className="service-card"><span className="service-icon" aria-hidden="true">☁</span><h3>Cloud services</h3><p>Provider connections are not configured in this demo.</p><small>Read-only preview</small></article>
        </div>
      </section>}
      <footer className="dashboard-footer">This dashboard is a UI prototype only. No account, authorization, cloud provisioning, or private data access is implemented.</footer>
    </main>
  );
}
