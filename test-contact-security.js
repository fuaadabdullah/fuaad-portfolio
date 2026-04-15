#!/usr/bin/env node
/**
 * Test script for /api/contact authentication and rate limiting
 * 
 * Usage:
 *   node test-contact-security.js [ADMIN_TOKEN] [BASE_URL]
 * 
 * Examples:
 *   node test-contact-security.js my-secret-token http://localhost:3000
 *   ADMIN_TOKEN=my-secret-token pnpm run test:contact
 */

const BASE_URL = process.argv[3] || process.env.BASE_URL || 'http://localhost:3000';
const ADMIN_TOKEN = process.argv[2] || process.env.ADMIN_TOKEN;

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testUnauthenticatedGet() {
  log('\n1. Testing GET without authentication (should fail with 401)...', 'blue');
  
  try {
    const response = await fetch(`${BASE_URL}/api/contact`);
    const data = await response.json();
    
    if (response.status === 401) {
      log('✓ PASS: Got 401 Unauthorized', 'green');
      log(`  Error: ${data.error}`, 'gray');
      return true;
    } else {
      log(`✗ FAIL: Expected 401, got ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`✗ FAIL: Connection error: ${error.message}`, 'red');
    return false;
  }
}

async function testAuthenticatedGet() {
  if (!ADMIN_TOKEN) {
    log('\n2. Skipping authenticated GET (no ADMIN_TOKEN provided)', 'yellow');
    return null;
  }

  log('\n2. Testing GET with valid authentication...', 'blue');
  
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
      },
    });
    const data = await response.json();
    
    if (response.status === 200) {
      log('✓ PASS: Got 200 OK', 'green');
      log(`  Found ${data.count} submissions`, 'gray');
      return true;
    } else {
      log(`✗ FAIL: Expected 200, got ${response.status}`, 'red');
      log(`  Error: ${data.error}`, 'gray');
      return false;
    }
  } catch (error) {
    log(`✗ FAIL: Connection error: ${error.message}`, 'red');
    return false;
  }
}

async function testInvalidToken() {
  log('\n3. Testing GET with invalid token (should fail with 401)...', 'blue');
  
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      headers: {
        'Authorization': 'Bearer invalid-token-xyz',
      },
    });
    const data = await response.json();
    
    if (response.status === 401) {
      log('✓ PASS: Got 401 Unauthorized', 'green');
      return true;
    } else {
      log(`✗ FAIL: Expected 401, got ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`✗ FAIL: Connection error: ${error.message}`, 'red');
    return false;
  }
}

async function testPostSubmission() {
  log('\n4. Testing POST submission (rate limiting check)...', 'blue');
  
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test submission from the security test script.',
      }),
    });
    
    if (response.status === 201) {
      log('✓ PASS: Submission accepted (201 Created)', 'green');
      const data = await response.json();
      log(`  Submission ID: ${data.id}`, 'gray');
      return true;
    } else if (response.status === 429) {
      log('⚠ WARN: Rate limited (429 Too Many Requests)', 'yellow');
      return null;
    } else {
      log(`✗ FAIL: Expected 201, got ${response.status}`, 'red');
      const data = await response.json();
      log(`  Error: ${data.error}`, 'gray');
      return false;
    }
  } catch (error) {
    log(`✗ FAIL: Connection error: ${error.message}`, 'red');
    return false;
  }
}

async function testInvalidSubmission() {
  log('\n5. Testing POST with invalid data (should fail validation)...', 'blue');
  
  try {
    const response = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'A', // Too short
        email: 'invalid-email',
        message: '',
      }),
    });
    
    if (response.status === 400) {
      log('✓ PASS: Validation failed as expected (400 Bad Request)', 'green');
      const data = await response.json();
      log(`  Error: ${data.error}`, 'gray');
      return true;
    } else {
      log(`✗ FAIL: Expected 400, got ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`✗ FAIL: Connection error: ${error.message}`, 'red');
    return false;
  }
}

async function runAllTests() {
  log('=====================================', 'blue');
  log('Contact API Security Test Suite', 'blue');
  log('=====================================', 'blue');
  log(`Target: ${BASE_URL}`, 'gray');
  log(`Admin Token: ${ADMIN_TOKEN ? '✓ Provided' : '✗ Not provided'}`, 'gray');

  const results = {
    pass: 0,
    fail: 0,
    skip: 0,
  };

  const tests = [
    await testUnauthenticatedGet(),
    await testAuthenticatedGet(),
    await testInvalidToken(),
    await testPostSubmission(),
    await testInvalidSubmission(),
  ];

  tests.forEach(result => {
    if (result === true) results.pass++;
    if (result === false) results.fail++;
    if (result === null) results.skip++;
  });

  log('\n=====================================', 'blue');
  log('Test Summary', 'blue');
  log('=====================================', 'blue');
  log(`Passed: ${results.pass}`, 'green');
  log(`Failed: ${results.fail}`, results.fail > 0 ? 'red' : 'gray');
  log(`Skipped: ${results.skip}`, 'gray');

  if (results.fail > 0) {
    log('\n⚠ Some tests failed. Review the output above.', 'red');
    process.exit(1);
  } else {
    log('\n✓ All tests passed!', 'green');
    process.exit(0);
  }
}

// Run tests
runAllTests().catch(error => {
  log(`Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
