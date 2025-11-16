#!/usr/bin/env node
const http = require('http');
const https = require('https');
const url = require('url');

const checkUrl = process.env.SITE_URL || 'http://localhost:3000';
const targetPath = '/about';
const fullUrl = checkUrl + targetPath;

function getUrlContents(site) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(site);
    const client = parsed.protocol === 'https:' ? https : http;
    client.get(site, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function validate() {
  try {
    console.log(`🔎 Fetching ${fullUrl} for validation...`);
    const html = await getUrlContents(fullUrl);
    const banned = ['RIZZK', 'GoblinOS'];
    const found = banned.filter(term => html.includes(term));
    if (found.length > 0) {
      console.error(`❌ Found disallowed terms on ${targetPath}: ${found.join(', ')}`);
      process.exit(2);
    }
    console.log('✅ Validation passed: About page does not include disallowed term mentions.');
  } catch (err) {
    console.error('❌ Validation failed:', err);
    process.exit(1);
  }
}

validate();
