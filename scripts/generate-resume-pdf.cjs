#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

async function generatePDF() {
  try {
    // Read the resume markdown
    const resumePath = path.join(__dirname, '../content/resume.md');
    const resumeContent = fs.readFileSync(resumePath, 'utf8');

    // Convert markdown to HTML
    const htmlContent = md.render(resumeContent);

    // Professional resume HTML with clean styling
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 0.6in 0.65in; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.45;
      color: #1a1a1a;
    }
    h1 {
      font-size: 20pt;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.15em;
      color: #000;
    }
    h1 + p { color: #444; font-size: 10.5pt; margin-bottom: 0.15em; }
    h2 {
      font-size: 11.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #000;
      border-bottom: 1.5px solid #000;
      padding-bottom: 2px;
      margin-top: 0.8em;
      margin-bottom: 0.4em;
    }
    h3 {
      font-size: 10.5pt;
      font-weight: 600;
      margin-top: 0.55em;
      margin-bottom: 0.1em;
      color: #111;
    }
    h3 + p { color: #555; font-style: italic; font-size: 9.5pt; margin-bottom: 0.2em; }
    p { margin: 0.3em 0; }
    ul { margin: 0.2em 0 0.4em 0; padding-left: 1.3em; }
    li { margin: 0.12em 0; }
    strong { font-weight: 600; }
    em { font-style: italic; color: #444; }
    a { color: #0055aa; text-decoration: none; }
    hr { border: none; border-top: 0.5px solid #ccc; margin: 0.6em 0; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

    console.log('🚀 Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    const outputPath = path.join(__dirname, '../public/Fuaad_Abdullah_Resume.pdf');
    console.log('📝 Generating PDF...');

    await page.pdf({
      path: outputPath,
      format: 'letter',
      margin: { top: '0.6in', right: '0.65in', bottom: '0.6in', left: '0.65in' },
      printBackground: true
    });

    await browser.close();
    console.log(`✅ PDF generated at: ${outputPath}`);

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
}

generatePDF();
