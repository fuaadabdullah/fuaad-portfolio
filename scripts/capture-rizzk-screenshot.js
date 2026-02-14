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
    
    // Desktop screenshot
    console.log('📸 Capturing desktop screenshot...');
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://rizzk-calculator-demo-eus2-f1.azurewebsites.net', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait a bit for any animations
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const desktopPath = path.join(__dirname, '../public/rizzk-desktop-screenshot.png');
    await page.screenshot({
      path: desktopPath,
      fullPage: false
    });
    console.log(`✅ Desktop screenshot saved: ${desktopPath}`);

    // Mobile screenshot
    console.log('📱 Capturing mobile screenshot...');
    await page.setViewport({ width: 375, height: 812 }); // iPhone X size
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mobilePath = path.join(__dirname, '../public/rizzk-mobile-screenshot.png');
    await page.screenshot({
      path: mobilePath,
      fullPage: false
    });
    console.log(`✅ Mobile screenshot saved: ${mobilePath}`);

    await browser.close();
    console.log('🎉 Screenshots captured successfully!');
    
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
    process.exit(1);
  }
}

captureScreenshots();
