// Descarga una vez los recursos de marca y las fotos reales desde mioctavo.com
// a la carpeta assets/img/. Uso: npm run assets
// Lo ejecuta también la acción "Descargar imágenes" de GitHub.
import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const BASE = 'https://www.mioctavo.com/assets/';
const out = fileURLToPath(new URL('../assets/img/', import.meta.url));

const range = (prefix, from, to, skip = []) =>
  Array.from({ length: to - from + 1 }, (_, i) => i + from)
    .filter(n => !skip.includes(n))
    .map(n => `${prefix}-${String(n).padStart(2, '0')}.jpg`);

const files = [
  'logo-octavo.png',
  'logo-octavo-blanco.png',
  'hero-costa.jpg',
  ...range('luanco', 1, 12, [8]),
  ...range('luanco2', 1, 15),
  ...range('navahondilla', 1, 13),
  'dest-costaverde.jpg',
  'dest-riasbaixas.jpg',
  'dest-costabrava.jpg',
  'dest-pirineos.jpg',
  'dest-baleares.jpg',
  'nat-rio.jpg'
];

await mkdir(out, { recursive: true });
let ok = 0, skipped = 0, failed = [];

for (const name of files) {
  const dest = join(out, name);
  if (await access(dest).then(() => true, () => false)) { skipped++; continue; }
  try {
    const res = await fetch(BASE + name);
    if (!res.ok) throw new Error(res.status);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    process.stdout.write('.');
  } catch (e) {
    failed.push(`${name} (${e.message})`);
  }
}

console.log(`\nDescargadas ${ok}, ya existían ${skipped}.`);
if (failed.length) console.log('Fallaron:\n  ' + failed.join('\n  '));
