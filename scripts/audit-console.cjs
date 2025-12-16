const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch({ args:['--no-sandbox'] });
  const context = await browser.newContext();
  const pages = ['/', '/blog'];
  const base = 'https://fuaad-portfolio-d0tqld0gq-fuaadabdullahs-projects.vercel.app';
  for (const path of pages) {
    const page = await context.newPage();
    const consoleMsgs = [];
    const pageErrors = [];
    const failedRequests = [];
    page.on('console', msg => consoleMsgs.push({type: msg.type(), text: msg.text()}));
    page.on('pageerror', err => pageErrors.push(String(err)));
    page.on('requestfailed', req => failedRequests.push({url: req.url(), error: req.failure()?.errorText || 'unknown'}));
    try {
      const res = await page.goto(base+path, { waitUntil: 'networkidle', timeout: 30000 });
      console.log(`--- ${path} - status: ${res.status()}`);
      console.log('Console messages:', consoleMsgs.slice(0,20));
      console.log('Page errors:', pageErrors);
      console.log('Failed requests:', failedRequests.slice(0,20));
    } catch (e) {
      console.log(`--- ${path} - navigation error:`, String(e));
    }
    await page.close();
  }
  await browser.close();
})();
