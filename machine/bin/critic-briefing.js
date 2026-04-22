/**
 * BRIEFING CRITIC (Gate 0): The Strategic Architect
 * Ensures the transition from "Raw Request" to "Internal Briefing" is perfect.
 * HARDENED: Mandatory Source Traceability
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.argv[2] || process.cwd();
const audit = { errors: [] };

const checkBriefing = () => {
    const originalPath = path.join(PROJECT_PATH, 'original_job.md');
    const briefingPath = path.join(PROJECT_PATH, 'briefing.md');

    if (!fs.existsSync(originalPath)) {
        audit.errors.push("Missing Original Job: No original_job.md found. Use 'm log-lead' first.");
        return;
    }
    
    if (!fs.existsSync(briefingPath)) {
        audit.errors.push("Missing Briefing: No briefing.md found to translate the original job.");
        return;
    }

    const original = fs.readFileSync(originalPath, 'utf8');
    const briefing = fs.readFileSync(briefingPath, 'utf8').toLowerCase();

    // 1. TRACEABILITY CHECK (New)
    if (!original.includes('**Source URL**: http')) {
        audit.errors.push("TRACEABILITY FAIL: original_job.md must contain a valid 'Source URL'.");
    }
    if (!original.includes('**Client**:')) {
        audit.errors.push("TRACEABILITY FAIL: original_job.md must identify the 'Client'.");
    }

    // 2. Coverage Check
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
        if (original.toLowerCase().includes(req) && !briefing.includes(req)) {
            audit.errors.push(`STRATEGIC GAP: The original request mentions '${req}', but it is missing in the internal briefing.`);
        }
    });

    if (!briefing.includes('## requirements')) audit.errors.push("Briefing Format: Missing '## Requirements' section.");
};

checkBriefing();

if (audit.errors.length > 0) {
    console.error("❌ BRIEFING CRITIC REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ BRIEFING APPROVED: Strategy and Traceability are aligned.");
    process.exit(0);
}
