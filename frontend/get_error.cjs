const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
       console.log(`[ERROR on ${page.url()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`[EXCEPTION on ${page.url()}]`, error.message);
  });

  const routes = ['/about', '/contact', '/privacy-policy', '/terms-of-service', '/login', '/cart'];
  
  for (const route of routes) {
    console.log(`Navigating to http://localhost:5173${route} ...`);
    await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log('Testing complete.');
  await browser.close();
})();
