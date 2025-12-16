const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch({ args:['--no-sandbox'] });
  const context = await browser.newContext();
  const pages = ['/', '/blog'];
  const base = 'https://fuaad-portfolio-d0tqld0gq-fuaadabdullahs-projects.vercel.app';
  for (const path of pages) {
    const page = await context.newPage();
    const badResponses = [];
    page.on('response', res => {
      const status = res.status();
      if (status >= 400) {
        badResponses.push({url: res.url(), status});
      }
    });
    await page.goto(base+path, { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`--- ${path}`);
    console.log('Bad responses:', badResponses.slice(0,50));
    await page.close();
  }
  await browser.close();
})();
