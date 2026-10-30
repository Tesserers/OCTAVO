// Servidor estático mínimo para trabajar en local, sin dependencias.
// Uso: npm run dev  ->  http://localhost:5173
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const port = Number(process.env.PORT) || 5173;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(root, path));
    if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
    const info = await stat(file).catch(() => null);
    const target = info?.isFile() ? file : (await stat(file + '.html').catch(() => null)) ? file + '.html' : null;
    if (!target) {
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      res.end(await readFile(join(root, '404.html')).catch(() => 'No encontrado'));
      return;
    }
    res.writeHead(200, { 'content-type': types[extname(target)] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(await readFile(target));
  } catch (err) {
    res.writeHead(500).end(String(err));
  }
}).listen(port, () => console.log(`Octavo en local: http://localhost:${port}`));
