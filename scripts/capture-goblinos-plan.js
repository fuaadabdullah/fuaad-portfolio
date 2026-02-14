#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureMarkdownScreenshot() {
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

    // Read the markdown file
    const markdownPath = path.join(__dirname, '../../../GoblinOS/HUB_INTEGRATION_TRACKER.md');
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');

    // Create HTML with markdown content
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: white;
    }
    h1, h2, h3 { color: #2c3e50; margin-top: 1.5em; margin-bottom: 0.5em; }
    h1 { font-size: 2em; border-bottom: 2px solid #3498db; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #bdc3c7; padding-bottom: 0.2em; }
    h3 { font-size: 1.2em; }
    code { background: #f8f8f8; padding: 2px 4px; border-radius: 3px; font-family: 'Monaco', 'Menlo', monospace; }
    pre { background: #f8f8f8; padding: 10px; border-radius: 5px; overflow-x: auto; }
    ul, ol { margin-left: 20px; }
    li { margin-bottom: 5px; }
    blockquote { border-left: 4px solid #3498db; padding-left: 10px; margin-left: 0; color: #555; }
    table { border-collapse: collapse; width: 100%; margin: 10px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <div id="content"></div>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    document.getElementById('content').innerHTML = marked.parse(\`${markdownContent.replace(/`/g, '\\`')}\`);
  </script>
</body>
</html>`;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Set viewport
    await page.setViewport({ width: 1200, height: 800 });

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));

    const outputPath = path.join(__dirname, '../public/projects/goblinos-plan.png');
    await page.screenshot({
      path: outputPath,
      fullPage: true
    });

    console.log(`✅ Screenshot saved: ${outputPath}`);

    await browser.close();
  } catch (error) {
    console.error('❌ Error capturing screenshot:', error);
    process.exit(1);
  }
}

captureMarkdownScreenshot();
