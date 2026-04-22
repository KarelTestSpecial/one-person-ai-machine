#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * CRITIC: Requirement Compliance v1.0
 * Goal: Verify if the project meets the specific client briefing.
 */

async function audit() {
  const briefingPath = path.join(process.cwd(), 'briefing.md');
  const srcDir = path.join(process.cwd(), 'src');

  if (!fs.existsSync(briefingPath)) {
    console.log("No briefing.md found. Skipping Requirement Audit.");
    process.exit(0);
  }

  const briefing = fs.readFileSync(briefingPath, 'utf8');
  
  // Read all files in src recursively to find patterns
  const getAllFiles = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.resolve(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) results = results.concat(getAllFiles(file));
      else results.push(file);
    });
    return results;
  };

  const allCode = getAllFiles(srcDir).map(f => fs.readFileSync(f, 'utf8')).join('\n');

  console.log("--- Requirement Audit Starting ---");

  const checks = [
    { name: "Live Indicator", pattern: /live-indicator/ },
    { name: "Latency Support", pattern: /latency/ },
    { name: "High-Frequency Loop", pattern: /setInterval[\s\S]*?100/ },
    { name: "Glassmorphism", pattern: /glass-panel/ },
    { name: "Active Navigation", pattern: /setActiveTab/ }
  ];

  let passed = true;
  const results = [];

  checks.forEach(check => {
    const isPresent = check.pattern.test(allCode);
    results.push(`${check.name}: ${isPresent ? '✅' : '❌'}`);
    if (!isPresent) passed = false;
  });

  console.log(results.join('\n'));

  if (passed) {
    console.log("\n[PASS] All requirements met.");
    process.exit(0);
  } else {
    console.log("\n[FAIL] Missing requirements detected.");
    process.exit(1);
  }
}

audit();
