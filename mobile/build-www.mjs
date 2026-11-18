// Builds mobile/www: the game with every library, font and asset bundled, so the iOS and Android apps work offline.
// Run from the repo root or mobile/:  node mobile/build-www.mjs
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url)), root = path.join(here, '..'), out = path.join(here, 'www');
const WEB_URL = 'https://wildheart-code.github.io/kindlehaven/';   // where co-op invites from the app point (the web version joins the same rooms)
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const swap = (from, to) => { if (!html.includes(from)) throw new Error('not found in index.html: ' + from); html = html.replace(from, to); };
swap('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'vendor/three.min.js');
swap('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js', 'vendor/GLTFLoader.js');
swap('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js', 'vendor/qrcode.min.js');
swap('https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js', 'vendor/peerjs.min.js');
html = html.replace(/<link rel="preconnect"[^>]*>/g, '');
html = html.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^"]*">/, '<link rel="stylesheet" href="vendor/fonts.css">');
swap('<meta charset="utf-8">', `<!doctype html>\n<meta charset="utf-8">\n<script>window.FROST_APP = true; window.FROST_WEB_URL = ${JSON.stringify(WEB_URL)};</script>`);
fs.writeFileSync(path.join(out, 'index.html'), html);
const copy = (rel) => fs.cpSync(path.join(root, rel), path.join(out, rel), { recursive: true });
['README.md', 'assets/game', 'assets/textures', 'assets/help', 'assets/brand'].forEach(copy);
fs.cpSync(path.join(here, 'vendor'), path.join(out, 'vendor'), { recursive: true });
const size = d => fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? size(path.join(d, e.name)) : fs.statSync(path.join(d, e.name)).size), 0);
console.log('mobile/www built:', (size(out) / 1e6).toFixed(1), 'MB');
