import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { createApp, ingressBase, isSupervisor } from '../dist/server/app.js';

async function listen(server) {
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return `http://127.0.0.1:${server.address().port}`;
}

async function fixture(t, ingressOnly = false) {
  const dataDir = await mkdtemp(join(tmpdir(), 'tidyhab-'));
  t.after(() => rm(dataDir, { recursive: true, force: true }));
  const app = await createApp({ dataDir, ingressOnly });
  const url = await listen(app);
  t.after(() => new Promise((resolve) => app.close(resolve)));
  return { app, url, dataDir };
}

test('only the actual Supervisor peer is accepted', () => {
  assert.equal(isSupervisor('172.30.32.2'), true);
  assert.equal(isSupervisor('::ffff:172.30.32.2'), true);
  for (const address of [undefined, '127.0.0.1', '172.30.32.3', '192.168.1.1']) {
    assert.equal(isSupervisor(address), false);
  }
});

test('a forged forwarding header cannot bypass ingress protection', async (t) => {
  const { url } = await fixture(t, true);
  const response = await fetch(url, { headers: { 'X-Forwarded-For': '172.30.32.2', 'X-Ingress-Path': '/api/hassio_ingress/token' } });
  assert.equal(response.status, 403);
});

test('page, script, stylesheet and API work behind changing ingress prefixes', async (t) => {
  const { url } = await fixture(t);
  for (const prefix of ['/api/hassio_ingress/first-token', '/another/prefix/second_token']) {
    // Emulate the Supervisor stripping its prefix and adding X-Ingress-Path.
    const proxy = createServer(async (request, response) => {
      try {
        const forwarded = await fetch(url + request.url.slice(prefix.length), { headers: { 'X-Ingress-Path': prefix } });
        response.writeHead(forwarded.status, Object.fromEntries(forwarded.headers));
        response.end(Buffer.from(await forwarded.arrayBuffer()));
      } catch {
        response.writeHead(502).end();
      }
    });
    const origin = await listen(proxy);
    try {
      const page = await fetch(`${origin}${prefix}/`);
      assert.equal(page.status, 200);
      const html = await page.text();
      assert.match(html, new RegExp(`<base href="${prefix}/">`));
      const base = new URL(html.match(/<base href="([^"]+)">/)[1], origin);
      for (const asset of ['assets/app.js', 'assets/style.css', 'api/status']) {
        const response = await fetch(new URL(asset, base));
        assert.equal(response.status, 200, asset);
        if (asset === 'assets/app.js') assert.match(await response.text(), /document.baseURI/);
        if (asset === 'api/status') assert.equal((await response.json()).name, 'TidyHab');
      }
    } finally {
      await new Promise((resolve) => proxy.close(resolve));
    }
  }
});

test('persistent state survives a new server instance', async (t) => {
  const { url, dataDir } = await fixture(t);
  const first = await (await fetch(`${url}/api/status`)).json();
  const stateBefore = await readFile(join(dataDir, 'state.json'), 'utf8');
  const secondApp = await createApp({ dataDir, ingressOnly: false });
  const secondUrl = await listen(secondApp);
  t.after(() => new Promise((resolve) => secondApp.close(resolve)));
  const second = await (await fetch(`${secondUrl}/api/status`)).json();
  assert.equal(second.initializedAt, first.initializedAt);
  assert.equal(await readFile(join(dataDir, 'state.json'), 'utf8'), stateBefore);
});

test('invalid paths cannot inject HTML or change the base origin', async (t) => {
  const { url } = await fixture(t);
  assert.equal(ingressBase(undefined), '/');
  assert.equal(ingressBase('/api/token/'), '/api/token/');
  for (const path of ['//evil.example', '/path/../evil', '/"><script>', '/%22', ['/a', '/b']]) {
    assert.throws(() => ingressBase(path));
  }
  assert.equal((await fetch(url, { headers: { 'X-Ingress-Path': '//evil.example' } })).status, 400);
  assert.equal((await fetch(`${url}/unknown`)).status, 404);
  assert.equal((await fetch(url, { method: 'POST' })).status, 405);
  assert.equal(await (await fetch(url, { method: 'HEAD' })).text(), '');
});
