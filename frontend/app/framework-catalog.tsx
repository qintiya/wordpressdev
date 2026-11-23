'use client';

import { useMemo, useState } from 'react';

type Framework = { name: string; description: string; url: string };
type Group = { title: string; description: string; items: Framework[] };

const groups: Group[] = [
  {
    title: 'Popular & Mainstream',
    description: 'Widely used UI libraries and component frameworks for modern web applications.',
    items: [
      { name: 'React', description: 'A UI library with a broad ecosystem for building interactive interfaces.', url: 'https://react.dev/' },
      { name: 'Vue.js', description: 'An approachable, incrementally adoptable JavaScript framework.', url: 'https://vuejs.org/' },
      { name: 'Angular', description: 'A full-featured framework for building large web applications.', url: 'https://angular.dev/' },
      { name: 'Svelte', description: 'A compiler-based UI framework that moves much of the work to build time.', url: 'https://svelte.dev/' },
      { name: 'SolidJS', description: 'A declarative UI library with fine-grained reactive updates.', url: 'https://www.solidjs.com/' },
      { name: 'Qwik', description: 'A resumable framework designed for fast-loading web experiences.', url: 'https://qwik.dev/' },
    ],
  },
  {
    title: 'Meta-Frameworks',
    description: 'Routing, rendering, and full-stack tooling built around UI frameworks.',
    items: [
      { name: 'Next.js', description: 'React framework for full-stack web applications.', url: 'https://nextjs.org/' },
      { name: 'Nuxt', description: 'The full-stack web framework for Vue applications.', url: 'https://nuxt.com/' },
      { name: 'SvelteKit', description: 'The application framework for building with Svelte.', url: 'https://svelte.dev/docs/kit' },
      { name: 'Remix', description: 'A web framework focused on web standards and resilient user experiences.', url: 'https://remix.run/' },
      { name: 'Astro', description: 'A content-focused web framework with support for multiple UI libraries.', url: 'https://astro.build/' },
      { name: 'Gatsby', description: 'A React framework for fast, content-rich websites.', url: 'https://www.gatsbyjs.com/' },
    ],
  },
  {
    title: 'Lightweight & Modern Alternatives',
    description: 'Small, specialized, or progressive tools for building user interfaces.',
    items: [
      { name: 'Preact', description: 'A fast, lightweight alternative with a familiar React-like API.', url: 'https://preactjs.com/' },
      { name: 'Alpine.js', description: 'A minimal framework for adding behavior directly to HTML.', url: 'https://alpinejs.dev/' },
      { name: 'Lit', description: 'A small library for building fast, lightweight web components.', url: 'https://lit.dev/' },
      { name: 'htmx', description: 'Add AJAX, CSS transitions, and other dynamic behavior with HTML attributes.', url: 'https://htmx.org/' },
      { name: 'Mithril.js', description: 'A small modern client-side JavaScript framework.', url: 'https://mithril.js.org/' },
      { name: 'Marko', description: 'A UI framework designed for fast rendering and streaming.', url: 'https://markojs.com/' },
    ],
  },
  {
    title: 'Classic & Legacy Projects',
    description: 'Established technologies you may encounter when maintaining existing applications.',
    items: [
      { name: 'Ember.js', description: 'A convention-driven framework for ambitious web applications.', url: 'https://emberjs.com/' },
      { name: 'Backbone.js', description: 'A lightweight structure for applications using models and views.', url: 'https://backbonejs.org/' },
      { name: 'Knockout.js', description: 'A JavaScript library for declarative UI and data binding.', url: 'https://knockoutjs.com/' },
      { name: 'Polymer', description: 'A library and legacy ecosystem for creating web components.', url: 'https://polymer-library.polymer-project.org/' },
      { name: 'jQuery', description: 'A classic library for DOM manipulation, events, and browser compatibility.', url: 'https://jquery.com/' },
    ],
  },
  {
    title: 'CSS & Design Frameworks',
    description: 'Styling systems and component foundations for building consistent interfaces.',
    items: [
      { name: 'Tailwind CSS', description: 'A utility-first CSS framework for composing custom designs.', url: 'https://tailwindcss.com/' },
      { name: 'Bootstrap', description: 'A popular toolkit with responsive layout and reusable UI components.', url: 'https://getbootstrap.com/' },
      { name: 'Bulma', description: 'A modern CSS framework based on Flexbox.', url: 'https://bulma.io/' },
      { name: 'Foundation', description: 'A responsive front-end framework for accessible websites and apps.', url: 'https://get.foundation/' },
      { name: 'Materialize', description: 'A CSS framework implementing Material Design components.', url: 'https://materializecss.com/' },
    ],
  },
];

export default function FrameworkCatalog() {
  const [query, setQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('All');
  const groupsForNav = ['All', ...groups.map((group) => group.title)];
  const visibleGroups = useMemo(() => groups
    .filter((group) => activeGroup === 'All' || group.title === activeGroup)
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase())),
    }))
    .filter((group) => group.items.length > 0), [activeGroup, query]);
  const total = groups.reduce((count, group) => count + group.items.length, 0);

  return (
    <main className="catalog-shell">
      <header className="catalog-header">
        <a className="catalog-brand" href="/">WordPressDev <span>Library</span></a>
        <a className="catalog-back" href="/">← Back to portal</a>
      </header>
      <section className="catalog-hero">
        <p className="eyebrow">DEVELOPER REFERENCE</p>
        <h1>Find your next<br /><span>web framework.</span></h1>
        <p className="catalog-intro">A curated directory of {total} JavaScript frameworks, meta-frameworks, and CSS toolkits. Explore official documentation to get started.</p>
        <label className="catalog-search-label" htmlFor="framework-search">Search the catalog</label>
        <input id="framework-search" className="catalog-search" type="search" placeholder="Try React, CSS, or routing…" value={query} onChange={(event) => setQuery(event.target.value)} />
        <nav className="catalog-filters" aria-label="Filter framework categories">
          {groupsForNav.map((name) => <button key={name} type="button" className={`filter-chip${activeGroup === name ? ' active' : ''}`} aria-pressed={activeGroup === name} onClick={() => setActiveGroup(name)}>{name}</button>)}
        </nav>
      </section>
      {visibleGroups.length ? visibleGroups.map((group, groupIndex) => (
        <section className="catalog-section" key={group.title}>
          <div className="catalog-section-heading"><div><p className="eyebrow">COLLECTION / {String(groupIndex + 1).padStart(2, '0')}</p><h2>{group.title}</h2><p>{group.description}</p></div><span className="catalog-count">{group.items.length} tools</span></div>
          <div className="framework-grid">
            {group.items.map((item, index) => <article className="framework-card" key={item.name}>
              <div className="framework-card-top"><span className="framework-icon" aria-hidden="true">{item.name.slice(0, 1)}</span><span className="number">{String(index + 1).padStart(2, '0')}</span></div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <a className="framework-link" href={item.url} target="_blank" rel="noreferrer">Open official site <span aria-hidden="true">↗</span></a>
            </article>)}
          </div>
        </section>
      )) : <p className="catalog-empty">No frameworks match “{query}”. Try another search.</p>}
      <footer className="catalog-footer">Frameworks and libraries are independent projects. Visit their official websites for current documentation and licenses.</footer>
    </main>
  );
}
