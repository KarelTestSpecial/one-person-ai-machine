#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Librarian Triage v1.0
 * Decides where to store a new lesson based on content.
 */

const GLOBAL_KEYWORDS = ['pnpm', 'npm', 'git', 'bash', 'security', 'legal', 'trademark', 'docker', 'firebase', 'infrastructure'];
const GLOBAL_DIR = path.join(os.homedir(), '.gemini', 'lessons');
const LOCAL_DIR = path.join(process.cwd(), 'learned-lessons');

function triage(title, content) {
    const combined = (title + ' ' + content).toLowerCase();
    const isGlobal = GLOBAL_KEYWORDS.some(kw => combined.includes(kw));
    
    const targetDir = isGlobal ? GLOBAL_DIR : LOCAL_DIR;
    const fileName = title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.md';
    const filePath = path.join(targetDir, fileName);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const output = `# ${title}\n\n${content}\n\n*Distilled on ${new Date().toISOString()}*`;
    fs.writeFileSync(filePath, output);
    
    return { isGlobal, filePath };
}

// CLI usage: node triage-logic.js "Title" "Content"
if (require.main === module) {
    const title = process.argv[2];
    const content = process.argv[3];
    if (title && content) {
        const result = triage(title, content);
        console.log(`✅ Lesson distilled to: ${result.filePath} (${result.isGlobal ? 'GLOBAL' : 'LOCAL'})`);
    } else {
        console.log("Usage: node triage-logic.js <title> <content>");
    }
}
