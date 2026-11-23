'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type DemoRole = 'admin' | 'member';

const supportLinks = [
  { name: 'Saweria', href: 'https://saweria.co/awdev' },
  { name: 'Trakteer', href: 'https://trakteer.id/awfanspage' },
  { name: 'SociaBuzz', href: 'https://www.sociabuzz.com/awdev' },
  { name: 'PayPal', href: 'https://www.paypal.com/paypalme/wahyudi9kdl' },
];

export default function LoginPortal() {
  const [role, setRole] = useState<DemoRole>('admin');
  const router = useRouter();

  function enterDemo() {
    sessionStorage.setItem('wordpressdev-demo-role', role);
    router.push(`/${role}`);
  }

  return (
    <main className="portal-shell">
      <section className="login-card" aria-labelledby="login-title">
        <a className="portal-brand" href="/">WordPressDev <span>Cloud</span></a>
        <p className="eyebrow">DEMO PORTAL</p>
        <h1 id="login-title">Welcome back.</h1>
        <p className="portal-copy">Choose a demo workspace to preview the admin or member dashboard.</p>
        <label className="field-label" htmlFor="demo-role">Workspace role</label>
        <select id="demo-role" className="role-select" value={role} onChange={(event) => setRole(event.target.value as DemoRole)}>
          <option value="admin">Cloud Admin</option>
          <option value="member">Cloud Member</option>
        </select>
        <button className="portal-button" type="button" onClick={enterDemo}>Enter {role === 'admin' ? 'Admin' : 'Member'} demo <span aria-hidden="true">→</span></button>
        <p className="demo-notice"><strong>Demo only:</strong> this role selector is not authentication. It stores a temporary role in this browser session and must not be used to protect real data or production admin actions.</p>
        <a className="public-link" href="/posts">Browse published posts <span aria-hidden="true">↗</span></a>
        <a className="public-link" href="/frameworks">Explore web frameworks <span aria-hidden="true">↗</span></a>
        <a className="public-link" href="/ai">Try the limited AI preview <span aria-hidden="true">↗</span></a>

        <section aria-labelledby="featured-video-title" style={{ marginTop: 28, padding: 18, border: '1px solid #dce4df', borderRadius: 10, background: '#fff' }}>
          <p className="eyebrow" style={{ marginTop: 0 }}>FEATURED VIDEO</p>
          <h2 id="featured-video-title" style={{ margin: '8px 0', fontSize: 20 }}>Calligraphy writing video</h2>
          <p className="portal-copy" style={{ fontSize: 13 }}>View the Shutterstock clip, then continue to Shutterstock’s cart to review your selection and checkout.</p>
          <a href="https://www.shutterstock.com/id/video/clip-4239669383-close-up-calligrapher-hand-writing-creating-beautiful-calligraphy?trackingId=169e7452-ed59-405c-ba11-467eb24d75ed&listId=searchResults" target="_blank" rel="noreferrer" style={{ display: 'block', margin: '14px 0', color: '#315c45', fontSize: 13, fontWeight: 700 }}>View video on Shutterstock <span aria-hidden="true">↗</span></a>
          <a href="https://www.shutterstock.com/id/cart" target="_blank" rel="noreferrer" className="portal-button" style={{ textDecoration: 'none' }}>Checkout on Shutterstock <span aria-hidden="true">↗</span></a>
        </section>

        <section aria-labelledby="support-title" style={{ marginTop: 18, padding: 18, border: '1px solid #dce4df', borderRadius: 10, background: '#fff' }}>
          <p className="eyebrow" style={{ marginTop: 0 }}>SUPPORT THE PROJECT</p>
          <h2 id="support-title" style={{ margin: '8px 0', fontSize: 20 }}>Support AWDEV</h2>
          <p className="portal-copy" style={{ fontSize: 13 }}>If you find this project useful, you can support its creator using one of these services.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginTop: 14 }}>
            {supportLinks.map((link) => <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="support-button">Support via {link.name} <span aria-hidden="true">↗</span></a>)}
          </div>
        </section>
      </section>
    </main>
  );
}
