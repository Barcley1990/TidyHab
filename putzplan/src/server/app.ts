import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { AppStatus } from '../shared/status.js';

export function isSupervisor(address: string | undefined): boolean {
  return address === '172.30.32.2' || address === '::ffff:172.30.32.2';
}

export function ingressBase(header: string | string[] | undefined): string {
  if (header === undefined || header === '') return '/';
  if (typeof header !== 'string' || !/^\/(?:[A-Za-z0-9_-]+\/?)*$/.test(header)) {
    throw new Error('Invalid ingress path');
  }
  return header.endsWith('/') ? header : `${header}/`;
}

export async function createApp(options: { dataDir: string; ingressOnly: boolean }) {
  await mkdir(options.dataDir, { recursive: true });
  const statePath = join(options.dataDir, 'state.json');
  try {
    await writeFile(statePath, JSON.stringify({ initializedAt: new Date().toISOString() }) + '\n', { flag: 'wx' });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
  }
  const state: unknown = JSON.parse(await readFile(statePath, 'utf8'));
  if (typeof state !== 'object' || state === null || !('initializedAt' in state) || typeof state.initializedAt !== 'string') {
    throw new Error('Invalid persistent state');
  }
  const packageInfo = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8'));
  const status: AppStatus = { name: 'TidyHab', version: packageInfo.version, initializedAt: state.initializedAt };
  const html = await readFile(new URL('../../public/index.html', import.meta.url), 'utf8');
  const assets = new Map([
    ['/assets/app.js', { type: 'text/javascript; charset=utf-8', body: await readFile(new URL('../client/app.js', import.meta.url)) }],
    ['/assets/style.css', { type: 'text/css; charset=utf-8', body: await readFile(new URL('../../public/style.css', import.meta.url)) }],
  ]);

  return createServer((request, response) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Security-Policy', "default-src 'self'; base-uri 'self'; frame-ancestors 'self'; object-src 'none'");
    if (options.ingressOnly && !isSupervisor(request.socket.remoteAddress)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    let base: string;
    try {
      base = ingressBase(request.headers['x-ingress-path']);
    } catch {
      response.writeHead(400).end('Invalid ingress path');
      return;
    }
    const path = (request.url ?? '/').split('?')[0];
    let body: string | Buffer;
    let type: string;
    if (path === '/' || path === '/index.html') {
      body = html.replace('{{BASE_PATH}}', base);
      type = 'text/html; charset=utf-8';
    } else if (path === '/api/status') {
      body = JSON.stringify(status);
      type = 'application/json; charset=utf-8';
    } else {
      const asset = assets.get(path ?? '');
      if (!asset) {
        response.writeHead(404).end('Not found');
        return;
      }
      ({ body, type } = asset);
    }
    response.writeHead(200, { 'Content-Type': type });
    response.end(request.method === 'HEAD' ? undefined : body);
  });
}
