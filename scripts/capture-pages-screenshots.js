#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');

async function captureScreenshots() {
  try {
    console.log('🚀 Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
    });

    const page = await browser.newPage();

    const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

    const pagesToCapture = [
      { url: `${baseUrl}/about`, filename: 'about-screenshot.png', viewport: { width: 1280, height: 900 } },
      { url: `${baseUrl}/case-studies`, filename: 'case-studies-screenshot.png', viewport: { width: 1280, height: 900 } },
    ];

    for (const p of pagesToCapture) {
      console.log(`📸 Capturing ${p.url}...`);
      await page.setViewport(p.viewport);
      await page.goto(p.url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Allow any animations to settle
      await new Promise(resolve => setTimeout(resolve, 1200));

      const outPath = path.join(__dirname, '../public', p.filename);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log(`✅ Saved screenshot: ${outPath}`);
    }

    await browser.close();
    console.log('🎉 Done capturing screenshots.');
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
    process.exit(1);
  }
}

captureScreenshots();
