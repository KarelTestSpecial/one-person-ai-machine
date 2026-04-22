#!/usr/bin/env node
const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * CRITIC: Browser Arbitrator v1.0
 * Goal: Verify the app actually renders and has no console errors.
 */

async function audit() {
  console.log("🌐 Browser Critic: Testing live rendering...");

  // We assume the dev server is already running or we can check the port.
  // In our workflow, pnpm run dev is usually active.
  
  // Use the browser_subagent via a command-line-like trigger or 
  // since I am a script, I will output a specific token for Antigravity to handle.
  
  const port = process.argv[2] || '5173';
  const url = `http://localhost:${port}`;
  
  console.log(`[ACTION] BROWSER_CHECK: ${url}`);
  
  try {
    execSync(`curl -s ${url}`);
    console.log(`✅ Server is responding on ${url}`);
  } catch (e) {
    console.error(`❌ Server is NOT responding on ${url}`);
    process.exit(1);
  }

  // NOTE: The actual visual/console audit is performed by Antigravity's browser tool.
  // This script serves as the hook in machine.sh.
  console.log("✅ BROWSER AUDIT HOOK READY.");
  process.exit(0);
}

audit();
