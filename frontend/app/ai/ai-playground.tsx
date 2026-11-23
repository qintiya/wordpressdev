'use client';

import { FormEvent, useEffect, useState } from 'react';

const providers = [
  { name: 'Google Gemini', href: 'https://gemini.google.com/', kind: 'AI chat' },
  { name: 'ChatGPT (OpenAI)', href: 'https://chatgpt.com/', kind: 'AI chat' },
  { name: 'Claude (Anthropic)', href: 'https://claude.ai/', kind: 'AI chat' },
  { name: 'Microsoft Copilot', href: 'https://copilot.microsoft.com/', kind: 'AI chat' },
  { name: 'Perplexity AI', href: 'https://www.perplexity.ai/', kind: 'Search with sources' },
  { name: 'DeepSeek', href: 'https://chat.deepseek.com/', kind: 'AI chat' },
  { name: 'Qwen Chat (Alibaba)', href: 'https://chat.qwen.ai/', kind: 'AI chat' },
  { name: 'Meta AI', href: 'https://www.meta.ai/', kind: 'AI chat' },
  { name: 'Mistral Le Chat', href: 'https://chat.mistral.ai/', kind: 'AI chat' },
  { name: 'Grok (xAI)', href: 'https://grok.com/', kind: 'AI chat' },
  { name: 'Poe (Quora)', href: 'https://poe.com/', kind: 'Multiple models' },
  { name: 'HuggingChat', href: 'https://huggingface.co/chat/', kind: 'Open models' },
  { name: 'Duck.ai', href: 'https://duck.ai/', kind: 'Private AI chat' },
];

const QUOTA = 5;
const STORAGE_KEY = 'wordpressdev-ai-preview-count';

type ChatLine = { role: 'user' | 'assistant'; text: string };

