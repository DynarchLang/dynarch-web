const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
    console.log('STACK TRACE:', error.stack);
  });
  await page.goto('http://localhost:5173', {waitUntil: 'networkidle0'}).catch(e => console.log('Navigation Error:', e));
  await browser.close();
})();
