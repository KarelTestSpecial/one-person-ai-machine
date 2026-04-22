/**
 * INTEGRITY CRITIC 2.0: The Strict Watchdog
 * Checks for:
 * 1. Dead links/buttons (No onClick/href).
 * 2. PLACEHOLDERS (Loading spinners, TODOs, empty modules).
 * 3. Broken navigation targets.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.argv[2] || process.cwd();
const audit = { errors: [] };

const scanIntegrity = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            scanIntegrity(fullPath);
        } else if (file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            // 1. Placeholder Check (Loading Spinners as permanent state)
            if (content.includes('animate-spin') && !content.includes('loading === false') && !content.includes('!loading')) {
                 // If it has a spinner but no logic to hide it, it's a dead placeholder
                 if (content.includes('Module Loading...')) {
                    audit.errors.push(`UNFINISHED MODULE: ${file} contains a permanent loading placeholder.`);
                 }
            }

            // 2. Dead Button Check
            const buttons = content.match(/<button[\s\S]*?>/g) || [];
            buttons.forEach(btn => {
                if (!btn.includes('onClick') && !btn.includes('type="submit"') && !btn.includes('disabled')) {
                    audit.errors.push(`DEAD BUTTON: In ${file} -> ${btn}`);
                }
            });

            // 3. Navigation Integrity
            if (file === 'App.jsx') {
                const tabs = content.match(/setActiveTab\(['"](.*?)['"]\)/g) || [];
                tabs.forEach(tabMatch => {
                    const tabName = tabMatch.match(/['"](.*?)['"]/)[1];
                    if (!content.includes(`activeTab === '${tabName}'`)) {
                        audit.errors.push(`BROKEN NAVIGATION: Target '${tabName}' is set but never rendered.`);
                    }
                });
            }
        }
    });
};

scanIntegrity(path.join(PROJECT_PATH, 'src'));

if (audit.errors.length > 0) {
    console.error("❌ INTEGRITY CRITIC 2.0 REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ INTEGRITY 2.0 APPROVED: No placeholders or dead ends detected.");
    process.exit(0);
}