export default function AiPlayground() {
  const [provider, setProvider] = useState(providers[0].name);
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [count, setCount] = useState(0);
  const [notice, setNotice] = useState('');
  const [messages, setMessages] = useState<ChatLine[]>([]);

  useEffect(() => {
    const stored = Number(sessionStorage.getItem(STORAGE_KEY) || '0');
    setCount(Number.isFinite(stored) ? Math.min(Math.max(stored, 0), QUOTA) : 0);
  }, []);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = prompt.trim();
    if (!text) return;
    if (count >= QUOTA) {
      setNotice('Demo quota used. It resets when this browser session ends.');
      return;
    }

    setMessages((current) => [...current, { role: 'user', text }, {
      role: 'assistant',
      text: `This is a UI preview, not a response from ${provider}. Connect a provider through a secure server integration to receive real AI answers.`,
    }]);
    const nextCount = count + 1;
    setCount(nextCount);
    sessionStorage.setItem(STORAGE_KEY, String(nextCount));
    setPrompt('');
    setNotice('Preview message added. No prompt or API key was sent to an AI service.');
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f7f8f4', color: '#172321' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 48px' }}>
        <header style={{ minHeight: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #dce4df' }}>
          <a href="/" style={{ fontWeight: 800, textDecoration: 'none' }}>WordPressDev <span style={{ color: '#748443' }}>AI</span></a>
          <a href="/" style={{ color: '#64716e', fontSize: 13 }}>← Back to portal</a>
        </header>

        <section style={{ padding: '48px 0 28px' }}>
          <p style={{ color: '#64716e', fontSize: 11, fontWeight: 700, letterSpacing: '.16em' }}>AI PLAYGROUND · LIMITED FREE PREVIEW</p>
          <h1 style={{ margin: '12px 0', fontSize: 'clamp(40px, 7vw, 68px)', letterSpacing: '-.07em', lineHeight: 1 }}>Explore AI tools.</h1>
          <p style={{ maxWidth: 680, color: '#64716e', lineHeight: 1.65 }}>Browse popular AI services or preview the member chat interface. Free preview is limited to {QUOTA} messages per browser session.</p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 42 }} aria-label="AI provider links">
          {providers.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: 16, border: '1px solid #dce4df', borderRadius: 10, background: '#fff', textDecoration: 'none' }}>
            <span><strong style={{ display: 'block', fontSize: 14 }}>{item.name}</strong><small style={{ display: 'block', marginTop: 5, color: '#64716e' }}>{item.kind}</small></span><span aria-hidden="true" style={{ color: '#315c45' }}>↗</span>
          </a>)}
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 24, alignItems: 'start' }}>
          <form onSubmit={sendMessage} style={{ padding: 22, border: '1px solid #dce4df', borderRadius: 12, background: '#fff' }}>
            <p style={{ marginTop: 0, color: '#64716e', fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>MEMBER CHAT PREVIEW</p>
            <label htmlFor="ai-provider" style={{ display: 'block', marginBottom: 7, fontSize: 13, fontWeight: 700 }}>AI provider</label>
            <select id="ai-provider" value={provider} onChange={(event) => setProvider(event.target.value)} style={{ width: '100%', padding: 12, border: '1px solid #dce4df', borderRadius: 7, background: '#fff', color: '#172321', font: 'inherit' }}>
              {providers.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
            </select>

            <label htmlFor="ai-api-key" style={{ display: 'block', margin: '18px 0 7px', fontSize: 13, fontWeight: 700 }}>API key field (preview only)</label>
            <input id="ai-api-key" type="password" autoComplete="off" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="Do not paste a real API key" style={{ width: '100%', padding: 12, border: '1px solid #dce4df', borderRadius: 7, font: 'inherit' }} />
            <p style={{ margin: '7px 0 0', color: '#8a5b18', fontSize: 12, lineHeight: 1.5 }}>This prototype does not save or use the key. Never enter a real secret here; production BYOK needs authenticated server-side proxying and rate limits.</p>

            <label htmlFor="ai-prompt" style={{ display: 'block', margin: '18px 0 7px', fontSize: 13, fontWeight: 700 }}>Your prompt</label>
            <textarea id="ai-prompt" rows={4} value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Write a sample prompt…" style={{ width: '100%', resize: 'vertical', padding: 12, border: '1px solid #dce4df', borderRadius: 7, font: 'inherit' }} />
            <button type="submit" disabled={count >= QUOTA} style={{ width: '100%', marginTop: 12, padding: 13, border: 0, borderRadius: 7, background: count >= QUOTA ? '#dce4df' : '#172321', color: count >= QUOTA ? '#64716e' : '#fff', font: 'inherit', fontWeight: 700, cursor: count >= QUOTA ? 'not-allowed' : 'pointer' }}>
              {count >= QUOTA ? 'Preview limit reached' : 'Send preview message'}
            </button>
            <p aria-live="polite" style={{ minHeight: 20, color: '#64716e', fontSize: 12 }}>{notice}</p>
          </form>

          <div style={{ padding: 22, border: '1px solid #dce4df', borderRadius: 12, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: 19 }}>Preview conversation</h2>
              <span style={{ color: '#64716e', fontSize: 12 }}>{count}/{QUOTA} messages</span>
            </div>
            <div aria-live="polite" style={{ display: 'grid', gap: 10, marginTop: 18 }}>
              {messages.length === 0 ? <p style={{ color: '#64716e', fontSize: 14, lineHeight: 1.6 }}>Your sample conversation will appear here. Responses are clearly marked as demo text and are not generated by an AI model.</p> : messages.map((message, index) => <article key={`${index}-${message.role}`} style={{ padding: 13, borderRadius: 8, background: message.role === 'user' ? '#f0f4e6' : '#f7f8f4' }}><strong style={{ fontSize: 11, color: '#64716e' }}>{message.role === 'user' ? 'YOU' : 'DEMO RESPONSE'}</strong><p style={{ margin: '6px 0 0', fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>{message.text}</p></article>)}
            </div>
          </div>
        </section>

        <footer style={{ marginTop: 32, paddingTop: 18, borderTop: '1px solid #dce4df', color: '#64716e', fontSize: 12, lineHeight: 1.6 }}>
          Demo-only UI: quota is client-side and can be reset, so it is not a billing or abuse-prevention control. Provider links open their official websites. No AI API integration, account system, or server-side key handling is implemented.
        </footer>
      </div>
    </main>
  );
}
