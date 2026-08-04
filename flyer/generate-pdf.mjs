import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

const filePath = path.join(__dirname, 'flyer.html');
await page.goto(`file:///${filePath}`, { waitUntil: 'networkidle0', timeout: 15000 });

// Wait for fonts + image
await new Promise(r => setTimeout(r, 2500));

await page.pdf({
  path: path.join(__dirname, 'LiveOakSafety-InfoSheet.pdf'),
  format: 'Letter',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log('PDF generated: LiveOakSafety-InfoSheet.pdf');
