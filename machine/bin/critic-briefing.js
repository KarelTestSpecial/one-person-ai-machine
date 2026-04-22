/**
 * BRIEFING CRITIC (Gate 0): The Strategic Architect
 * Ensures the transition from "Raw Request" to "Internal Briefing" is perfect.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.argv[2] || process.cwd();
const audit = { errors: [] };

const checkBriefing = () => {
    const originalPath = path.join(PROJECT_PATH, 'original_job.md');
    const briefingPath = path.join(PROJECT_PATH, 'briefing.md');

    if (!fs.existsSync(originalPath)) return; // Skip if no original
    if (!fs.existsSync(briefingPath)) {
        audit.errors.push("Missing Briefing: No briefing.md found to translate the original job.");
        return;
    }

    const original = fs.readFileSync(originalPath, 'utf8').toLowerCase();
    const briefing = fs.readFileSync(briefingPath, 'utf8').toLowerCase();

    // 1. Coverage Check: Check if keywords from original are in the briefing
    const requirements = [
        'glassmorphism',
        'video',
        'audio',
        'images',
        'api',
        'enterprise',
        'report'
    ];

    requirements.forEach(req => {
        if (original.includes(req) && !briefing.includes(req)) {
            audit.errors.push(`STRATEGIC GAP: The original request mentions '${req}', but it is missing in the internal briefing.`);
        }
    });

    // 2. Machine Readiness Check
    if (!briefing.includes('## requirements')) audit.errors.push("Briefing Format: Missing '## Requirements' section.");
    if (!briefing.includes('client')) audit.errors.push("Briefing Content: Client name or source not identified.");
};

checkBriefing();

if (audit.errors.length > 0) {
    console.error("❌ BRIEFING CRITIC REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ BRIEFING APPROVED: Strategy is aligned with raw request.");
    process.exit(0);
}
