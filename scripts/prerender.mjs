import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const dist = path.resolve('dist');
const routes = ['/', '/services', '/about', '/contact', '/services/generator-repairs', '/services/generator-servicing', '/services/fault-finding'];
const mime = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png' };

const server = http.createServer((req, res) => {
  let p = path.join(dist, req.url.split('?')[0]);
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(dist, 'index.html');
  res.setHeader('Content-Type', mime[path.extname(p)] || 'application/octet-stream');
  fs.createReadStream(p).pipe(res);
});
server.listen(4173, async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  for (const route of routes) {
    const page = await browser.newPage();
    await page.goto('http://localhost:4173' + route, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.querySelector('#root') && document.querySelector('#root').children.length > 0, { timeout: 10000 });
    const html = await page.content();
    const outDir = path.join(dist, route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    await page.close();
    console.log('prerendered', route);
  }
  await browser.close();
  server.close();
});
