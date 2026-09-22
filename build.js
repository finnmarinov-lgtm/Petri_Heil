// Baut aus game.html die installierbare Web-Version index.html.
// Aufruf: node build.js
const fs = require('fs');

const src = fs.readFileSync(__dirname + '/game.html', 'utf8');
const cut = src.indexOf('</style>');
if (cut < 0) { console.error('In game.html fehlt der </style>-Block.'); process.exit(1); }
const head = src.slice(0, cut + 8).trim();
const body = src.slice(cut + 8).trim();

const out = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#121a2b">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Petri Heil">
<link rel="apple-touch-icon" href="icon-192.png">
<!-- Automatisch erzeugt aus game.html. Nicht hier bearbeiten, sondern game.html ändern und "node build.js" ausführen. -->
<style>
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html,body{margin:0}
img{max-width:100%}
[hidden]{display:none!important}
</style>
${head}
</head>
<body>
${body}
</body>
</html>
`;
fs.writeFileSync(__dirname + '/index.html', out);

// Cache-Namen im Service Worker an den Inhalt koppeln, damit Updates sicher ankommen
const hash = require('crypto').createHash('sha1').update(out).digest('hex').slice(0, 8);
const swPath = __dirname + '/sw.js';
const sw = fs.readFileSync(swPath, 'utf8').replace(/const CACHE = '[^']*';/, "const CACHE = 'petri-heil-" + hash + "';");
fs.writeFileSync(swPath, sw);
console.log('Service-Worker-Cache: petri-heil-' + hash);
console.log('index.html geschrieben (' + Math.round(out.length / 1024) + ' KB)');
