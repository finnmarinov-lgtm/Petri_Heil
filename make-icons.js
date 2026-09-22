// Erzeugt die App-Icons als PNG, ohne zusätzliche Pakete.
// Aufruf: node make-icons.js
const zlib = require('zlib');
const fs = require('fs');

const T = [];
for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; T[n] = c >>> 0; }
const crc32 = buf => { let c = 0xffffffff; for (const b of buf) c = T[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// Karpfen aus dem Spiel, Kopf nach rechts
const FISH = [
  '........fff.......',
  '.....bbbbbbbbb....',
  'f..bbbbpbbbbbbbb..',
  'ffbbbbbbbbpbbbbbe.',
  'ffbbbpbbbbbbbbbbbb',
  'f..bbbbbbbbbbbbbb.',
  '....lllllllllll...',
  '......f....f......',
];
const COL = { b: '#f2c14e', l: '#fff1c8', f: '#e4573d', p: '#d4a02a', e: '#121a2b' };
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

function icon(size) {
  const img = Buffer.alloc(size * size * 4);
  const fill = (x, y, w, h, c) => {
    const [r, g, b] = hex(c);
    for (let yy = Math.max(0, y); yy < Math.min(size, y + h); yy++)
      for (let xx = Math.max(0, x); xx < Math.min(size, x + w); xx++) {
        const i = (yy * size + xx) * 4;
        img[i] = r; img[i + 1] = g; img[i + 2] = b; img[i + 3] = 255;
      }
  };
  const u = size / 32; // Rastereinheit
  fill(0, 0, size, size, '#121a2b');
  fill(0, Math.round(20 * u), size, size, '#1f4a68');            // Wasser
  fill(0, Math.round(20 * u), size, Math.round(u), '#3a7a94');   // Wasserlinie
  fill(0, Math.round(27 * u), size, size, '#183d58');            // tiefes Wasser
  const w = FISH[0].length, h = FISH.length;
  const s = Math.max(1, Math.floor(size * .62 / w));
  const ox = Math.round((size - w * s) / 2), oy = Math.round((size - h * s) / 2 + 2 * u);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const ch = FISH[y][x];
    if (COL[ch]) fill(ox + x * s, oy + y * s, s, s, COL[ch]);
  }
  // Pose und Haken über dem Fisch
  fill(Math.round(15.5 * u), Math.round(3 * u), Math.max(1, Math.round(u)), Math.round(5 * u), '#f3e9d2');
  fill(Math.round(14 * u), Math.round(8 * u), Math.round(4 * u), Math.round(2 * u), '#e4573d');
  fill(Math.round(14 * u), Math.round(10 * u), Math.round(4 * u), Math.round(2 * u), '#f3e9d2');
  return png(size, size, img);
}

for (const size of [192, 512]) {
  fs.writeFileSync(__dirname + `/icon-${size}.png`, icon(size));
  console.log(`icon-${size}.png geschrieben`);
}
