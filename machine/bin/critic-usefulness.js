/**
 * USEFULNESS CRITIC: The Business Value Guard
 * Checks if the app provides real functional value across all components.
 */
import fs from 'fs';
import path from 'path';

const PROJECT_PATH = process.argv[2] || process.cwd();
const audit = { errors: [], hasState: false, hasEffect: false, hasBusinessComponent: false };

const scanDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory() && !fullPath.includes('node_modules')) {
            scanDir(fullPath);
        } else if (file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            if (content.includes('useState')) audit.hasState = true;
            if (content.includes('useEffect')) audit.hasEffect = true;
            if (content.includes('Chart') || content.includes('Table') || content.includes('Feed') || content.includes('Predictor')) {
                audit.hasBusinessComponent = true;
            }
        }
    });
};

scanDir(path.join(PROJECT_PATH, 'src'));

if (!audit.hasState) audit.errors.push("Low Functional Value: No interactive state (useState) detected.");
if (!audit.hasEffect) audit.errors.push("Static Experience: No real-time data handling (useEffect) detected.");
if (!audit.hasBusinessComponent) audit.errors.push("Generic UI: Missing specialized business components (Charts, Tables, Feeds).");

if (audit.errors.length > 0) {
    console.error("❌ USEFULNESS CRITIC REJECTED:");
    audit.errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("✅ USEFULNESS APPROVED.");
    process.exit(0);
}
