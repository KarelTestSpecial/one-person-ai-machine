#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function logLead() {
  console.log("\n🔭 WATCHTOWER: New Opportunity Logger\n");
  
  const projectName = await question("Project Name (e.g., vexillion-ai): ");
  const sourceUrl = await question("Source URL (Upwork/Fiverr link): ");
  const clientName = await question("Client/Entity Name: ");
  const description = await question("Short description of the request: ");

  if (!projectName || !sourceUrl || !clientName) {
    console.error("❌ ERROR: Project Name, Source URL, and Client Name are mandatory.");
    process.exit(1);
  }

  const projectDir = path.join(process.env.HOME, 'new-agent/projects', projectName);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  const originalJobContent = `# Original Client Request: ${projectName}
**Source URL**: ${sourceUrl}
**Client**: ${clientName}
**Date**: ${new Date().toISOString().split('T')[0]}

## Raw Description
${description}

---
*Captured by Watchtower Lead Logger*
`;

  fs.writeFileSync(path.join(projectDir, 'original_job.md'), originalJobContent);
  
  // Also log to a central ledger
  const ledgerPath = path.join(process.env.HOME, 'watchtower_leads.log');
  const logEntry = `[${new Date().toISOString()}] ${projectName} | ${clientName} | ${sourceUrl}\n`;
  fs.appendFileSync(ledgerPath, logEntry);

  console.log(`\n✅ Lead logged successfully in ${projectDir}/original_job.md`);
  console.log(`🚀 You can now run 'm critique ${projectName}' to start the briefing.`);
  process.exit(0);
}

logLead();
