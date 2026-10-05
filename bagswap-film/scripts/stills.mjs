// Captures storyboard stills from the real composition via preview.html.
// Usage: node scripts/stills.mjs [outDir] [frames...]
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.resolve(process.argv[2] || path.join(root, 'out/stills'));
const frames = process.argv.slice(3).map(Number);
const list = frames.length ? frames : [96, 330, 600, 880, 1250, 1700];
fs.mkdirSync(outDir, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
}).listen(0);
const port = server.address().port;
const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE || undefined });
for (const fmt of ['landscape', 'vertical']) {
  const [w, h] = fmt === 'landscape' ? [1920, 1080] : [1080, 1920];
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`http://localhost:${port}/preview.html?paused&format=${fmt}`);
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'main{max-width:none;padding:0} h1,p.sub,.controls,.scenes,.caption{display:none} .viewport{border-radius:0;aspect-ratio:auto;width:' + w + 'px;height:' + h + 'px}' });
  for (const f of list) {
    await page.evaluate(([n, fm]) => window.__setFrame(n, fm), [f, fmt]);
    await page.waitForTimeout(60);
    await page.locator('#vp').screenshot({ path: path.join(outDir, `${fmt}-${String(f).padStart(4, '0')}.png`) });
  }
  await page.close();
}
await browser.close();
server.close();
console.log('stills written to', outDir);
