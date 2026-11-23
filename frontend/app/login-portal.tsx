'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type DemoRole = 'admin' | 'member';

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
      </section>
    </main>
  );
}
