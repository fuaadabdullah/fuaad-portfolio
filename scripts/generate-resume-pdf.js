#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

async function generatePDF() {
  try {
    // Read the resume markdown
    const resumePath = path.join(__dirname, '../portfolio/resume.md');
    const resumeContent = fs.readFileSync(resumePath, 'utf8');
    
    // Convert markdown to HTML
    const htmlContent = md.render(resumeContent);
    
    // Create full HTML page with styling
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: letter;
      margin: 0.75in;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #000;
      max-width: 100%;
    }
    h1 {
      font-size: 20pt;
      margin-bottom: 0.25em;
      border-bottom: 2px solid #000;
      padding-bottom: 0.25em;
    }
    h2 {
      font-size: 14pt;
      margin-top: 1em;
      margin-bottom: 0.5em;
      border-bottom: 1px solid #333;
      padding-bottom: 0.15em;
    }
    h3 {
      font-size: 12pt;
      margin-top: 0.75em;
      margin-bottom: 0.25em;
    }
    p {
      margin: 0.5em 0;
    }
    ul {
      margin: 0.5em 0;
      padding-left: 1.5em;
    }
    li {
      margin: 0.25em 0;
    }
    strong {
      font-weight: 600;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
    `;
    
    // Launch browser and generate PDF
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    
    const outputPath = path.join(__dirname, '../public/Fuaad_Abdullah_Resume.pdf');
    console.log('Generating PDF...');
    
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
