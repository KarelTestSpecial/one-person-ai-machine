#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * DYNAMIC REQUIREMENT CRITIC 2.1 (Smarter)
 * Goal: Read briefing.md and verify the codebase against the SPECIFIC client requirements.
 */

async function audit() {
  const PROJECT_PATH = process.argv[2] || process.cwd();
  const briefingPath = path.join(PROJECT_PATH, 'briefing.md');
  const srcDir = path.join(PROJECT_PATH, 'src');
  const machineDir = path.join(path.dirname(PROJECT_PATH), 'machine'); // Check machine logic too

  if (!fs.existsSync(briefingPath)) {
    console.error("❌ ERROR: No briefing.md found.");
    process.exit(1);
  }

  const briefing = fs.readFileSync(briefingPath, 'utf8');
  
  const requirementsSection = briefing.match(/## Requirements([\s\S]*?)(##|$)/);
  if (!requirementsSection) {
    console.error("❌ ERROR: No '## Requirements' section.");
    process.exit(1);
  }

  const rawReqs = requirementsSection[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('-'))
    .map(line => line.replace(/^-\s*\*\*(.*?)\*\*:\s*/, '$1 ').replace(/^-/, '').trim());

  const getAllFiles = (dir) => {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.resolve(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory() && !file.includes('node_modules')) {
        results = results.concat(getAllFiles(fullPath));
      } else if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.js')) {
        results.push(fullPath);
      }
    });
    return results;
  };

  // Scan BOTH src and machine folders for evidence
  const allCode = [
    ...getAllFiles(srcDir),
    ...getAllFiles(machineDir)
  ].map(f => fs.readFileSync(f, 'utf8').toLowerCase()).join('\n');

  console.log("--- Dynamic Requirement Audit Starting (v2.1) ---");
  
  let failures = [];
  rawReqs.forEach(req => {
    // Extract meaningful keywords (longer than 3 chars, skip common words)
    const stopWords = ['with', 'from', 'support', 'integrated', 'generation', 'management', 'removal'];
    const keyTerms = req.toLowerCase()
      .replace(/[()#]/g, '')
      .split(/[\s,.-]+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));

    const foundTerm = keyTerms.find(term => allCode.includes(term));
    
    if (foundTerm) {
      console.log(`✅ MATCHED: "${req}" (Evidence: "${foundTerm}")`);
    } else {
      console.log(`❌ MISSING: "${req}" (Looked for: ${keyTerms.join(', ')})`);
      failures.push(req);
    }
  });

  if (failures.length === 0) {
    console.log("\n💎 SUCCESS: Codebase is 100% aligned with the briefing.");
    process.exit(0);
  } else {
    process.exit(1);
  }
}

audit();
