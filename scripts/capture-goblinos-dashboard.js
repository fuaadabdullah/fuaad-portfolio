#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');

async function captureDashboardMockup() {
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

    // Create a mock dashboard HTML
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      min-height: 100vh;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .title {
      font-size: 2.5em;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .subtitle {
      font-size: 1.2em;
      opacity: 0.9;
    }
    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .card-title {
      font-size: 1.3em;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .metric {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .metric-label {
      opacity: 0.8;
    }
    .metric-value {
      font-weight: bold;
      color: #4ade80;
    }
    .task-list {
      margin-top: 15px;
    }
    .task {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .task-name {
      flex: 1;
    }
    .task-status {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.8em;
      font-weight: bold;
    }
    .status-running {
      background: #fbbf24;
      color: #000;
    }
    .status-completed {
      background: #4ade80;
      color: #000;
    }
    .status-pending {
      background: #6b7280;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">GoblinOS Dashboard</div>
    <div class="subtitle">Real-time task orchestration & cost tracking</div>
  </div>

  <div class="dashboard">
    <div class="card">
      <div class="card-title">System Metrics</div>
      <div class="metric">
        <span class="metric-label">Active Tasks</span>
        <span class="metric-value">3</span>
      </div>
      <div class="metric">
        <span class="metric-label">Total Cost (Today)</span>
        <span class="metric-value">$2.47</span>
      </div>
      <div class="metric">
        <span class="metric-label">API Calls</span>
        <span class="metric-value">1,247</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Recent Tasks</div>
      <div class="task-list">
        <div class="task">
          <span class="task-name">Deploy Portfolio</span>
          <span class="task-status status-completed">Completed</span>
        </div>
        <div class="task">
          <span class="task-name">Run Tests</span>
          <span class="task-status status-running">Running</span>
        </div>
        <div class="task">
          <span class="task-name">Backup Database</span>
          <span class="task-status status-pending">Pending</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">AI Providers</div>
      <div class="metric">
        <span class="metric-label">OpenAI Usage</span>
        <span class="metric-value">$1.23</span>
      </div>
      <div class="metric">
        <span class="metric-label">Gemini Usage</span>
        <span class="metric-value">$0.89</span>
      </div>
      <div class="metric">
        <span class="metric-label">Anthropic Usage</span>
        <span class="metric-value">$0.35</span>
      </div>
    </div>
  </div>
</body>
</html>`;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Set viewport
    await page.setViewport({ width: 1200, height: 800 });

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 1000));

    const outputPath = path.join(__dirname, '../public/projects/goblinos-dashboard.png');
    await page.screenshot({
      path: outputPath,
      fullPage: false
    });

    console.log(`✅ Dashboard mockup saved: ${outputPath}`);

    await browser.close();
  } catch (error) {
    console.error('❌ Error capturing mockup:', error);
    process.exit(1);
  }
}

captureDashboardMockup();
