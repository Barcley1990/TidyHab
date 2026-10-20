import { resolve } from 'node:path';
import { createApp } from './app.js';

// Only an explicit development setting may disable the Supervisor access check.
const ingressOnly = process.env.INGRESS_ONLY !== 'false';
const host = process.env.HOST ?? '127.0.0.1';
if (!ingressOnly && (process.env.NODE_ENV === 'production' || host !== '127.0.0.1')) {
  throw new Error('Development access is restricted to 127.0.0.1 outside production');
}
const port = Number(process.env.PORT ?? 8099);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const dataDir = process.env.DATA_DIR ?? resolve('.data');
const app = await createApp({ dataDir, ingressOnly });
app.listen(port, host, () => console.log(`TidyHab listening on ${host}:${port}; data: ${dataDir}`));
app.on('error', (error) => { console.error(error); process.exit(1); });
for (const signal of ['SIGTERM', 'SIGINT'] as const) {
  process.on(signal, () => {
    app.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 8000).unref();
  });
}
