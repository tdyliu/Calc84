// Copies runtime libraries from node_modules into www/vendor so the app works offline (exe/apk).
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), nm = p => path.join(root, 'node_modules', p), out = path.join(root, 'www', 'vendor');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'fonts'), { recursive: true });
fs.copyFileSync(nm('mathjs/lib/browser/math.js'), path.join(out, 'math.js'));
fs.copyFileSync(nm('mathlive/mathlive.min.js'), path.join(out, 'mathlive.min.js'));
fs.copyFileSync(nm('mathlive/mathlive-static.css'), path.join(out, 'mathlive-static.css'));
fs.cpSync(nm('mathlive/fonts'), path.join(out, 'fonts'), { recursive: true });
const fsrc = nm('@fontsource/atkinson-hyperlegible-next/files');
for (const w of [400, 500, 700]) {
  const f = `atkinson-hyperlegible-next-latin-${w}-normal.woff2`;
  fs.copyFileSync(path.join(fsrc, f), path.join(out, f));
}
// file list for the web version's service worker (www/sw.js) to cache for offline use
const list = fs.readdirSync(out, { recursive: true }).map(f => 'vendor/' + f.split(path.sep).join('/')).filter(f => /\.\w+$/.test(f));
fs.writeFileSync(path.join(out, 'precache.json'), JSON.stringify(list));
console.log('vendored into', out);
