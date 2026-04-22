#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * CRITIC: Librarian Arbitrator v1.0 (The Knowledge Guard)
 * Goal: Ensure lessons-learned are actionable, unique, and not 'clogging' memory.
 */

const LESSONS_PATH = path.join(process.cwd(), 'lessons-learned.md');

async function audit() {
  console.log("📚 Librarian Critic: Auditing knowledge integrity...");

  if (!fs.existsSync(LESSONS_PATH)) {
    console.error("❌ No lessons-learned.md found. Knowledge base is empty.");
    process.exit(1);
  }

  const content = fs.readFileSync(LESSONS_PATH, 'utf8');
  const errors = [];

  // 1. Actionability Check: Look for vague terms
  if (content.includes("maybe") || content.includes("sometimes") || content.includes("check if")) {
    errors.push("Vague Content: Lessons should be imperative and direct (e.g., 'Always use X').");
  }

  // 2. Formatting Check: Ensure sections are present
  if (!content.includes("## Technical Gotchas") || !content.includes("## Client Alignment")) {
    errors.push("Missing Structure: Lessons must follow the standardized format.");
  }

  // 3. Density Check: Avoid 'clogging' (Max length per entry)
  const lines = content.split('\n');
  if (lines.length > 100) {
    errors.push("Memory Clogging: lessons-learned.md is getting too long. Time to distill into Skills.");
  }

  if (errors.length > 0) {
    console.error("❌ LIBRARIAN CRITIC REJECTED:");
    errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
  } else {
    console.log("✅ KNOWLEDGE INTEGRITY APPROVED.");
    process.exit(0);
  }
}

audit();
