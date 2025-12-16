const { chromium } = require('playwright');
(async ()=>{
  const b=await chromium.launch({args:['--no-sandbox']});
  const c=await b.newContext();
  const page=await c.newPage();
  const base='https://fuaad-portfolio-5xn11rg0c-fuaadabdullahs-projects.vercel.app';
  const consoleMsgs=[];
  page.on('console', m=> consoleMsgs.push({type:m.type(), text:m.text()}));
  await page.goto(base+'/',{waitUntil:'networkidle'});
  console.log('Console messages before click:', consoleMsgs.slice(0,20));
  const link = await page.$('a[href="/Fuaad_Abdullah_Resume.pdf"]');
  if(link){
    await link.click();
    console.log('Clicked resume link');
    await page.waitForTimeout(1000);
  } else {
    console.log('Resume link not found');
  }
  await b.close();
})();