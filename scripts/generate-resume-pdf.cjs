#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function generatePDF() {
  // Get URL from command line or environment
  const url = process.argv[2] || process.env.RESUME_URL || 'https://heyimfuaad.me/resume';
  
  try {
    // Launch browser and generate PDF
    console.log('🚀 Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    console.log(`📄 Loading ${url}...`);
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });
    
    // Wait for fonts and content to load
    await page.waitForTimeout(3000);
    
    const outputPath = path.join(__dirname, '../public/Fuaad_Abdullah_Resume.pdf');
    console.log('📝 Generating PDF...');
    
    await page.pdf({
      path: outputPath,
      format: 'letter',
      margin: {
        top: '0.75in',
        right: '0.75in',
        bottom: '0.75in',
        left: '0.75in'
      },
      printBackground: true
    });
    
    await browser.close();
    
    console.log(`✅ PDF generated successfully at: ${outputPath}`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
}

generatePDF();
